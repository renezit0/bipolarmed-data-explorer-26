import { FileText, Download, Database, Upload, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const DataCollectionMethodology = () => {
  return (
    <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Database className="h-5 w-5 text-primary" />
          Metodologia de Coleta de Dados
        </CardTitle>
        <CardDescription>
          Processo completo de extração e processamento dos dados do DATASUS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="overview">
            <AccordionTrigger className="text-base font-semibold">
              Visão Geral do Processo
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Os dados foram coletados do Sistema de Informações Ambulatoriais do SUS (SIA/SUS) 
                através do portal TabNet/DATASUS, abrangendo o período de <strong>Junho/2015 a Junho/2025</strong> 
                para todos os 26 estados brasileiros e Distrito Federal.
              </p>
              <p>
                Foram extraídas informações sobre a dispensação de medicamentos utilizados no 
                tratamento do Transtorno Bipolar, incluindo estabilizadores de humor, antipsicóticos 
                atípicos e anticonvulsivantes.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="steps">
            <AccordionTrigger className="text-base font-semibold">
              Passo a Passo da Coleta
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Acesso ao Portal DATASUS</h4>
                    <p className="text-muted-foreground mb-2">
                      Acesse o portal TabNet através do link abaixo e navegue até a seção de 
                      "Produção Ambulatorial do SUS - Brasil - Por Local de Atendimento"
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => window.open('http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sia/cnv/qauf.def', '_blank')}
                    >
                      <FileText className="h-4 w-4" />
                      Acessar TabNet DATASUS
                    </Button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Configuração dos Parâmetros</h4>
                    <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                      <li><strong>Linha:</strong> Procedimento</li>
                      <li><strong>Coluna:</strong> Ano/mês atendimento</li>
                      <li><strong>Conteúdo:</strong> Qtd.aprovada</li>
                      <li><strong>Períodos:</strong> Jun/2015 a Jun/2025</li>
                      <li><strong>Unidade da Federação:</strong> Selecionar estado desejado</li>
                      <li><strong>Grupo procedimento:</strong> Medicamentos</li>
                      <li><strong>Procedimento:</strong> Selecionar medicamentos específicos para Transtorno Bipolar</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Download dos Arquivos HTML</h4>
                    <p className="text-muted-foreground">
                      Após configurar os filtros, clique em "Mostra" para gerar a tabela. 
                      Salve a página HTML completa (Ctrl+S) para cada estado brasileiro. 
                      Organize os arquivos por estado (ex: ac.html, al.html, am.html, etc.)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Conversão HTML para SQL</h4>
                    <p className="text-muted-foreground mb-2">
                      Utilize nossa ferramenta personalizada para converter os arquivos HTML 
                      em comandos SQL compatíveis com o Supabase/PostgreSQL. A ferramenta:
                    </p>
                    <ul className="text-muted-foreground space-y-1 list-disc list-inside mb-2">
                      <li>Detecta automaticamente o estado pelo nome do arquivo</li>
                      <li>Extrai os dados preservando a estrutura temporal</li>
                      <li>Gera comandos CREATE TABLE e INSERT DATA</li>
                      <li>Trata valores nulos e caracteres especiais</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Upload para o Banco de Dados</h4>
                    <p className="text-muted-foreground">
                      Execute os comandos SQL gerados no Supabase para criar as tabelas 
                      (medicbipoac, medicbipoal, etc.) e inserir os dados. O processo foi 
                      dividido em duas etapas: CREATE (Jun/2018-Jun/2025) e UPDATE (Jun/2015-Mai/2018).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    6
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">Validação e Verificação</h4>
                    <p className="text-muted-foreground">
                      Após o upload, os dados foram validados verificando:
                    </p>
                    <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Integridade temporal (todas as colunas de meses presentes)</li>
                      <li>Quantidade de medicamentos por estado</li>
                      <li>Consistência dos valores numéricos</li>
                      <li>Ausência de duplicações</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="tool">
            <AccordionTrigger className="text-base font-semibold">
              Ferramenta de Conversão HTML → SQL
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Desenvolvemos uma ferramenta web personalizada para automatizar a conversão 
                dos arquivos HTML do DATASUS em comandos SQL. A ferramenta possui:
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Detecção automática de estados:</strong> Identifica o estado pelo nome do arquivo ou conteúdo HTML</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Processamento em lote:</strong> Converte múltiplos estados simultaneamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Dois modos de operação:</strong> CREATE (novas tabelas) e UPDATE (adicionar colunas antigas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Tratamento robusto:</strong> Lida com encoding corrompido, acentuação e caracteres especiais</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span><strong>Comandos consolidados:</strong> Gera blocos de SQL para todos os estados de uma vez</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-md border border-border">
                💡 A ferramenta foi construída em HTML/JavaScript puro e pode ser executada 
                localmente em qualquer navegador sem necessidade de servidor.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="medications">
            <AccordionTrigger className="text-base font-semibold">
              Medicamentos Incluídos
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground mb-3">
                Os seguintes medicamentos foram selecionados baseados nas diretrizes clínicas 
                para tratamento do Transtorno Bipolar:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="bg-background p-3 rounded-md border border-border">
                  <h5 className="font-semibold text-foreground mb-2">Estabilizadores de Humor</h5>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Carbonato de Lítio (300mg, 450mg)</li>
                    <li>• Ácido Valproico / Valproato</li>
                    <li>• Carbamazepina</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <h5 className="font-semibold text-foreground mb-2">Antipsicóticos Atípicos</h5>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Olanzapina (5mg, 10mg)</li>
                    <li>• Quetiapina (25mg, 100mg, 200mg, 300mg)</li>
                    <li>• Risperidona (1mg, 2mg, 3mg)</li>
                    <li>• Clozapina (25mg, 100mg)</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <h5 className="font-semibold text-foreground mb-2">Anticonvulsivantes</h5>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Lamotrigina (25mg, 50mg, 100mg)</li>
                    <li>• Topiramato</li>
                  </ul>
                </div>
                <div className="bg-background p-3 rounded-md border border-border">
                  <h5 className="font-semibold text-foreground mb-2">Outros</h5>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Ziprasidona (80mg)</li>
                    <li>• Etossuximida</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="structure">
            <AccordionTrigger className="text-base font-semibold">
              Estrutura do Banco de Dados
            </AccordionTrigger>
            <AccordionContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                O banco de dados foi estruturado com 27 tabelas (uma para cada estado/DF), 
                seguindo o padrão:
              </p>
              <div className="bg-background p-4 rounded-md border border-border font-mono text-xs space-y-2">
                <div className="text-muted-foreground">
                  <span className="text-primary">medicbipo[sigla_estado]</span>
                  <div className="ml-4 mt-1">
                    <div>• id (BIGSERIAL PRIMARY KEY)</div>
                    <div>• Procedimento (TEXT NOT NULL)</div>
                    <div>• 2015/Jun, 2015/Jul, ... 2025/Jun (TEXT)</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>Total de colunas:</strong> 121 (1 ID + 1 Procedimento + 119 meses)
              </p>
              <p className="text-sm text-muted-foreground">
                Todos os valores são armazenados como TEXT para preservar a formatação 
                original dos dados e permitir tratamento posterior de valores nulos 
                e caracteres especiais.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-muted/50 p-4 rounded-lg border border-border mt-6">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Upload className="h-4 w-4 text-primary" />
            Resumo Técnico
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Período dos Dados</p>
              <p className="font-semibold text-foreground">Jun/2015 - Jun/2025</p>
            </div>
            <div>
              <p className="text-muted-foreground">Estados Incluídos</p>
              <p className="font-semibold text-foreground">27 (26 estados + DF)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total de Registros</p>
              <p className="font-semibold text-foreground">~400 medicamentos</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
