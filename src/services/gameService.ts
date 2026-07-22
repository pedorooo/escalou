import { Team, Player, ProgressMap } from '../types/game';

/**
 * Normalizes text for case-insensitive and accent-insensitive matching
 */
export function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Matches user guess against squad players official names and aliases
 */
export function findMatchingPlayer(inputText: string, players: Player[]): Player | undefined {
  const normalizedInput = normalizeText(inputText);
  if (!normalizedInput) return undefined;

  return players.find((player: Player) => {
    const matchOfficial = normalizeText(player.official_name) === normalizedInput;
    const matchAlias = player.aliases?.some(
      (alias) => normalizeText(alias) === normalizedInput
    );
    return matchOfficial || matchAlias;
  });
}

/**
 * Generates initial progress state map for all selections in an edition
 */
export function initProgressMap(teams: Team[]): ProgressMap {
  const initialProgress: ProgressMap = {};
  teams.forEach((team) => {
    initialProgress[team.id] = { status: 'pending', correct_guesses: [] };
  });
  if (teams.length > 0) {
    initialProgress[teams[0].id].status = 'in_progress';
  }
  return initialProgress;
}

/**
 * Calculates total correct guesses across all teams
 */
export function calculateTotalCorrectGuesses(progressByTeam: ProgressMap): number {
  return Object.values(progressByTeam).reduce(
    (sum, teamProgress) => sum + (teamProgress?.correct_guesses?.length || 0),
    0
  );
}

/**
 * Calculates total player count across all teams
 */
export function calculateTotalPlayers(teams: Team[]): number {
  return teams.reduce((sum, team) => sum + (team.players?.length || 0), 0);
}
