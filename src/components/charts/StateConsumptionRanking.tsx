import { useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { STATES, StateCode } from '@/constants/states';
import { Trophy, Users, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expandedTotal, setExpandedTotal] = useState(false);
  const [expandedPerCapita, setExpandedPerCapita] = useState(false);

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
    const sorted = [...stateRankings].sort((a, b) => b.totalConsumption - a.totalConsumption);
    return expandedTotal ? sorted : sorted.slice(0, 10);
  }, [stateRankings, expandedTotal]);

  const topByPerCapita = useMemo(() => {
    const sorted = [...stateRankings].sort((a, b) => b.perCapita - a.perCapita);
    return expandedPerCapita ? sorted : sorted.slice(0, 10);
  }, [stateRankings, expandedPerCapita]);

  const getColorByRank = (index: number) => {
    if (index === 0) return 'hsl(var(--chart-1))';
    if (index === 1) return 'hsl(var(--chart-2))';
    if (index === 2) return 'hsl(var(--chart-3))';
    return 'hsl(var(--chart-4))';
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.round(num));
  };

  const CustomTooltip = ({ active, payload, type }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{data.stateName}</p>
          <div className="space-y-1 text-xs">
            <p className="flex items-center gap-2">
              <Users className="h-3 w-3" />
              <span className="text-muted-foreground">População:</span>
              <span className="font-medium">{formatNumber(data.population)}</span>
            </p>
            {type === 'total' && (
              <p className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                <span className="text-muted-foreground">Total:</span>
                <span className="font-medium">{formatNumber(data.totalConsumption)}</span>
              </p>
            )}
            {type === 'perCapita' && (
              <p className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                <span className="text-muted-foreground">Por 100mil hab:</span>
                <span className="font-medium">{formatNumber(data.perCapita)}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Ranking por Consumo Total */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{expandedTotal ? 'Todos os Estados' : 'Top 10 Estados'} - Consumo Total</CardTitle>
                <CardDescription>
                  Estados com maior consumo absoluto de medicamentos. Fonte: IBGE - Instituto Brasileiro de Geografia e Estatística (estimativa populacional 2024).
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedTotal(!expandedTotal)}
              className="flex items-center gap-2"
            >
              {expandedTotal ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ver Top 10
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Ver Todos
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={expandedTotal ? topByTotal.length * 35 + 50 : 400}>
            <BarChart data={topByTotal} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" tickFormatter={formatNumber} />
              <YAxis 
                type="category" 
                dataKey="stateName" 
                width={100}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip type="total" />} />
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>{expandedPerCapita ? 'Todos os Estados' : 'Top 10 Estados'} - Consumo Per Capita</CardTitle>
                <CardDescription>
                  Consumo por 100 mil habitantes (ajustado pela população). Fonte: IBGE - Instituto Brasileiro de Geografia e Estatística (estimativa populacional 2024).
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setExpandedPerCapita(!expandedPerCapita)}
              className="flex items-center gap-2"
            >
              {expandedPerCapita ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ver Top 10
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Ver Todos
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={expandedPerCapita ? topByPerCapita.length * 35 + 50 : 400}>
            <BarChart data={topByPerCapita} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis type="number" tickFormatter={formatNumber} />
              <YAxis 
                type="category" 
                dataKey="stateName" 
                width={100}
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip type="perCapita" />} />
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