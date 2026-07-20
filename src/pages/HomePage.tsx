import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import EditionCard from '../components/EditionCard';
import { fetchEditionsList } from '../services/editionsService';
import { EditionSummary } from '../types/game';

interface HomePageProps {
  onStartGame: (editionId: string, difficulty: string) => void;
}

export default function HomePage({ onStartGame }: HomePageProps) {
  const [editions, setEditions] = useState<EditionSummary[]>([]);
  const [selectedEdition, setSelectedEdition] = useState<string>('copa-2026');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('medio');
  const [loadingEditions, setLoadingEditions] = useState<boolean>(true);

  useEffect(() => {
    async function loadEditions() {
      try {
        const data = await fetchEditionsList();
        setEditions(data);
      } catch (err) {
        console.error('Failed to load editions:', err);
      } finally {
        setLoadingEditions(false);
      }
    }
    loadEditions();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Banner Component (Matching Screenshot) */}
      <HeroBanner />

      {/* Section 1: Editions Grid (3 Items, First/Latest spans 2 cards) */}
      <div className="section-block">
        <h2 className="section-label">Edições disponíveis</h2>

        {loadingEditions ? (
          <p>Carregando edições disponíveis...</p>
        ) : (
          <div className="editions-grid-3">
            {editions.map((edition, idx) => (
              <EditionCard
                key={edition.id}
                edition={edition}
                isFeatured={idx === 0}
                isSelected={selectedEdition === edition.id}
                onSelect={setSelectedEdition}
              />
            ))}
          </div>
        )}
      </div>

      {/* Start Button */}
      <button
        onClick={() => onStartGame(selectedEdition, selectedDifficulty)}
        className="start-action-btn"
      >
        Iniciar Desafio (Copa 2026)
      </button>
    </div>
  );
}
