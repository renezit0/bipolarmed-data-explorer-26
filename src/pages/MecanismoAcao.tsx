import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Pill, Brain, Activity, Zap, TrendingUp, AlertCircle, Dna, Users, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import unicesumarLogo from "@/assets/unicesumar-logo.png";

const MecanismoAcao = () => {
  const navigate = useNavigate();

  const medicamentos = [
    {
      id: "litio",
      nome: "Carbonato de Lítio",
      classe: "Estabilizador de Humor",
      icon: "Li⁺",
      color: "bg-blue-500",
      mecanismo: {
        principal:
          "Modula sistemas de neurotransmissores (dopamina, glutamato, GABA) e altera cascatas de sinalização intracelular, com resposta influenciada por fatores genéticos",
        detalhes: [
          "Inibe enzimas intracelulares (GSK-3, PKC, IPPase, IMPase) que são codificadas por genes com variantes associadas ao TAB",
          "Reduz hiperatividade dopaminérgica via modulação de receptores DRD2 e DRD3",
          "Promove neuroproteção no hipocampo, região afetada geneticamente no TAB",
          "Afeta o metabolismo de inositol e sinalização de fosfoinositídeos, vias alteradas em portadores de variantes em INPP1",
        ],
        genetica: {
          titulo: "Integração Genético-Farmacológica",
          aspectos: [
            {
              subtitulo: "Genes de Resposta Terapêutica",
              conteudo:
                "Variantes nos genes BDNF (Val66Met), GSK3B e INPP1 influenciam a resposta ao lítio. Pacientes com o alelo Met do BDNF podem ter melhor resposta neurotrófica.",
            },
            {
              subtitulo: "Alvos Genéticos do Mecanismo",
              conteudo:
                "O lítio atua em proteínas codificadas por genes-alvo do TAB: GSK3B (crucial na sinalização Wnt), CACNA1C (canais de cálcio) e ANK3 (função neuronal).",
            },
            {
              subtitulo: "Predição de Resposta",
              conteudo:
                "Polimorfismos em SLC6A4 (transportador de serotonina) e genes de vias de sinalização intracelular podem prever até 25-30% da variabilidade na resposta.",
            },
            {
              subtitulo: "Metabolismo e Excreção",
              conteudo:
                "Genes que codificam transportadores renais (SCL22A1) afetam a excreção do lítio, influenciando níveis séricos e risco de toxicidade.",
            },
          ],
        },
        aplicacao:
          "Primeira linha no tratamento de manutenção do TAB. A farmacogenética pode identificar respondedores ideais.",
        eficacia:
          "Reduz risco de suicídio em 50-60%. Variantes genéticas específicas aumentam a probabilidade de resposta favorável.",
      },
    },
    {
      id: "quetiapina",
      nome: "Quetiapina",
      classe: "Antipsicótico Atípico",
      icon: "5HT",
      color: "bg-pink-500",
      mecanismo: {
        principal:
          "Antagonista de receptores D2 e 5-HT2A com dissociação rápida, cuja eficácia varia segundo polimorfismos nos genes dos receptores-alvo",
        detalhes: [
          "Antagonismo em DRD2 (gene com variantes associadas à resposta em psicoses do TAB)",
          "Bloqueio 5-HT2A codificado pelo gene HTR2A, cujas variantes afetam resposta antidepressiva",
          "Metabólito norquetiapina atua na recaptação de norepinefrina (genes SLC6A2)",
          "Antagonismo H1 (gene HRH1) relacionado à sedação e ganho de peso",
        ],
        genetica: {
          titulo: "Farmacogenética da Quetiapina",
          aspectos: [
            {
              subtitulo: "Metabolismo pelo CYP450",
              conteudo:
                "A quetiapina é metabolizada principalmente pelo CYP3A4 e CYP2D6. Polimorfismos no CYP2D6 (metabolizadores lentos vs rápidos) afetam concentrações plasmáticas e resposta terapêutica.",
            },
            {
              subtitulo: "Genes dos Receptores-Alvo",
              conteudo:
                "Variantes em DRD2 (Taq1A), HTR2A (T102C) e HTR2C (Cys23Ser) modulam a resposta aos efeitos antipsicóticos e antidepressivos da quetiapina.",
            },
            {
              subtitulo: "Efeitos Metabólicos",
              conteudo:
                "Polimorfismos em genes como LEP (leptina), MC4R (receptor de melanocortina-4) e HTR2C predispõem ao ganho de peso induzido pelo medicamento.",
            },
            {
              subtitulo: "Resposta em Depressão Bipolar",
              conteudo:
                "Variantes em SLC6A4 (transportador de serotonina) e COMT (catabolismo de catecolaminas) podem prever resposta antidepressiva da quetiapina no TAB.",
            },
          ],
        },
        aplicacao:
          "Aprovado para episódios depressivos, maníacos e mistos. Testes farmacogenéticos podem otimizar dosagem.",
        eficacia:
          "Eficácia em depressão bipolar varia de 40-60%, com influência genética significativa na resposta individual.",
      },
    },
    {
      id: "olanzapina",
      nome: "Olanzapina",
      classe: "Antipsicótico Atípico",
      icon: "OLZ",
      color: "bg-indigo-500",
      mecanismo: {
        principal:
          "Antagonista multirreceptor (D2, 5-HT2A, H1, muscarínicos) com perfil de resposta e efeitos adversos fortemente modulados pela genética",
        detalhes: [
          "Forte antagonismo D2 e 5-HT2A em receptores codificados por genes com variantes funcionais",
          "Antagonismo H1 intenso (gene HRH1) relacionado a efeitos metabólicos adversos",
          "Ação em 5-HT2C (gene HTR2C com variantes ligadas ao ganho de peso)",
          "Bloqueio muscarínico em receptores codificados por genes da família CHRM",
        ],
        genetica: {
          titulo: "Perfil Farmacogenético da Olanzapina",
          aspectos: [
            {
              subtitulo: "Metabolismo Hepático",
              conteudo:
                "Metabolização principalmente por CYP1A2 (altamente polimórfico) e CYP2D6. Fumantes têm metabolização 40% mais rápida devido à indução do CYP1A2, requerendo doses maiores.",
            },
            {
              subtitulo: "Risco Metabólico Genético",
              conteudo:
                "Polimorfismos em HTR2C (-759C/T), MC4R, LEP e INSIG2 aumentam significativamente o risco de ganho de peso (até 10-15kg) e síndrome metabólica com olanzapina.",
            },
            {
              subtitulo: "Eficácia Antipsicótica",
              conteudo:
                "Variantes em DRD2, DRD3 e HTR2A modulam a resposta antimaníaca. O polimorfismo Ser9Gly do DRD3 está associado a melhor resposta em episódios agudos.",
            },
            {
              subtitulo: "Efeitos Adversos Neurológicos",
              conteudo:
                "Variantes em genes dopaminérgicos (DRD2, DRD3) e no gene COMT influenciam o risco de sintomas extrapiramidais, embora menor que antipsicóticos típicos.",
            },
          ],
        },
        aplicacao:
          "Episódios maníacos e mistos agudos. Perfil genético pode orientar seleção devido ao risco metabólico.",
        eficacia:
          "Alta eficácia em mania aguda (60-70% resposta), mas risco metabólico geneticamente determinado limita uso prolongado.",
      },
    },
    {
      id: "lamotrigina",
      nome: "Lamotrigina",
      classe: "Anticonvulsivante / Estabilizador",
      icon: "LTG",
      color: "bg-purple-500",
      mecanismo: {
        principal:
          "Bloqueio de canais de sódio voltagem-dependentes e modulação da liberação de glutamato, com metabolização geneticamente determinada",
        detalhes: [
          "Inibe canais de sódio tipo II codificados por genes SCN (SCN1A, SCN2A, SCN3A)",
          "Reduz liberação de glutamato em sinapses excitatórias",
          "Estabiliza membranas neuronais hiperexcitáveis",
          "Efeitos neuroprotetores e modulação de vias de sinalização",
        ],
        genetica: {
          titulo: "Genética e Metabolismo da Lamotrigina",
          aspectos: [
            {
              subtitulo: "Metabolismo por Glucuronidação",
              conteudo:
                "Metabolizada por UGT1A4 e UGT2B7 (UDP-glucuronosiltransferases). Polimorfismos nesses genes afetam clearance e níveis plasmáticos, influenciando dosagem ideal.",
            },
            {
              subtitulo: "Farmacogenética de Hipersensibilidade",
              conteudo:
                "O alelo HLA-B*1502 (prevalente em asiáticos) aumenta em 10x o risco de síndrome de Stevens-Johnson. Teste genético é recomendado antes de iniciar em populações de risco.",
            },
            {
              subtitulo: "Resposta em Depressão Bipolar",
              conteudo:
                "Variantes em genes de neurotransmissores (SLC6A4, HTR2A) e neuroplasticidade (BDNF) podem modular a eficácia antidepressiva da lamotrigina.",
            },
            {
              subtitulo: "Interação Gene-Gene",
              conteudo:
                "Polimorfismos em genes de canais de sódio (SCN1A) podem influenciar a resposta terapêutica e o limiar para efeitos adversos neurológicos.",
            },
          ],
        },
        aplicacao:
          "Primeira linha para prevenção de episódios depressivos bipolares. Screening genético de HLA-B*1502 quando indicado.",
        eficacia:
          "Eficaz na profilaxia de depressão bipolar (redução de 40-50% nas recorrências), com resposta modulada geneticamente.",
      },
    },
    {
      id: "risperidona",
      nome: "Risperidona",
      classe: "Antipsicótico Atípico",
      icon: "D₂",
      color: "bg-purple-500",
      mecanismo: {
        principal: "Antagonista D2/5-HT2A com metabolização via CYP2D6, altamente polimórfico na população",
        detalhes: [
          "Bloqueia receptores D2 (gene DRD2 com variantes funcionais) na via mesolímbica",
          "Antagoniza 5-HT2A (gene HTR2A) melhorando sintomas negativos",
          "Menor bloqueio nigroestriatal reduz sintomas extrapiramidais",
          "Modula receptores α1-adrenérgicos e H1",
        ],
        genetica: {
          titulo: "Farmacogenética da Risperidona",
          aspectos: [
            {
              subtitulo: "Polimorfismos do CYP2D6",
              conteudo:
                "A risperidona é metabolizada pelo CYP2D6 em 9-hidroxirisperidona (ativa). Metabolizadores lentos (*4, *5) têm níveis mais altos e maior risco de efeitos adversos; rápidos (*2x2) podem ter resposta subótima.",
            },
            {
              subtitulo: "Genes de Receptores Dopaminérgicos",
              conteudo:
                "Polimorfismos em DRD2 (Taq1A, -141C Ins/Del) e DRD3 (Ser9Gly) afetam densidade e função receptor, modulando resposta terapêutica e risco de efeitos extrapiramidais.",
            },
            {
              subtitulo: "Hiperprolactinemia Genética",
              conteudo:
                "Variantes em genes relacionados à prolactina e seus receptores (DRD2, PRL) predispõem a níveis mais elevados de prolactina com risperidona.",
            },
            {
              subtitulo: "ABCB1 e Barreira Hematoencefálica",
              conteudo:
                "Polimorfismos no gene ABCB1 (glicoproteína-P) afetam a penetração cerebral da risperidona, influenciando eficácia e efeitos no SNC.",
            },
          ],
        },
        aplicacao: "Episódios maníacos agudos com sintomas psicóticos. Teste de CYP2D6 pode otimizar dosagem.",
        eficacia:
          "Alta eficácia em mania aguda (70-75%), com metabolismo geneticamente variável afetando níveis plasmáticos.",
      },
    },
    {
      id: "clozapina",
      nome: "Clozapina",
      classe: "Antipsicótico Atípico",
      icon: "CLZ",
      color: "bg-red-500",
      mecanismo: {
        principal:
          "Antagonista multirreceptor com perfil único, metabolismo complexo e risco de agranulocitose geneticamente determinado",
        detalhes: [
          "Antagonismo moderado de D2 com alta ocupação de D4 (gene DRD4)",
          "Forte antagonismo 5-HT2A (gene HTR2A) e 5-HT2C",
          "Agonismo parcial em D1 (raro entre antipsicóticos)",
          "Múltiplas ações em receptores adrenérgicos, histaminérgicos e muscarínicos",
        ],
        genetica: {
          titulo: "Genética Crítica da Clozapina",
          aspectos: [
            {
              subtitulo: "Risco de Agranulocitose (HLA)",
              conteudo:
                "Alelos HLA-DQB1 e HLA-B aumentam risco de agranulocitose em 10-20x. Variantes em HLA-DQB1*02:01 conferem alto risco, especialmente em europeus. Screening genético pode prevenir casos fatais.",
            },
            {
              subtitulo: "Metabolismo Complexo (CYP1A2)",
              conteudo:
                "Metabolização principal por CYP1A2 (altamente variável). Fumantes têm níveis 50% menores. Polimorfismos em CYP1A2 (*1F) afetam metabolização e risco de toxicidade.",
            },
            {
              subtitulo: "Genes de Neutrófilos",
              conteudo:
                "Variantes em genes reguladores de neutrófilos (SLCO1B3, SLCO1B7) modulam risco de leucopenia/agranulocitose além dos fatores HLA.",
            },
            {
              subtitulo: "Resposta Terapêutica Superior",
              conteudo:
                "Polimorfismos em DRD3, HTR2A e genes GABAérgicos podem explicar por que a clozapina funciona em casos resistentes onde outros antipsicóticos falham.",
            },
          ],
        },
        aplicacao:
          "Reservado para TAB refratário grave. Monitoramento hematológico obrigatório. Teste HLA pode identificar risco.",
        eficacia:
          "Mais eficaz em mania refratária (80-85% resposta), mas uso limitado por agranulocitose (1% risco, geneticamente influenciado).",
      },
    },
    {
      id: "valproato",
      nome: "Valproato de Sódio",
      classe: "Anticonvulsivante / Estabilizador",
      icon: "VPA",
      color: "bg-orange-500",
      mecanismo: {
        principal:
          "Múltiplos mecanismos (canais de sódio, GABA, inibição HDAC) com metabolização e resposta geneticamente moduladas",
        detalhes: [
          "Bloqueia canais de sódio voltagem-dependentes codificados por genes SCN",
          "Aumenta GABA via inibição de GABA-transaminase e succinato semialdeído desidrogenase",
          "Inibe histona desacetilases (HDACi) alterando expressão gênica epigenética",
          "Modula vias PKC e MAPK afetadas geneticamente no TAB",
        ],
        genetica: {
          titulo: "Farmacogenética do Valproato",
          aspectos: [
            {
              subtitulo: "Metabolismo Hepático Variável",
              conteudo:
                "Metabolização por UGTs (UGT1A6, UGT1A9, UGT2B7) e CYP2C9. Polimorfismos nesses genes causam grande variabilidade interindividual nos níveis séricos.",
            },
            {
              subtitulo: "Hepatotoxicidade Genética",
              conteudo:
                "Variantes em POLG (polimerase mitocondrial γ) aumentam dramaticamente o risco de hepatotoxicidade fatal. Mutações em CPS1 e OTC também elevam risco de hiperamonemia.",
            },
            {
              subtitulo: "Teratogenicidade e MTHFR",
              conteudo:
                "Polimorfismos em MTHFR (C677T) aumentam risco de defeitos do tubo neural em fetos expostos ao valproato. Suplementação de folato é crítica em mulheres em idade fértil.",
            },
            {
              subtitulo: "Resposta Terapêutica",
              conteudo:
                "Variantes em genes de receptores GABA (GABRB3, GABRA1) e canais de sódio podem prever resposta ao valproato em episódios maníacos e mistos.",
            },
          ],
        },
        aplicacao:
          "Primeira linha para mania aguda e episódios mistos. Testes genéticos de POLG em crianças e MTHFR em mulheres férteis.",
        eficacia:
          "Rápida ação antimaníaca (70-80% resposta em 1-2 semanas), mas riscos hepáticos e teratogênicos geneticamente influenciados.",
      },
    },
    {
      id: "carbamazepina",
      nome: "Carbamazepina",
      classe: "Anticonvulsivante / Estabilizador",
      icon: "CBZ",
      color: "bg-green-500",
      mecanismo: {
        principal:
          "Bloqueio de canais de sódio com metabolização autoinducível e risco de hipersensibilidade HLA-dependente",
        detalhes: [
          "Inibe canais de sódio tipo II (genes SCN1A, SCN2A) estabilizando membranas",
          "Reduz liberação de glutamato em sinapses excitatórias",
          "Modula sistemas de segundo mensageiro",
          "Indução potente do CYP3A4 (autoindução metabólica)",
        ],
        genetica: {
          titulo: "Farmacogenética da Carbamazepina",
          aspectos: [
            {
              subtitulo: "HLA-B*1502 e Reações Cutâneas Graves",
              conteudo:
                "O alelo HLA-B*1502 (10-15% em asiáticos) aumenta risco de síndrome de Stevens-Johnson em 100x. FDA recomenda screening genético obrigatório em populações asiáticas.",
            },
            {
              subtitulo: "Metabolismo por CYP3A4/CYP2C19",
              conteudo:
                "Metabolização principal por CYP3A4 (autoinducível) e CYP2C19. Polimorfismos em CYP2C19 (*2, *3 - metabolizadores lentos) aumentam risco de toxicidade inicial.",
            },
            {
              subtitulo: "HLA-A*3101 e Hipersensibilidade",
              conteudo:
                "O alelo HLA-A*3101 (prevalente em europeus, japoneses) associa-se a rash cutâneo leve-moderado e reações de hipersensibilidade. Screening pode prevenir reações adversas.",
            },
            {
              subtitulo: "Transportadores ABCB1",
              conteudo:
                "Polimorfismos em ABCB1 (glicoproteína-P) afetam concentrações cerebrais da carbamazepina, influenciando eficácia em controlar sintomas do TAB.",
            },
          ],
        },
        aplicacao:
          "Alternativa ao lítio/valproato. Screening HLA-B*1502 obrigatório em asiáticos, recomendado em outras etnias.",
        eficacia:
          "Eficaz em ciclagem rápida e episódios mistos (60-65%), mas interações medicamentosas extensas por indução enzimática.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="hover:bg-primary/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <Dna className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Mecanismo de Ação & Genética
                  </h1>
                  <p className="text-sm text-muted-foreground">Integração Farmacológica e Farmacogenética</p>
                </div>
              </div>
            </div>
            <img src={unicesumarLogo} alt="Unicesumar" className="h-12" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Introduction Card */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="h-6 w-6 text-primary" />
              Farmacologia Personalizada no Transtorno Afetivo Bipolar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O tratamento do TAB envolve medicamentos que atuam em <strong>neurotransmissores</strong> (dopamina,
              serotonina, GABA, glutamato) e <strong>vias de sinalização celular</strong>. No entanto, a resposta
              terapêutica varia drasticamente entre pacientes.
            </p>
            <p className="text-sm text-muted-foreground">
              A <strong>farmacogenética</strong> explica essa variabilidade através de polimorfismos em genes que
              codificam:
            </p>
            <div className="grid md:grid-cols-3 gap-3 mt-4">
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <h4 className="font-semibold text-sm">Alvos Farmacológicos</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Receptores, enzimas e transportadores onde os medicamentos agem
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <h4 className="font-semibold text-sm">Enzimas Metabolizadoras</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    CYP450, UGTs que controlam metabolização e níveis séricos
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <h4 className="font-semibold text-sm">Risco de Reações Adversas</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    HLA e outros genes ligados a toxicidade e hipersensibilidade
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              A análise a seguir integra <strong>como cada medicamento age</strong> com{" "}
              <strong>como a genética individual modula essa ação</strong>, permitindo medicina personalizada baseada em
              evidências.
            </p>
          </CardContent>
        </Card>

        {/* Medication Tabs */}
        <Tabs defaultValue="litio" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-3">
            {medicamentos.map((med) => (
              <TabsTrigger
                key={med.id}
                value={med.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-mono flex items-center gap-2"
              >
                <span className="font-bold text-base">{med.icon}</span>
                <span className="hidden sm:inline">{med.nome}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {medicamentos.map((med) => (
            <TabsContent key={med.id} value={med.id} className="space-y-6">
              <Card className="border-2" style={{ borderColor: med.color.replace("bg-", "") }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`${med.color} text-white text-xl font-bold w-16 h-16 rounded-lg flex items-center justify-center font-mono shadow-lg`}
                        >
                          {med.icon}
                        </div>
                        <div>
                          <CardTitle className="text-3xl">{med.nome}</CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {med.classe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Mecanismo Principal */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Mecanismo Integrado (Farmacologia + Genética)</h3>
                    </div>
                    <p className="text-foreground bg-gradient-to-r from-primary/10 to-purple-500/10 p-4 rounded-lg border-l-4 border-primary">
                      {med.mecanismo.principal}
                    </p>
                  </div>

                  {/* Detalhes do Mecanismo */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Ações Farmacológicas Detalhadas</h3>
                    </div>
                    <ul className="space-y-2">
                      {med.mecanismo.detalhes.map((detalhe, idx) => (
                        <li key={idx} className="flex items-start gap-3 bg-muted/30 p-3 rounded-md">
                          <span className="text-primary mt-1 font-bold">▸</span>
                          <span className="text-sm text-muted-foreground flex-1">{detalhe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Integração Genética */}
                  <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-2 border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <Dna className="h-5 w-5" />
                        {med.mecanismo.genetica.titulo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {med.mecanismo.genetica.aspectos.map((aspecto, idx) => (
                        <div
                          key={idx}
                          className="bg-card/80 p-4 rounded-lg border border-purple-200/50 dark:border-purple-800/50"
                        >
                          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                            <Users className="h-4 w-4" />
                            {aspecto.subtitulo}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{aspecto.conteudo}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Aplicação e Eficácia */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <h4 className="text-sm font-semibold">Aplicação Clínica & Genética</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground leading-relaxed">{med.mecanismo.aplicacao}</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-500/30">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <h4 className="text-sm font-semibold">Eficácia & Variabilidade Genética</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground leading-relaxed">{med.mecanismo.eficacia}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Clinical Implications */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-amber-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <Brain className="h-5 w-5" />
              Implicações Clínicas da Farmacogenética no TAB
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Dna className="h-4 w-4 text-primary" />
                  Testes Genéticos Recomendados
                </h4>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>HLA-B*1502 e HLA-A*3101:</strong> Antes de carbamazepina (especialmente em asiáticos) e
                      lamotrigina para prevenir reações cutâneas graves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>CYP2D6 e CYP2C19:</strong> Para otimizar dosagem de antipsicóticos (risperidona,
                      quetiapina)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>HLA-DQB1:</strong> Consideração antes de clozapina em casos refratários para avaliar risco
                      de agranulocitose
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>MTHFR:</strong> Em mulheres em idade fértil usando valproato para ajustar suplementação de
                      folato
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Medicina Personalizada no TAB
                </h4>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>Predição de resposta:</strong> Painéis farmacogenéticos podem prever 25-40% da
                      variabilidade na resposta ao lítio e antipsicóticos
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>Prevenção de efeitos adversos:</strong> Screening HLA evita reações potencialmente fatais
                      (Stevens-Johnson, agranulocitose)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>Otimização de dose:</strong> Fenótipos metabólicos (CYP450) permitem ajuste racional de
                      dosagem desde o início
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>
                      <strong>Redução de tentativa-erro:</strong> Diminui tempo até resposta terapêutica e custos com
                      trocas de medicação
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Genetic Vulnerability Summary */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dna className="h-6 w-6 text-purple-600" />
              Bases Genéticas do TAB e Alvos Terapêuticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O TAB possui <strong>herdabilidade de 60-85%</strong>, com mais de <strong>30 genes de risco</strong>{" "}
              identificados por estudos GWAS. Muitos desses genes são precisamente os alvos dos medicamentos usados no
              tratamento:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-card/50 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 text-purple-600 dark:text-purple-400">
                    Genes de Sinalização
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    <strong>CACNA1C, ANK3, GSK3B:</strong> Codificam proteínas alvos do lítio e valproato. Variantes
                    nesses genes conferem risco para TAB e modulam resposta terapêutica.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 text-purple-600 dark:text-purple-400">
                    Genes de Neurotransmissores
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    <strong>DRD2, HTR2A, SLC6A4:</strong> Codificam receptores e transportadores alvos dos
                    antipsicóticos e estabilizadores. Polimorfismos afetam densidade receptor e resposta.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2 text-purple-600 dark:text-purple-400">
                    Genes de Neuroplasticidade
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    <strong>BDNF, NTRK2:</strong> Relacionados a fatores neurotróficos. O lítio promove neuroproteção em
                    portadores de variantes de risco, potencialmente revertendo déficits genéticos.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-sm text-muted-foreground mt-4 bg-purple-100/50 dark:bg-purple-900/20 p-4 rounded-lg border-l-4 border-purple-500">
              <strong>Integração Gene-Medicamento:</strong> Os medicamentos para TAB não apenas tratam sintomas, mas
              atuam nos mesmos sistemas biológicos alterados geneticamente na doença. A farmacogenética permite
              identificar quais medicamentos têm maior probabilidade de sucesso baseado no perfil genético individual do
              paciente, representando o futuro da psiquiatria personalizada.
            </p>
          </CardContent>
        </Card>

        {/* Important Considerations */}
        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-5 w-5" />
              Considerações Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              <strong>1. Limitações Atuais da Farmacogenética:</strong> Embora promissora, a farmacogenética explica
              apenas parte da variabilidade na resposta. Fatores ambientais, comorbidades, interações medicamentosas e
              adesão ao tratamento também são cruciais.
            </p>
            <p className="text-muted-foreground">
              <strong>2. Custo-Benefício:</strong> Testes farmacogenéticos ainda têm custo elevado no Brasil. São mais
              custo-efetivos quando há: falha terapêutica prévia, alto risco de reações adversas, ou uso de medicamentos
              com risco grave (clozapina, carbamazepina).
            </p>
            <p className="text-muted-foreground">
              <strong>3. Interpretação Complexa:</strong> Resultados genéticos devem ser interpretados por profissionais
              treinados. Um alelo de risco não determina destino - é um fator probabilístico que guia decisões clínicas.
            </p>
            <p className="text-muted-foreground">
              <strong>4. Evidências em Evolução:</strong> A farmacogenética psiquiátrica está em desenvolvimento ativo.
              Novas associações gene-medicamento são descobertas frequentemente, e diretrizes clínicas estão sendo
              constantemente atualizadas.
            </p>
            <p className="text-muted-foreground">
              <strong>5. Abordagem Integrada:</strong> A genética é uma ferramenta adicional, não substituta do
              julgamento clínico. O tratamento ideal integra: história clínica, sintomas atuais, comorbidades, efeitos
              adversos prévios, e quando disponível, dados farmacogenéticos.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong>Fontes Científicas:</strong> SciELO Brasil, NCBI PubMed (estudos GWAS em TAB), PharmGKB
              (Pharmacogenomics Knowledgebase), CPIC Guidelines (Clinical Pharmacogenetics Implementation Consortium),
              FDA Drug Labels, European Medicines Agency (EMA), Psychopharmacology Institute, National Institute of
              Mental Health (NIMH), International Society of Psychiatric Genetics, e literatura científica revisada por
              pares sobre farmacogenética psiquiátrica.
              <br />
              <strong>Nota:</strong> As informações apresentadas são de caráter educacional e científico, destinadas ao
              Trabalho de Conclusão de Curso (TCC) de Farmácia da UNICESUMAR. Não substituem avaliação e orientação
              médica profissional individualizada.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MecanismoAcao;
