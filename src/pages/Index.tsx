import { useState, useEffect, useMemo } from 'react';
import { useMedicData } from '@/hooks/useMedicData';
import { useMedicGrouping } from '@/hooks/useMedicGrouping';
import { useStateConsumption } from '@/hooks/useStateConsumption';
import { DataSelector, ViewMode } from '@/components/DataSelector';
import { STATES, StateCode, RegionName, getStatesByRegion } from '@/constants/states';
import { TrendChart } from '@/components/charts/TrendChart';
import { ProportionChart } from '@/components/charts/ProportionChart';
import { SeasonalityChart } from '@/components/charts/SeasonalityChart';
import { MonthlyDistributionChart } from '@/components/charts/MonthlyDistributionChart';
import { TotalQuantityChart } from '@/components/charts/TotalQuantityChart';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';
import { StateConsumptionRanking } from '@/components/charts/StateConsumptionRanking';
import { MedicationDetails } from '@/components/MedicationDetails';
import { TccDataSection } from '@/components/tcc-data/TccDataSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Users, BarChart3, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import kauanPhoto from '@/assets/kauan.png';
import flavioPhoto from '@/assets/flavio.jpeg';
import julianePhoto from '@/assets/juliane.png';

const Index = () => {
  const navigate = useNavigate();
  // TODOS os estados no Index.tsx
  const [viewMode, setViewMode] = useState<ViewMode>('single-region');
  const [selectedState1, setSelectedState1] = useState<StateCode>('pr');
  const [selectedState2, setSelectedState2] = useState<StateCode>('sp');
  const [selectedRegion1, setSelectedRegion1] = useState<RegionName>('Brasil');
  const [selectedRegion2, setSelectedRegion2] = useState<RegionName>('Sudeste');

  // Calcular tables e labels baseado no estado
  const { selectedTables, selectedLabel } = useMemo(() => {
    let tables: string[] = [];
    let label = '';

    console.log('🎯 Calculando seleção:', viewMode);

    if (viewMode === 'single-state') {
      tables = [STATES[selectedState1].table];
      label = STATES[selectedState1].name;
    } else if (viewMode === 'compare-states') {
      tables = [STATES[selectedState1].table, STATES[selectedState2].table];
      label = `${STATES[selectedState1].name} vs ${STATES[selectedState2].name}`;
    } else if (viewMode === 'single-region') {
      tables = getStatesByRegion(selectedRegion1).map(code => STATES[code].table);
      label = selectedRegion1 === 'Brasil' ? 'Brasil (Todos os Estados)' : selectedRegion1;
    } else if (viewMode === 'compare-regions') {
      const region1States = getStatesByRegion(selectedRegion1).map(code => STATES[code].table);
      const region2States = getStatesByRegion(selectedRegion2).map(code => STATES[code].table);
      tables = [...region1States, ...region2States];
      label = `${selectedRegion1} vs ${selectedRegion2}`;
    }

    console.log('✅ Seleção calculada:', { mode: viewMode, tableCount: tables.length, label });
    return { selectedTables: tables, selectedLabel: label };
  }, [viewMode, selectedState1, selectedState2, selectedRegion1, selectedRegion2]);

  const { data, loading, error } = useMedicData(selectedTables);
  const { consumptionByState, loading: loadingStates, error: errorStates } = useStateConsumption();
  
  const {
    groupingMode,
    setGroupingMode,
    processedData,
    isGrouped
  } = useMedicGrouping(data || []);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Carregando dados...</h2>
          <p className="text-muted-foreground">Processando informações do TabWin/SUS</p>
          <p className="text-xs text-muted-foreground mt-2">
            {selectedLabel} - {selectedTables.length} tabela(s)
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Erro ao carregar dados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className={`fixed top-0 left-0 right-0 border-b border-border/50 bg-card/90 backdrop-blur-md z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container px-4 md:py-4 py-[10px]">
          <div className="text-center">
            <h1 className="text-xl md:text-3xl font-bold text-primary mb-2">
              Análise de Dados: Medicamentos para Transtorno Bipolar
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground mb-1">
              {selectedLabel} • Jun/2015 - Jun/2025 • Dados TabWin/SUS
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 md:pt-28 py-4 md:py-8 space-y-6 md:space-y-8">
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
              
              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold text-foreground mb-4 text-center">Equipe do Projeto</h3>
                
                <div className="bg-background rounded-lg p-6 border border-border/30">
                  <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <img src={flavioPhoto} alt="Flávio Renê Pereira da Silva" className="w-24 h-24 rounded-full object-cover border-4 border-primary/30 shadow-lg" />
                      <div>
                        <p className="font-semibold text-foreground">Flávio Renê Pereira da Silva</p>
                        <p className="text-sm text-muted-foreground">Acadêmico de Farmácia</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3 text-center">
                      <img src={kauanPhoto} alt="Kauan Munsberg Donato de Souza" className="w-24 h-24 rounded-full object-cover border-4 border-primary/30 shadow-lg" />
                      <div>
                        <p className="font-semibold text-foreground">Kauan Munsberg Donato de Souza</p>
                        <p className="text-sm text-muted-foreground">Acadêmico de Farmácia</p>
                      </div>
                    </div>
                    
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
              
              <div className="border-t pt-6 mt-6 flex justify-center">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/metodologia')}
                  className="gap-2"
                >
                  <FileText className="h-5 w-5" />
                  Metodologia de Coleta e Processamento de Dados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <DataSelector
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          selectedState1={selectedState1}
          onSelectedState1Change={setSelectedState1}
          selectedState2={selectedState2}
          onSelectedState2Change={setSelectedState2}
          selectedRegion1={selectedRegion1}
          onSelectedRegion1Change={setSelectedRegion1}
          selectedRegion2={selectedRegion2}
          onSelectedRegion2Change={setSelectedRegion2}
        />

        <Card className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
          <CardContent className="p-4">
            <h3 className="font-bold text-sm mb-2">📊 Status Atual:</h3>
            <div className="text-xs space-y-1">
              <p><strong>Região/Estado:</strong> {selectedLabel}</p>
              <p><strong>Tabelas carregadas:</strong> {selectedTables.length}</p>
              <p><strong>Medicamentos encontrados:</strong> {data.length}</p>
              <p><strong>Visualização:</strong> {isGrouped ? 'Agrupada por substância' : 'Individual por dosagem'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Visualização dos Dados</h3>
                <p className="text-sm text-muted-foreground">
                  Escolha como visualizar os medicamentos nos gráficos (não afeta a seleção de estado/região)
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={groupingMode === 'individual' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGroupingMode('individual')} 
                  className="flex items-center gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Individual
                </Button>
                <Button 
                  variant={groupingMode === 'grouped' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGroupingMode('grouped')} 
                  className="flex items-center gap-2"
                >
                  <Users className="h-4 w-4" />
                  Agrupado
                </Button>
              </div>
            </div>
            {isGrouped && (
              <div className="mt-3 pt-3 border-t">
                <Badge variant="secondary" className="text-xs">
                  Medicamentos agrupados por substância ativa (ex: todas as Quetiapinas juntas)
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:gap-8">
          {!loadingStates && !errorStates && Object.keys(consumptionByState).length > 0 && (
            <StateConsumptionRanking consumptionByState={consumptionByState} />
          )}

          <TccDataSection 
            data={processedData as any} 
            consumptionByState={consumptionByState} 
          />
          
          <TrendChart data={processedData as any} />
          <ProportionChart data={processedData as any} />
          <SeasonalityChart data={processedData as any} />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
            <MonthlyDistributionChart data={processedData as any} />
            <TimeSeriesChart data={processedData as any} />
          </div>
          
          <TotalQuantityChart data={processedData as any} />
          <MedicationDetails data={data} />
        </div>
      </main>
    </div>
  );
};

export default Index;