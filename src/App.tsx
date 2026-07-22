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
  Player,
} from './types/game';

function normalizeText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getViewFromPath(pathname: string): PageView {
  if (pathname === '/jogo') return 'game';
  if (pathname === '/resultados') return 'results';
  return 'home';
}

function getPathFromView(view: PageView): string {
  if (view === 'game') return '/jogo';
  if (view === 'results') return '/resultados';
  return '/';
}

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
  const [gameStatus, setGameStatus] = useState<GameStatus>('em_andamento');
  const [seconds, setSeconds] = useState<number>(0);

  // UI Feedback state
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);
  const [isErrorFlash, setIsErrorFlash] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | number | null>(null);

  // Load Copa 2026 Data
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/editions/copa-2026');
        const data: EditionData = await res.json();
        setEditionData(data);
        initProgress(data);
      } catch (err) {
        console.error('Failed to load edition data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const initProgress = (data: EditionData) => {
    const initialProgress: ProgressMap = {};
    data.selecoes.forEach((team) => {
      initialProgress[team.id] = { status: 'pendente', acertos: [] };
    });
    if (data.selecoes.length > 0) {
      initialProgress[data.selecoes[0].id].status = 'em_andamento';
    }
    setProgressByTeam(initialProgress);
  };

  // Timer Tick
  useEffect(() => {
    if (
      currentView === 'game' &&
      gameStatus === 'em_andamento' &&
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

  const teams: Team[] = editionData.selecoes;
  const currentTeam: Team | undefined = teams[currentIndex];
  const currentAcertos: string[] = currentTeam
    ? progressByTeam[currentTeam.id]?.acertos || []
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
    setGameStatus('em_andamento');
    setFeedback(null);
    initProgress(editionData);
  };

  // Submit player guess
  const handleGuess = (inputText: string) => {
    if (gameStatus !== 'em_andamento' || !currentTeam) return;

    const normalizedInput = normalizeText(inputText);

    const matchedPlayer = currentTeam.convocados.find((player: Player) => {
      const matchOfficial = normalizeText(player.nome_oficial) === normalizedInput;
      const matchAlias = player.aliases.some(
        (alias) => normalizeText(alias) === normalizedInput
      );
      return matchOfficial || matchAlias;
    });

    if (matchedPlayer) {
      if (currentAcertos.includes(matchedPlayer.id)) {
        setFeedback({ type: 'info', text: 'Jogador já acertado nesta seleção.' });
        setTimeout(() => setFeedback(null), 2000);
        return;
      }

      const updatedAcertos = [...currentAcertos, matchedPlayer.id];
      const isTeamComplete = updatedAcertos.length >= currentTeam.convocados.length;

      setProgressByTeam((prev) => ({
        ...prev,
        [currentTeam.id]: {
          status: isTeamComplete ? 'concluida' : 'em_andamento',
          acertos: updatedAcertos,
        },
      }));

      if (isTeamComplete) {
        setFeedback({
          type: 'success',
          text: `Seleção do ${currentTeam.nome} concluída!`,
        });

        setTimeout(() => {
          setFeedback(null);
          if (currentIndex + 1 < teams.length) {
            const nextTeamId = teams[currentIndex + 1].id;
            setCurrentIndex((prev) => prev + 1);
            setProgressByTeam((prev) => ({
              ...prev,
              [nextTeamId]: { ...prev[nextTeamId], status: 'em_andamento' },
            }));
          } else {
            setGameStatus('vitoria');
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
        setGameStatus('derrota');
        setTimeout(() => {
          navigateTo('results');
        }, 1000);
      }
    }
  };

  // Skip team logic
  const handleSkip = () => {
    if (skipsUsed >= 2 || gameStatus !== 'em_andamento' || !currentTeam) return;

    const newSkips = skipsUsed + 1;
    setSkipsUsed(newSkips);

    setProgressByTeam((prev) => ({
      ...prev,
      [currentTeam.id]: { ...prev[currentTeam.id], status: 'pulada' },
    }));

    if (currentIndex + 1 < teams.length) {
      const nextTeamId = teams[currentIndex + 1].id;
      setCurrentIndex((prev) => prev + 1);
      setProgressByTeam((prev) => ({
        ...prev,
        [nextTeamId]: { ...prev[nextTeamId], status: 'em_andamento' },
      }));
    } else {
      const completedCount = Object.values(progressByTeam).filter(
        (p) => p.status === 'concluida'
      ).length;

      setGameStatus(completedCount > 0 ? 'vitoria' : 'derrota');
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
