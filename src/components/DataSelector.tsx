import { useState } from 'react';
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
  const [viewMode, setViewMode] = useState<ViewMode>('single-state');
  const [selectedState1, setSelectedState1] = useState<StateCode>('pr');
  const [selectedState2, setSelectedState2] = useState<StateCode>('sp');
  const [selectedRegion1, setSelectedRegion1] = useState<RegionName>('Sul');
  const [selectedRegion2, setSelectedRegion2] = useState<RegionName>('Sudeste');

  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    applySelection(mode);
  };

  const applySelection = (mode?: ViewMode) => {
    const currentMode = mode || viewMode;
    let tables: string[] = [];
    let labels: string[] = [];

    switch (currentMode) {
      case 'single-state':
        tables = [STATES[selectedState1].table];
        labels = [STATES[selectedState1].name];
        break;
      case 'compare-states':
        tables = [STATES[selectedState1].table, STATES[selectedState2].table];
        labels = [STATES[selectedState1].name, STATES[selectedState2].name];
        break;
      case 'single-region':
        tables = getStatesByRegion(selectedRegion1).map(code => STATES[code].table);
        labels = [selectedRegion1];
        break;
      case 'compare-regions':
        const region1States = getStatesByRegion(selectedRegion1).map(code => STATES[code].table);
        const region2States = getStatesByRegion(selectedRegion2).map(code => STATES[code].table);
        tables = [...region1States, ...region2States];
        labels = [selectedRegion1, selectedRegion2];
        break;
    }

    onSelectionChange({ mode: currentMode, tables, labels });
  };

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
            Comparar Estados
          </Button>
          <Button
            variant={viewMode === 'single-region' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('single-region')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Região
          </Button>
          <Button
            variant={viewMode === 'compare-regions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeChange('compare-regions')}
            className="flex items-center gap-2"
          >
            <GitCompare className="h-4 w-4" />
            Comparar Regiões
          </Button>
        </div>

        {/* Controles Específicos por Modo */}
        <div className="space-y-4">
          {viewMode === 'single-state' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Selecione o Estado:</label>
              <Select value={selectedState1} onValueChange={(value) => {
                setSelectedState1(value as StateCode);
                setTimeout(() => applySelection(), 0);
              }}>
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
                <Select value={selectedState1} onValueChange={(value) => {
                  setSelectedState1(value as StateCode);
                  setTimeout(() => applySelection(), 0);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATES).map(([code, state]) => (
                      <SelectItem key={code} value={code}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Estado 2:</label>
                <Select value={selectedState2} onValueChange={(value) => {
                  setSelectedState2(value as StateCode);
                  setTimeout(() => applySelection(), 0);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATES).map(([code, state]) => (
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
              <label className="text-sm font-medium mb-2 block">Selecione a Região:</label>
              <Select value={selectedRegion1} onValueChange={(value) => {
                setSelectedRegion1(value as RegionName);
                setTimeout(() => applySelection(), 0);
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(REGIONS).map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="secondary" className="mt-2 text-xs">
                Dados agregados de todos os estados da região
              </Badge>
            </div>
          )}

          {viewMode === 'compare-regions' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Região 1:</label>
                <Select value={selectedRegion1} onValueChange={(value) => {
                  setSelectedRegion1(value as RegionName);
                  setTimeout(() => applySelection(), 0);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(REGIONS).map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Região 2:</label>
                <Select value={selectedRegion2} onValueChange={(value) => {
                  setSelectedRegion2(value as RegionName);
                  setTimeout(() => applySelection(), 0);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(REGIONS).map((region) => (
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
