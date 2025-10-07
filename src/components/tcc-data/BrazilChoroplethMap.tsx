import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { STATES, StateCode } from '@/constants/states';
import { useMemo } from 'react';

interface BrazilChoroplethMapProps {
  consumptionByState: Record<string, number>;
}

// Simplified Brazil GeoJSON topology
const BRAZIL_TOPOLOGY = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";

export const BrazilChoroplethMap = ({ consumptionByState }: BrazilChoroplethMapProps) => {
  const stateData = useMemo(() => {
    const data: Record<string, { perCapita: number; name: string }> = {};
    
    Object.entries(STATES).forEach(([code, info]) => {
      const consumption = consumptionByState[info.table] || 0;
      const perCapita = (consumption / info.population) * 100000;
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
    
    // Color scale from light to dark blue
    const r = Math.round(59 + (147 - 59) * (1 - normalized));
    const g = Math.round(130 + (197 - 130) * (1 - normalized));
    const b = Math.round(246 + (255 - 246) * (1 - normalized));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getStateCodeFromName = (geoName: string): string | null => {
    const nameMap: Record<string, string> = {
      'Acre': 'AC', 'Alagoas': 'AL', 'Amapá': 'AP', 'Amazonas': 'AM',
      'Bahia': 'BA', 'Ceará': 'CE', 'Distrito Federal': 'DF', 'Espírito Santo': 'ES',
      'Goiás': 'GO', 'Maranhão': 'MA', 'Mato Grosso': 'MT', 'Mato Grosso do Sul': 'MS',
      'Minas Gerais': 'MG', 'Pará': 'PA', 'Paraíba': 'PB', 'Paraná': 'PR',
      'Pernambuco': 'PE', 'Piauí': 'PI', 'Rio de Janeiro': 'RJ', 'Rio Grande do Norte': 'RN',
      'Rio Grande do Sul': 'RS', 'Rondônia': 'RO', 'Roraima': 'RR', 'Santa Catarina': 'SC',
      'São Paulo': 'SP', 'Sergipe': 'SE', 'Tocantins': 'TO'
    };
    return nameMap[geoName] || null;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <CardDescription className="mb-4">
          Fonte: SIA/SUS (BRASIL, 2025), processado em tcc.seellbr.com.
        </CardDescription>
        
        <div className="w-full flex flex-col items-center">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 700,
              center: [-52, -15]
            }}
            className="w-full max-w-2xl"
          >
            <Geographies geography={BRAZIL_TOPOLOGY}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  const stateCode = getStateCodeFromName(stateName);
                  const data = stateCode ? stateData[stateCode] : null;
                  const perCapita = data?.perCapita || 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getColor(perCapita)}
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: 'none' },
                        hover: { 
                          fill: '#3b82f6',
                          outline: 'none',
                          cursor: 'pointer'
                        },
                        pressed: { outline: 'none' }
                      }}
                    >
                      <title>
                        {data?.name || stateName}: {perCapita.toFixed(2)} por 100 mil hab.
                      </title>
                    </Geography>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
          
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm text-muted-foreground">Menor consumo</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-4 rounded"
                  style={{
                    backgroundColor: getColor(minPerCapita + (maxPerCapita - minPerCapita) * (i / 5))
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">Maior consumo</span>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Valores em unidades por 100.000 habitantes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
