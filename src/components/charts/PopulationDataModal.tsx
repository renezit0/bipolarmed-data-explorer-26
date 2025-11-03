import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { STATES } from '@/constants/states';
import { HISTORICAL_POPULATION_BY_STATE } from '@/constants/historicalPopulation';

interface PopulationDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PopulationDataModal = ({ open, onOpenChange }: PopulationDataModalProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  // Organizar estados por região
  const statesByRegion = Object.entries(STATES).reduce((acc, [code, info]) => {
    if (!acc[info.region]) {
      acc[info.region] = [];
    }
    acc[info.region].push({ code, name: info.name });
    return acc;
  }, {} as Record<string, Array<{ code: string; name: string }>>);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 border shadow-lg z-50">
        <DialogHeader>
          <DialogTitle>Dados Populacionais Históricos (2015-2024)</DialogTitle>
          <DialogDescription>
            População estimada por estado - Fonte: IBGE (Instituto Brasileiro de Geografia e Estatística)
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-8">
            {Object.entries(statesByRegion)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([region, states]) => (
                <div key={region}>
                  <h3 className="font-semibold text-lg mb-3 sticky top-0 bg-background py-2 border-b">
                    Região {region}
                  </h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold sticky left-0 bg-background">Estado</TableHead>
                          {years.map(year => (
                            <TableHead key={year} className="text-right font-bold">
                              {year}
                            </TableHead>
                          ))}
                          <TableHead className="text-right font-bold">Média</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {states
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map(({ code, name }) => {
                            const statePop = HISTORICAL_POPULATION_BY_STATE[code.toLowerCase()];
                            if (!statePop) return null;

                            const average = Math.round(
                              Object.values(statePop).reduce((sum, pop) => sum + pop, 0) / 
                              Object.values(statePop).length
                            );

                            return (
                              <TableRow key={code}>
                                <TableCell className="font-medium sticky left-0 bg-background">
                                  {name}
                                </TableCell>
                                {years.map(year => (
                                  <TableCell key={year} className="text-right text-xs">
                                    {formatNumber(statePop[year] || 0)}
                                  </TableCell>
                                ))}
                                <TableCell className="text-right font-semibold text-xs">
                                  {formatNumber(average)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6 p-4 bg-accent/30 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Nota:</strong> Os dados populacionais são estimativas oficiais do IBGE. 
              A coluna "Média" representa a população média do período 2015-2024, utilizada nos cálculos per capita.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
