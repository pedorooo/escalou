import React from 'react';
import { Check, FastForward } from 'lucide-react';
import TeamFlag from '../TeamFlag';
import { Team, ProgressMap, TeamStatus } from '../../types/game';
import './TeamStepper.css';

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
