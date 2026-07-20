import { EditionSummary } from '../types/game';

export async function fetchEditionsList(): Promise<EditionSummary[]> {
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

  // Fallback dataset with 7 historical World Cup editions
  return [
    {
      id: 'copa-2026',
      ano: 2026,
      nome: 'Copa do Mundo 2026',
      pais_sede: 'Canadá, EUA e México',
      descricao: 'Edição Atual • 6 Seleções Principais em Ordem Alfabética',
      status: 'ativo',
      featured: true,
    },
    {
      id: 'copa-2022',
      ano: 2022,
      nome: 'Copa do Mundo 2022',
      pais_sede: 'Catar',
      descricao: '32 Seleções Convocadas • Campeão Argentina',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2018',
      ano: 2018,
      nome: 'Copa do Mundo 2018',
      pais_sede: 'Rússia',
      descricao: '32 Seleções Convocadas • Campeão França',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2014',
      ano: 2014,
      nome: 'Copa do Mundo 2014',
      pais_sede: 'Brasil',
      descricao: '32 Seleções Convocadas • Campeão Alemanha',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2010',
      ano: 2010,
      nome: 'Copa do Mundo 2010',
      pais_sede: 'África do Sul',
      descricao: '32 Seleções Convocadas • Campeão Espanha',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2006',
      ano: 2006,
      nome: 'Copa do Mundo 2006',
      pais_sede: 'Alemanha',
      descricao: '32 Seleções Convocadas • Campeão Itália',
      status: 'em_breve',
      featured: false,
    },
    {
      id: 'copa-2002',
      ano: 2002,
      nome: 'Copa do Mundo 2002',
      pais_sede: 'Coreia do Sul e Japão',
      descricao: 'Pentacampeonato Brasileiro • 32 Seleções',
      status: 'em_breve',
      featured: false,
    },
  ];
}
