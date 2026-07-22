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
  const isActive = edition?.status === 'active';
  const titleText = (
    edition?.name ||
    (edition?.year ? `Copa do Mundo ${edition.year}` : 'Copa do Mundo')
  ).toUpperCase();

  const handleClick = () => {
    if (isActive && edition?.id) {
      onSelect(edition.id);
    }
  };

  return (
    <div
      className={`edition-card ${isFeatured ? 'featured' : ''} ${isSelected ? 'selected' : ''
        } ${!isActive ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      {/* Background Stadium Image Overlay */}
      <div className="card-bg-stadium-image" />

      <div className="card-content-relative">
        <div className="card-title-row">
          <h3 className="card-title">{titleText}</h3>
          {!isActive && (
            <span className="card-badge badge-soon">
              Em Breve
            </span>
          )}
        </div>

        <p className="card-desc">{edition?.host_country || ''}</p>
      </div>
    </div>
  );
}
