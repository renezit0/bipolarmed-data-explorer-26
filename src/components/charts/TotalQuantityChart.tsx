import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface TotalQuantityChartProps {
  data: ProcessedMedicData[];
}

export const TotalQuantityChart = ({ data }: TotalQuantityChartProps) => {
  const chartData = data
    .map(medic => ({
      name: medic.simplifiedName,
      total: medic.totalConsumption,
      fullName: medic.fullName,
      procedimento: medic.procedimento
    }))
    .sort((a, b) => b.total - a.total);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">Código: {data.procedimento}</p>
          <p className="text-sm text-muted-foreground mb-2">{data.fullName}</p>
          <p className="text-sm text-primary font-semibold">
            Total: {data.total.toLocaleString('pt-BR')} unidades
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Quantidade Total de Cada Medicamento</CardTitle>
        <CardDescription>
          Ranking do consumo total por medicamento durante todo o período estudado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={600}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 11 }}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="total" 
              fill="hsl(var(--chart-1))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};