import React from 'react';
import { EditionSummary } from '../types/game';

interface EditionCardProps {
  edition: EditionSummary;
  isSelected: boolean;
  isFeatured?: boolean;
  onSelect: (editionId: string) => void;
}

export default function EditionCard({
  edition,
  isSelected,
  isFeatured,
  onSelect,
}: EditionCardProps) {
  const isActive = edition?.status === 'ativo';
  const titleText = (
    edition?.nome ||
    (edition?.ano ? `Copa do Mundo ${edition.ano}` : 'Copa do Mundo')
  ).toUpperCase();

  const handleClick = () => {
    if (isActive && edition?.id) {
      onSelect(edition.id);
    }
  };

  return (
    <div
      className={`edition-card ${isFeatured ? 'featured' : ''} ${
        isSelected ? 'selected' : ''
      } ${!isActive ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      {/* Background Stadium Image Overlay */}
      <div className="card-bg-stadium-image" />

      <div className="card-content-relative">
        <div className="card-title-row">
          <h3 className="card-title">{titleText}</h3>
          <span className={`card-badge ${!isActive ? 'badge-soon' : ''}`}>
            {isActive ? 'MVP Ativo' : 'Em breve'}
          </span>
        </div>

        <p className="card-desc">{edition?.pais_sede || ''}</p>
        <p className="card-subdesc">{edition?.descricao || ''}</p>
      </div>
    </div>
  );
}
