import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, TrendingUp, PieChart, Calendar, BarChart3, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import unicesumarLogo from '@/assets/unicesumar-logo.png';

const LogicaCalculo = () => {
  const navigate = useNavigate();

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
              <Calculator className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-3xl">Lógica de Cálculo dos Gráficos</CardTitle>
                <CardDescription className="text-base mt-2">
                  Detalhamento matemático e estatístico de todas as análises apresentadas
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          {/* Evolução Temporal - TimeSeriesChart */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>1. Evolução Temporal (Time Series Chart)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Visualizar a tendência de consumo de medicamentos ao longo do tempo (Jun/2015 - Jun/2025).
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p>Para cada medicamento e cada mês:</p>
                  <p className="ml-4">Consumo<sub>medicamento,mês</sub> = Soma de todas as unidades dispensadas naquele mês</p>
                  <p className="mt-3">Dados agregados por:</p>
                  <p className="ml-4">• Estado (tabelas individuais por UF)</p>
                  <p className="ml-4">• Região (soma de estados da região)</p>
                  <p className="ml-4">• Brasil (soma de todos os estados)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Fonte de Dados:</h4>
                <p className="text-muted-foreground">
                  Sistema de Informações Ambulatoriais do SUS (SIA/SUS) via TabWin, com dados extraídos mensalmente.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Impacto da Pandemia */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle>2. Impacto da Pandemia (Pandemic Impact Chart)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Comparar o consumo médio antes e durante/após a pandemia de COVID-19.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p>Período Pré-Pandemia: Jun/2015 - Fev/2020</p>
                  <p className="ml-4">Média<sub>pré</sub> = Σ(Consumo<sub>mês</sub>) / N<sub>meses_pré</sub></p>
                  
                  <p className="mt-3">Período Pandêmico: Mar/2020 - Jun/2025</p>
                  <p className="ml-4">Média<sub>pandemia</sub> = Σ(Consumo<sub>mês</sub>) / N<sub>meses_pandemia</sub></p>
                  
                  <p className="mt-3">Variação Percentual:</p>
                  <p className="ml-4">Δ% = ((Média<sub>pandemia</sub> - Média<sub>pré</sub>) / Média<sub>pré</sub>) × 100</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribuição Geográfica */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Map className="h-6 w-6 text-primary" />
                <CardTitle>3. Distribuição Geográfica (Choropleth Map)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Visualizar o consumo per capita por estado brasileiro no período 2015-2024.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p><strong>IMPORTANTE:</strong> Cálculo per capita é feito ANO A ANO!</p>
                  
                  <p className="mt-3">Para cada estado e cada ano (2015-2024):</p>
                  <p className="ml-4">Consumo<sub>estado,ano</sub> = Σ(Consumo mensal de todos os medicamentos no ano)</p>
                  <p className="ml-4">População<sub>estado,ano</sub> = População IBGE do estado naquele ano específico</p>
                  <p className="ml-4">Per Capita<sub>estado,ano</sub> = (Consumo<sub>estado,ano</sub> / População<sub>estado,ano</sub>) × 100.000</p>
                  
                  <p className="mt-3">Per capita agregado do período:</p>
                  <p className="ml-4">Per Capita Médio<sub>estado</sub> = Σ(Per Capita<sub>estado,ano</sub> × População<sub>estado,ano</sub>) / Σ(População<sub>estado,ano</sub>)</p>
                  <p className="ml-4 text-xs">(média ponderada pela população, em unidades por 100 mil habitantes)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Escala de Cores:</h4>
                <p className="text-muted-foreground">
                  Gradiente de cor proporcional ao consumo per capita médio, permitindo identificação visual rápida de disparidades regionais.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consumo Per Capita Regional */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>4. Consumo Per Capita por Região</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Comparar o consumo per capita entre as cinco regiões brasileiras no período 2015-2024.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p><strong>IMPORTANTE:</strong> Cálculo per capita é feito ANO A ANO!</p>
                  
                  <p className="mt-3">Para cada região e cada ano (2015-2024):</p>
                  <p className="ml-4">Consumo<sub>região,ano</sub> = Σ(Consumo de todos os estados da região no ano)</p>
                  <p className="ml-4">População<sub>região,ano</sub> = Σ(População de todos os estados da região naquele ano)</p>
                  <p className="ml-4">Per Capita<sub>região,ano</sub> = (Consumo<sub>região,ano</sub> / População<sub>região,ano</sub>) × 100.000</p>
                  
                  <p className="mt-3">Per capita agregado do período:</p>
                  <p className="ml-4">Per Capita Médio<sub>região</sub> = Σ(Per Capita<sub>região,ano</sub> × População<sub>região,ano</sub>) / Σ(População<sub>região,ano</sub>)</p>
                  
                  <p className="mt-3">Ranking:</p>
                  <p className="ml-4">Ordenação decrescente por Per Capita Médio<sub>região</sub></p>
                  <p className="ml-4 text-xs">(média ponderada pela população, em unidades por 100 mil habitantes)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Por que essa metodologia?</h4>
                <p className="text-muted-foreground">
                  Usar a população específica de cada ano garante que mudanças populacionais ao longo do tempo sejam 
                  corretamente consideradas. A média ponderada evita distorções causadas por anos com populações muito diferentes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sazonalidade */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>5. Análise de Sazonalidade</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Identificar padrões mensais de consumo ao longo do ano.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p>Para cada mês do ano (Janeiro a Dezembro):</p>
                  
                  <p className="mt-2">Consumo Médio<sub>mês</sub> = Σ(Consumo<sub>mês,ano</sub>) / N<sub>anos</sub></p>
                  <p className="ml-4 text-xs">onde N<sub>anos</sub> = número de anos no dataset (2015-2025)</p>
                  
                  <p className="mt-3">Agregação por medicamento:</p>
                  <p className="ml-4">Para cada medicamento, calcula-se a média mensal considerando todos os anos</p>
                  
                  <p className="mt-3">Índice de Sazonalidade:</p>
                  <p className="ml-4">Identifica picos e vales no consumo ao longo do ciclo anual</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Distribuição por Medicamento */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <PieChart className="h-6 w-6 text-primary" />
                <CardTitle>6. Distribuição por Medicamento (Proportion Chart)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Mostrar a proporção relativa de cada medicamento no consumo total.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p>Consumo Total = Σ(Consumo de todos os medicamentos no período selecionado)</p>
                  
                  <p className="mt-3">Para cada medicamento:</p>
                  <p className="ml-4">Proporção<sub>medicamento</sub> = (Consumo<sub>medicamento</sub> / Consumo Total) × 100</p>
                  
                  <p className="mt-3">Validação:</p>
                  <p className="ml-4">Σ(Proporção<sub>medicamento</sub>) = 100%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ranking de Estados */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle>7. Ranking de Consumo por Estado</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Classificar os estados brasileiros por consumo total de medicamentos para TAB.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p>Para cada estado:</p>
                  <p className="ml-4">Consumo Absoluto<sub>estado</sub> = Σ(Consumo mensal de todos os medicamentos em todo o período)</p>
                  
                  <p className="mt-3">Ordenação:</p>
                  <p className="ml-4">Ranking decrescente por Consumo Absoluto<sub>estado</sub></p>
                  
                  <p className="mt-3">Proporção do Total Nacional:</p>
                  <p className="ml-4">% Nacional<sub>estado</sub> = (Consumo<sub>estado</sub> / Consumo<sub>Brasil</sub>) × 100</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Análise de Tendência */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>8. Análise de Tendência (Trend Chart)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Objetivo:</h4>
                <p className="text-muted-foreground">
                  Identificar tendências de crescimento, estabilização ou redução no consumo.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Cálculo:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 font-mono text-sm">
                  <p>Regressão Linear Simples:</p>
                  <p className="ml-4">y = a + bx</p>
                  <p className="ml-4 text-xs">onde:</p>
                  <p className="ml-8 text-xs">y = consumo mensal</p>
                  <p className="ml-8 text-xs">x = tempo (mês sequencial)</p>
                  <p className="ml-8 text-xs">a = intercepto</p>
                  <p className="ml-8 text-xs">b = coeficiente angular (tendência)</p>
                  
                  <p className="mt-3">Interpretação do coeficiente b:</p>
                  <p className="ml-4">b &gt; 0: Tendência de crescimento</p>
                  <p className="ml-4">b ≈ 0: Tendência de estabilização</p>
                  <p className="ml-4">b &lt; 0: Tendência de redução</p>
                  
                  <p className="mt-3">Taxa de Crescimento Anual:</p>
                  <p className="ml-4">Crescimento % = (b × 12 / Média) × 100</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Considerações Metodológicas */}
          <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
            <CardHeader>
              <CardTitle className="text-amber-800 dark:text-amber-200">
                Considerações Metodológicas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold mb-1">1. Tratamento de Dados Faltantes:</h4>
                <p className="text-muted-foreground">
                  Valores nulos ou não reportados são tratados como zero. Isso pode subestimar o consumo real em alguns períodos.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">2. Conversão de Formatos Numéricos:</h4>
                <p className="text-muted-foreground">
                  Dados do TabWin utilizam separadores brasileiros (ponto para milhar, vírgula para decimal). 
                  Todo processamento é feito após conversão para formato numérico padrão.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">3. Agregação de Medicamentos:</h4>
                <p className="text-muted-foreground">
                  Medicamentos podem ser visualizados individualmente (por dosagem) ou agrupados por substância ativa.
                  No modo agrupado, soma-se o consumo de todas as apresentações/dosagens.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">4. Dados Populacionais:</h4>
                <p className="text-muted-foreground">
                  População baseada em estimativas do IBGE (Censo 2022 e projeções 2023-2024).
                  Para análises per capita, utiliza-se a população média do período analisado.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">5. Precisão Temporal:</h4>
                <p className="text-muted-foreground">
                  Os dados são agregados mensalmente. Análises diárias ou semanais não são possíveis com o dataset atual.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground text-center">
                Todos os cálculos foram implementados utilizando JavaScript/TypeScript com validações de tipo e 
                tratamento robusto de erros. O código-fonte está disponível para auditoria e validação dos métodos estatísticos empregados.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LogicaCalculo;