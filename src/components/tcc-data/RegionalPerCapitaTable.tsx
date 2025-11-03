import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { HISTORICAL_POPULATION_BY_REGION } from '@/constants/historicalPopulation';

interface RegionalPerCapitaTableProps {
  consumptionByState: Record<string, number>;
}

// População média ponderada pelo período 2015-2024
const calculateAverageRegionalPopulation = (regionName: string): number => {
  const populations = HISTORICAL_POPULATION_BY_REGION[regionName];
  if (!populations) return 0;
  
  const years = Object.keys(populations).map(Number);
  const sum = years.reduce((acc, year) => acc + populations[year], 0);
  return Math.round(sum / years.length);
};

const REGIONAL_POPULATIONS: Record<string, number> = {
  'Norte': calculateAverageRegionalPopulation('Norte'),
  'Nordeste': calculateAverageRegionalPopulation('Nordeste'),
  'Centro-Oeste': calculateAverageRegionalPopulation('Centro-Oeste'),
  'Sudeste': calculateAverageRegionalPopulation('Sudeste'),
  'Sul': calculateAverageRegionalPopulation('Sul'),
};

// Mapeamento de tabelas para regiões
const TABLE_TO_REGION: Record<string, string> = {
  'medicbipopr': 'Sul',
  'medicbipors': 'Sul',
  'medicbiposc': 'Sul',
  'medicbiposp': 'Sudeste',
  'medicbiporj': 'Sudeste',
  'medicbipomg': 'Sudeste',
  'medicbipoes': 'Sudeste',
  'medicbipodf': 'Centro-Oeste',
  'medicbipogo': 'Centro-Oeste',
  'medicbipomt': 'Centro-Oeste',
  'medicbipoms': 'Centro-Oeste',
  'medicbipoac': 'Norte',
  'medicbipoam': 'Norte',
  'medicbipoamz': 'Norte',
  'medicbipopa': 'Norte',
  'medicbiporo': 'Norte',
  'medicbiporr': 'Norte',
  'medicbipoto': 'Norte',
  'medicbipoal': 'Nordeste',
  'medicbipoba': 'Nordeste',
  'medicbipoce': 'Nordeste',
  'medicbipoma': 'Nordeste',
  'medicbipopb': 'Nordeste',
  'medicbipope': 'Nordeste',
  'medicbipopi': 'Nordeste',
  'medicbiporn': 'Nordeste',
  'medicbipose': 'Nordeste'
};
export const RegionalPerCapitaTable = ({
  consumptionByState
}: RegionalPerCapitaTableProps) => {
  const regionalData = useMemo(() => {
    if (!consumptionByState || Object.keys(consumptionByState).length === 0) return null;
    const regionTotals: Record<string, number> = {
      'Sul': 0,
      'Sudeste': 0,
      'Centro-Oeste': 0,
      'Norte': 0,
      'Nordeste': 0
    };

    // Somar consumo por região
    Object.entries(consumptionByState).forEach(([tableName, consumption]) => {
      const region = TABLE_TO_REGION[tableName];
      if (region) {
        regionTotals[region] += consumption;
      }
    });

    // Calcular per capita (por 100 mil habitantes)
    const data = Object.entries(REGIONAL_POPULATIONS).map(([region, population]) => ({
      region,
      population,
      total: regionTotals[region],
      perCapita: regionTotals[region] / population * 100000
    }));

    // Ordenar por per capita decrescente
    return data.sort((a, b) => b.perCapita - a.perCapita);
  }, [consumptionByState]);
  if (!consumptionByState || Object.keys(consumptionByState).length === 0) {
    return <Card>
        <CardHeader>
          <CardTitle>Tabela 1 – Consumo per capita de medicamentos para TAB por região (2024)</CardTitle>
          <CardDescription>Consumo ajustado pela população regional</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Aguardando dados de consumo por estado</AlertDescription>
          </Alert>
        </CardContent>
      </Card>;
  }
  if (!regionalData) {
    return <Card>
        <CardHeader>
          <CardTitle>Tabela 1 – Consumo per capita de medicamentos para TAB por região (2024)</CardTitle>
          <CardDescription>Consumo ajustado pela população regional</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Dados insuficientes para análise</AlertDescription>
          </Alert>
        </CardContent>
      </Card>;
  }
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(Math.round(num));
  };
  return <Card>
      <CardHeader>
        <CardTitle>Consumo per capita de medicamentos para TAB por região</CardTitle>
        <CardDescription>Análise do consumo ajustado pela população média do período 2015-2024 (IBGE)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Região</TableHead>
                <TableHead className="text-right font-bold">População</TableHead>
                <TableHead className="text-right font-bold">Consumo Total</TableHead>
                <TableHead className="text-right font-bold">Per Capita (por 100mil hab)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regionalData.map(row => <TableRow key={row.region}>
                  <TableCell className="font-medium">{row.region}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.population)}</TableCell>
                  <TableCell className="text-right">{formatNumber(row.total)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatNumber(row.perCapita)}
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-accent/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> O consumo per capita é calculado como (Consumo Total ÷ População) × 100.000, 
            representando o número de unidades consumidas por 100 mil habitantes em cada região.
          </p>
        </div>
      </CardContent>
    </Card>;
};