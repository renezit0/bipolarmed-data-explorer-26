export const STATES = {
  ac: { name: 'Acre', table: 'medicbipoac', region: 'Norte' },
  al: { name: 'Alagoas', table: 'medicbipoal', region: 'Nordeste' },
  am: { name: 'Amazonas', table: 'medicbipoamz', region: 'Norte' },
  ap: { name: 'Amapá', table: 'medicbipoam', region: 'Norte' },
  ba: { name: 'Bahia', table: 'medicbipoba', region: 'Nordeste' },
  ce: { name: 'Ceará', table: 'medicbipoce', region: 'Nordeste' },
  df: { name: 'Distrito Federal', table: 'medicbipodf', region: 'Centro-Oeste' },
  es: { name: 'Espírito Santo', table: 'medicbipoes', region: 'Sudeste' },
  go: { name: 'Goiás', table: 'medicbipogo', region: 'Centro-Oeste' },
  ma: { name: 'Maranhão', table: 'medicbipoma', region: 'Nordeste' },
  mg: { name: 'Minas Gerais', table: 'medicbipomg', region: 'Sudeste' },
  ms: { name: 'Mato Grosso do Sul', table: 'medicbipoms', region: 'Centro-Oeste' },
  mt: { name: 'Mato Grosso', table: 'medicbipomt', region: 'Centro-Oeste' },
  pa: { name: 'Pará', table: 'medicbipopa', region: 'Norte' },
  pb: { name: 'Paraíba', table: 'medicbipopb', region: 'Nordeste' },
  pe: { name: 'Pernambuco', table: 'medicbipope', region: 'Nordeste' },
  pi: { name: 'Piauí', table: 'medicbipopi', region: 'Nordeste' },
  pr: { name: 'Paraná', table: 'medicbipopr', region: 'Sul' },
  rj: { name: 'Rio de Janeiro', table: 'medicbiporj', region: 'Sudeste' },
  rn: { name: 'Rio Grande do Norte', table: 'medicbiporn', region: 'Nordeste' },
  ro: { name: 'Rondônia', table: 'medicbiporo', region: 'Norte' },
  rr: { name: 'Roraima', table: 'medicbiporr', region: 'Norte' },
  rs: { name: 'Rio Grande do Sul', table: 'medicbipors', region: 'Sul' },
  sc: { name: 'Santa Catarina', table: 'medicbiposc', region: 'Sul' },
  se: { name: 'Sergipe', table: 'medicbipose', region: 'Nordeste' },
  sp: { name: 'São Paulo', table: 'medicbiposp', region: 'Sudeste' },
  to: { name: 'Tocantins', table: 'medicbipoto', region: 'Norte' },
} as const;

export type StateCode = keyof typeof STATES;

export const REGIONS = {
  'Norte': ['ac', 'ap', 'am', 'pa', 'ro', 'rr', 'to'],
  'Nordeste': ['al', 'ba', 'ce', 'ma', 'pb', 'pe', 'pi', 'rn', 'se'],
  'Centro-Oeste': ['df', 'go', 'mt', 'ms'],
  'Sudeste': ['es', 'mg', 'rj', 'sp'],
  'Sul': ['pr', 'rs', 'sc'],
} as const;

export type RegionName = keyof typeof REGIONS;

export const getStatesByRegion = (region: RegionName): StateCode[] => {
  return REGIONS[region] as unknown as StateCode[];
};

export const getTablesByRegion = (region: RegionName): string[] => {
  return getStatesByRegion(region).map(code => STATES[code].table);
};
