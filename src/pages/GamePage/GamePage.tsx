import React from 'react';
import { Timer, RotateCcw, Heart } from 'lucide-react';
import TeamStepper from '../../components/TeamStepper/TeamStepper';
import TacticalPitch from '../../components/TacticalPitch/TacticalPitch';
import GuessInput from '../../components/GuessInput/GuessInput';
import TeamFlag from '../../components/TeamFlag';
import './GamePage.css';
import {
  EditionData,
  ProgressMap,
  GameStatus,
  FeedbackMessage,
  Team,
} from '../../types/game';
import {
  calculateTotalCorrectGuesses,
  calculateTotalPlayers,
} from '../../services/gameService';
import { formatTime } from '../../utils/formatters';

interface GamePageProps {
  editionData: EditionData;
  currentIndex: number;
  progressByTeam: ProgressMap;
  errors: number;
  skipsUsed: number;
  gameStatus: GameStatus;
  seconds: number;
  feedback: FeedbackMessage | null;
  isErrorFlash: boolean;
  onGuess: (text: string) => void;
  onSkip: () => void;
}

export default function GamePage({
  editionData,
  currentIndex,
  progressByTeam,
  errors,
  skipsUsed,
  gameStatus,
  seconds,
  feedback,
  isErrorFlash,
  onGuess,
  onSkip,
}: GamePageProps) {
  const teams: Team[] = editionData.teams || [];
  const currentTeam: Team | undefined = teams[currentIndex];
  const currentAcertos: string[] = currentTeam
    ? progressByTeam[currentTeam.id]?.correct_guesses || []
    : [];

  const totalCorrectGuesses = calculateTotalCorrectGuesses(progressByTeam);
  const totalPlayers = calculateTotalPlayers(teams);

  // 3 lives / error balls
  const livesLeft = Math.max(0, 3 - errors);

  return (
    <div className="game-page-layout">
      {/* Top Segmented Stepper - Progress Only */}
      <TeamStepper
        teams={teams}
        currentIndex={currentIndex}
        progressByTeam={progressByTeam}
      />

      {/* Main Game content layout: side-by-side pitch and input on desktop */}
      <div className="game-main-content">
        <div className="game-pitch-side">
          {currentTeam && (
            <TacticalPitch
              players={currentTeam.players}
              guessedPlayerIds={currentAcertos}
              revealAll={gameStatus !== 'in_progress'}
            />
          )}
        </div>

        <div className="game-input-side">
          {/* Active Team Display with SVG Flag */}
          {currentTeam && (
            <div className="stepper-team-header">
              <TeamFlag code={currentTeam.flag_code} size={32} />
              <div className="stepper-team-title-meta">
                <div className="stepper-team-title-row">
                  <h1 className="stepper-team-name">{currentTeam.name.toUpperCase()} - 2026</h1>
                  <span className="stepper-team-counter">({totalCorrectGuesses}/{totalPlayers})</span>
                </div>
                <span className="stepper-team-subtitle">
                  {currentTeam.final_result || 'PARTICIPANTE 2026'}
                </span>
              </div>
            </div>
          )}

          {/* Compact Control Bar: Left Group (Lives + Skips side-by-side) <--- space-between ---> Right Group (Timer) */}
          <div className="game-compact-control-bar">
            <div className="control-bar-left-group">
              {/* 3 Lives Indicators */}
              <div className="lives-balls-group">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className={`life-ball ${idx < livesLeft ? 'active' : 'consumed'}`}
                    title={idx < livesLeft ? 'Vida disponível' : 'Erro cometido'}
                  >
                    <Heart size={20} strokeWidth={2.5} />
                  </span>
                ))}
              </div>

              <div className="control-bar-divider" />

              {/* Skips Indicators */}
              <div className="skips-balls-group">
                {[0, 1].map((idx) => {
                  const skipsLeft = 2 - skipsUsed;
                  return (
                    <span
                      key={idx}
                      className={`skip-ball ${idx < skipsLeft ? 'active' : 'consumed'}`}
                      title={idx < skipsLeft ? 'Pulo disponível' : 'Pulo utilizado'}
                    >
                      <RotateCcw size={18} strokeWidth={2.5} />
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Stopwatch Timer on Right */}
            <div className="timer-display-box">
              <Timer size={20} strokeWidth={2.5} className="timer-icon" />
              <span className="timer-digits">{formatTime(seconds)}</span>
            </div>
          </div>

          <GuessInput
            onGuess={onGuess}
            onSkip={onSkip}
            disabled={gameStatus !== 'in_progress'}
            isErrorFlash={isErrorFlash}
            skipsLeft={2 - skipsUsed}
          />
        </div>
      </div>
    </div>
  );
}
