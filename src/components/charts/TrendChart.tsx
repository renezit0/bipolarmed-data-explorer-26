import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';
import { AlertCircle } from 'lucide-react';

interface TrendChartProps {
  data: ProcessedMedicData[];
}

export const TrendChart = ({ data }: TrendChartProps) => {
  // Validação: se não há dados, mostrar mensagem
  if (!data || data.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="academic-title">Tendências de Consumo ao Longo do Tempo</CardTitle>
          <CardDescription>
            Evolução temporal do consumo de medicamentos para transtorno bipolar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum dado disponível para esta seleção</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Agregar dados por mês para todas as medicações
  const aggregatedData = data[0]?.timeSeriesData?.map(item => {
    const monthData = { month: item.month };
    
    data.forEach((medic) => {
      const medicData = medic.timeSeriesData?.find(d => d.month === item.month);
      (monthData as any)[medic.simplifiedName] = medicData?.value || 0;
    });
    
    return monthData;
  }) || [];

  if (aggregatedData.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="academic-title">Tendências de Consumo ao Longo do Tempo</CardTitle>
          <CardDescription>
            Evolução temporal do consumo de medicamentos para transtorno bipolar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Dados insuficientes para gerar o gráfico</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--chart-6))'];

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Tendências de Consumo ao Longo do Tempo</CardTitle>
        <CardDescription>
          Evolução temporal do consumo de medicamentos para transtorno bipolar (Jun/2018 - Jun/2025)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={aggregatedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              formatter={(value, name) => [
                `${Number(value).toLocaleString()} unidades`,
                name
              ]}
              labelFormatter={(label) => `Período: ${label}`}
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