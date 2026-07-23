import React, { useEffect, useRef } from 'react';
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
  const trackRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active team segment into center view when currentIndex changes
  useEffect(() => {
    if (trackRef.current && trackRef.current.children[currentIndex]) {
      const activeElement = trackRef.current.children[currentIndex] as HTMLElement;
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <div className="segmented-stepper-wrapper">
      {/* Segmented Progress Bar Track */}
      <div className="segmented-bar-track" ref={trackRef}>
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
                {status === 'completed' && <Check size={14} strokeWidth={3} className="seg-status-icon" />}
                {status === 'skipped' && <FastForward size={14} strokeWidth={2.5} className="seg-status-icon" />}
                <TeamFlag code={team.flag_code} size={20} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
