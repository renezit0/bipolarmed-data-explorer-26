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

  // Função para simplificar nomes dos medicamentos
  const simplifyMedicName = (fullName: string): string => {
    // Remove código do procedimento
    const nameWithoutCode = fullName.replace(/^\d+\s+/, '');
    
    // Extrai apenas o nome principal e dosagem
    const match = nameWithoutCode.match(/^([A-Z]+(?:\s+[A-Z]+)*)\s+(\d+(?:,\d+)?\s*MG)/i);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
    
    // Fallback: pega as primeiras palavras
    return nameWithoutCode.split(' ').slice(0, 3).join(' ');
  };

  // Meses ordenados cronologicamente
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

        // Buscar dados de todas as tabelas
        const allDataPromises = tableNames.map(async (tableName) => {
          const { data: rawData, error } = await supabase
            .from(tableName as any)
            .select('*');

          if (error) throw error;
          return rawData || [];
        });

        const allRawData = await Promise.all(allDataPromises);
        
        // Agregar dados por medicamento (PROCEDIMENTO)
        const medicMap = new Map<string, {
          procedimento: string;
          simplifiedName: string;
          fullName: string;
          monthlyData: Map<string, number>;
          totalConsumption: number;
        }>();

        allRawData.flat().forEach((row: any) => {
          const fullName = row.PROCEDIMENTO || '';
          const procedimento = fullName.split(' ')[0] || '';
          
          if (!medicMap.has(procedimento)) {
            medicMap.set(procedimento, {
              procedimento,
              simplifiedName: simplifyMedicName(fullName),
              fullName,
              monthlyData: new Map(),
              totalConsumption: 0
            });
          }

          const medic = medicMap.get(procedimento)!;
          
          // Agregar valores mensais
          monthOrder.forEach(month => {
            const value = row[month];
            const numValue = typeof value === 'string' ? parseInt(value) || 0 : (value || 0);
            
            if (numValue > 0) {
              const currentValue = medic.monthlyData.get(month) || 0;
              medic.monthlyData.set(month, currentValue + numValue);
            }
          });
        });

        // Converter para formato final
        const processedData = Array.from(medicMap.values()).map(medic => {
          const timeSeriesData = monthOrder
            .map(month => {
              const value = medic.monthlyData.get(month) || 0;
              const year = parseInt(month.split('/')[0]);
              
              return {
                month,
                value,
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
        }).filter(item => item.totalConsumption > 0);

        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(tableNames)]);

  return { data, loading, error };
};