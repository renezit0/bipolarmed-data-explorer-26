import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface MedicData {
  PROCEDIMENTO: string;
  [key: string]: string | number | null;
}

export interface ProcessedMedicData {
  procedimento: string;
  simplifiedName: string;
  fullName: string;
  timeSeriesData: { month: string; value: number; year: number }[];
  totalConsumption: number;
}

export const useMedicData = (tableNames: string[] = ['medicbipopr']) => {
  const [data, setData] = useState<ProcessedMedicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const simplifyMedicName = (fullName: string): string => {
    const nameWithoutCode = fullName.replace(/^\d+\s+/, '');
    const match = nameWithoutCode.match(/^([A-Z]+(?:\s+[A-Z]+)*)\s+(\d+(?:,\d+)?\s*MG)/i);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
    return nameWithoutCode.split(' ').slice(0, 3).join(' ');
  };

  const monthOrder = [
    '2018/Jun', '2018/Jul', '2018/Ago', '2018/Set', '2018/Out', '2018/Nov', '2018/Dez',
    '2019/Jan', '2019/Fev', '2019/Mar', '2019/Abr', '2019/Mai', '2019/Jun', '2019/Jul', '2019/Ago', '2019/Set', '2019/Out', '2019/Nov', '2019/Dez',
    '2020/Jan', '2020/Fev', '2020/Mar', '2020/Abr', '2020/Mai', '2020/Jun', '2020/Jul', '2020/Ago', '2020/Set', '2020/Out', '2020/Nov', '2020/Dez',
    '2021/Jan', '2021/Fev', '2021/Mar', '2021/Abr', '2021/Mai', '2021/Jun', '2021/Jul', '2021/Ago', '2021/Set', '2021/Out', '2021/Nov', '2021/Dez',
    '2022/Jan', '2022/Fev', '2022/Mar', '2022/Abr', '2022/Mai', '2022/Jun', '2022/Jul', '2022/Ago', '2022/Set', '2022/Out', '2022/Nov', '2022/Dez',
    '2023/Jan', '2023/Fev', '2023/Mar', '2023/Abr', '2023/Mai', '2023/Jun', '2023/Jul', '2023/Ago', '2023/Set', '2023/Out', '2023/Nov', '2023/Dez',
    '2024/Jan', '2024/Fev', '2024/Mar', '2024/Abr', '2024/Mai', '2024/Jun', '2024/Jul', '2024/Ago', '2024/Set', '2024/Out', '2024/Nov', '2024/Dez',
    '2025/Jan', '2025/Fev', '2025/Mar', '2025/Abr', '2025/Mai', '2025/Jun'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔍 =================================');
        console.log('🔍 INICIANDO BUSCA DE DADOS');
        console.log('🔍 Tabelas solicitadas:', tableNames);
        console.log('🔍 Quantidade:', tableNames.length);
        console.log('🔍 =================================');

        // Testar conexão com Supabase primeiro
        console.log('🔌 Testando conexão com Supabase...');
        const { data: testData, error: testError } = await supabase
          .from('medicbipo')
          .select('PROCEDIMENTO')
          .limit(1);
        
        if (testError) {
          console.error('❌ Erro ao conectar no Supabase:', testError);
          throw new Error(`Erro de conexão: ${testError.message}`);
        }
        
        console.log('✅ Conexão com Supabase OK!');
        console.log('📋 Teste de dados:', testData);

        // Buscar dados de todas as tabelas
        const allDataPromises = tableNames.map(async (tableName, index) => {
          console.log(`\n📥 [${index + 1}/${tableNames.length}] Buscando tabela: ${tableName}`);
          
          try {
            const { data: rawData, error } = await supabase
              .from(tableName as any)
              .select('*');

            if (error) {
              console.error(`❌ Erro na tabela ${tableName}:`, error);
              console.error('❌ Código:', error.code);
              console.error('❌ Mensagem:', error.message);
              console.error('❌ Detalhes:', error.details);
              return [];
            }
            
            console.log(`✅ Tabela ${tableName}: ${rawData?.length || 0} linhas`);
            if (rawData && rawData.length > 0) {
              console.log(`📊 Primeira linha da ${tableName}:`, rawData[0]);
            }
            
            return rawData || [];
          } catch (err) {
            console.error(`💥 Exceção ao buscar ${tableName}:`, err);
            return [];
          }
        });

        const allRawData = await Promise.all(allDataPromises);
        const totalRows = allRawData.reduce((sum, arr) => sum + arr.length, 0);
        
        console.log('\n📊 =================================');
        console.log(`📊 RESUMO DA BUSCA`);
        console.log(`📊 Total de linhas: ${totalRows}`);
        console.log(`📊 Tabelas com dados: ${allRawData.filter(arr => arr.length > 0).length}`);
        console.log(`📊 Tabelas vazias: ${allRawData.filter(arr => arr.length === 0).length}`);
        console.log('📊 =================================\n');

        if (totalRows === 0) {
          console.warn('⚠️ NENHUMA LINHA ENCONTRADA!');
          console.warn('⚠️ Possíveis causas:');
          console.warn('⚠️ 1. Tabelas não existem no Supabase');
          console.warn('⚠️ 2. Tabelas estão vazias');
          console.warn('⚠️ 3. Problema de permissão (RLS)');
          console.warn('⚠️ 4. Nomes das tabelas estão errados');
          setData([]);
          return;
        }
        
        // Agregar dados
        console.log('🔄 Iniciando agregação de dados...');
        const medicMap = new Map<string, {
          procedimento: string;
          simplifiedName: string;
          fullName: string;
          monthlyData: Map<string, number>;
          totalConsumption: number;
        }>();

        let rowsProcessed = 0;
        allRawData.flat().forEach((row: any) => {
          rowsProcessed++;
          const fullName = row.PROCEDIMENTO || '';
          
          if (!fullName) {
            if (rowsProcessed === 1) {
              console.warn('⚠️ Primeira linha sem PROCEDIMENTO:', row);
            }
            return;
          }
          
          const medicKey = fullName.trim();
          
          if (!medicMap.has(medicKey)) {
            const procedimento = fullName.split(' ')[0] || '';
            medicMap.set(medicKey, {
              procedimento,
              simplifiedName: simplifyMedicName(fullName),
              fullName,
              monthlyData: new Map(),
              totalConsumption: 0
            });
          }

          const medic = medicMap.get(medicKey)!;
          
          monthOrder.forEach(month => {
            const value = row[month];
            let numValue = 0;
            
            if (typeof value === 'string') {
              const cleanValue = value.replace(/\./g, '').replace(/,/g, '.');
              numValue = parseFloat(cleanValue) || 0;
            } else if (typeof value === 'number') {
              numValue = value;
            }
            
            if (numValue > 0) {
              const currentValue = medic.monthlyData.get(month) || 0;
              medic.monthlyData.set(month, currentValue + numValue);
            }
          });
        });

        console.log(`✅ Linhas processadas: ${rowsProcessed}`);
        console.log(`💊 Medicamentos únicos: ${medicMap.size}`);
        
        if (medicMap.size > 0) {
          console.log('📋 Lista de medicamentos encontrados:');
          Array.from(medicMap.values()).forEach((m, i) => {
            console.log(`  ${i + 1}. ${m.simplifiedName} (${m.fullName})`);
          });
        }

        // Converter para formato final
        const processedData = Array.from(medicMap.values()).map(medic => {
          const timeSeriesData = monthOrder
            .map(month => {
              const value = medic.monthlyData.get(month) || 0;
              const year = parseInt(month.split('/')[0]);
              
              return {
                month,
                value: Math.round(value),
                year
              };
            })
            .filter(item => item.value > 0);

          const totalConsumption = timeSeriesData.reduce((sum, item) => sum + item.value, 0);

          return {
            procedimento: medic.procedimento,
            simplifiedName: medic.simplifiedName,
            fullName: medic.fullName,
            timeSeriesData,
            totalConsumption
          };
        })
        .filter(item => item.totalConsumption > 0)
        .sort((a, b) => b.totalConsumption - a.totalConsumption);

        console.log('\n✨ =================================');
        console.log('✨ PROCESSAMENTO CONCLUÍDO');
        console.log(`✨ Medicamentos finais: ${processedData.length}`);
        console.log('✨ =================================\n');
        
        setData(processedData);
      } catch (err) {
        console.error('\n💥 =================================');
        console.error('💥 ERRO FATAL NO PROCESSAMENTO');
        console.error('💥', err);
        console.error('💥 =================================\n');
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(tableNames)]);

  return { data, loading, error };
};