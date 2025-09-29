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
    if (groupingMode === 'individual') {
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

      const timeSeriesData = Array.from(allMonths).sort().map(month => {
        const totalValue = medications.reduce((sum, medic) => {
          const point = medic.timeSeriesData.find(p => p.month === month);
          return sum + (point?.value || 0);
        }, 0);
        
        return { month, value: totalValue };
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

    return processedGroups.sort((a, b) => b.totalConsumption - a.totalConsumption);
  }, [data, groupingMode]);

  return {
    groupingMode,
    setGroupingMode,
    processedData: groupedData as (ProcessedMedicData | GroupedMedicData)[],
    isGrouped: groupingMode === 'grouped'
  };
};