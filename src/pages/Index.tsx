import { useState, useEffect, useMemo } from 'react';
import { useMedicData } from '@/hooks/useMedicData';
import { useMedicGrouping } from '@/hooks/useMedicGrouping';
import { DataSelector, ViewMode } from '@/components/DataSelector';
import { STATES, StateCode, RegionName, getStatesByRegion } from '@/constants/states';
// ... rest of imports

const Index = () => {
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
              {selectedLabel} • Jun/2018 - Jun/2025 • Dados TabWin/SUS
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 md:pt-28 py-4 md:py-8 space-y-6 md:space-y-8">
        {/* ... Card de Informações ... */}

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

        {/* ... resto dos componentes ... */}
      </main>
    </div>
  );
};

export default Index;