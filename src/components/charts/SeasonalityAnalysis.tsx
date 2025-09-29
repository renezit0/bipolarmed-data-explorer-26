import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingDown, ExternalLink } from 'lucide-react';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface SeasonalityAnalysisProps {
  data: ProcessedMedicData[];
}

export const SeasonalityAnalysis = ({ data }: SeasonalityAnalysisProps) => {
  const seasonalAnalysisData = [
    {
      medication: "Clozapina 25 MG",
      period: "Janeiro 2021",
      dropPercentage: "Significativa (44.8%)",
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-orange-500/10 text-orange-700 border-orange-200",
      analysis: "Combinação de fatores sazonais (janeiro é mês de férias e feriados) com problemas continuados na cadeia de suprimentos. A Nota Técnica SESA/GEAF nº 01/2021 já alertava sobre desabastecimento temporário de medicamentos psiquiátricos, incluindo Clozapina.",
      sources: [
        {
          title: "NOTA TÉCNICA SESA/GEAF Nº 01/2021 - Orientação quanto ao desabastecimento temporário",
          url: "https://pmbg.es.gov.br/wp-content/uploads/2023/07/NOTA-TECNICA-ORIENTACAO-desabastecimento-CLOZAPINA_-_OLANZAPINA_E_QUETIAPINA-otimizado_1.pdf"
        }
      ]
    },
    {
      medication: "Clozapina 100 MG",
      period: "Novembro 2019",
      dropPercentage: "Moderada",
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
      analysis: "A queda na dispensação pode estar relacionada à implementação da Portaria nº 2.979, de 12 de novembro de 2019, que instituiu o Programa Previne Brasil. Esta portaria alterou o modelo de financiamento da Atenção Primária à Saúde, podendo ter gerado incerteza e reajustes nos processos de compra e distribuição de medicamentos.",
      sources: [
        {
          title: "Portaria nº 2.979, de 12 de novembro de 2019: Institui o Programa Previne Brasil",
          url: "https://bvsms.saude.gov.br/bvs/saudelegis/gm/2019/prt2979_13_11_2019.html"
        },
        {
          title: "Parecer Técnico sobre a Portaria nº 2.979/2019",
          url: "https://static.trf2.jus.br/nas-internet/documento/comite-estadual-saude/pareceres/2022/parecer-0318-2022.pdf"
        }
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5" />
          Análise de Sazonalidade
        </CardTitle>
        <CardDescription>
          Padrões sazonais identificados e suas possíveis causas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {seasonalAnalysisData.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-shrink-0">
                <Badge variant="outline" className={`${item.color} flex items-center gap-1 text-xs font-medium`}>
                  {item.icon}
                  {item.period}
                </Badge>
              </div>
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold text-primary text-sm md:text-base">
                  {item.medication}
                </h4>
                <p className="text-sm text-muted-foreground">
                  <strong>Padrão:</strong> {item.dropPercentage}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {item.analysis}
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Fontes:</p>
                  <div className="space-y-1">
                    {item.sources.map((source, sourceIndex) => (
                      <a
                        key={sourceIndex}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{source.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-muted/30 rounded-lg p-4 md:p-6">
          <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <TrendingDown className="h-4 w-4" />
            Padrões Sazonais Identificados
          </h4>
          <div className="space-y-3 text-sm text-foreground">
            <p>
              <strong>Períodos Críticos:</strong> Janeiro (férias e feriados), novembro/dezembro (final do ano fiscal), julho (férias escolares) mostram quedas recorrentes na dispensação.
            </p>
            <p>
              <strong>Fatores Operacionais:</strong> Redução de equipes, ajustes de estoque para fechamento fiscal, menor procura por serviços de saúde em períodos de férias.
            </p>
            <p>
              <strong>Impacto de Políticas:</strong> Mudanças em políticas de financiamento frequentemente coincidem com períodos de transição (final/início de ano).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};