import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { STATES, StateCode } from '@/constants/states';
import { Trophy, Users, TrendingUp } from 'lucide-react';

interface StateConsumption {
  stateCode: StateCode;
  stateName: string;
  totalConsumption: number;
  population: number;
  perCapita: number;
}

interface StateConsumptionRankingProps {
  consumptionByState: Record<string, number>;
}

export const StateConsumptionRanking = ({ consumptionByState }: StateConsumptionRankingProps) => {
  const stateRankings = useMemo(() => {
    const rankings: StateConsumption[] = [];

    Object.entries(consumptionByState).forEach(([tableName, consumption]) => {
      const stateCode = Object.keys(STATES).find(
        key => STATES[key as StateCode].table === tableName
      ) as StateCode | undefined;

      if (stateCode) {
        const state = STATES[stateCode];
        rankings.push({
          stateCode,
          stateName: state.name,
          totalConsumption: consumption,
          population: state.population,
          perCapita: (consumption / state.population) * 100000, // Por 100 mil habitantes
        });
      }
    });

    return rankings;
  }, [consumptionByState]);

  const topByTotal = useMemo(() => {
    return [...stateRankings]
      .sort((a, b) => b.totalConsumption - a.totalConsumption)
      .slice(0, 10);
  }, [stateRankings]);

  const topByPerCapita = useMemo(() => {
    return [...stateRankings]
      .sort((a, b) => b.perCapita - a.perCapita)
      .slice(0, 10);
  }, [stateRankings]);

  const getColorByRank = (index: number) => {
    if (index === 0) return 'hsl(var(--chart-1))';
    if (index === 1) return 'hsl(var(--chart-2))';
    if (index === 2) return 'hsl(var(--chart-3))';
    return 'hsl(var(--chart-4))';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.round(num));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Ranking por Consumo Total */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>Top 10 Estados - Consumo Total</CardTitle>
          </div>
          <CardDescription>
            Estados com maior consumo absoluto de medicamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topByTotal} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" tickFormatter={formatNumber} />
              <YAxis 
                type="category" 
                dataKey="stateName" 
                width={100}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Total']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="totalConsumption" radius={[0, 8, 8, 0]}>
                {topByTotal.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={getColorByRank(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-2">
            {topByTotal.slice(0, 3).map((state, index) => (
              <div key={state.stateCode} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-600" />}
                  {index === 1 && <Trophy className="h-4 w-4 text-gray-400" />}
                  {index === 2 && <Trophy className="h-4 w-4 text-amber-700" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{state.stateName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(state.totalConsumption)} unidades
                  </p>
                </div>
                <Badge variant="secondary">#{index + 1}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking por Consumo Per Capita */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Top 10 Estados - Consumo Per Capita</CardTitle>
          </div>
          <CardDescription>
            Consumo por 100 mil habitantes (ajustado pela população)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topByPerCapita} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" tickFormatter={formatNumber} />
              <YAxis 
                type="category" 
                dataKey="stateName" 
                width={100}
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                formatter={(value: number) => [formatNumber(value), 'Por 100mil hab']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="perCapita" radius={[0, 8, 8, 0]}>
                {topByPerCapita.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={getColorByRank(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 space-y-2">
            {topByPerCapita.slice(0, 3).map((state, index) => (
              <div key={state.stateCode} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                  {index === 0 && <Trophy className="h-4 w-4 text-yellow-600" />}
                  {index === 1 && <Trophy className="h-4 w-4 text-gray-400" />}
                  {index === 2 && <Trophy className="h-4 w-4 text-amber-700" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{state.stateName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(state.perCapita)} por 100mil hab
                  </p>
                </div>
                <Badge variant="secondary">#{index + 1}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};