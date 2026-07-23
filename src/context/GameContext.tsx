import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  EditionData,
  ProgressMap,
  GameStatus,
  FeedbackMessage,
  Team,
} from '../types/game';
import { fetchEditionData } from '../services/editionsService';
import { findMatchingPlayer, initProgressMap } from '../services/gameService';

interface GameContextType {
  editionData: EditionData | null;
  loading: boolean;
  currentIndex: number;
  progressByTeam: ProgressMap;
  errors: number;
  skipsUsed: number;
  gameStatus: GameStatus;
  seconds: number;
  feedback: FeedbackMessage | null;
  isErrorFlash: boolean;
  handleGuess: (inputText: string) => void;
  handleSkip: () => void;
  handleStartGame: (editionId?: string, difficulty?: string) => void;
  handleRestartMatch: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [editionData, setEditionData] = useState<EditionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progressByTeam, setProgressByTeam] = useState<ProgressMap>({});
  const [errors, setErrors] = useState<number>(0);
  const [skipsUsed, setSkipsUsed] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('in_progress');
  const [seconds, setSeconds] = useState<number>(0);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [isErrorFlash, setIsErrorFlash] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load Edition Data
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchEditionData('copa-2026');
        setEditionData(data);
        setProgressByTeam(initProgressMap(data.teams || []));
      } catch (err) {
        console.error('Failed to load edition data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Timer tick for active game route
  useEffect(() => {
    if (
      location.pathname === '/jogo' &&
      gameStatus === 'in_progress' &&
      !loading &&
      editionData
    ) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current as number);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current as number);
    };
  }, [location.pathname, gameStatus, loading, editionData]);

  const teams: Team[] = editionData?.teams || [];
  const currentTeam: Team | undefined = teams[currentIndex];
  const currentAcertos: string[] = currentTeam
    ? progressByTeam[currentTeam.id]?.correct_guesses || []
    : [];

  const handleRestartMatch = () => {
    setCurrentIndex(0);
    setErrors(0);
    setSkipsUsed(0);
    setSeconds(0);
    setGameStatus('in_progress');
    setFeedback(null);
    if (editionData?.teams) {
      setProgressByTeam(initProgressMap(editionData.teams));
    }
  };

  const handleStartGame = () => {
    handleRestartMatch();
    navigate('/jogo');
  };

  const handleGuess = (inputText: string) => {
    if (gameStatus !== 'in_progress' || !currentTeam) return;

    const matchedPlayer = findMatchingPlayer(inputText, currentTeam.players || []);

    if (matchedPlayer) {
      if (currentAcertos.includes(matchedPlayer.id)) {
        setFeedback({ type: 'info', text: 'Jogador já acertado nesta seleção.' });
        setTimeout(() => setFeedback(null), 2000);
        return;
      }

      const updatedAcertos = [...currentAcertos, matchedPlayer.id];

      const startingPlayers = (currentTeam.players || []).filter((p) => p.in_starting_eleven);
      const targetStarters = startingPlayers.length > 0 ? startingPlayers : (currentTeam.players || []);
      const isTeamComplete = targetStarters.every((starter) => updatedAcertos.includes(starter.id));

      setProgressByTeam((prev) => ({
        ...prev,
        [currentTeam.id]: {
          status: isTeamComplete ? 'completed' : 'in_progress',
          correct_guesses: updatedAcertos,
        },
      }));

      if (isTeamComplete) {
        setFeedback({
          type: 'success',
          text: `Seleção do ${currentTeam.name} concluída!`,
        });

        setTimeout(() => {
          setFeedback(null);
          if (currentIndex + 1 < teams.length) {
            const nextTeamId = teams[currentIndex + 1].id;
            setCurrentIndex((prev) => prev + 1);
            setProgressByTeam((prev) => ({
              ...prev,
              [nextTeamId]: { ...prev[nextTeamId], status: 'in_progress' },
            }));
          } else {
            setGameStatus('victory');
            navigate('/resultados');
          }
        }, 1200);
      }
    } else {
      const newErrors = errors + 1;
      setErrors(newErrors);
      setIsErrorFlash(true);
      setTimeout(() => setIsErrorFlash(false), 500);

      setFeedback({ type: 'error', text: 'Nome não encontrado nesta seleção!' });
      setTimeout(() => setFeedback(null), 1800);

      if (newErrors >= 3) {
        setGameStatus('defeat');
        setTimeout(() => {
          navigate('/resultados');
        }, 1000);
      }
    }
  };

  const handleSkip = () => {
    if (skipsUsed >= 2 || gameStatus !== 'in_progress' || !currentTeam) return;

    const newSkips = skipsUsed + 1;
    setSkipsUsed(newSkips);

    setProgressByTeam((prev) => ({
      ...prev,
      [currentTeam.id]: { ...prev[currentTeam.id], status: 'skipped' },
    }));

    if (currentIndex + 1 < teams.length) {
      const nextTeamId = teams[currentIndex + 1].id;
      setCurrentIndex((prev) => prev + 1);
      setProgressByTeam((prev) => ({
        ...prev,
        [nextTeamId]: { ...prev[nextTeamId], status: 'in_progress' },
      }));
    } else {
      const completedCount = Object.values(progressByTeam).filter(
        (p) => p.status === 'completed'
      ).length;

      setGameStatus(completedCount > 0 ? 'victory' : 'defeat');
      navigate('/resultados');
    }
  };

  return (
    <GameContext.Provider
      value={{
        editionData,
        loading,
        currentIndex,
        progressByTeam,
        errors,
        skipsUsed,
        gameStatus,
        seconds,
        feedback,
        isErrorFlash,
        handleGuess,
        handleSkip,
        handleStartGame,
        handleRestartMatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameSession() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameSession must be used within a GameProvider');
  }
  return context;
}
