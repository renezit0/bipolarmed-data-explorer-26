import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Globe, GitCompare } from 'lucide-react';
import { STATES, REGIONS, StateCode, RegionName, getStatesByRegion } from '@/constants/states';

export type ViewMode = 'single-state' | 'compare-states' | 'single-region' | 'compare-regions';

interface DataSelectorProps {
  onSelectionChange: (config: {
    mode: ViewMode;
    tables: string[];
    labels: string[];
  }) => void;
}

export const DataSelector = ({ onSelectionChange }: DataSelectorProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('single-region');
  const [selectedState1, setSelectedState1] = useState<StateCode>('pr');
  const [selectedState2, setSelectedState2] = useState<StateCode>('sp');
  const [selectedRegion1, setSelectedRegion1] = useState<RegionName>('Brasil');
  const [selectedRegion2, setSelectedRegion2] = useState<RegionName>('Sudeste');

  const handleModeChange = (mode: ViewMode) => {
    console.log('🔄 Mudando modo de visualização:', mode);
    setViewMode(mode);
    // O useEffect vai aplicar a seleção automaticamente
  };

  const handleState1Change = (value: StateCode) => {
    console.log('📍 Estado 1 alterado:', value);
    setSelectedState1(value);
  };

  const handleState2Change = (value: StateCode) => {
    console.log('📍 Estado 2 alterado:', value);
    setSelectedState2(value);
  };

  const handleRegion1Change = (value: RegionName) => {
    console.log('🌎 Região 1 alterada:', value);
    setSelectedRegion1(value);
  };

  const handleRegion2Change = (value: RegionName) => {
    console.log('🌎 Região 2 alterada:', value);
    setSelectedRegion2(value);
  };

  // UseEffect para aplicar a seleção sempre que qualquer valor mudar
  useEffect(() => {
    let tables: string[] = [];
    let labels: string[] = [];

    switch (viewMode) {
      case 'single-state':
        tables = [STATES[selectedState1].table];
        labels = [STATES[selectedState1].name];
        break;
        
      case 'compare-states':
        tables = [STATES[selectedState1].table, STATES[selectedState2].table];
        labels = [`${STATES[selectedState1].name} vs ${STATES[selectedState2].name}`];
        break;
        
      case 'single-region':
        tables = getStatesByRegion(selectedRegion1).map(code => STATES[code].table);
        labels = [selectedRegion1 === 'Brasil' ? 'Brasil (Todos os Estados)' : selectedRegion1];
        break;
        
      case 'compare-regions':
        const region1States = getStatesByRegion(selectedRegion1).map(code => STATES[code].table);
        const region2States = getStatesByRegion(selectedRegion2).map(code => STATES[code].table);
        tables = [...region1States, ...region2States];
        labels = [`${selectedRegion1} vs ${selectedRegion2}`];
        break;
    }

    console.log('📊 Aplicando seleção:', { mode: viewMode, tables, labels });
    onSelectionChange({ mode: viewMode, tables, labels });
  }, [viewMode, selectedState1, selectedState2, selectedRegion1, selectedRegion2, onSelectionChange]);

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Seleção de Dados para Análise
        </h3>

        {/* Seleção do Modo de Visualização */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <Button
            variant={viewMode === 'single-region' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('single-region')}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Brasil/Região</span>
            <span className="sm:hidden">Região</span>
          </Button>
          <Button
            variant={viewMode === 'single-state' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('single-state')}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Estado
          </Button>
          <Button
            variant={viewMode === 'compare-states' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('compare-states')}
            className="flex items-center gap-2"
          >
            <GitCompare className="h-4 w-4" />
            <span className="hidden sm:inline">Comparar Estados</span>
            <span className="sm:hidden">Comp. Est.</span>
          </Button>
          <Button
            variant={viewMode === 'compare-regions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('compare-regions')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Comparar Regiões</span>
            <span className="sm:hidden">Comp. Reg.</span>
          </Button>
        </div>

        {/* Controles Específicos por Modo */}
        <div className="space-y-4">
          {viewMode === 'single-state' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Selecione o Estado:</label>
              <Select value={selectedState1} onValueChange={handleState1Change}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATES).map(([code, state]) => (
                    <SelectItem key={code} value={code}>
                      {state.name} ({state.region})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {viewMode === 'compare-states' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Estado 1:</label>
                <Select value={selectedState1} onValueChange={handleState1Change}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATES)
                      .filter(([code]) => code !== selectedState2)
                      .map(([code, state]) => (
                        <SelectItem key={code} value={code}>
                          {state.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estado 2:</label>
                <Select value={selectedState2} onValueChange={handleState2Change}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATES)
                      .filter(([code]) => code !== selectedState1)
                      .map(([code, state]) => (
                        <SelectItem key={code} value={code}>
                          {state.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {viewMode === 'single-region' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Selecione Brasil ou Região:</label>
              <Select value={selectedRegion1} onValueChange={handleRegion1Change}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(REGIONS).map((region) => (
                    <SelectItem key={region} value={region}>
                      {region === 'Brasil' ? '🇧🇷 Brasil (Todos os Estados)' : region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="mt-2 text-xs">
                {selectedRegion1 === 'Brasil' 
                  ? 'Dados agregados de todos os 27 estados brasileiros'
                  : `Dados agregados de ${getStatesByRegion(selectedRegion1).length} estados da região`}
              </Badge>
            </div>
          )}

          {viewMode === 'compare-regions' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Região 1:</label>
                <Select value={selectedRegion1} onValueChange={handleRegion1Change}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(REGIONS)
                      .filter(region => region !== selectedRegion2)
                      .map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Região 2:</label>
                <Select value={selectedRegion2} onValueChange={handleRegion2Change}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(REGIONS)
                      .filter(region => region !== selectedRegion1)
                      .map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};