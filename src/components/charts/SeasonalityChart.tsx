import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface SeasonalityChartProps {
  data: ProcessedMedicData[];
}

export const SeasonalityChart = ({ data }: SeasonalityChartProps) => {
  // Agregar dados por mês (ignorando ano) para análise de sazonalidade - consumo médio mensal
  const monthlyData = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ].map(month => {
    const monthData = { month };
    
    data.forEach(medic => {
      const monthValues = medic.timeSeriesData
        .filter(item => item.month.includes(`/${month}`))
        .map(item => item.value);
      
      // Calcular média mensal para sazonalidade
      const monthAverage = monthValues.length > 0 
        ? monthValues.reduce((sum, value) => sum + value, 0) / monthValues.length 
        : 0;
      
      (monthData as any)[medic.simplifiedName] = Math.round(monthAverage);
    });
    
    return monthData;
  });

  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))'];

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Sazonalidade no Consumo</CardTitle>
        <CardDescription>
          Padrões sazonais no consumo médio mensal de medicamentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Legend />
            {data.map((medic, index) => (
              <Line
                key={medic.procedimento}
                type="monotone"
                dataKey={medic.simplifiedName}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};