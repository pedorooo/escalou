import React from 'react';
import { Check, FastForward } from 'lucide-react';
import TeamFlag from './TeamFlag';
import { Team, ProgressMap, TeamStatus } from '../types/game';

interface TeamStepperProps {
  teams: Team[];
  currentIndex: number;
  progressByTeam: ProgressMap;
}

export default function TeamStepper({
  teams,
  currentIndex,
  progressByTeam,
}: TeamStepperProps) {
  const currentTeam = teams[currentIndex];

  return (
    <div className="segmented-stepper-wrapper">
      {/* Top Active Team Display with SVG Flag */}
      {currentTeam && (
        <div className="stepper-team-header">
          <TeamFlag code={currentTeam.bandeira} size={32} />
          <div className="stepper-team-title-meta">
            <h1 className="stepper-team-name">{currentTeam.nome.toUpperCase()} - 2026</h1>
            <span className="stepper-team-subtitle">
              {currentTeam.resultado_final || 'PARTICIPANTE 2026'}
            </span>
          </div>
        </div>
      )}

      {/* Segmented Progress Bar */}
      <div className="segmented-bar-track">
        {teams.map((team, idx) => {
          const status: TeamStatus = progressByTeam[team.id]?.status || 'pendente';
          const isCurrent = idx === currentIndex;

          let segClass = 'pendente';

          if (status === 'concluida') {
            segClass = 'concluida';
          } else if (status === 'pulada') {
            segClass = 'pulada';
          } else if (isCurrent) {
            segClass = 'atual';
          }

          return (
            <div key={team.id} className={`segmented-item ${segClass}`}>
              {isCurrent && <span className="seg-badge-atual">ATUAL</span>}
              <div className="seg-bar-segment">
                {status === 'concluida' && <Check size={12} strokeWidth={3} />}
                {status === 'pulada' && <FastForward size={12} strokeWidth={2.5} />}
                <TeamFlag code={team.bandeira} size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
