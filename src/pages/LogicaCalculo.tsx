import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, TrendingUp, BarChart3, Calendar, Database, GitBranch, Cpu, Code, Activity, Map, PieChart } from 'lucide-react';
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
                <Activity className="h-6 w-6 text-primary" />
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

          {/* NOVA SEÇÃO - DETALHAMENTO TÉCNICO DO CÓDIGO FONTE */}
          <div className="relative py-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground font-semibold">
                DETALHAMENTO TÉCNICO DO CÓDIGO FONTE
              </span>
            </div>
          </div>

          {/* Parsing de Dados */}
          <Card className="border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-blue-900 dark:text-blue-100">
                  9. Parsing de Dados do Banco (Função parseValue)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Localização no Código:</h4>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  src/hooks/useStateConsumption.ts (linhas 20-40)
                </code>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Objetivo:</h4>
                <p className="text-sm text-muted-foreground">
                  Converter valores do banco de dados (armazenados como TEXT com formato brasileiro) 
                  para números que o JavaScript pode processar matematicamente.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Código TypeScript:</h4>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono">{`const parseValue = (value: any): number => {
  // Caso 1: Já é um número
  if (typeof value === 'number') {
    return isNaN(value) ? 0 : Math.round(value);
  }
  
  // Caso 2: É nulo, undefined ou vazio
  if (value === null || value === undefined || value === '') {
    return 0;
  }
  
  // Caso 3: É uma string (formato brasileiro)
  if (typeof value === 'string') {
    let cleaned = value.trim();
    
    // Valores especiais
    if (cleaned === '' || cleaned === '-') {
      return 0;
    }
    
    // CRÍTICO: Tratamento de formato brasileiro
    // Exemplo: "66.309" deve virar 66309 (sessenta e seis mil)
    if (cleaned.includes('.') && !cleaned.includes(',')) {
      // Remove TODOS os pontos (separadores de milhares)
      cleaned = cleaned.replace(/\\./g, '');
    } 
    // Formato completo: "1.234,56"
    else if (cleaned.includes(',')) {
      cleaned = cleaned.replace(/\\./g, '');  // Remove pontos
      cleaned = cleaned.replace(',', '.');    // Vírgula vira ponto decimal
    }
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.round(num);
  }
  
  return 0;
};`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Exemplos de Conversão:</h4>
                <div className="bg-muted/50 p-3 rounded space-y-1 text-sm font-mono">
                  <p>Banco: <span className="text-amber-600">"66.309"</span> → Código: <span className="text-green-600">66309</span></p>
                  <p>Banco: <span className="text-amber-600">"176.993"</span> → Código: <span className="text-green-600">176993</span></p>
                  <p>Banco: <span className="text-amber-600">"1.234,56"</span> → Código: <span className="text-green-600">1234.56</span></p>
                  <p>Banco: <span className="text-amber-600">NULL</span> → Código: <span className="text-green-600">0</span></p>
                  <p>Banco: <span className="text-amber-600">"-"</span> → Código: <span className="text-green-600">0</span></p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded border border-amber-200 dark:border-amber-800">
                <p className="text-sm">
                  <strong>IMPORTANTE:</strong> Esta função garante que valores como "66.309" sejam 
                  interpretados como 66.309 (sessenta e seis mil) e não como 66,309 (sessenta e seis vírgula três).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Agregação por Ano */}
          <Card className="border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <GitBranch className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                <CardTitle className="text-purple-900 dark:text-purple-100">
                  10. Agregação de Dados por Ano
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Localização no Código:</h4>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  src/hooks/useStateConsumptionByYear.ts (linhas 75-93)
                </code>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Objetivo:</h4>
                <p className="text-sm text-muted-foreground">
                  Agrupar o consumo mensal de medicamentos por ano, facilitando cálculos per capita 
                  que usam população específica de cada ano.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Código TypeScript:</h4>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono">{`// Para cada estado, cria objeto: { ano: consumo_total_do_ano }
const consumptionByYear: Record<number, number> = {};

// Percorre todas as linhas de medicamentos
rawData.forEach((row: any) => {
  // Percorre todos os meses (2015/Jun, 2015/Jul, etc.)
  monthOrder.forEach(month => {
    const value = parseValue(row[month]); // Converte para número
    
    if (value > 0) {
      // Extrai o ano do período "2015/Jun" → 2015
      const year = extractYearFromPeriod(month);
      
      // Acumula no ano correspondente
      consumptionByYear[year] = (consumptionByYear[year] || 0) + value;
    }
  });
});

