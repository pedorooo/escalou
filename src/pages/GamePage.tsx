import React from 'react';
import { Timer, RotateCcw, CircleDot } from 'lucide-react';
import TeamStepper from '../components/TeamStepper';
import TacticalPitch from '../components/TacticalPitch';
import GuessInput from '../components/GuessInput';
import {
  EditionData,
  ProgressMap,
  GameStatus,
  FeedbackMessage,
  Team,
} from '../types/game';

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
  const teams: Team[] = editionData.selecoes;
  const currentTeam: Team | undefined = teams[currentIndex];
  const currentAcertos: string[] = currentTeam
    ? progressByTeam[currentTeam.id]?.acertos || []
    : [];

  const formatTime = (totalSec: number): string => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // 3 lives / error balls
  const livesLeft = Math.max(0, 3 - errors);

  return (
    <div className="game-page-layout">
      {/* Top Segmented Stepper & Active Team Header with Flag Icons */}
      <TeamStepper
        teams={teams}
        currentIndex={currentIndex}
        progressByTeam={progressByTeam}
      />

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
                <CircleDot size={20} strokeWidth={2.5} />
              </span>
            ))}
          </div>

          <div className="control-bar-divider" />

          {/* Skips Counter */}
          <div className="skips-counter-info">
            <RotateCcw size={16} strokeWidth={2.5} />
            <span>
              {skipsUsed}/2 PULAR
            </span>
          </div>
        </div>

        {/* Stopwatch Timer on Right */}
        <div className="timer-display-box">
          <Timer size={20} strokeWidth={2.5} className="timer-icon" />
          <span className="timer-digits">{formatTime(seconds)}</span>
        </div>
      </div>

      {feedback && (
        <div className={`feedback-banner ${feedback.type}`}>
          {feedback.text}
        </div>
      )}

      {/* Tactical Pitch with Player Cards */}
      {currentTeam && (
        <TacticalPitch
          players={currentTeam.convocados}
          guessedPlayerIds={currentAcertos}
          revealAll={gameStatus !== 'em_andamento'}
        />
      )}

      {/* Input Field + Action Buttons (CONFIRMAR / PULAR) */}
      <GuessInput
        onGuess={onGuess}
        onSkip={onSkip}
        disabled={gameStatus !== 'em_andamento'}
        isErrorFlash={isErrorFlash}
        skipsLeft={2 - skipsUsed}
      />
    </div>
  );
}
