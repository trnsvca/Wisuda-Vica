import React, { useState } from 'react';

interface GraduationCapProps {
  onToss?: () => void;
}

export const GraduationCap: React.FC<GraduationCapProps> = ({ onToss }) => {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    setIsWiggling(true);
    if (onToss) onToss();
    setTimeout(() => setIsWiggling(false), 800);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Klik untuk lempar toga!"
      className={`cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none ${
        isWiggling ? 'animate-bounce' : ''
      }`}
      aria-label="Graduation Cap"
    >
      <svg
        width="90"
        height="80"
        viewBox="0 0 100 88"
        aria-hidden="true"
        className="filter drop-shadow-[4px_4px_0_var(--line)]"
      >
        {/* Cap Skull */}
        <path d="M26 42 V64 Q50 80 74 64 V42 L50 54 Z" fill="#1b1b4b" />
        {/* Cap Diamond */}
        <polygon
          points="50,8 97,28 50,48 3,28"
          fill="#1b1b4b"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Cap Button */}
        <circle cx="50" cy="28" r="4.5" fill="#ff4f9a" />
        {/* Tassel */}
        <path
          d="M50 28 Q75 29 88 36 V62"
          stroke="#ff4f9a"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="88" cy="65" r="5.5" fill="#ff4f9a" />
      </svg>
    </button>
  );
};
