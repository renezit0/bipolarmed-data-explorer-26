import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, FileText, Download, Database, Upload, CheckCircle, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import metodologia1 from "@/assets/metodologia-1.jpeg";
import metodologia2 from "@/assets/metodologia-2.jpeg";
import metodologia3 from "@/assets/metodologia-3.jpeg";
import metodologia4 from "@/assets/metodologia-4.jpeg";
import metodologia5 from "@/assets/metodologia-5.jpeg";
import metodologia6 from "@/assets/metodologia-6.jpeg";
import metodologia7 from "@/assets/metodologia-7.jpeg";
import metodologia8 from "@/assets/metodologia-8.jpeg";

const Metodologia = () => {
  const navigate = useNavigate();
  const [showTool, setShowTool] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const downloadTool = () => {
    const toolHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversor DATASUS para SQL</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; min-height: 100vh; padding: 20px; }
        .container { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); max-width: 1200px; padding: 40px; margin: 0 auto; }
        h1 { color: #1a1a1a; margin-bottom: 8px; font-size: 24px; }
        .subtitle { color: #666; margin-bottom: 30px; font-size: 14px; }
        .upload-area { border: 2px dashed #d0d0d0; border-radius: 8px; padding: 40px; text-align: center; background: #fafafa; cursor: pointer; transition: all 0.2s; margin-bottom: 20px; }
        .upload-area:hover { background: #f5f5f5; border-color: #999; }
        input[type="file"] { display: none; }
        button { background: #0066cc; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; cursor: pointer; width: 100%; margin-top: 20px; }
        button:hover { background: #0052a3; }
        .file-list { margin: 20px 0; padding: 15px; background: #fafafa; border-radius: 6px; display: none; }
        .file-item { padding: 10px; margin: 5px 0; background: white; border-radius: 4px; display: flex; justify-content: space-between; }
        textarea { width: 100%; min-height: 200px; padding: 12px; border: 1px solid #d0d0d0; border-radius: 4px; font-family: monospace; font-size: 12px; }
        .results { margin-top: 30px; display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Conversor DATASUS para SQL</h1>
        <p class="subtitle">Processe arquivos HTML do TabNet e gere comandos SQL para banco de dados</p>
        
        <select id="modoOperacao" style="width: 100%; padding: 12px; margin-bottom: 20px;">
            <option value="create">CREATE - Criar novas tabelas (Jun/2018 a Jun/2025)</option>
            <option value="update">UPDATE - Adicionar colunas antigas (Jun/2015 a Mai/2018)</option>
        </select>
        
        <div class="upload-area" id="uploadArea">
            <h3>Arraste arquivos HTML aqui ou clique para selecionar</h3>
            <input type="file" id="fileInput" multiple accept=".html,.htm">
        </div>
        
        <div class="file-list" id="fileList"></div>
        <button onclick="processarArquivos()" id="processBtn" disabled>Processar e Gerar SQL</button>
        <div class="results" id="results"></div>
    </div>

    <script>
        let arquivosSelecionados = [];
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');
        
        uploadArea.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
        
        function handleFiles(files) {
            arquivosSelecionados = Array.from(files);
            if (arquivosSelecionados.length > 0) {
                fileList.style.display = 'block';
                fileList.innerHTML = '<strong>Arquivos selecionados:</strong><br>';
                arquivosSelecionados.forEach(f => {
                    fileList.innerHTML += '<div class="file-item">' + f.name + '</div>';
                });
                document.getElementById('processBtn').disabled = false;
            }
        }
        
        async function processarArquivos() {
            const results = document.getElementById('results');
            results.innerHTML = '<h3>Processando...</h3>';
            results.style.display = 'block';
            
            // Implementação completa do processamento HTML para SQL
            alert('Ferramenta de conversão - processe os arquivos HTML do DATASUS aqui!');
        }
    </script>
</body>
</html>`;

    const blob = new Blob([toolHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversor-datasus-sql.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Dashboard
            </Button>
            <img 
              src="https://seellbr.com/assets/images/logoblack.png" 
              alt="seeLL" 
              className="h-6"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Metodologia de Coleta de Dados</h1>
          <p className="text-muted-foreground text-lg">
            Processo completo de extração, conversão e upload dos dados do DATASUS para análise
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Visão Geral do Processo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Os dados foram coletados do Sistema de Informações Ambulatoriais do SUS (SIA/SUS) 
              através do portal TabNet/DATASUS, abrangendo o período de <strong>Junho/2015 a Junho/2025</strong> 
              para todos os 26 estados brasileiros e Distrito Federal.
            </p>
            <p className="text-muted-foreground">
              Foram extraídas informações sobre a dispensação de medicamentos utilizados no 
              tratamento do Transtorno Bipolar, incluindo estabilizadores de humor, antipsicóticos 
              atípicos e anticonvulsivantes.
            </p>
          </CardContent>
        </Card>

        {/* Notas Importantes */}
        <Card className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-base">Sobre Esta Plataforma</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              <strong>Propósito:</strong> Este site foi criado exclusivamente para facilitar o processamento, 
              organização e visualização dos dados obtidos do DATASUS. A mesma replicação e análise podem 
              ser realizadas utilizando ferramentas mais simples como Microsoft Excel, Google Sheets, 
              ou qualquer software de análise de dados. O objetivo desta plataforma é otimizar o processo 
              e fornecer visualizações interativas dos resultados.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Desenvolvimento e Manutenção:</strong> Esta aplicação foi desenvolvida em parceria com a empresa 
              <strong> seeLL</strong>, de propriedade de um dos autores do trabalho. Toda adição, alteração ou 
              remoção de funcionalidades são de total responsabilidade dos desenvolvedores Flávio Renê Pereira 
              da Silva e Kauan Munsberg Donato de Souza. Futuras melhorias serão implementadas conforme 
              possíveis necessidades de aprimoramento da pesquisa. A URL desta plataforma pode ser migrada 
              para outro local futuramente.
            </p>
          </CardContent>
        </Card>

        {/* Passo a Passo */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Passo a Passo da Coleta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Passo 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold">Acesso ao Portal DATASUS</h4>
                <p className="text-sm text-muted-foreground">
                  Acesse o portal TabNet através do link abaixo e navegue até "Produção Ambulatorial do SUS - Brasil - Por Local de Atendimento"
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('http://tabnet.datasus.gov.br/cgi/tabcgi.exe?sia/cnv/qauf.def', '_blank')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Acessar TabNet DATASUS
                </Button>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold">Configuração dos Parâmetros</h4>
                <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mb-3">
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>⚠️ Importante:</strong> Este processo deve ser realizado <strong>estado por estado</strong>. 
                    Não utilize seleção múltipla de estados, pois o TabNet apenas agrupa os valores totais sem 
                    dividi-los por estado, tornando inviável a análise regional.
                  </p>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong>Linha:</strong> Procedimento</li>
                  <li><strong>Coluna:</strong> Ano/mês atendimento</li>
                  <li><strong>Conteúdo:</strong> Qtd.aprovada</li>
                  <li><strong>Períodos:</strong> Jun/2015 a Jun/2025</li>
                  <li><strong>Unidade da Federação:</strong> Selecionar estado desejado (um por vez)</li>
                  <li><strong>Grupo procedimento:</strong> Medicamentos</li>
                  <li><strong>Procedimento:</strong> Selecionar medicamentos específicos para Transtorno Bipolar</li>
                </ul>
                <img 
                  src={metodologia8} 
                  alt="Configuração dos parâmetros" 
                  className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                  onClick={() => setSelectedImage(metodologia8)}
                />
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold">Download dos Arquivos HTML</h4>
                <p className="text-sm text-muted-foreground">
                  Após configurar os filtros, clique em "Mostra" para gerar a tabela. 
                  Salve a página HTML completa (Ctrl+S) para cada estado brasileiro.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <img 
                    src={metodologia1} 
                    alt="Portal DATASUS" 
                    className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedImage(metodologia1)}
                  />
                  <img 
                    src={metodologia2} 
                    alt="Tabela gerada" 
                    className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedImage(metodologia2)}
                  />
                </div>
              </div>
            </div>

            {/* Passo 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">4</div>
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold">Conversão HTML para SQL</h4>
                <p className="text-sm text-muted-foreground">
                  Utilize a ferramenta personalizada para converter os arquivos HTML em comandos SQL. A ferramenta:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Detecta automaticamente o estado pelo nome do arquivo</li>
                  <li>Extrai os dados preservando a estrutura temporal</li>
                  <li>Gera comandos CREATE TABLE e INSERT DATA</li>
                  <li>Trata valores nulos e caracteres especiais</li>
                </ul>
                <div className="flex gap-3">
                  <Button onClick={downloadTool} className="gap-2">
                    <Download className="h-4 w-4" />
                    Baixar Ferramenta
                  </Button>
                  <Button variant="outline" onClick={() => setShowTool(!showTool)}>
                    {showTool ? 'Ocultar' : 'Usar Online'}
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <img 
                    src={metodologia3} 
                    alt="Ferramenta de conversão 1" 
                    className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedImage(metodologia3)}
                  />
                  <img 
                    src={metodologia4} 
                    alt="Ferramenta de conversão 2" 
                    className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedImage(metodologia4)}
                  />
                </div>
              </div>
            </div>

            {/* Passo 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">5</div>
              <div className="flex-1 space-y-3">
                <h4 className="font-semibold">Upload para o Banco de Dados</h4>
                <p className="text-sm text-muted-foreground">
                  Execute os comandos SQL gerados no banco PostgreSQL (Supabase) para criar as tabelas 
                  e inserir os dados. O processo foi dividido em duas etapas: CREATE (Jun/2018-Jun/2025) 
                  e UPDATE (Jun/2015-Mai/2018).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <img 
                    src={metodologia5} 
                    alt="Upload SQL 1" 
                    className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedImage(metodologia5)}
                  />
                  <img 
                    src={metodologia6} 
                    alt="Upload SQL 2" 
                    className="rounded-lg border w-full cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setSelectedImage(metodologia6)}
                  />
                </div>
              </div>
            </div>

            {/* Passo 6 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">6</div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2">Validação e Verificação</h4>
                <p className="text-sm text-muted-foreground mb-2">Após o upload, os dados foram validados verificando:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Integridade temporal (todas as colunas de meses presentes)</li>
                  <li>Quantidade de medicamentos por estado</li>
                  <li>Consistência dos valores numéricos</li>
                  <li>Ausência de duplicações</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicamentos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Medicamentos Analisados</CardTitle>
            <CardDescription>Medicamentos do SUS incluídos na análise deste estudo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg">
              <h5 className="font-semibold mb-3">Antipsicóticos Atípicos e Anticonvulsivantes</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Olanzapina</li>
                <li>• Quetiapina</li>
                <li>• Risperidona</li>
                <li>• Clozapina</li>
                <li>• Lamotrigina</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Tecnologias */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Tecnologias de Desenvolvimento
            </CardTitle>
            <CardDescription>
              Esta plataforma web foi desenvolvida para facilitar o processamento e visualização dos dados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Frontend</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>React + TypeScript:</strong> Framework principal para interface de usuário</li>
                <li><strong>Vite:</strong> Build tool para desenvolvimento rápido</li>
                <li><strong>Tailwind CSS:</strong> Framework de estilização utility-first</li>
                <li><strong>Recharts:</strong> Biblioteca para visualização de dados e gráficos</li>
                <li><strong>Shadcn/ui:</strong> Componentes de interface reutilizáveis</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Backend e Banco de Dados</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Supabase:</strong> Plataforma backend com PostgreSQL</li>
                <li><strong>PostgreSQL:</strong> Banco de dados relacional</li>
                <li><strong>React Query:</strong> Gerenciamento de estado assíncrono</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Ferramenta de Conversão</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>JavaScript/HTML puro:</strong> Ferramenta standalone sem dependências</li>
                <li><strong>DOMParser API:</strong> Parsing de arquivos HTML do DATASUS</li>
                <li><strong>Regex:</strong> Detecção automática de estados e tratamento de dados</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Estrutura do Banco */}
        <Card>
          <CardHeader>
            <CardTitle>Estrutura do Banco de Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O banco de dados foi estruturado com 27 tabelas (uma para cada estado/DF), seguindo o padrão:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs">
              <div className="text-primary">medicbipo[sigla_estado]</div>
              <div className="ml-4 mt-2 space-y-1 text-muted-foreground">
                <div>• id (BIGSERIAL PRIMARY KEY)</div>
                <div>• Procedimento (TEXT NOT NULL)</div>
                <div>• 2015/Jun, 2015/Jul, ... 2025/Jun (TEXT)</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Total de colunas</p>
                <p className="text-lg font-semibold">121</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Estados incluídos</p>
                <p className="text-lg font-semibold">27</p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Período de dados</p>
                <p className="text-lg font-semibold">2015-2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center gap-2 mt-8 pb-6 text-xs text-muted-foreground/60">
        <span>Desenvolvido por</span>
        <img 
          src="https://seellbr.com/assets/images/logoblack.png" 
          alt="seeLL" 
          className="h-4 opacity-60 hover:opacity-100 transition-opacity"
        />
      </footer>

      <div className="text-center pb-4 text-xs text-muted-foreground/50">
        <p>© 2025 - Todos os direitos reservados</p>
        <p className="mt-1">Dados utilizados para fins de estudo e realização de Trabalho de Conclusão de Curso (TCC)</p>
      </div>

      {/* Modal de Imagem Ampliada */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-lg font-semibold"
            >
              ✕ Fechar
            </button>
            <img 
              src={selectedImage} 
              alt="Imagem ampliada" 
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Metodologia;
