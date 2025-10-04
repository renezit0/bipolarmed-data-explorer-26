import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';
import { AlertCircle } from 'lucide-react';

interface ProportionChartProps {
  data: ProcessedMedicData[];
}

export const ProportionChart = ({ data }: ProportionChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="academic-title">Proporção do Consumo de Cada Medicamento</CardTitle>
          <CardDescription>
            Distribuição percentual do consumo total por medicamento (período completo)
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

  const chartData = data
    .filter(medic => medic.totalConsumption > 0)
    .map(medic => ({
      name: medic.simplifiedName,
      value: medic.totalConsumption,
      fullName: medic.fullName,
      procedimento: medic.procedimento
    }));

  if (chartData.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="academic-title">Proporção do Consumo de Cada Medicamento</CardTitle>
          <CardDescription>
            Distribuição percentual do consumo total por medicamento (período completo)
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

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-foreground">{data.name}</p>
          <p className="text-sm text-muted-foreground">Código: {data.procedimento}</p>
          <p className="text-sm text-primary">Consumo: {data.value.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-accent">Proporção: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Proporção do Consumo de Cada Medicamento</CardTitle>
        <CardDescription>
          Distribuição percentual do consumo total por medicamento (período completo)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};