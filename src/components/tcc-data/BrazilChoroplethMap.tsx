import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { STATES, StateCode } from '@/constants/states';
import { HISTORICAL_POPULATION_BY_STATE } from '@/constants/historicalPopulation';
import { useMemo } from 'react';
interface BrazilChoroplethMapProps {
  consumptionByState: Record<string, number>;
}

// Simplified Brazil GeoJSON topology
const BRAZIL_TOPOLOGY = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";
export const BrazilChoroplethMap = ({
  consumptionByState
}: BrazilChoroplethMapProps) => {
  const stateData = useMemo(() => {
    const data: Record<string, {
      perCapita: number;
      name: string;
    }> = {};
    Object.entries(STATES).forEach(([code, info]) => {
      const consumption = consumptionByState[info.table] || 0;
      
      // Usa população média do período 2015-2024
      const statePop = HISTORICAL_POPULATION_BY_STATE[code.toLowerCase()];
      const avgPopulation = statePop 
        ? Math.round(Object.values(statePop).reduce((sum, pop) => sum + pop, 0) / Object.values(statePop).length)
        : info.population;
      
      const perCapita = consumption / avgPopulation * 100000;
      data[code.toUpperCase()] = {
        perCapita,
        name: info.name
      };
    });
    return data;
  }, [consumptionByState]);
  const maxPerCapita = Math.max(...Object.values(stateData).map(d => d.perCapita));
  const minPerCapita = Math.min(...Object.values(stateData).map(d => d.perCapita));
  const getColor = (perCapita: number) => {
    if (perCapita === 0) return '#e5e7eb';
    const normalized = (perCapita - minPerCapita) / (maxPerCapita - minPerCapita);

    // Color scale from yellow-green to orange to red (heat map style)
    if (normalized < 0.33) {
      // Yellow to light orange
      const t = normalized / 0.33;
      const r = Math.round(254 + (251 - 254) * t);
      const g = Math.round(240 - (191 - 140) * t);
      const b = Math.round(138 - (111 - 64) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (normalized < 0.66) {
      // Light orange to orange
      const t = (normalized - 0.33) / 0.33;
      const r = Math.round(251 - (251 - 241) * t);
      const g = Math.round(140 - (140 - 90) * t);
      const b = Math.round(64 - (64 - 41) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Orange to dark red
      const t = (normalized - 0.66) / 0.34;
      const r = Math.round(241 - (241 - 220) * t);
      const g = Math.round(90 - (90 - 38) * t);
      const b = Math.round(41 - (41 - 38) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };
  const getStateCodeFromName = (geoName: string): string | null => {
    const nameMap: Record<string, string> = {
      'Acre': 'AC',
      'Alagoas': 'AL',
      'Amapá': 'AP',
      'Amazonas': 'AM',
      'Bahia': 'BA',
      'Ceará': 'CE',
      'Distrito Federal': 'DF',
      'Espírito Santo': 'ES',
      'Goiás': 'GO',
      'Maranhão': 'MA',
      'Mato Grosso': 'MT',
      'Mato Grosso do Sul': 'MS',
      'Minas Gerais': 'MG',
      'Pará': 'PA',
      'Paraíba': 'PB',
      'Paraná': 'PR',
      'Pernambuco': 'PE',
      'Piauí': 'PI',
      'Rio de Janeiro': 'RJ',
      'Rio Grande do Norte': 'RN',
      'Rio Grande do Sul': 'RS',
      'Rondônia': 'RO',
      'Roraima': 'RR',
      'Santa Catarina': 'SC',
      'São Paulo': 'SP',
      'Sergipe': 'SE',
      'Tocantins': 'TO'
    };
    return nameMap[geoName] || null;
  };
  return <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Distribuição geográfica do consumo per capita por estado</CardTitle>
      </CardHeader>
      <CardContent>
        
        
        <div className="w-full flex flex-col items-center">
          <ComposableMap projection="geoMercator" projectionConfig={{
          scale: 700,
          center: [-52, -15]
        }} className="w-full max-w-2xl">
            <Geographies geography={BRAZIL_TOPOLOGY}>
              {({
              geographies
            }) => geographies.map(geo => {
              const stateName = geo.properties.name;
              const stateCode = getStateCodeFromName(stateName);
              const data = stateCode ? stateData[stateCode] : null;
              const perCapita = data?.perCapita || 0;
              return <Geography key={geo.rsmKey} geography={geo} fill={getColor(perCapita)} stroke="#fff" strokeWidth={0.5} style={{
                default: {
                  outline: 'none'
                },
                hover: {
                  fill: '#fb923c',
                  outline: 'none',
                  cursor: 'pointer'
                },
                pressed: {
                  outline: 'none'
                }
              }}>
                      <title>
                        {data?.name || stateName}: {perCapita.toFixed(2)} por 100 mil hab.
                      </title>
                    </Geography>;
            })}
            </Geographies>
          </ComposableMap>
          
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-muted-foreground">Menor consumo</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map(i => <div key={i} className="w-8 h-4 rounded" style={{
              backgroundColor: getColor(minPerCapita + (maxPerCapita - minPerCapita) * (i / 5))
            }} />)}
            </div>
            <span className="text-sm text-muted-foreground">Maior consumo</span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Valores em unidades por 100.000 habitantes
          </p>
        </div>
      </CardContent>
    </Card>;
};