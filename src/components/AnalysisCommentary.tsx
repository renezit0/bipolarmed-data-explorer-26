import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingDown, AlertTriangle, Calendar, FileText } from 'lucide-react';
import { ProcessedMedicData } from '@/hooks/useMedicData';

interface AnalysisCommentaryProps {
  data: ProcessedMedicData[];
}

export const AnalysisCommentary = ({ data }: AnalysisCommentaryProps) => {
  const analysisData = [
    {
      medication: "Clozapina 100 MG",
      period: "Novembro 2019",
      dropPercentage: "Moderada",
      icon: <Calendar className="h-4 w-4" />,
      color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
      analysis: "A queda na dispensação pode estar relacionada à implementação da Portaria nº 2.979, de 12 de novembro de 2019, que instituiu o Programa Previne Brasil. Esta portaria alterou o modelo de financiamento da Atenção Primária à Saúde, podendo ter gerado incerteza e reajustes nos processos de compra e distribuição de medicamentos."
    },
    {
      medication: "Quetiapina 25 MG e 100 MG",
      period: "Junho/Julho 2020",
      dropPercentage: "Severa (47.6% e 39.5% para 25 MG; 65.4% para 100 MG)",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Desabastecimento generalizado confirmado por reportagens do G1. A Confederação Nacional dos Municípios reportou que 89,3% das prefeituras estavam sem remédios básicos. A Secretaria de Saúde do RJ informou atraso na entrega desde março de 2020. Crise nacional de abastecimento que impactou diretamente o tratamento de transtornos bipolares."
    },
    {
      medication: "Clozapina 25 MG",
      period: "Janeiro 2021",
      dropPercentage: "Significativa (44.8%)",
      icon: <TrendingDown className="h-4 w-4" />,
      color: "bg-orange-500/10 text-orange-700 border-orange-200",
      analysis: "Combinação de fatores sazonais (janeiro é mês de férias e feriados) com problemas continuados na cadeia de suprimentos. A Nota Técnica SESA/GEAF nº 01/2021 já alertava sobre desabastecimento temporário de medicamentos psiquiátricos, incluindo Clozapina."
    },
    {
      medication: "Olanzapina 10 MG",
      period: "Novembro 2021",
      dropPercentage: "Significativa (58.8%)",
      icon: <FileText className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Diretamente relacionada ao desabastecimento temporário mencionado na Nota Técnica SESA/GEAF Nº 01/2021. A dependência da aquisição centralizada pelo Ministério da Saúde tornou os estados vulneráveis a falhas na cadeia de suprimentos, resultando em flutuações significativas na oferta local."
    },
    {
      medication: "Clozapina 100 MG e Risperidona 2 MG",
      period: "Novembro 2022",
      dropPercentage: "Severa (73.2% e 84.6%)",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Para Risperidona: A Johnson & Johnson informou a descontinuação do RISPERDAL® Consta em dezembro de 2022, gerando instabilidade no mercado. Para Clozapina: Possível desequilíbrio na produção devido ao retorno da apresentação de 200mg, causando reajustes de estoque. Quedas simultâneas indicam vulnerabilidade sistêmica."
    },
    {
      medication: "Risperidona 1 MG e Quetiapina 25 MG",
      period: "Janeiro 2023",
      dropPercentage: "Crítica (91.3% e 47.2%)",
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-red-500/10 text-red-700 border-red-200",
      analysis: "Cenário de desabastecimento crítico confirmado por relatório da BioRed Brasil sobre falta de medicamentos em farmácias de alto custo. A queda de mais de 90% na Risperidona indica interrupção quase total do fornecimento. A descontinuação do RISPERDAL® Consta amplificou a pressão sobre outras formulações de risperidona."
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="academic-title flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Análise Detalhada das Quedas por Medicamento
        </CardTitle>
        <CardDescription>
          Investigação das principais quedas na dispensação com base em evidências documentadas e fatores contextuais
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {analysisData.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-shrink-0">
                <Badge variant="outline" className={`${item.color} flex items-center gap-1 text-xs font-medium`}>
                  {item.icon}
                  {item.period}
                </Badge>
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-primary text-sm md:text-base">
                  {item.medication}
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Queda:</strong> {item.dropPercentage}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {item.analysis}
                </p>
              </div>
            </div>
            {index < analysisData.length - 1 && <Separator className="my-4" />}
          </div>
        ))}

        <Separator className="my-6" />

        <div className="bg-muted/30 rounded-lg p-4 md:p-6">
          <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Fatores Comuns e Interconexões
          </h3>
          <div className="space-y-3 text-sm text-foreground">
            <p>
              <strong>Vulnerabilidade da Cadeia de Suprimentos:</strong> Dependência de poucos fornecedores, problemas na importação de insumos, falhas em processos de licitação e distribuição centralizada pelo Ministério da Saúde.
            </p>
            <p>
              <strong>Impacto de Políticas Públicas:</strong> Mudanças em políticas de financiamento (Previne Brasil) e descontinuação de registros de medicamentos (RISPERDAL® Consta) com efeitos cascata.
            </p>
            <p>
              <strong>Sazonalidade:</strong> Períodos de férias e feriados (janeiro, julho, novembro/dezembro) frequentemente coincidem com quedas, sugerindo comprometimento da capacidade operacional e logística.
            </p>
            <p>
              <strong>COVID-19 e Pós-Pandemia:</strong> A pandemia expôs e exacerbou fragilidades da cadeia de suprimentos global, com efeitos prolongados nos anos seguintes.
            </p>
          </div>
        </div>

        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 md:p-6">
          <h3 className="font-semibold text-primary mb-3">
            Implicações para a Saúde Pública
          </h3>
          <p className="text-sm text-foreground leading-relaxed">
            As análises reforçam a necessidade de uma abordagem integrada e proativa para a gestão da assistência farmacêutica, 
            com foco na resiliência da cadeia de suprimentos, monitoramento contínuo e adaptação às dinâmicas do mercado e das 
            políticas de saúde. A falta desses medicamentos é crítica para pacientes com transtorno bipolar e esquizofrenia, 
            podendo levar à interrupção do tratamento e agravamento dos quadros clínicos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};