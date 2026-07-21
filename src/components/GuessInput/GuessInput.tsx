import React, { useState, FormEvent } from 'react';
import { Check, FastForward } from 'lucide-react';
import './GuessInput.css';

interface GuessInputProps {
  onGuess: (value: string) => void;
  onSkip: () => void;
  disabled: boolean;
  isErrorFlash: boolean;
  skipsLeft: number;
}

export default function GuessInput({
  onGuess,
  onSkip,
  disabled,
  isErrorFlash,
  skipsLeft,
}: GuessInputProps) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onGuess(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="game-input-section">
      <input
        type="text"
        className={`game-text-input ${isErrorFlash ? 'error-flash' : ''}`}
        placeholder="DIGITE O NOME DO JOGADOR..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        autoFocus
      />

      <div className="game-action-buttons-row">
        <button
          type="submit"
          className="action-btn-confirm"
          disabled={disabled || !value.trim()}
        >
          <Check size={18} strokeWidth={2.5} style={{ marginRight: '6px' }} />
          CONFIRMAR
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="action-btn-skip"
          disabled={disabled || skipsLeft <= 0}
        >
          <FastForward size={18} strokeWidth={2} style={{ marginRight: '6px' }} />
          PULAR
        </button>
      </div>
    </form>
  );
}
