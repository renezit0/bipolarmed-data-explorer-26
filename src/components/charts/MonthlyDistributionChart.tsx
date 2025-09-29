import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface MonthlyDistributionChartProps {
  data: ProcessedMedicData[];
}

export const MonthlyDistributionChart = ({ data }: MonthlyDistributionChartProps) => {
  // Criar dados empilhados para mostrar distribuição
  const stackedData = data[0]?.timeSeriesData.map(item => {
    const monthData = { month: item.month };
    
    data.forEach(medic => {
      const medicData = medic.timeSeriesData.find(d => d.month === item.month);
      (monthData as any)[medic.simplifiedName] = medicData?.value || 0;
    });
    
    return monthData;
  }) || [];

  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))'];

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Distribuição Mensal por Tipo de Medicamento</CardTitle>
        <CardDescription>
          Distribuição empilhada mostrando a composição do consumo por período
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={stackedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
              angle={-45}
              textAnchor="end"
              height={60}
            />
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
              <Area
                key={medic.procedimento}
                type="monotone"
                dataKey={medic.simplifiedName}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};