export interface Tournament {
  id: string;
  title: string;
  slug: string;
  icon_url?: string;
  created_at?: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  email_verified?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Account {
  id: string;
  user_id: string;
  provider: string;
  provider_account_id: string;
  type?: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  created_at?: string;
}

export interface Player {
  id: string;
  official_name: string;
  position: string;
  shirt_number: number;
  club_at_time: string;
  image_url?: string;
  aliases: string[];
}

export interface Team {
  id: string;
  name: string;
  flag_code: string;
  final_result: string;
  players: Player[];
}

export interface EditionSummary {
  id: string;
  tournament_id?: string;
  year: number;
  name: string;
  host_country: string;
  description: string;
  status: 'active' | 'coming_soon';
  featured?: boolean;
}

export interface EditionData {
  id: string;
  tournament_id?: string;
  year: number;
  host_country: string;
  teams: Team[];
}

export type TeamStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface TeamProgress {
  status: TeamStatus;
  correct_guesses: string[];
}

export type ProgressMap = Record<string, TeamProgress>;

export type GameStatus = 'in_progress' | 'victory' | 'defeat';

export type PageView = 'home' | 'game' | 'results';

export interface FeedbackMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}
