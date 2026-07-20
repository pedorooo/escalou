export interface Player {
  id: string;
  nome_oficial: string;
  posicao: string;
  numero: number;
  clube_epoca: string;
  pos_x: number;
  pos_y: number;
  aliases: string[];
}

export interface Team {
  id: string;
  nome: string;
  bandeira: string;
  resultado_final: string;
  convocados: Player[];
}

export interface EditionSummary {
  id: string;
  ano: number;
  nome: string;
  pais_sede: string;
  descricao: string;
  status: 'ativo' | 'em_breve';
  featured?: boolean;
}

export interface EditionData {
  id: string;
  ano: number;
  pais_sede: string;
  selecoes: Team[];
}

export type TeamStatus = 'pendente' | 'em_andamento' | 'concluida' | 'pulada';

export interface TeamProgress {
  status: TeamStatus;
  acertos: string[];
}

export type ProgressMap = Record<string, TeamProgress>;

export type GameStatus = 'em_andamento' | 'vitoria' | 'derrota';

export type PageView = 'home' | 'game' | 'results';

export interface FeedbackMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}
