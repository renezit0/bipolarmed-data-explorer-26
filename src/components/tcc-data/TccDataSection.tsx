import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProcessedMedicData } from '@/hooks/useMedicData';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';
import { PandemicImpactChart } from './PandemicImpactChart';
import { RegionalPerCapitaTable } from './RegionalPerCapitaTable';
import { SeasonalityChart } from '@/components/charts/SeasonalityChart';
import { MedicationDistributionTable } from './MedicationDistributionTable';
import { BrazilChoroplethMap } from './BrazilChoroplethMap';
import { FileText } from 'lucide-react';

interface TccDataSectionProps {
  data: ProcessedMedicData[];
  consumptionByState: Record<string, number>;
}

export const TccDataSection = ({ data, consumptionByState }: TccDataSectionProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">Dados do TCC Escrito</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta seção apresenta os gráficos e tabelas utilizados no Trabalho de Conclusão de Curso, 
            gerados a partir da análise dos dados do Sistema de Informações Ambulatoriais do SUS (SIA/SUS).
          </p>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Figura 1 – Evolução do Consumo Total de Medicamentos para TAB no Brasil (2018-2025)
          </h3>
          <TimeSeriesChart data={data} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Figura 2 – Impacto da Pandemia no Consumo de Medicamentos para TAB
          </h3>
          <PandemicImpactChart data={data} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Figura 3 – Distribuição Geográfica do Consumo Per Capita por Estado
          </h3>
          <BrazilChoroplethMap consumptionByState={consumptionByState} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Tabela 1 – Consumo Per Capita de Medicamentos para TAB por Região (2024)
          </h3>
          <RegionalPerCapitaTable consumptionByState={consumptionByState} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Figura 4 – Padrão de Sazonalidade Mensal do Consumo
          </h3>
          <SeasonalityChart data={data} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">
            Tabela 2 – Distribuição do Consumo por Medicamento
          </h3>
          <MedicationDistributionTable data={data} />
        </div>
      </div>
    </div>
  );
};