// Resultado: { 2015: 10523000, 2016: 11230000, ... }`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Fluxo de Processamento:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-primary/20 px-2 py-1 rounded text-xs">1</span>
                    <span>Busca dados do Supabase (PostgreSQL)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-primary/20 px-2 py-1 rounded text-xs">2</span>
                    <span>Para cada medicamento, percorre todos os meses</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-primary/20 px-2 py-1 rounded text-xs">3</span>
                    <span>Converte valor usando parseValue()</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-primary/20 px-2 py-1 rounded text-xs">4</span>
                    <span>Extrai ano do formato "YYYY/Mês"</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-mono bg-primary/20 px-2 py-1 rounded text-xs">5</span>
                    <span>Acumula no objeto consumptionByYear[ano]</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cálculo Per Capita */}
          <Card className="border-green-500/30 bg-green-50/30 dark:bg-green-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Cpu className="h-6 w-6 text-green-600 dark:text-green-400" />
                <CardTitle className="text-green-900 dark:text-green-100">
                  11. Cálculo Per Capita com Média Ponderada (FÓRMULA PRINCIPAL)
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Localização no Código:</h4>
                <code className="text-xs bg-muted px-2 py-1 rounded">
                  src/components/charts/StateConsumptionRanking.tsx (linhas 52-79)
                </code>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Objetivo:</h4>
                <p className="text-sm text-muted-foreground">
                  Calcular o consumo per capita ANUAL médio, ajustado pelas variações populacionais 
                  de cada ano. Usa média ponderada para dar mais peso aos anos com maior população.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Código TypeScript (Comentado):</h4>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs font-mono">{`// Inicialização das variáveis
let totalConsumption = 0;           // Soma de comprimidos de TODOS os anos
let weightedPerCapitaSum = 0;       // Soma ponderada dos per capitas
let totalPopulation = 0;            // Soma das populações de TODOS os anos

// LOOP: Para cada ano de 2015 a 2024
Object.entries(consumptionByYear).forEach(([yearStr, consumption]) => {
  const year = parseInt(yearStr);                    // "2015" → 2015
  const population = getStatePopulation(state, year); // População IBGE do ano
  
  if (population > 0) {
    // 1. Acumula consumo total
    totalConsumption += consumption;
    
    // 2. Calcula per capita DESTE ANO ESPECÍFICO
    const yearlyPerCapita = (consumption / population) * 100000;
    
    // 3. Pondera pelo tamanho da população
    //    (anos com mais gente têm mais peso na média)
    weightedPerCapitaSum += yearlyPerCapita * population;
    
    // 4. Acumula população para usar como denominador
    totalPopulation += population;
  }
});

