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
          const status: TeamStatus = progressByTeam[team.id]?.status || 'pending';
          const isCurrent = idx === currentIndex;

          let segClass = 'pendente';

          if (status === 'completed') {
            segClass = 'concluida';
          } else if (status === 'skipped') {
            segClass = 'pulada';
          } else if (isCurrent) {
            segClass = 'atual';
          }

          return (
            <div key={team.id} className={`segmented-item ${segClass}`}>
              {isCurrent && <span className="seg-badge-atual">ATUAL</span>}
              <div className="seg-bar-segment">
                {status === 'completed' && <Check size={12} strokeWidth={3} />}
                {status === 'skipped' && <FastForward size={12} strokeWidth={2.5} />}
                <TeamFlag code={team.flag_code} size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
