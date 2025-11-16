import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';
import { AlertCircle } from 'lucide-react';

interface TrendProjectionChartProps {
  data: ProcessedMedicData[];
}

export const TrendProjectionChart = ({ data }: TrendProjectionChartProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardDescription>
            Comparação entre a tendência projetada (Jun/2015 a Dez/2020) e a dispensação real
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

  // Agregar dados mensais totais
  const monthlyData = data[0]?.timeSeriesData?.map(item => {
    const totalMonth = data.reduce((sum, medic) => {
      const medicData = medic.timeSeriesData?.find(d => d.month === item.month);
      return sum + (medicData?.value || 0);
    }, 0);
    return {
      month: item.month,
      total: totalMonth,
      year: item.year
    };
  }) || [];

  if (monthlyData.length === 0) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardDescription>
            Comparação entre a tendência projetada (Jun/2015 a Dez/2020) e a dispensação real
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

  // Encontrar o índice de 2015/Jun e 2020/Dez
  const startIndex = monthlyData.findIndex(d => d.month === '2015/Jun');
  const endIndex = monthlyData.findIndex(d => d.month === '2020/Dez');

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardDescription>
            Comparação entre a tendência projetada (Jun/2015 a Dez/2020) e a dispensação real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[400px] text-muted-foreground">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Período de referência (Jun/2015 a Dez/2020) não encontrado nos dados</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calcular a taxa de crescimento no período de referência
  const referenceData = monthlyData.slice(startIndex, endIndex + 1);
  const startValue = referenceData[0].total;
  const endValue = referenceData[referenceData.length - 1].total;
  const monthsInPeriod = referenceData.length;
  
  // Taxa de crescimento mensal composta
  const growthRate = Math.pow(endValue / startValue, 1 / monthsInPeriod) - 1;

  console.log('📊 Cálculo de Projeção de Tendência:');
  console.log(`   Período de referência: Jun/2015 (${startValue.toLocaleString('pt-BR')}) a Dez/2020 (${endValue.toLocaleString('pt-BR')})`);
  console.log(`   Meses no período: ${monthsInPeriod}`);
  console.log(`   Taxa de crescimento mensal: ${(growthRate * 100).toFixed(3)}%`);
  console.log(`   Taxa anual equivalente: ${((Math.pow(1 + growthRate, 12) - 1) * 100).toFixed(2)}%`);

  // Projetar a tendência para TODO o período usando Jun/2015 como ponto de referência
  const chartData = monthlyData.map((item, index) => {
    // Calcular quantos meses de diferença em relação a Jun/2015
    const monthsFromReference = index - startIndex;
    // Aplicar a taxa de crescimento (positiva ou negativa) a partir do valor de Jun/2015
    const projectedValue = Math.round(startValue * Math.pow(1 + growthRate, monthsFromReference));

    return {
      month: item.month,
      real: item.total,
      projetado: projectedValue
    };
  });

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardDescription>
          Comparação entre o crescimento observado em Jun/2015-Dez/2020 (taxa mensal: {(growthRate * 100).toFixed(2)}%) 
          projetado para todo o período versus o crescimento real observado, especialmente em Jan/2021-Jun/2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart 
            data={chartData} 
            margin={{ top: 20, right: 30, bottom: 60, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }} 
              interval="preserveStartEnd"
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number | null, name: string) => {
                if (value === null) return ['-', name];
                return [value.toLocaleString('pt-BR'), name];
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="real" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              dot={{ r: 3 }}
              name="Dispensação Real"
              connectNulls
            />
            <Line 
              type="monotone" 
              dataKey="projetado" 
              stroke="hsl(var(--chart-3))" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 3 }}
              name="Tendência Projetada"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
