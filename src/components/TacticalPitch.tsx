import React, { useState, useEffect, useRef } from 'react';
import { Player } from '../types/game';

interface TacticalPitchProps {
  players: Player[];
  guessedPlayerIds: string[];
  revealAll: boolean;
}

export default function TacticalPitch({
  players,
  guessedPlayerIds,
  revealAll,
}: TacticalPitchProps) {
  const [newlyGuessedId, setNewlyGuessedId] = useState<string | null>(null);
  const prevGuessedRef = useRef<string[]>(guessedPlayerIds);

  useEffect(() => {
    // Detect newly added guessed player ID
    const addedId = guessedPlayerIds.find(
      (id) => !prevGuessedRef.current.includes(id)
    );

    if (addedId) {
      setNewlyGuessedId(addedId);
      const timer = setTimeout(() => setNewlyGuessedId(null), 600);
      return () => clearTimeout(timer);
    }

    prevGuessedRef.current = guessedPlayerIds;
  }, [guessedPlayerIds]);

  return (
    <div className="pitch-container">
      {/* Tactical Markings */}
      <div className="pitch-markings">
        <div className="pitch-outline" />
        <div className="pitch-center-line" />
        <div className="pitch-center-circle" />
        <div className="pitch-penalty-box-top" />
        <div className="pitch-penalty-box-bottom" />
      </div>

      {/* 11 Tactical Player Cards */}
      {players.map((player) => {
        const isGuessed = guessedPlayerIds.includes(player.id);
        const isMissing = revealAll && !isGuessed;
        const isJustGuessed = newlyGuessedId === player.id;

        let nodeClass = '';
        if (isGuessed) nodeClass = 'guessed';
        else if (isMissing) nodeClass = 'revealed-missing';

        if (isJustGuessed) nodeClass += ' just-guessed';

        return (
          <div
            key={player.id}
            className={`player-card-node ${nodeClass}`}
            style={{
              left: `${player.pos_x}%`,
              top: `${player.pos_y}%`,
            }}
          >
            <div className="player-card-content">
              {isGuessed || isMissing ? (
                <span className="player-card-name">{player.nome_oficial}</span>
              ) : (
                <span className="player-card-qmark">?</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
