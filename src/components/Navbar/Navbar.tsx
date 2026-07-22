import React from 'react';
import { Trophy } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onBrandClick: () => void;
}

export default function Navbar({ onBrandClick }: NavbarProps) {
  return (
    <nav className="top-navbar">
      <div className="nav-brand" onClick={onBrandClick}>
        <Trophy size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
        ESCALOU
      </div>
    </nav>
  );
}
