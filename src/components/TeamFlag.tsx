import React from 'react';

interface TeamFlagProps {
  code: string;
  className?: string;
  size?: number;
}

const FIFA_TO_ISO2: Record<string, string> = {
  alg: 'dz',
  dza: 'dz',
  arg: 'ar',
  aus: 'au',
  aut: 'at',
  bel: 'be',
  bra: 'br',
  can: 'ca',
  chi: 'cl',
  col: 'co',
  crc: 'cr',
  cro: 'hr',
  cze: 'cz',
  den: 'dk',
  ecu: 'ec',
  egy: 'eg',
  eng: 'gb-eng',
  esp: 'es',
  fra: 'fr',
  ger: 'de',
  deu: 'de',
  gha: 'gh',
  gre: 'gr',
  hai: 'ht',
  hon: 'hn',
  hun: 'hu',
  irn: 'ir',
  irq: 'iq',
  isl: 'is',
  ita: 'it',
  civ: 'ci',
  jam: 'jm',
  jpn: 'jp',
  jor: 'jo',
  kor: 'kr',
  ksa: 'sa',
  mar: 'ma',
  mex: 'mx',
  ned: 'nl',
  nga: 'ng',
  nor: 'no',
  nzl: 'nz',
  pan: 'pa',
  par: 'py',
  pry: 'py',
  per: 'pe',
  pol: 'pl',
  por: 'pt',
  qat: 'qa',
  rom: 'ro',
  rus: 'ru',
  sco: 'gb-sct',
  sen: 'sn',
  rsa: 'za',
  srb: 'rs',
  sui: 'ch',
  swe: 'se',
  tun: 'tn',
  tur: 'tr',
  ukr: 'ua',
  uru: 'uy',
  ury: 'uy',
  usa: 'us',
  uzb: 'uz',
  wal: 'gb-wls',
  cur: 'cw',
};

export default function TeamFlag({ code, className = '', size = 20 }: TeamFlagProps) {
  const normalizedCode = (code || '').toLowerCase();
  const iso2 = FIFA_TO_ISO2[normalizedCode] || (normalizedCode.length === 2 ? normalizedCode : null);

  if (iso2) {
    return (
      <img
        src={`https://flagcdn.com/w40/${iso2}.png`}
        alt={code}
        width={size}
        height={Math.round((size * 3) / 4)}
        className={`team-flag-img ${className}`}
        style={{
          borderRadius: '2px',
          objectFit: 'cover',
          display: 'inline-block',
          verticalAlign: 'middle',
          boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
        }}
        onError={(e) => {
          // If flag image fails to load, fallback to text code
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.nextElementSibling) {
            (target.nextElementSibling as HTMLElement).style.display = 'inline-block';
          }
        }}
      />
    );
  }

  return (
    <span
      className="team-flag-code-fallback"
      style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}
    >
      {code ? code.toUpperCase() : '??'}
    </span>
  );
}
