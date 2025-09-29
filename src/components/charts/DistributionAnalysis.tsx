import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, AlertTriangle, ExternalLink } from 'lucide-react';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface DistributionAnalysisProps {
  data: ProcessedMedicData[];
}

export const DistributionAnalysis = ({ data }: DistributionAnalysisProps) => {
  const distributionAnalysisData = [
    {
      medication: "Olanzapina 10 MG",
      period: "Novembro 2021",
      dropPercentage: "Significativa (58.8%)",
      icon: <FileText className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Diretamente relacionada ao desabastecimento temporário mencionado na Nota Técnica SESA/GEAF Nº 01/2021. A dependência da aquisição centralizada pelo Ministério da Saúde tornou os estados vulneráveis a falhas na cadeia de suprimentos, resultando em flutuações significativas na oferta local.",
      sources: [
        {
          title: "NOTA TÉCNICA SESA/GEAF Nº 01/2021 - Orientação quanto ao desabastecimento temporário",
          url: "https://pmbg.es.gov.br/wp-content/uploads/2023/07/NOTA-TECNICA-ORIENTACAO-desabastecimento-CLOZAPINA_-_OLANZAPINA_E_QUETIAPINA-otimizado_1.pdf"
        }
      ]
    },
    {
      medication: "Clozapina 100 MG e Risperidona 2 MG",
      period: "Novembro 2022",
      dropPercentage: "Severa (73.2% e 84.6%)",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Para Risperidona: A Johnson & Johnson informou a descontinuação do RISPERDAL® Consta em dezembro de 2022, gerando instabilidade no mercado. Para Clozapina: Possível desequilíbrio na produção devido ao retorno da apresentação de 200mg, causando reajustes de estoque. Quedas simultâneas indicam vulnerabilidade sistêmica.",
      sources: [
        {
          title: "RISPERDAL® CONSTA - Comunicado de Descontinuação",
          url: "https://innovativemedicine.jnj.com/brasil/produtos/medicamentos-descontinuados/comunicado-risperdal-consta"
        },
        {
          title: "COMUNICADO LEPONEX (CLOZAPINA) 200mg comprimido",
          url: "https://www.viatris.com.br/-/media/project/common/viatriscombr/pdf/product-commercial-information/leponex-comunicado-medicamento-descontinuado.pdf"
        },
        {
          title: "Falta RISPERIDONA para o tratamento das crianças autistas",
          url: "https://www.instagram.com/reel/C6tgR-7LMx8/"
        }
      ]
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          Análise da Distribuição Mensal
        </CardTitle>
        <CardDescription>
          Análise das variações na distribuição mensal e suas causas específicas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {distributionAnalysisData.map((item, index) => (
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
                  <strong>Impacto:</strong> {item.dropPercentage}
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

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 md:p-6">
          <h4 className="font-semibold text-primary mb-3">
            Impactos na Distribuição
          </h4>
          <p className="text-sm text-foreground leading-relaxed">
            As variações na distribuição mensal refletem principalmente problemas sistêmicos na cadeia de suprimentos, 
            incluindo descontinuação de produtos, reajustes de produção e falhas na coordenação entre fabricantes e 
            sistema público de saúde. A concentração de quedas em períodos específicos indica vulnerabilidade estrutural 
            que compromete a continuidade do tratamento.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};