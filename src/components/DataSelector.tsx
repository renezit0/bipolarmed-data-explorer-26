import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, Globe, GitCompare } from 'lucide-react';
import { STATES, REGIONS, StateCode, RegionName, getStatesByRegion } from '@/constants/states';

export type ViewMode = 'single-state' | 'compare-states' | 'single-region' | 'compare-regions';

interface DataSelectorProps {
  // Props controladas pelo pai
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedState1: StateCode;
  onSelectedState1Change: (state: StateCode) => void;
  selectedState2: StateCode;
  onSelectedState2Change: (state: StateCode) => void;
  selectedRegion1: RegionName;
  onSelectedRegion1Change: (region: RegionName) => void;
  selectedRegion2: RegionName;
  onSelectedRegion2Change: (region: RegionName) => void;
}

export const DataSelector = ({
  viewMode,
  onViewModeChange,
  selectedState1,
  onSelectedState1Change,
  selectedState2,
  onSelectedState2Change,
  selectedRegion1,
  onSelectedRegion1Change,
  selectedRegion2,
  onSelectedRegion2Change,
}: DataSelectorProps) => {
  
  const handleState1Change = (value: string) => {
    onSelectedState1Change(value as StateCode);
  };

  const handleState2Change = (value: string) => {
    onSelectedState2Change(value as StateCode);
  };

  const handleRegion1Change = (value: string) => {
    onSelectedRegion1Change(value as RegionName);
  };

  const handleRegion2Change = (value: string) => {
    onSelectedRegion2Change(value as RegionName);
  };

  return (
    <Card>
      <CardContent className="p-4 md:p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Seleção de Dados para Análise
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          <Button
            variant={viewMode === 'single-region' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('single-region')}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Brasil/Região</span>
            <span className="sm:hidden">Região</span>
          </Button>
          <Button
            variant={viewMode === 'single-state' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('single-state')}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Estado
          </Button>
          <Button
            variant={viewMode === 'compare-states' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('compare-states')}
            className="flex items-center gap-2"
          >
            <GitCompare className="h-4 w-4" />
            <span className="hidden sm:inline">Comparar Estados</span>
            <span className="sm:hidden">Comp. Est.</span>
          </Button>
          <Button
            variant={viewMode === 'compare-regions' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('compare-regions')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Comparar Regiões</span>
            <span className="sm:hidden">Comp. Reg.</span>
          </Button>
        </div>

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