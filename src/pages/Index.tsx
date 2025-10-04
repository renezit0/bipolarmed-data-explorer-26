import { useState, useEffect, useCallback } from 'react';
import { useMedicData } from '@/hooks/useMedicData';
import { useMedicGrouping, GroupingMode } from '@/hooks/useMedicGrouping';
import { DataSelector, ViewMode } from '@/components/DataSelector';
import { STATES, StateCode } from '@/constants/states';
import { TrendChart } from '@/components/charts/TrendChart';
import { TrendAnalysis } from '@/components/charts/TrendAnalysis';
import { ProportionChart } from '@/components/charts/ProportionChart';
import { SeasonalityChart } from '@/components/charts/SeasonalityChart';
import { SeasonalityAnalysis } from '@/components/charts/SeasonalityAnalysis';
import { MonthlyDistributionChart } from '@/components/charts/MonthlyDistributionChart';
import { DistributionAnalysis } from '@/components/charts/DistributionAnalysis';
import { TotalQuantityChart } from '@/components/charts/TotalQuantityChart';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';
import { MedicationDetails } from '@/components/MedicationDetails';
import { AnalysisCommentary } from '@/components/AnalysisCommentary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, BarChart3 } from 'lucide-react';
import kauanPhoto from '@/assets/kauan.png';
import flavioPhoto from '@/assets/flavio.jpeg';
import julianePhoto from '@/assets/juliane.png';

