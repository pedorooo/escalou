import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GamePage from '../pages/GamePage/GamePage';
import ResultsPage from '../pages/ResultsPage';
import { useGameSession } from '../context/GameContext';

function GamePageRoute() {
  const {
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
  } = useGameSession();

  if (loading || !editionData) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Carregando Copa do Mundo 2026...</h2>
      </div>
    );
  }

  return (
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
  );
}

function ResultsPageRoute() {
  const navigate = useNavigate();
  const {
    editionData,
    loading,
    progressByTeam,
    errors,
    skipsUsed,
    gameStatus,
    seconds,
    handleRestartMatch,
  } = useGameSession();

  if (loading || !editionData) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <h2>Carregando resultados...</h2>
      </div>
    );
  }

  return (
    <ResultsPage
      editionData={editionData}
      progressByTeam={progressByTeam}
      errors={errors}
      skipsUsed={skipsUsed}
      gameStatus={gameStatus}
      seconds={seconds}
      onPlayAgain={() => {
        handleRestartMatch();
        navigate('/jogo');
      }}
      onGoHome={() => navigate('/')}
    />
  );
}

function HomePageRoute() {
  const { handleStartGame } = useGameSession();
  return <HomePage onStartGame={() => handleStartGame()} />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePageRoute />} />
      <Route path="/jogo" element={<GamePageRoute />} />
      <Route path="/resultados" element={<ResultsPageRoute />} />
      <Route path="*" element={<HomePageRoute />} />
    </Routes>
  );
}
