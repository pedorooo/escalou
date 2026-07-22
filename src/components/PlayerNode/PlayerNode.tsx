import React from 'react';
import { Player } from '../../types/game';
import './PlayerNode.css';

interface PlayerNodeProps {
  player: Player & { x?: number; y?: number };
  isGuessed: boolean;
  isMissing: boolean;
  isJustGuessed: boolean;
  roleAbbreviation: string;
}

export default function PlayerNode({
  player,
  isGuessed,
  isMissing,
  isJustGuessed,
  roleAbbreviation,
}: PlayerNodeProps) {
  let nodeClass = 'unguessed';
  if (isGuessed) nodeClass = 'guessed';
  else if (isMissing) nodeClass = 'revealed-missing';

  if (isJustGuessed) nodeClass += ' just-guessed';

  return (
    <div
      className={`player-card-node ${nodeClass}`}
      style={{
        left: `${player.x ?? 50}%`,
        top: `${player.y ?? 50}%`,
      }}
    >
      <div className="player-circle">
        {isGuessed || isMissing ? player.shirt_number : roleAbbreviation}
      </div>
      {(isGuessed || isMissing) && (
        <div className="player-name">
          {player.official_name}
        </div>
      )}
    </div>
  );
}

