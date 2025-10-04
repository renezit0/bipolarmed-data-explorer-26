import { useMemo, useState } from 'react';
import { ProcessedMedicData } from './useMedicData';

export type GroupingMode = 'individual' | 'grouped';

export interface GroupedMedicData {
  id: string;
  groupName: string;
  simplifiedName: string;
  fullName: string;
  totalConsumption: number;
  timeSeriesData: Array<{ month: string; value: number }>;
  medications: ProcessedMedicData[];
  procedimento: string;
}

export const useMedicGrouping = (data: ProcessedMedicData[]) => {
  const [groupingMode, setGroupingMode] = useState<GroupingMode>('individual');

  const groupedData = useMemo(() => {
    console.log('🔄 useMedicGrouping: Processando', data.length, 'medicamentos, modo:', groupingMode);
    
    if (groupingMode === 'individual' || data.length === 0) {
      console.log('✅ Modo individual ou sem dados, retornando', data.length, 'itens');
      return data;
    }

    // Agrupar por substância ativa (ignorando dosagem)
    const groups = new Map<string, ProcessedMedicData[]>();
    
    data.forEach(medic => {
      // Extrair nome da substância (primeiro nome antes da dosagem)
      const substanceName = medic.simplifiedName.split(' ')[0];
      
      if (!groups.has(substanceName)) {
        groups.set(substanceName, []);
      }
      groups.get(substanceName)!.push(medic);
    });

    // Converter grupos em dados processados
    const processedGroups: GroupedMedicData[] = [];
    
    groups.forEach((medications, substanceName) => {
      if (medications.length <= 1) {
        // Se só tem um medicamento, não agrupar
        return;
      }

      // Criar dados agregados para a substância
      const allMonths = new Set<string>();
      medications.forEach(medic => {
        medic.timeSeriesData.forEach(point => allMonths.add(point.month));
      });

      // Usar a mesma ordem cronológica do useMedicData
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

      const timeSeriesData = monthOrder
        .filter(month => allMonths.has(month))
        .map(month => {
          const totalValue = medications.reduce((sum, medic) => {
            const point = medic.timeSeriesData.find(p => p.month === month);
            return sum + (point?.value || 0);
          }, 0);
          
          const year = parseInt(month.split('/')[0]);
          return { month, value: totalValue, year };
        });

      const totalConsumption = medications.reduce((sum, medic) => sum + medic.totalConsumption, 0);
      
      const groupedMedic: GroupedMedicData = {
        id: `group-${substanceName}`,
        groupName: substanceName,
        simplifiedName: `${substanceName} (Todas as dosagens)`,
        fullName: `${substanceName} - Agrupamento de todas as dosagens`,
        totalConsumption,
        timeSeriesData,
        medications,
        procedimento: medications[0].procedimento
      };

      processedGroups.push(groupedMedic);
    });

    // Adicionar medicamentos individuais que não foram agrupados
    groups.forEach((medications, substanceName) => {
      if (medications.length === 1) {
        processedGroups.push(medications[0] as any);
      }
    });

    const result = processedGroups.sort((a, b) => b.totalConsumption - a.totalConsumption);
    console.log('✅ Modo agrupado retornando', result.length, 'itens');
    return result;
  }, [data, groupingMode]); // IMPORTANTE: Adicionar 'data' nas dependências!

  return {
    groupingMode,
    setGroupingMode,
    processedData: groupedData as (ProcessedMedicData | GroupedMedicData)[],
    isGrouped: groupingMode === 'grouped'
  };
};