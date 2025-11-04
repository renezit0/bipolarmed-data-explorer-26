import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getRegionPopulation } from '@/constants/historicalPopulation';
import { StateConsumptionByYear } from '@/hooks/useStateConsumptionByYear';

interface RegionalPerCapitaTableProps {
  consumptionByStateYear: StateConsumptionByYear;
}

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
  consumptionByStateYear
}: RegionalPerCapitaTableProps) => {
  const regionalData = useMemo(() => {
    if (!consumptionByStateYear || Object.keys(consumptionByStateYear).length === 0) return null;
    
    // Agregar por região e ano
    const regionDataByYear: Record<string, Record<number, { consumption: number; population: number }>> = {
      'Sul': {},
      'Sudeste': {},
      'Centro-Oeste': {},
      'Norte': {},
      'Nordeste': {}
    };

    // Somar consumo por região e ano
    Object.entries(consumptionByStateYear).forEach(([tableName, consumptionByYear]) => {
      const region = TABLE_TO_REGION[tableName];
      if (!region) return;

      Object.entries(consumptionByYear).forEach(([yearStr, consumption]) => {
        const year = parseInt(yearStr);
        const population = getRegionPopulation(region, year);
        
        if (!regionDataByYear[region][year]) {
          regionDataByYear[region][year] = { consumption: 0, population };
        }
        
        regionDataByYear[region][year].consumption += consumption;
      });
    });

    // Calcular per capita agregado corretamente
    const data = Object.entries(regionDataByYear).map(([region, yearData]) => {
      let totalConsumption = 0;
      let weightedPerCapitaSum = 0;
      let totalPopulation = 0;
      
      Object.entries(yearData).forEach(([_, { consumption, population }]) => {
        if (population > 0) {
          totalConsumption += consumption;
          const yearlyPerCapita = (consumption / population) * 100000;
          weightedPerCapitaSum += yearlyPerCapita * population;
          totalPopulation += population;
        }
      });

      const avgPopulation = totalPopulation / Object.keys(yearData).length;
      const perCapita = totalPopulation > 0 ? weightedPerCapitaSum / totalPopulation : 0;

      return {
        region,
        population: Math.round(avgPopulation),
        total: totalConsumption,
        perCapita
      };
    });

    // Ordenar por per capita decrescente
    return data.sort((a, b) => b.perCapita - a.perCapita);
  }, [consumptionByStateYear]);
  if (!consumptionByStateYear || Object.keys(consumptionByStateYear).length === 0) {
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
        <CardDescription>Análise do consumo ajustado pela população de cada ano (2015-2024, IBGE)</CardDescription>
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
            <strong>Nota:</strong> O consumo per capita é calculado ano a ano usando a população específica de cada ano (2015-2024), 
            depois agregado como média ponderada. Isso garante que as mudanças populacionais sejam corretamente consideradas no cálculo.
          </p>
        </div>
      </CardContent>
    </Card>;
};