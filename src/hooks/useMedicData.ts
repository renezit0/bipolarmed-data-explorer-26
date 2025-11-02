import { useState, useEffect, useRef } from 'react';
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

// Função SUPER robusta para converter valores
const parseValue = (value: any, monthName?: string, medicName?: string): number => {
  // Log para debug (remover depois)
  const DEBUG = false; // Mude para true para ver os logs
  
  // Se já for número válido
  if (typeof value === 'number') {
    if (isNaN(value)) {
      if (DEBUG) console.log(`⚠️ [${medicName}/${monthName}] Number mas NaN:`, value);
      return 0;
    }
    // IMPORTANTE: Se vier como number, pode estar com ponto como decimal
    // Ex: 94.900 pode virar 94.9 se foi parseado errado antes
    if (DEBUG && value > 0) console.log(`📊 [${medicName}/${monthName}] Number direto:`, value);
    return Math.round(value);
  }
  
  // Se for null, undefined ou string vazia
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  
  // Se for string
  if (typeof value === 'string') {
    let cleaned = value.trim();
    
    if (cleaned === '' || cleaned === '-') {
      return 0;
    }
    
    // LOG: ver o valor original
    if (DEBUG && cleaned.length > 0) {
      console.log(`🔍 [${medicName}/${monthName}] String original: "${cleaned}"`);
    }
    
    // CRÍTICO: Verificar o padrão do número
    // Formato BR: 94.900 (ponto = milhar)
    // Formato EN: 94,900 (vírgula = milhar)
    
    // Se tem PONTO e NÃO tem vírgula = formato BR com milhar
    if (cleaned.includes('.') && !cleaned.includes(',')) {
      // Remove os pontos (milhar)
      cleaned = cleaned.replace(/\./g, '');
    }
    // Se tem VÍRGULA = decimal brasileiro
    else if (cleaned.includes(',')) {
      // Remove pontos primeiro (milhar)
      cleaned = cleaned.replace(/\./g, '');
      // Troca vírgula por ponto (decimal)
      cleaned = cleaned.replace(',', '.');
    }
    
    const num = parseFloat(cleaned);
    
    if (isNaN(num)) {
      if (DEBUG) console.log(`❌ [${medicName}/${monthName}] NaN após conversão de "${value}" -> "${cleaned}"`);
      return 0;
    }
    
    if (DEBUG && num > 0) {
      console.log(`✅ [${medicName}/${monthName}] "${value}" -> ${num}`);
    }
    
    return Math.round(num);
  }
  
  // Qualquer outro tipo
  if (DEBUG) console.log(`⚠️ [${medicName}/${monthName}] Tipo inesperado:`, typeof value, value);
  return 0;
};

