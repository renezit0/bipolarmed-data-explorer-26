// População estimada IBGE 2023
export const STATES = {
  ac: { name: 'Acre', table: 'medicbipoac', region: 'Norte', population: 906876 },
  al: { name: 'Alagoas', table: 'medicbipoal', region: 'Nordeste', population: 3365351 },
  am: { name: 'Amazonas', table: 'medicbipoamz', region: 'Norte', population: 4269995 },
  ap: { name: 'Amapá', table: 'medicbipoam', region: 'Norte', population: 877613 },
  ba: { name: 'Bahia', table: 'medicbipoba', region: 'Nordeste', population: 14985284 },
  ce: { name: 'Ceará', table: 'medicbipoce', region: 'Nordeste', population: 9240580 },
  df: { name: 'Distrito Federal', table: 'medicbipodf', region: 'Centro-Oeste', population: 3094325 },
  es: { name: 'Espírito Santo', table: 'medicbipoes', region: 'Sudeste', population: 4108508 },
  go: { name: 'Goiás', table: 'medicbipogo', region: 'Centro-Oeste', population: 7206589 },
  ma: { name: 'Maranhão', table: 'medicbipoma', region: 'Nordeste', population: 7153262 },
  mg: { name: 'Minas Gerais', table: 'medicbipomg', region: 'Sudeste', population: 21411923 },
  ms: { name: 'Mato Grosso do Sul', table: 'medicbipoms', region: 'Centro-Oeste', population: 2839188 },
  mt: { name: 'Mato Grosso', table: 'medicbipomt', region: 'Centro-Oeste', population: 3567234 },
  pa: { name: 'Pará', table: 'medicbipopa', region: 'Norte', population: 8777124 },
  pb: { name: 'Paraíba', table: 'medicbipopb', region: 'Nordeste', population: 4059905 },
  pe: { name: 'Pernambuco', table: 'medicbipope', region: 'Nordeste', population: 9674793 },
  pi: { name: 'Piauí', table: 'medicbipopi', region: 'Nordeste', population: 3289290 },
  pr: { name: 'Paraná', table: 'medicbipopr', region: 'Sul', population: 11597484 },
  rj: { name: 'Rio de Janeiro', table: 'medicbiporj', region: 'Sudeste', population: 17463349 },
  rn: { name: 'Rio Grande do Norte', table: 'medicbiporn', region: 'Nordeste', population: 3560903 },
  ro: { name: 'Rondônia', table: 'medicbiporo', region: 'Norte', population: 1815278 },
  rr: { name: 'Roraima', table: 'medicbiporr', region: 'Norte', population: 652713 },
  rs: { name: 'Rio Grande do Sul', table: 'medicbipors', region: 'Sul', population: 11466630 },
  sc: { name: 'Santa Catarina', table: 'medicbiposc', region: 'Sul', population: 7609601 },
  se: { name: 'Sergipe', table: 'medicbipose', region: 'Nordeste', population: 2338474 },
  sp: { name: 'São Paulo', table: 'medicbiposp', region: 'Sudeste', population: 46649132 },
  to: { name: 'Tocantins', table: 'medicbipoto', region: 'Norte', population: 1607363 },
} as const;

export type StateCode = keyof typeof STATES;

export const REGIONS = {
  'Brasil': ['ac', 'ap', 'am', 'pa', 'ro', 'rr', 'to', 'al', 'ba', 'ce', 'ma', 'pb', 'pe', 'pi', 'rn', 'se', 'df', 'go', 'mt', 'ms', 'es', 'mg', 'rj', 'sp', 'pr', 'rs', 'sc'],
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
