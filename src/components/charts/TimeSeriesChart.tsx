import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface TimeSeriesChartProps {
  data: ProcessedMedicData[];
}

export const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  // Criar dados combinando barras (total mensal) e linha (tendência)
  const chartData = data[0]?.timeSeriesData.map(item => {
    const totalMonth = data.reduce((sum, medic) => {
      const medicData = medic.timeSeriesData.find(d => d.month === item.month);
      return sum + (medicData?.value || 0);
    }, 0);
    
    return {
      month: item.month,
      total: totalMonth,
      year: item.year
    };
  }) || [];

  // Calcular média móvel para tendência
  const movingAverage = chartData.map((item, index) => {
    const window = 3; // Média móvel de 3 meses
    const start = Math.max(0, index - Math.floor(window / 2));
    const end = Math.min(chartData.length, start + window);
    const avg = chartData.slice(start, end).reduce((sum, d) => sum + d.total, 0) / (end - start);
    
    return {
      ...item,
      tendencia: Math.round(avg)
    };
  });

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Evolução Temporal Total dos Medicamentos</CardTitle>
        <CardDescription>
          Volume total mensal e tendência de consumo com média móvel de 3 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={movingAverage} margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
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
              formatter={(value: number, name: string) => [
                value.toLocaleString('pt-BR'),
                name === 'total' ? 'Consumo Mensal' : 'Tendência (Média Móvel)'
              ]}
            />
            <Legend />
            <Bar 
              dataKey="total" 
              fill="hsl(var(--chart-2))" 
              fillOpacity={0.6}
              radius={[2, 2, 0, 0]}
              name="Consumo Mensal"
            />
            <Line 
              type="monotone" 
              dataKey="tendencia" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Tendência"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};