export const useMedicData = (tableNames: string[] = ['medicbipopr']) => {
  const [data, setData] = useState<ProcessedMedicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const prevTableNamesRef = useRef<string>('');

  const simplifyMedicName = (fullName: string): string => {
    const nameWithoutCode = fullName.replace(/^\d+\s+/, '');
    const match = nameWithoutCode.match(/^([A-Z]+(?:\s+[A-Z]+)*)\s+(\d+(?:,\d+)?\s*MG)/i);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
    return nameWithoutCode.split(' ').slice(0, 3).join(' ');
  };

  const monthOrder = [
    '2015/Jun', '2015/Jul', '2015/Ago', '2015/Set', '2015/Out', '2015/Nov', '2015/Dez',
    '2016/Jan', '2016/Fev', '2016/Mar', '2016/Abr', '2016/Mai', '2016/Jun', '2016/Jul', '2016/Ago', '2016/Set', '2016/Out', '2016/Nov', '2016/Dez',
    '2017/Jan', '2017/Fev', '2017/Mar', '2017/Abr', '2017/Mai', '2017/Jun', '2017/Jul', '2017/Ago', '2017/Set', '2017/Out', '2017/Nov', '2017/Dez',
    '2018/Jan', '2018/Fev', '2018/Mar', '2018/Abr', '2018/Mai', '2018/Jun', '2018/Jul', '2018/Ago', '2018/Set', '2018/Out', '2018/Nov', '2018/Dez',
    '2019/Jan', '2019/Fev', '2019/Mar', '2019/Abr', '2019/Mai', '2019/Jun', '2019/Jul', '2019/Ago', '2019/Set', '2019/Out', '2019/Nov', '2019/Dez',
    '2020/Jan', '2020/Fev', '2020/Mar', '2020/Abr', '2020/Mai', '2020/Jun', '2020/Jul', '2020/Ago', '2020/Set', '2020/Out', '2020/Nov', '2020/Dez',
    '2021/Jan', '2021/Fev', '2021/Mar', '2021/Abr', '2021/Mai', '2021/Jun', '2021/Jul', '2021/Ago', '2021/Set', '2021/Out', '2021/Nov', '2021/Dez',
    '2022/Jan', '2022/Fev', '2022/Mar', '2022/Abr', '2022/Mai', '2022/Jun', '2022/Jul', '2022/Ago', '2022/Set', '2022/Out', '2022/Nov', '2022/Dez',
    '2023/Jan', '2023/Fev', '2023/Mar', '2023/Abr', '2023/Mai', '2023/Jun', '2023/Jul', '2023/Ago', '2023/Set', '2023/Out', '2023/Nov', '2023/Dez',
    '2024/Jan', '2024/Fev', '2024/Mar', '2024/Abr', '2024/Mai', '2024/Jun', '2024/Jul', '2024/Ago', '2024/Set', '2024/Out', '2024/Nov', '2024/Dez',
    '2025/Jan', '2025/Fev', '2025/Mar', '2025/Abr', '2025/Mai', '2025/Jun'
  ];

  useEffect(() => {
    const currentTableNames = [...tableNames].sort().join(',');
    
    if (currentTableNames === prevTableNamesRef.current) {
      console.log('⏭️ Tabelas não mudaram, pulando fetch');
      return;
    }
    
    prevTableNamesRef.current = currentTableNames;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('🔍 =================================');
        console.log('🔍 Carregando dados de', tableNames.length, 'tabela(s)');
        console.log('🔍 Tabelas:', tableNames);
        console.log('🔍 =================================');

        const allDataPromises = tableNames.map(async (tableName) => {
          const { data: rawData, error } = await supabase
            .from(tableName as any)
            .select('*');

          if (error) {
            console.error(`❌ Erro ao buscar ${tableName}:`, error);
            throw error;
          }
          
          return rawData || [];
        });

        const allRawData = await Promise.all(allDataPromises);
        const totalRows = allRawData.reduce((sum, arr) => sum + arr.length, 0);
        console.log(`✅ ${totalRows} linhas carregadas`);
        
        // DEBUG: Verificar tipos de dados em uma linha de amostra
        if (allRawData.length > 0 && allRawData[0].length > 0) {
          const sampleRow = allRawData[0][0];
          console.log('🔬 AMOSTRA DE TIPOS DE DADOS:');
          monthOrder.slice(0, 5).forEach(month => {
            const value = sampleRow[month];
            console.log(`  ${month}: tipo=${typeof value}, valor="${value}"`);
          });
        }
        
        const medicMap = new Map<string, {
          procedimento: string;
          simplifiedName: string;
          fullName: string;
          monthlyData: Map<string, number>;
          totalConsumption: number;
        }>();

        allRawData.flat().forEach((row: any) => {
          const fullName = row.Procedimento || '';
          if (!fullName) return;
          
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
            
            // Passar nome do mês e medicamento para debug
            const numValue = parseValue(value, month, medic.simplifiedName);
            
            if (numValue > 0) {
              const currentValue = medic.monthlyData.get(month) || 0;
              medic.monthlyData.set(month, currentValue + numValue);
            }
          });
        });

        const medicCount = medicMap.size;
        console.log(`💊 ${medicCount} medicamento(s) encontrado(s)`);

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

        console.log('✨ Processamento concluído:', processedData.length, 'medicamento(s)');
        
        // DEBUG: Mostrar totais de um medicamento
        if (processedData.length > 0) {
          const sample = processedData[0];
          console.log(`📈 Amostra - ${sample.simplifiedName}:`);
          console.log(`   Total: ${sample.totalConsumption.toLocaleString('pt-BR')}`);
          console.log(`   Registros: ${sample.timeSeriesData.length} meses`);
          if (sample.timeSeriesData.length > 0) {
            console.log(`   Primeiro: ${sample.timeSeriesData[0].month} = ${sample.timeSeriesData[0].value.toLocaleString('pt-BR')}`);
          }
        }
        
        console.log('🔍 =================================\n');
        
        setData(processedData);
      } catch (err) {
        console.error('💥 Erro:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tableNames]);

  return { data, loading, error };
};