const Index = () => {
  // Estado para gerenciar seleção de dados - Inicia com TODOS os estados do Brasil
  const allStateTables = Object.values(STATES).map(s => s.table);
  const [selectedTables, setSelectedTables] = useState<string[]>(allStateTables);
  const [selectedLabel, setSelectedLabel] = useState<string>('Brasil (Todos os Estados)');
  
  // Usar useCallback para evitar recriar a função a cada render
  const handleSelectionChange = useCallback((config: {
    mode: ViewMode;
    tables: string[];
    labels: string[];
  }) => {
    setSelectedTables(config.tables);
    setSelectedLabel(config.labels[0]);
  }, []);

  const {
    data,
    loading,
    error
  } = useMedicData(selectedTables);
  
  const {
    groupingMode,
    setGroupingMode,
    processedData,
    isGrouped
  } = useMedicGrouping(data || []);

  // Estado para controlar visibilidade do header
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hook para detectar scroll e esconder/mostrar header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Carregando dados...</h2>
          <p className="text-muted-foreground">Processando informações do TabWin/SUS</p>
        </div>
      </div>;
  }

  if (error) {
    return <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Erro ao carregar dados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>;
  }

  return <div className="min-h-screen bg-background">
      {/* Header - Aparece/desaparece no scroll */}
      <header className={`fixed top-0 left-0 right-0 border-b border-border/50 bg-card/90 backdrop-blur-md z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container px-4 md:py-4 py-[10px]">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold text-primary mb-2">
              Análise de Dados: Medicamentos para Transtorno Bipolar
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-1">
              {selectedLabel} • Jun/2018 - Jun/2025 • Dados TabWin/SUS
            </p>
          </div>
        </div>
      </header>

      {/* Main Content - Com espaçamento para o header fixo */}
      <main className="container mx-auto px-4 pt-24 md:pt-28 py-4 md:py-8 space-y-6 md:space-y-8">
        {/* Informações do estudo - Com fotos dos autores */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-primary mb-4">
              Informações do Estudo
            </h2>
            <div className="space-y-4">
              <div className="text-sm md:text-base text-muted-foreground">
                <p className="mb-3">
                  <strong>TCC:</strong> BASES CIENTÍFICAS DO TRANSTORNO BIPOLAR: UMA ANÁLISE INTEGRATIVA DOS ASPECTOS GENÉTICOS, CLÍNICOS E FARMACOTERAPÊUTICOS
                </p>
                <p className="mb-3">
                  <strong>Instituição:</strong> Universidade Cesumar (UNICESUMAR) • Curso de Farmácia • 2025
                </p>
                <p>
                  <strong>Fonte dos Dados:</strong> Sistema de Informações Ambulatoriais do SUS (SIA/SUS) via TabWin
                </p>
              </div>
              
              {/* Equipe do projeto */}
              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-foreground mb-4 text-center">Equipe do Projeto</h3>
                
                <div className="bg-background rounded-lg p-6 border border-border/30">
                  <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                    {/* Autor 1 */}
                    <div className="flex flex-col items-center gap-3 text-center">
                      <img src={flavioPhoto} alt="Flávio Renê Pereira da Silva" className="w-24 h-24 rounded-full object-cover border-4 border-primary/30 shadow-lg" />
                      <div>
                        <p className="font-semibold text-foreground">Flávio Renê Pereira da Silva</p>
                        <p className="text-sm text-muted-foreground">Acadêmico de Farmácia</p>
                      </div>
                    </div>
                    
                    {/* Autor 2 */}
                    <div className="flex flex-col items-center gap-3 text-center">
                      <img src={kauanPhoto} alt="Kauan Munsberg Donato de Souza" className="w-24 h-24 rounded-full object-cover border-4 border-primary/30 shadow-lg" />
                      <div>
                        <p className="font-semibold text-foreground">Kauan Munsberg Donato de Souza</p>
                        <p className="text-sm text-muted-foreground">Acadêmico de Farmácia</p>
                      </div>
                    </div>
                    
                    {/* Orientadora */}
                    <div className="flex flex-col items-center gap-3 text-center">
                      <img src={julianePhoto} alt="Juliane Nadal Swiech" className="w-24 h-24 rounded-full object-cover border-4 border-accent/30 shadow-lg" />
                      <div>
                        <p className="font-semibold text-foreground">Juliane Nadal Swiech</p>
                        <p className="text-sm text-muted-foreground">Professora Orientadora</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seletor de Dados */}
        <DataSelector onSelectionChange={handleSelectionChange} />

        {/* Debug Info - REMOVER DEPOIS */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <h3 className="font-bold text-sm mb-2">🔍 Debug Info:</h3>
              <div className="text-xs space-y-1 font-mono">
                <p><strong>Tabelas selecionadas:</strong> {selectedTables.length}</p>
                <p><strong>Label:</strong> {selectedLabel}</p>
                <p><strong>Medicamentos carregados:</strong> {data.length}</p>
                <p><strong>Loading:</strong> {loading ? 'Sim' : 'Não'}</p>
                {data.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer font-bold">Ver medicamentos</summary>
                    <ul className="ml-4 mt-1">
                      {data.map((m, i) => (
                        <li key={i}>
                          {m.simplifiedName} - {m.totalConsumption.toLocaleString()} unidades
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Controles de Agrupamento */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Visualização dos Dados</h3>
                <p className="text-sm text-muted-foreground">
                  Escolha como visualizar os medicamentos nos gráficos
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant={groupingMode === 'individual' ? 'default' : 'outline'} size="sm" onClick={() => setGroupingMode('individual')} className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Individual
                </Button>
                <Button variant={groupingMode === 'grouped' ? 'default' : 'outline'} size="sm" onClick={() => setGroupingMode('grouped')} className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Agrupado
                </Button>
              </div>
            </div>
            {isGrouped && <div className="mt-3 pt-3 border-t">
                <Badge variant="secondary" className="text-xs">
                  Medicamentos agrupados por substância ativa (ex: todas as Quetiapinas juntas)
                </Badge>
              </div>}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:gap-8">
          {/* Gráfico de Tendências com Análise */}
          <TrendChart data={processedData as any} />
          <TrendAnalysis data={data} />
          
          {/* Gráfico de Proporções */}
          <ProportionChart data={processedData as any} />
          
          {/* Gráfico de Sazonalidade com Análise */}
          <SeasonalityChart data={processedData as any} />
          <SeasonalityAnalysis data={data} />
          
          {/* Gráficos secundários - Responsivo */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            <MonthlyDistributionChart data={processedData as any} />
            <TimeSeriesChart data={processedData as any} />
          </div>
          
          {/* Análise da Distribuição */}
          <DistributionAnalysis data={data} />
          
          {/* Gráfico de quantidade total - Full width */}
          <TotalQuantityChart data={processedData as any} />

          {/* Análise Geral das quedas */}
          <AnalysisCommentary data={data} />
          
          {/* Detalhes dos Medicamentos - Movido para o final */}
          <MedicationDetails data={data} />
        </div>
      </main>
    </div>;
};

export default Index;