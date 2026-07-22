import React from 'react';
import { GameStatus } from '../types/game';

interface ResultsModalProps {
  status: GameStatus;
  seconds: number;
  errors: number;
  skipsUsed: number;
  completedCount: number;
  totalTeams: number;
  onRestart: () => void;
}

export default function ResultsModal({
  status,
  seconds,
  errors,
  skipsUsed,
  completedCount,
  totalTeams,
  onRestart,
}: ResultsModalProps) {
  const isVictory = status === 'victory';

  const formatTime = (totalSec: number): string => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2 className="modal-title">
            {isVictory ? '🎉 Parabéns! Vitória!' : '❌ Fim de Jogo'}
          </h2>
          <p className="modal-subtitle">
            {isVictory
              ? 'Você completou o desafio da Copa do Mundo 2026!'
              : 'Você atingiu o limite máximo de 3 erros.'}
          </p>
        </div>

        <div className="modal-stats-grid">
          <div className="stat-item">
            <span className="stat-label">Tempo Total</span>
            <span className="stat-value">{formatTime(seconds)}</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Erros Cometidos</span>
            <span className="stat-value">{errors} / 3</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Pulos Usados</span>
            <span className="stat-value">{skipsUsed} / 2</span>
          </div>

          <div className="stat-item">
            <span className="stat-label">Seleções Concluídas</span>
            <span className="stat-value">
              {completedCount} / {totalTeams}
            </span>
          </div>
        </div>

        <button onClick={onRestart} className="modal-action-btn">
          Jogar Novamente
        </button>
      </div>
    </div>
  );
}
