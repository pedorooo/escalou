import React from 'react';

interface TeamFlagProps {
  code: string;
  className?: string;
  size?: number;
}

export default function TeamFlag({ code, className = '', size = 20 }: TeamFlagProps) {
  const normalizedCode = (code || '').toLowerCase();

  switch (normalizedCode) {
    case 'br':
      return (
        <svg
          width={size}
          height={(size * 3) / 4}
          viewBox="0 0 20 14"
          className={className}
          style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
        >
          <rect width="20" height="14" fill="#009B3A" />
          <polygon points="10,2 18,7 10,12 2,7" fill="#FEDF00" />
          <circle cx="10" cy="7" r="3" fill="#002776" />
        </svg>
      );
    case 'de':
      return (
        <svg
          width={size}
          height={(size * 3) / 4}
          viewBox="0 0 20 14"
          className={className}
          style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
        >
          <rect width="20" height="4.66" y="0" fill="#000000" />
          <rect width="20" height="4.66" y="4.66" fill="#DD0000" />
          <rect width="20" height="4.66" y="9.33" fill="#FFCC00" />
        </svg>
      );
    case 'ar':
      return (
        <svg
          width={size}
          height={(size * 3) / 4}
          viewBox="0 0 20 14"
          className={className}
          style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
        >
          <rect width="20" height="4.66" y="0" fill="#74ACDF" />
          <rect width="20" height="4.66" y="4.66" fill="#FFFFFF" />
          <rect width="20" height="4.66" y="9.33" fill="#74ACDF" />
          <circle cx="10" cy="7" r="1.5" fill="#F6B40E" />
        </svg>
      );
    case 'es':
      return (
        <svg
          width={size}
          height={(size * 3) / 4}
          viewBox="0 0 20 14"
          className={className}
          style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
        >
          <rect width="20" height="3.5" y="0" fill="#AA151B" />
          <rect width="20" height="7" y="3.5" fill="#F1BF00" />
          <rect width="20" height="3.5" y="10.5" fill="#AA151B" />
        </svg>
      );
    case 'fr':
      return (
        <svg
          width={size}
          height={(size * 3) / 4}
          viewBox="0 0 20 14"
          className={className}
          style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
        >
          <rect width="6.66" height="14" x="0" fill="#002395" />
          <rect width="6.66" height="14" x="6.66" fill="#FFFFFF" />
          <rect width="6.68" height="14" x="13.32" fill="#ED2939" />
        </svg>
      );
    case 'gb-eng':
    case 'england':
      return (
        <svg
          width={size}
          height={(size * 3) / 4}
          viewBox="0 0 20 14"
          className={className}
          style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle' }}
        >
          <rect width="20" height="14" fill="#FFFFFF" />
          <rect width="20" height="3" y="5.5" fill="#CE1124" />
          <rect width="3" height="14" x="8.5" fill="#CE1124" />
        </svg>
      );
    default:
      return (
        <span className="team-flag-code-fallback" style={{ fontSize: '11px', fontWeight: 700 }}>
          {code.toUpperCase()}
        </span>
      );
  }
}
