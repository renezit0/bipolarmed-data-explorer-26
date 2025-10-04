import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';
import { AlertCircle } from 'lucide-react';

interface SeasonalityChartProps {
  data: ProcessedMedicData[];
}

export const SeasonalityChart = ({ data }: SeasonalityChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="academic-title">Sazonalidade no Consumo</CardTitle>
          <CardDescription>
            Padrões sazonais no consumo total por mês (soma de todos os anos)
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

  // Agregar dados por mês (somando todos os anos) para análise de sazonalidade
  const monthlyData = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ].map(month => {
    const monthData: any = { month };
    
    data.forEach(medic => {
      const monthValues = medic.timeSeriesData
        ?.filter(item => item.month.includes(`/${month}`))
        .map(item => item.value) || [];
      
      // Somar todos os valores do mesmo mês em todos os anos
      const monthTotal = monthValues.reduce((sum, value) => sum + value, 0);
      
      monthData[medic.simplifiedName] = monthTotal;
    });
    
    return monthData;
  });

  if (monthlyData.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle className="academic-title">Sazonalidade no Consumo</CardTitle>
          <CardDescription>
            Padrões sazonais no consumo total por mês (soma de todos os anos)
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
        <CardTitle className="academic-title">Sazonalidade no Consumo</CardTitle>
        <CardDescription>
          Padrões sazonais no consumo total por mês (soma de todos os anos)
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