import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { GameProvider } from './context/GameContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Navbar />
        <AppRoutes />
      </GameProvider>
    </BrowserRouter>
  );
}
