import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface MedicationDetailsProps {
  data: ProcessedMedicData[];
}

export const MedicationDetails = ({ data }: MedicationDetailsProps) => {
  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="academic-title">Detalhes dos Medicamentos</CardTitle>
        <CardDescription>
          Informações completas sobre os medicamentos analisados no estudo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {data.map((medic) => (
            <div 
              key={medic.procedimento} 
              className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-primary mb-2">
                    {medic.simplifiedName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium">Nome Completo:</span> {medic.fullName}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    <span className="font-medium">Código do Procedimento:</span> {medic.procedimento}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Consumo Total: {medic.totalConsumption.toLocaleString('pt-BR')}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Registros: {medic.timeSeriesData.length} meses
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Média Mensal: {Math.round(medic.totalConsumption / medic.timeSeriesData.length).toLocaleString('pt-BR')}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {((medic.totalConsumption / data.reduce((sum, d) => sum + d.totalConsumption, 0)) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">do total</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};