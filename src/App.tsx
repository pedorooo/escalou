import React, { useState, useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage/GamePage';
import ResultsPage from './pages/ResultsPage';
import Navbar from './components/Navbar/Navbar';
import {
  EditionData,
  ProgressMap,
  GameStatus,
  PageView,
  FeedbackMessage,
  Team,
} from './types/game';
import { fetchEditionData } from './services/editionsService';
import { getViewFromPath, getPathFromView } from './services/routerService';
import { findMatchingPlayer, initProgressMap } from './services/gameService';

export default function App() {
  const [editionData, setEditionData] = useState<EditionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Navigation State linked to Browser URL
  const [currentView, setCurrentView] = useState<PageView>(() =>
    getViewFromPath(window.location.pathname)
  );

  const navigateTo = (view: PageView) => {
    setCurrentView(view);
    const path = getPathFromView(view);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Game Session State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [progressByTeam, setProgressByTeam] = useState<ProgressMap>({});
  const [errors, setErrors] = useState<number>(0);
  const [skipsUsed, setSkipsUsed] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('in_progress');
  const [seconds, setSeconds] = useState<number>(0);

  // UI Feedback state
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [isErrorFlash, setIsErrorFlash] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  // Load Edition Data via Service
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

  // Timer Tick
  useEffect(() => {
    if (
      currentView === 'game' &&
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
  }, [currentView, gameStatus, loading, editionData]);

  if (loading || !editionData) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Carregando Copa do Mundo 2026...</h2>
      </div>
    );
  }

  const teams: Team[] = editionData.teams || [];
  const currentTeam: Team | undefined = teams[currentIndex];
  const currentAcertos: string[] = currentTeam
    ? progressByTeam[currentTeam.id]?.correct_guesses || []
    : [];

  const handleStartGame = () => {
    handleRestartMatch();
    navigateTo('game');
  };

  const handleRestartMatch = () => {
    setCurrentIndex(0);
    setErrors(0);
    setSkipsUsed(0);
    setSeconds(0);
    setGameStatus('in_progress');
    setFeedback(null);
    setProgressByTeam(initProgressMap(editionData.teams || []));
  };

  // Submit player guess using GameService
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
      const isTeamComplete = updatedAcertos.length >= (currentTeam.players || []).length;

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
            navigateTo('results');
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
          navigateTo('results');
        }, 1000);
      }
    }
  };

  // Skip team logic
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
      navigateTo('results');
    }
  };

  return (
    <>
      {/* Top Navigation Bar - Visible on all pages */}
      <Navbar onBrandClick={() => navigateTo('home')} />

      {/* URL-based View Routing */}
      {currentView === 'home' && <HomePage onStartGame={handleStartGame} />}

      {currentView === 'game' && (
        <GamePage
          editionData={editionData}
          currentIndex={currentIndex}
          progressByTeam={progressByTeam}
          errors={errors}
          skipsUsed={skipsUsed}
          gameStatus={gameStatus}
          seconds={seconds}
          feedback={feedback}
          isErrorFlash={isErrorFlash}
          onGuess={handleGuess}
          onSkip={handleSkip}
        />
      )}

      {currentView === 'results' && (
        <ResultsPage
          editionData={editionData}
          progressByTeam={progressByTeam}
          errors={errors}
          skipsUsed={skipsUsed}
          gameStatus={gameStatus}
          seconds={seconds}
          onPlayAgain={() => {
            handleRestartMatch();
            navigateTo('game');
          }}
          onGoHome={() => navigateTo('home')}
        />
      )}
    </>
  );
}
