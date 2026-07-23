import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Player } from '../../types/game';
import PitchMarkings from './PitchMarkings';
import PlayerNode from '../PlayerNode/PlayerNode';
import './TacticalPitch.css';

interface TacticalPitchProps {
  players: Player[];
  guessedPlayerIds: string[];
  revealAll: boolean;
}

function mapPlayersTo433(players: Player[]): { player: Player & { x: number; y: number }; roleAbbrev: string }[] {
  const gkPool: Player[] = [];
  const lbPool: Player[] = [];
  const rbPool: Player[] = [];
  const cbPool: Player[] = [];
  const midPool: Player[] = [];
  const lwPool: Player[] = [];
  const rwPool: Player[] = [];
  const stPool: Player[] = [];
  const fallbackPool: Player[] = [];

  const startingPlayers = (players || []).some((p) => p.in_starting_eleven)
    ? (players || []).filter((p) => p.in_starting_eleven)
    : (players || []).slice(0, 11);

  startingPlayers.forEach((p) => {
    if (!p) return;
    const pos = (p.position || '').toLowerCase();
    if (pos === 'goleiro' || pos === 'goalkeeper' || pos === 'gk') gkPool.push(p);
    else if (pos === 'lateral-esquerdo' || pos === 'left-back' || pos === 'lb') lbPool.push(p);
    else if (pos === 'lateral-direito' || pos === 'right-back' || pos === 'rb') rbPool.push(p);
    else if (pos === 'zagueiro' || pos === 'center-back' || pos === 'cb' || pos === 'defence' || pos === 'defender') cbPool.push(p);
    else if (pos === 'volante' || pos === 'meia' || pos === 'meia-atacante' || pos === 'midfield' || pos === 'midfielder' || pos === 'cm' || pos === 'cam' || pos === 'cdm') midPool.push(p);
    else if (pos === 'ponta-esquerda' || pos === 'left-winger' || pos === 'lw') lwPool.push(p);
    else if (pos === 'ponta-direita' || pos === 'right-winger' || pos === 'rw') rwPool.push(p);
    else if (pos === 'atacante' || pos === 'offence' || pos === 'striker' || pos === 'forward' || pos === 'st') stPool.push(p);
    else fallbackPool.push(p);
  });

  const getPlayer = (primaryPool: Player[]): Player | undefined => {
    if (primaryPool.length > 0) return primaryPool.shift();
    if (fallbackPool.length > 0) return fallbackPool.shift();
    const otherPool = [gkPool, lbPool, rbPool, cbPool, midPool, lwPool, rwPool, stPool].find(p => p.length > 0);
    return otherPool ? otherPool.shift() : undefined;
  };

  const slots = [
    { roleAbbrev: 'GK', x: 50, y: 88, pool: gkPool },
    { roleAbbrev: 'LB', x: 18, y: 70, pool: lbPool },
    { roleAbbrev: 'CB', x: 38, y: 72, pool: cbPool },
    { roleAbbrev: 'CB', x: 62, y: 72, pool: cbPool },
    { roleAbbrev: 'RB', x: 82, y: 70, pool: rbPool },
    { roleAbbrev: 'CM', x: 30, y: 52, pool: midPool },
    { roleAbbrev: 'CM', x: 50, y: 56, pool: midPool },
    { roleAbbrev: 'CM', x: 70, y: 52, pool: midPool },
    { roleAbbrev: 'LW', x: 20, y: 24, pool: lwPool },
    { roleAbbrev: 'ST', x: 50, y: 16, pool: stPool },
    { roleAbbrev: 'RW', x: 80, y: 24, pool: rwPool },
  ];

  return slots.map(slot => {
    const player = getPlayer(slot.pool);
    if (!player) {
      return {
        player: {
          id: `dummy-${slot.roleAbbrev}`,
          official_name: 'Desconhecido',
          position: slot.roleAbbrev,
          shirt_number: 0,
          club_at_time: '',
          x: slot.x,
          y: slot.y,
          aliases: []
        },
        roleAbbrev: slot.roleAbbrev
      };
    }
    return {
      player: {
        ...player,
        x: slot.x,
        y: slot.y
      },
      roleAbbrev: slot.roleAbbrev
    };
  });
}

export default function TacticalPitch({
  players,
  guessedPlayerIds,
  revealAll,
}: TacticalPitchProps) {
  const [newlyGuessedId, setNewlyGuessedId] = useState<string | null>(null);
  const prevGuessedRef = useRef<string[]>(guessedPlayerIds);

  useEffect(() => {
    const prevGuessed = prevGuessedRef.current;
    // Detect newly added guessed player ID
    const addedId = guessedPlayerIds.find(
      (id) => !prevGuessed.includes(id)
    );

    // Update reference immediately to avoid repeat detection loops
    prevGuessedRef.current = guessedPlayerIds;

    if (addedId) {
      setNewlyGuessedId(addedId);
      const timer = setTimeout(() => setNewlyGuessedId(null), 600);
      return () => clearTimeout(timer);
    }
  }, [guessedPlayerIds]);

  const positionedPlayers = useMemo(() => {
    return mapPlayersTo433(players);
  }, [players]);

  return (
    <div className="pitch-container">
      <div className="pitch-field">
        {/* Pitch Lines & Markings */}
        <PitchMarkings />

        {/* 11 Predefined 4-3-3 Player Nodes */}
        {positionedPlayers.map(({ player, roleAbbrev }) => {
          const isGuessed = guessedPlayerIds.includes(player.id);
          const isMissing = revealAll && !isGuessed;
          const isJustGuessed = newlyGuessedId === player.id;

          return (
            <PlayerNode
              key={player.id}
              player={player}
              isGuessed={isGuessed}
              isMissing={isMissing}
              isJustGuessed={isJustGuessed}
              roleAbbreviation={roleAbbrev}
            />
          );
        })}
      </div>
    </div>
  );
}


