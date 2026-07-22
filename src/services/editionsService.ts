import { EditionData, EditionSummary } from '../types/game';
import { getEditionsFromDb, getEditionDetailsFromDb } from './supabaseService';

export async function fetchEditionsList(): Promise<EditionSummary[]> {
  // 1. Try Supabase if configured
  const dbData = await getEditionsFromDb();
  if (dbData && dbData.length > 0) {
    return dbData;
  }

  // 2. Try REST API
  try {
    const res = await fetch('/api/editions');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.warn('Could not fetch editions from API, using fallback data:', err);
  }

  // 3. Fallback dataset
  return [
    {
      id: 'copa-2026',
      tournament_id: 'fifa-world-cup',
      year: 2026,
      name: 'Copa do Mundo 2026',
      host_country: 'Canadá, EUA e México',
      description: 'Edição Atual • 6 Seleções Principais em Ordem Alfabética',
      status: 'active',
      featured: true,
    },
    {
      id: 'copa-2022',
      tournament_id: 'fifa-world-cup',
      year: 2022,
      name: 'Copa do Mundo 2022',
      host_country: 'Catar',
      description: '32 Seleções Convocadas • Campeão Argentina',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2018',
      tournament_id: 'fifa-world-cup',
      year: 2018,
      name: 'Copa do Mundo 2018',
      host_country: 'Rússia',
      description: '32 Seleções Convocadas • Campeão França',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2014',
      tournament_id: 'fifa-world-cup',
      year: 2014,
      name: 'Copa do Mundo 2014',
      host_country: 'Brasil',
      description: '32 Seleções Convocadas • Campeão Alemanha',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2010',
      tournament_id: 'fifa-world-cup',
      year: 2010,
      name: 'Copa do Mundo 2010',
      host_country: 'África do Sul',
      description: '32 Seleções Convocadas • Campeão Espanha',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2006',
      tournament_id: 'fifa-world-cup',
      year: 2006,
      name: 'Copa do Mundo 2006',
      host_country: 'Alemanha',
      description: '32 Seleções Convocadas • Campeão Itália',
      status: 'coming_soon',
      featured: false,
    },
    {
      id: 'copa-2002',
      tournament_id: 'fifa-world-cup',
      year: 2002,
      name: 'Copa do Mundo 2002',
      host_country: 'Coreia do Sul e Japão',
      description: 'Pentacampeonato Brasileiro • 32 Seleções',
      status: 'coming_soon',
      featured: false,
    },
  ];
}

export async function fetchEditionData(editionId: string = 'copa-2026'): Promise<EditionData> {
  // 1. Try Supabase
  const dbEdition = await getEditionDetailsFromDb(editionId);
  if (dbEdition) {
    return dbEdition;
  }

  // 2. Try REST API
  const res = await fetch(`/api/editions/${editionId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch edition data for ${editionId}: ${res.statusText}`);
  }
  return await res.json();
}
