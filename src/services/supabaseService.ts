/// <reference types="vite/client" />
import { EditionData, EditionSummary } from '../types/game';

// Supabase environment config placeholders
const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

/**
 * Service to handle data fetching from Supabase or REST API
 */
export async function getEditionsFromDb(): Promise<EditionSummary[] | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/editions?select=*&order=year.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn('Supabase fetch failed, falling back to local server:', err);
  }

  return null;
}

export async function getEditionDetailsFromDb(editionId: string): Promise<EditionData | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/editions?id=eq.${editionId}&select=*,teams(*,players(*))`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return data[0];
      }
    }
  } catch (err) {
    console.warn('Supabase edition details fetch failed:', err);
  }

  return null;
}
