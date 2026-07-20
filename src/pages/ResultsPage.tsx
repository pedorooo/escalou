import React, { useState } from 'react';
import { Trophy, XCircle, Flag } from 'lucide-react';
import TeamFlag from '../components/TeamFlag';
import {
  EditionData,
  ProgressMap,
  GameStatus,
  Team,
  Player,
} from '../types/game';

interface ResultsPageProps {
  editionData: EditionData;
  progressByTeam: ProgressMap;
  errors: number;
  skipsUsed: number;
  gameStatus: GameStatus;
  seconds: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export default function ResultsPage({
  editionData,
  progressByTeam,
  errors,
  skipsUsed,
  gameStatus,
  seconds,
  onPlayAgain,
  onGoHome,
}: ResultsPageProps) {
  const isVictory = gameStatus === 'vitoria';

  const [openTeamId, setOpenTeamId] = useState<string | null>(null);

  const toggleAccordion = (teamId: string) => {
    setOpenTeamId((prev) => (prev === teamId ? null : teamId));
  };

  const formatTime = (totalSec: number): string => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const completedCount = Object.values(progressByTeam).filter(
    (p) => p.status === 'concluida'
  ).length;

  const totalTeams = editionData.selecoes.length;

  const totalEditionPlayers = editionData.selecoes.reduce(
    (acc, team) => acc + team.convocados.length,
    0
  );

  const totalGuessedPlayers = Object.values(progressByTeam).reduce(
    (acc, prog) => acc + (prog.acertos?.length || 0),
    0
  );

  return (
    <div className="results-page-layout">
      {/* Top Tag Pill */}
      <div className={`results-top-pill ${isVictory ? '' : 'defeat'}`}>
        {isVictory ? 'DESAFIO CONCLUÍDO' : 'DERROTA'}
      </div>

      {/* Main Title & Subtitle */}
      <h1 className={`results-main-title ${isVictory ? '' : 'defeat'}`}>
        {isVictory ? (
          <>
            <Trophy size={32} style={{ display: 'inline', marginRight: '8px' }} />
            VITÓRIA ÉPICA!
          </>
        ) : (
          <>
            <XCircle size={32} style={{ display: 'inline', marginRight: '8px' }} />
            FIM DE JOGO!
          </>
        )}
      </h1>

      <p className="results-main-subtitle">
        {isVictory
          ? 'Você demonstrou um conhecimento lendário sobre as Copas do Mundo. O troféu é seu!'
          : 'Você atingiu o limite de 3 erros. Treine mais e tente novamente!'}
      </p>

      {/* 2x2 Stats Grid */}
      <div className="results-2x2-grid">
        <div className="stat-box-card">
          <span className="stat-box-label">TEMPO TOTAL</span>
          <span className="stat-box-value">{formatTime(seconds)}</span>
        </div>

        <div className="stat-box-card">
          <span className="stat-box-label">ERROS</span>
          <span className={`stat-box-value ${errors > 0 ? 'error-val' : ''}`}>
            {String(errors).padStart(2, '0')}
          </span>
        </div>

        <div className="stat-box-card">
          <span className="stat-box-label">SELECIONADOS</span>
          <span className="stat-box-value">
            <span style={{ fontSize: '1.15em', fontWeight: 800 }}>
              {totalGuessedPlayers}
            </span>
            /{totalEditionPlayers}
          </span>
        </div>

        <div className="stat-box-card">
          <span className="stat-box-label">PULADOS</span>
          <span className="stat-box-value">
            {String(skipsUsed).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Match Summary Accordion Card */}
      <div className="match-summary-card">
        <div className="match-summary-title">
          <Flag size={18} style={{ marginRight: '6px' }} />
          <span>RESUMO DA PARTIDA</span>
        </div>

        <div className="accordion-list">
          {editionData.selecoes.map((team: Team) => {
            const teamProg = progressByTeam[team.id] || {
              status: 'pendente',
              acertos: [],
            };
            const status = teamProg.status;
            const acertos = teamProg.acertos;

            const isOpen = openTeamId === team.id;

            let statusSubText = 'PENDENTE';
            let statusClass = 'skipped';

            if (status === 'concluida') {
              statusSubText = 'CONCLUÍDO';
              statusClass = '';
            } else if (status === 'pulada') {
              statusSubText = 'PULADO';
              statusClass = 'skipped';
            }

            return (
              <div key={team.id} className="accordion-item">
                <div
                  className="accordion-header"
                  onClick={() => toggleAccordion(team.id)}
                >
                  <div className="accordion-team-meta">
                    <TeamFlag code={team.bandeira} size={24} />
                    <div>
                      <div className="accordion-team-name">{team.nome} 2026</div>
                      <div className={`accordion-status-sub ${statusClass}`}>
                        {statusSubText} ({acertos.length}/{team.convocados.length})
                      </div>
                    </div>
                  </div>
                  <span className={`accordion-arrow ${isOpen ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>

                {isOpen && (
                  <div className="accordion-body">
                    <div className="player-pills-grid">
                      {team.convocados.map((player: Player) => {
                        const wasHit = acertos.includes(player.id);
                        return (
                          <div
                            key={player.id}
                            className={`player-pill ${wasHit ? 'hit' : 'missed'}`}
                          >
                            <span>{player.nome_oficial}</span>
                            <small style={{ opacity: 0.85 }}>({player.posicao})</small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stacked Action Buttons */}
      <div className="results-stacked-actions">
        <button onClick={onPlayAgain} className="btn-full-primary">
          JOGAR NOVAMENTE
        </button>
        <button onClick={onGoHome} className="btn-full-secondary">
          ESCOLHER OUTRA EDIÇÃO
        </button>
      </div>
    </div>
  );
}
