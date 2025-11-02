import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { ProcessedMedicData } from '@/hooks/useMedicData';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
interface PandemicImpactChartProps {
  data: ProcessedMedicData[];
}
export const PandemicImpactChart = ({
  data
}: PandemicImpactChartProps) => {
  const pandemicData = useMemo(() => {
    if (!data || data.length === 0) return null;

    // Períodos:
    // Pré-pandemia: 2015/Jun - 2019/Dez
    // Durante pandemia: 2020/Jan - 2021/Dez
    // Pós-pandemia: 2022/Jan - 2025/Jun

    let prePandemic = 0;
    let duringPandemic = 0;
    let postPandemic = 0;
    data.forEach(medic => {
      medic.timeSeriesData.forEach(({
        month,
        value
      }) => {
        const yearNum = parseInt(month.split('/')[0]);
        if (yearNum < 2020) {
          prePandemic += value;
        } else if (yearNum >= 2020 && yearNum <= 2021) {
          duringPandemic += value;
        } else if (yearNum >= 2022) {
          postPandemic += value;
        }
      });
    });

    // Calcular médias mensais para comparação justa
    const preMonths = 55; // Jun/2015 a Dez/2019
    const duringMonths = 24; // Jan/2020 a Dez/2021
    const postMonths = 42; // Jan/2022 a Jun/2025

    return [{
      period: 'Pré-Pandemia\n(Jun/2015-Dez/2019)',
      total: prePandemic,
      monthly: Math.round(prePandemic / preMonths),
      months: preMonths,
      color: 'hsl(var(--chart-1))'
    }, {
      period: 'Durante Pandemia\n(Jan/2020-Dez/2021)',
      total: duringPandemic,
      monthly: Math.round(duringPandemic / duringMonths),
      months: duringMonths,
      color: 'hsl(var(--chart-2))'
    }, {
      period: 'Pós-Pandemia\n(Jan/2022-Jun/2025)',
      total: postPandemic,
      monthly: Math.round(postPandemic / postMonths),
      months: postMonths,
      color: 'hsl(var(--chart-3))'
    }];
  }, [data]);
  if (!data || data.length === 0) {
    return <Card>
        <CardHeader>
          <CardTitle>Figura 2 – Impacto da Pandemia no Consumo</CardTitle>
          <CardDescription>Comparativo pré/durante/pós pandemia COVID-19</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Nenhum dado disponível para análise</AlertDescription>
          </Alert>
        </CardContent>
      </Card>;
  }
  if (!pandemicData) {
    return <Card>
        <CardHeader>
          <CardTitle>Figura 2 – Impacto da Pandemia no Consumo</CardTitle>
          <CardDescription>Comparativo pré/durante/pós pandemia COVID-19</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Dados insuficientes para análise</AlertDescription>
          </Alert>
        </CardContent>
      </Card>;
  }
  const CustomTooltip = ({
    active,
    payload
  }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{data.period.replace('\n', ' ')}</p>
          <div className="space-y-1 text-xs">
            <p>
              <span className="text-muted-foreground">Total:</span>{' '}
              <span className="font-medium">{data.total.toLocaleString('pt-BR')}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Média Mensal:</span>{' '}
              <span className="font-medium">{data.monthly.toLocaleString('pt-BR')}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Período:</span>{' '}
              <span className="font-medium">{data.months} meses</span>
            </p>
          </div>
        </div>;
    }
    return null;
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num);
  };
  return <Card>
      <CardHeader>
        <CardTitle>Impacto da Pandemia no Consumo de Medicamentos para TAB
      </CardTitle>
        <CardDescription>Comparação do consumo médio mensal nos períodos pré-pandemia, durante e pós-pandemia.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={pandemicData} margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60
        }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="period" angle={-15} textAnchor="end" height={80} style={{
            fontSize: '12px'
          }} />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{
            paddingTop: '20px'
          }} payload={[
            {
              value: 'Pré-Pandemia',
              type: 'square',
              color: 'hsl(var(--chart-1))'
            },
            {
              value: 'Durante Pandemia',
              type: 'square',
              color: 'hsl(var(--chart-2))'
            },
            {
              value: 'Pós-Pandemia',
              type: 'square',
              color: 'hsl(var(--chart-3))'
            }
          ]} />
            <Bar dataKey="monthly" radius={[8, 8, 0, 0]}>
              {pandemicData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {pandemicData.map((period, idx) => <div key={idx} className="bg-accent/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">{period.period.replace('\n', ' ')}</p>
              <p className="text-lg font-bold">{period.monthly.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-muted-foreground">unidades/mês</p>
            </div>)}
        </div>
      </CardContent>
    </Card>;
};