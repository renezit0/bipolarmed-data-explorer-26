import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, AlertTriangle, Calendar, FileText, ExternalLink } from 'lucide-react';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface TrendAnalysisProps {
  data: ProcessedMedicData[];
}

export const TrendAnalysis = ({ data }: TrendAnalysisProps) => {
  const trendAnalysisData = [
    {
      medication: "Quetiapina 25 MG e 100 MG",
      period: "Junho/Julho 2020",
      dropPercentage: "Severa (47.6% e 39.5% para 25 MG; 65.4% para 100 MG)",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Desabastecimento generalizado confirmado por reportagens do G1. A Confederação Nacional dos Municípios reportou que 89,3% das prefeituras estavam sem remédios básicos. A Secretaria de Saúde do RJ informou atraso na entrega desde março de 2020. Crise nacional de abastecimento que impactou diretamente o tratamento de transtornos bipolares.",
      sources: [
        {
          title: "Prefeituras alertam para a falta de medicamentos básicos nas farmácias populares",
          url: "https://g1.globo.com/jornal-nacional/noticia/2022/07/14/prefeituras-alertam-para-a-falta-de-medicamentos-basicos-nas-farmacias-populares.ghtml"
        },
        {
          title: "Falta de medicamentos na rede pública afeta pacientes psiquiátricos no RN",
          url: "https://g1.globo.com/rn/rio-grande-do-norte/noticia/2022/06/27/falta-de-medicamentos-na-rede-publica-afeta-pacientes-psiquiatricos-no-rn.ghtml"
        }
      ]
    },
    {
      medication: "Risperidona 1 MG e Quetiapina 25 MG",
      period: "Janeiro 2023",
      dropPercentage: "Crítica (91.3% e 47.2%)",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Cenário de desabastecimento crítico confirmado por relatório da BioRed Brasil sobre falta de medicamentos em farmácias de alto custo. A queda de mais de 90% na Risperidona indica interrupção quase total do fornecimento. A descontinuação do RISPERDAL® Consta amplificou a pressão sobre outras formulações de risperidona.",
      sources: [
        {
          title: "Relatório da falta de medicamentos nas farmácias de alto custo durante o mês de Janeiro de 2025",
          url: "https://www.bioredbrasil.com.br/relatorio-da-falta-de-medicamentos-nas-farmacias-de-alto-custo-durante-o-mes-de-janeiro-de-2025/"
        },
        {
          title: "RISPERDAL® CONSTA - Comunicado de Descontinuação",
          url: "https://innovativemedicine.jnj.com/brasil/produtos/medicamentos-descontinuados/comunicado-risperdal-consta"
        }
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingDown className="h-5 w-5" />
          Análise das Principais Quedas nas Tendências
        </CardTitle>
        <CardDescription>
          Investigação detalhada das quedas mais significativas observadas nas séries temporais
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {trendAnalysisData.map((item, index) => (
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
                  <strong>Queda:</strong> {item.dropPercentage}
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
      </CardContent>
    </Card>
  );
};