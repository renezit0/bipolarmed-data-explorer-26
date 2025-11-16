import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { STATES, StateCode } from '@/constants/states';

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

const parseValue = (value: any): number => {
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : Math.round(value);
  }
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  if (typeof value === 'string') {
    let cleaned = value.trim();
    if (cleaned === '' || cleaned === '-') {
      return 0;
    }
    if (cleaned.includes('.') && !cleaned.includes(',')) {
      cleaned = cleaned.replace(/\./g, '');
    } else if (cleaned.includes(',')) {
      cleaned = cleaned.replace(/\./g, '');
      cleaned = cleaned.replace(',', '.');
    }
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.round(num);
  }
  return 0;
};

export const useStateConsumption = () => {
  const [consumptionByState, setConsumptionByState] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllStates = async () => {
      try {
        setLoading(true);
        setError(null);

        const stateConsumption: Record<string, number> = {};

        // Buscar dados de todos os estados em paralelo
        const allPromises = Object.entries(STATES).map(async ([code, stateInfo]) => {
          const { data: rawData, error } = await (supabase as any)
            .from(stateInfo.table)
            .select('*');

          if (error) {
            console.error(`❌ Erro ao buscar ${stateInfo.name}:`, error);
            return;
          }

          if (!rawData || rawData.length === 0) {
            stateConsumption[stateInfo.table] = 0;
            return;
          }

          // Somar todo o consumo deste estado
          let totalConsumption = 0;
          rawData.forEach((row: any) => {
            monthOrder.forEach(month => {
              const value = parseValue(row[month]);
              totalConsumption += value;
            });
          });

          stateConsumption[stateInfo.table] = totalConsumption;
        });

        await Promise.all(allPromises);

        console.log('✅ Consumo por estado calculado:', stateConsumption);
        setConsumptionByState(stateConsumption);
      } catch (err) {
        console.error('💥 Erro ao calcular consumo por estado:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStates();
  }, []);

  return { consumptionByState, loading, error };
};