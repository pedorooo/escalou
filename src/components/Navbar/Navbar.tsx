import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onBrandClick?: () => void;
}

export default function Navbar({ onBrandClick }: NavbarProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onBrandClick) {
      onBrandClick();
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="top-navbar">
      <div className="nav-brand" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <Trophy size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
        ESCALOU
      </div>
    </nav>
  );
}