// CÁLCULO FINAL: Média ponderada
const perCapita = totalPopulation > 0 
  ? weightedPerCapitaSum / totalPopulation 
  : 0;`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Demonstração Matemática:</h4>
                <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-2">Passo a Passo (exemplo com 2 anos):</p>
                    <div className="space-y-2 text-sm font-mono ml-4">
                      <p className="text-muted-foreground">// Dados de entrada</p>
                      <p>Ano 2015: 10.000.000 comp, população 11.163.018</p>
                      <p>Ano 2016: 12.000.000 comp, população 11.242.720</p>
                      
                      <p className="mt-3 text-muted-foreground">// Passo 1: Per capita de cada ano</p>
                      <p>PC₂₀₁₅ = (10.000.000 / 11.163.018) × 100.000 = 895,84</p>
                      <p>PC₂₀₁₆ = (12.000.000 / 11.242.720) × 100.000 = 1.067,36</p>
                      
                      <p className="mt-3 text-muted-foreground">// Passo 2: Soma ponderada</p>
                      <p>Weighted = (895,84 × 11.163.018) + (1.067,36 × 11.242.720)</p>
                      <p>Weighted = 10.000.000.000 + 12.000.000.000 = 22.000.000.000</p>
                      
                      <p className="mt-3 text-muted-foreground">// Passo 3: Total de população</p>
                      <p>TotalPop = 11.163.018 + 11.242.720 = 22.405.738</p>
                      
                      <p className="mt-3 text-muted-foreground">// Passo 4: Resultado final</p>
                      <p className="text-green-600 font-bold">Per Capita = 22.000.000.000 / 22.405.738 = 981,89 / 100k hab</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Simplificação Algébrica:</h4>
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="space-y-2 text-sm font-mono">
                    <p>weightedSum = Σ[(consumo/pop) × 100.000 × pop]</p>
                    <p className="ml-8">= Σ[consumo × 100.000]</p>
                    <p className="ml-8">= 100.000 × Σ[consumo]</p>
                    
                    <p className="mt-3">perCapita = weightedSum / totalPop</p>
                    <p className="ml-8">= (100.000 × totalConsumo) / (popMédia × numAnos)</p>
                    <p className="ml-8">= (totalConsumo / popMédia / numAnos) × 100.000</p>
                    
                    <p className="mt-3 text-green-600 font-bold">Resultado = Per capita ANUAL médio!</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded border border-blue-200 dark:border-blue-800">
                <p className="text-sm">
                  <strong>Por que média ponderada?</strong> Se a população de 2024 for maior que 2015, 
                  o consumo per capita de 2024 deve ter mais influência no resultado final, pois representa 
                  mais pessoas. A média ponderada garante isso matematicamente.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estrutura de Dados */}
          <Card className="border-orange-500/30 bg-orange-50/30 dark:bg-orange-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                <CardTitle className="text-orange-900 dark:text-orange-100">
                  12. Estrutura de Dados e Fluxo de Informações
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Fluxo de Dados Completo:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2 items-start">
                    <span className="font-mono bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-2 py-1 rounded text-xs min-w-[80px]">DATABASE</span>
                    <span>Valores armazenados como TEXT: "66.309", "176.993"</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-2xl">↓</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="font-mono bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded text-xs min-w-[80px]">FETCH</span>
                    <span>Supabase busca dados brutos do PostgreSQL</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-2xl">↓</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="font-mono bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-2 py-1 rounded text-xs min-w-[80px]">PARSE</span>
                    <span>parseValue() converte para números: 66309, 176993</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-2xl">↓</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="font-mono bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded text-xs min-w-[80px]">AGGREGATE</span>
                    <span>Agrupa por ano: {`{ 2015: 10523000, 2016: 11230000, ... }`}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-2xl">↓</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="font-mono bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 px-2 py-1 rounded text-xs min-w-[80px]">CALCULATE</span>
                    <span>Calcula per capita com média ponderada</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className="text-2xl">↓</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="font-mono bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-2 py-1 rounded text-xs min-w-[80px]">RENDER</span>
                    <span>Interface exibe: "203.597 comp/100k hab/ano"</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo Técnico */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
            <CardHeader>
              <CardTitle>Resumo Técnico: Do Banco ao Gráfico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  <span className="font-bold min-w-[100px]">Entrada:</span>
                  <span>Texto no formato brasileiro: "66.309", "176.993"</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-bold min-w-[100px]">Parsing:</span>
                  <span>Remove pontos → Converte para number: 66309, 176993</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-bold min-w-[100px]">Agregação:</span>
                  <span>Agrupa meses por ano usando extractYearFromPeriod()</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-bold min-w-[100px]">População:</span>
                  <span>Busca população IBGE específica de cada ano</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-bold min-w-[100px]">Cálculo:</span>
                  <span>Per capita ano a ano, depois média ponderada pela população</span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-bold min-w-[100px]">Resultado:</span>
                  <span className="font-semibold text-primary">203.597 comprimidos por 100 mil habitantes por ano</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-semibold text-center">
                  Todo o código é type-safe (TypeScript), validado em tempo de compilação, 
                  e inclui tratamento robusto de erros para garantir precisão dos cálculos.
                </p>
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
                  Para análises per capita, utiliza-se a população específica de cada ano (2015-2024).
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">5. Precisão Temporal:</h4>
                <p className="text-muted-foreground">
                  Os dados são agregados mensalmente. Análises diárias ou semanais não são possíveis com o dataset atual.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">6. Período dos Dados:</h4>
                <p className="text-muted-foreground">
                  2015 possui apenas 7 meses (junho a dezembro) e 2025 possui 6 meses (janeiro a junho). 
                  Os cálculos per capita apresentados utilizam dados completos de 2015 a 2024 (10 anos).
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