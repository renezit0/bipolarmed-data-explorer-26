import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Pill, Brain, Activity, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import unicesumarLogo from '@/assets/unicesumar-logo.png';

const MecanismoAcao = () => {
  const navigate = useNavigate();

  const medicamentos = [
    {
      id: 'litio',
      nome: 'Carbonato de Lítio',
      classe: 'Estabilizador de Humor',
      icon: '⚛️',
      color: 'bg-blue-500',
      mecanismo: {
        principal: 'Modula sistemas de neurotransmissores (dopamina, glutamato, GABA) e altera cascatas de sinalização intracelular',
        detalhes: [
          'Inibe enzimas intracelulares como GSK-3, PKC, IPPase e IMPase',
          'Reduz hiperatividade dopaminérgica em episódios maníacos',
          'Modula a neurotransmissão glutamatérgica e GABAérgica',
          'Promove neuroproteção e neurogênese no hipocampo',
          'Afeta o metabolismo de inositol e sinalização de fosfoinositídeos'
        ],
        aplicacao: 'Primeira linha no tratamento de manutenção do TAB. Eficaz em episódios maníacos agudos e prevenção de recorrências.',
        eficacia: 'Reduz significativamente o risco de suicídio e melhora a função psicossocial a longo prazo.'
      }
    },
    {
      id: 'risperidona',
      nome: 'Risperidona',
      classe: 'Antipsicótico Atípico',
      icon: '💊',
      color: 'bg-purple-500',
      mecanismo: {
        principal: 'Antagonista dual de receptores de dopamina D2 e serotonina 5-HT2A',
        detalhes: [
          'Bloqueia receptores dopaminérgicos D2 na via mesolímbica (reduz sintomas psicóticos)',
          'Antagoniza receptores serotoninérgicos 5-HT2A (melhora sintomas negativos)',
          'Menor bloqueio D2 na via nigroestriatal comparado aos típicos (menos efeitos extrapiramidais)',
          'Modula receptores α1-adrenérgicos e histaminérgicos H1',
          'Perfil farmacológico equilibrado entre eficácia e tolerabilidade'
        ],
        aplicacao: 'Indicado para episódios maníacos agudos, especialmente com sintomas psicóticos. Uso off-label em terapia de manutenção.',
        eficacia: 'Alta eficácia no controle rápido de agitação e sintomas psicóticos em mania aguda.'
      }
    },
    {
      id: 'valproato',
      nome: 'Valproato de Sódio',
      classe: 'Anticonvulsivante / Estabilizador de Humor',
      icon: '⚡',
      color: 'bg-orange-500',
      mecanismo: {
        principal: 'Múltiplos mecanismos: bloqueio de canais de sódio voltagem-dependentes e aumento da neurotransmissão GABAérgica',
        detalhes: [
          'Inibe canais de sódio voltagem-dependentes (estabiliza membranas neuronais)',
          'Aumenta níveis de GABA por inibição da GABA-transaminase e succinato semialdeído desidrogenase',
          'Modula vias de sinalização intracelular (PKC, MAPK)',
          'Efeitos neuroprotetores e neuroplásticos',
          'Inibe histona desacetilases (HDACi), afetando expressão gênica'
        ],
        aplicacao: 'Primeira linha para episódios maníacos/mistos agudos. Também usado em profilaxia e controle de ciclagem rápida.',
        eficacia: 'Rápido início de ação em mania aguda. Particularmente eficaz em episódios mistos e ciclagem rápida.'
      }
    },
    {
      id: 'carbamazepina',
      nome: 'Carbamazepina',
      classe: 'Anticonvulsivante / Estabilizador de Humor',
      icon: '🔋',
      color: 'bg-green-500',
      mecanismo: {
        principal: 'Bloqueio de canais de sódio voltagem-dependentes, reduzindo hiperexcitabilidade neuronal',
        detalhes: [
          'Inibe canais de sódio rápidos, estabilizando membranas neuronais hiperexcitadas',
          'Reduz liberação de glutamato (principal neurotransmissor excitatório)',
          'Modula sistemas de segundo mensageiro intracelular',
          'Possui propriedades de estabilização de membrana similares ao valproato',
          'Indução enzimática do citocromo P450 (interações medicamentosas importantes)'
        ],
        aplicacao: 'Alternativa ao lítio e valproato. Útil em pacientes com ciclagem rápida e episódios mistos.',
        eficacia: 'Eficaz em profilaxia de episódios maníacos. Estudos mostram eficácia inferior ao lítio em alguns casos.'
      }
    },
    {
      id: 'quetiapina',
      nome: 'Quetiapina',
      classe: 'Antipsicótico Atípico',
      icon: '🧠',
      color: 'bg-pink-500',
      mecanismo: {
        principal: 'Antagonista de receptores de dopamina D2 e serotonina 5-HT2A, com dissociação rápida dos receptores D2',
        detalhes: [
          'Antagonismo de receptores D2 (principalmente mesolímbico)',
          'Antagonismo 5-HT2A (efeito antidepressivo e antipsicótico)',
          'Bloqueio de receptores histaminérgicos H1 (sedação)',
          'Antagonismo α1-adrenérgico (hipotensão ortostática)',
          'Metabólito ativo (norquetiapina) inibe recaptação de norepinefrina'
        ],
        aplicacao: 'Aprovado para episódios depressivos, maníacos e mistos no TAB. Usado em monoterapia ou adjuvante.',
        eficacia: 'Um dos poucos antipsicóticos com eficácia demonstrada em depressão bipolar. Boa tolerabilidade.'
      }
    },
    {
      id: 'olanzapina',
      nome: 'Olanzapina',
      classe: 'Antipsicótico Atípico',
      icon: '🎯',
      color: 'bg-indigo-500',
      mecanismo: {
        principal: 'Antagonista de múltiplos receptores: D2, 5-HT2A, H1, muscarínicos e adrenérgicos',
        detalhes: [
          'Forte antagonismo D2 e 5-HT2A (antipsicótico e estabilizador)',
          'Antagonismo H1 intenso (sedação, ganho de peso)',
          'Bloqueio muscarínico (efeitos anticolinérgicos)',
          'Ação em receptores 5-HT2C (risco metabólico)',
          'Perfil de ligação mais amplo que outros atípicos'
        ],
        aplicacao: 'Episódios maníacos agudos e mistos. Combinação com fluoxetina aprovada para depressão bipolar.',
        eficacia: 'Alta eficácia em mania aguda. Preocupações com ganho de peso e síndrome metabólica.'
      }
    },
    {
      id: 'haloperidol',
      nome: 'Haloperidol',
      classe: 'Antipsicótico Típico',
      icon: '💉',
      color: 'bg-red-500',
      mecanismo: {
        principal: 'Antagonista potente e seletivo de receptores dopaminérgicos D2',
        detalhes: [
          'Bloqueio D2 em todas as vias dopaminérgicas (mesolímbica, mesocortical, nigroestriatal, tuberoinfundibular)',
          'Alto risco de sintomas extrapiramidais (SEP) devido ao bloqueio nigroestriatal intenso',
          'Pode causar hiperprolactinemia (bloqueio tuberoinfundibular)',
          'Não possui ação 5-HT2A significativa (diferença dos atípicos)',
          'Potência antipsicótica elevada, mas perfil de efeitos adversos menos favorável'
        ],
        aplicacao: 'Reservado para casos graves de mania aguda com agitação intensa. Uso de curto prazo devido aos efeitos adversos.',
        eficacia: 'Eficaz no controle rápido de sintomas maníacos e agitação. Menos usado atualmente devido aos atípicos.'
      }
    },
    {
      id: 'clonazepam',
      nome: 'Clonazepam',
      classe: 'Benzodiazepínico',
      icon: '😴',
      color: 'bg-teal-500',
      mecanismo: {
        principal: 'Potencializa a neurotransmissão GABAérgica através da ligação alostérica aos receptores GABA-A',
        detalhes: [
          'Liga-se ao sítio benzodiazepínico do complexo receptor GABA-A',
          'Aumenta a frequência de abertura dos canais de cloreto mediados por GABA',
          'Hiperpolarização neuronal e redução da excitabilidade',
          'Efeitos ansiolíticos, sedativos, anticonvulsivantes e miorrelaxantes',
          'Meia-vida longa (18-50h), permitindo dosagem 2x/dia'
        ],
        aplicacao: 'Adjuvante no tratamento agudo de mania e controle de ansiedade/insônia associadas ao TAB. Não é estabilizador de humor.',
        eficacia: 'Rápido alívio de ansiedade e insônia. Risco de dependência e tolerância limita uso prolongado.'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 border-b border-border/50 bg-card/90 backdrop-blur-md z-50">
        <div className="container px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <img src={unicesumarLogo} alt="Unicesumar" className="h-10 object-contain" />
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-3xl">Mecanismo de Ação dos Medicamentos</CardTitle>
                <CardDescription className="text-base mt-2">
                  Entendendo como cada medicamento atua no tratamento do Transtorno Afetivo Bipolar
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Sobre o Transtorno Afetivo Bipolar (TAB)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              O TAB é caracterizado por alterações no funcionamento de neurotransmissores cerebrais, 
              particularmente <strong>dopamina</strong>, <strong>serotonina</strong>, <strong>noradrenalina</strong> e <strong>GABA</strong>.
            </p>
            <p className="text-sm text-muted-foreground">
              Os episódios maníacos estão associados a <strong>hiperatividade dopaminérgica e glutamatérgica</strong>, 
              enquanto os episódios depressivos envolvem <strong>déficit de monoaminas</strong> (serotonina, noradrenalina).
            </p>
            <p className="text-sm text-muted-foreground">
              Os medicamentos atuam restaurando o equilíbrio neuroquímico através de diversos mecanismos moleculares.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="litio" className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-2 bg-muted/50 p-3">
            {medicamentos.map((med) => (
              <TabsTrigger 
                key={med.id} 
                value={med.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <span className="mr-2">{med.icon}</span>
                {med.nome}
              </TabsTrigger>
            ))}
          </TabsList>

          {medicamentos.map((med) => (
            <TabsContent key={med.id} value={med.id} className="space-y-6">
              <Card className="border-2" style={{ borderColor: med.color.replace('bg-', 'rgb(var(--') + ')' }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`${med.color} text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center`}>
                          {med.icon}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{med.nome}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{med.classe}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Mecanismo Principal</h3>
                    </div>
                    <p className="text-foreground bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
                      {med.mecanismo.principal}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Mecanismos Detalhados</h3>
                    </div>
                    <ul className="space-y-2">
                      {med.mecanismo.detalhes.map((detalhe, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary mt-1">▸</span>
                          <span className="text-sm text-muted-foreground flex-1">{detalhe}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-primary" />
                          <h4 className="text-sm font-semibold">Aplicação Clínica</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          {med.mecanismo.aplicacao}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50/50 dark:bg-green-950/20 border-green-500/20">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <h4 className="text-sm font-semibold">Eficácia</h4>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          {med.mecanismo.eficacia}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-5 w-5" />
              Considerações Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              <strong>1. Individualização do Tratamento:</strong> A resposta aos medicamentos varia entre pacientes. 
              O tratamento deve ser personalizado considerando eficácia, tolerabilidade e perfil de efeitos adversos.
            </p>
            <p className="text-muted-foreground">
              <strong>2. Terapia Combinada:</strong> Muitos pacientes necessitam de combinação de medicamentos 
              (ex: estabilizador de humor + antipsicótico) para controle adequado dos sintomas.
            </p>
            <p className="text-muted-foreground">
              <strong>3. Acompanhamento:</strong> Monitoramento regular de níveis séricos (especialmente lítio), 
              função hepática, renal, metabólica e hematológica é essencial.
            </p>
            <p className="text-muted-foreground">
              <strong>4. Adesão ao Tratamento:</strong> O uso contínuo e adequado dos medicamentos é fundamental 
              para prevenir recorrências e manter a estabilidade do humor.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Fontes:</strong> Psychopharmacology Institute, ANVISA, MSD Manuals, 
              Lecturio Medical Knowledge, SciELO Brasil, e literatura científica revisada por pares.
              As informações aqui apresentadas são de caráter educacional e não substituem orientação médica profissional.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default MecanismoAcao;