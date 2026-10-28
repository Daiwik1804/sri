import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  showTagline = true,
  className = '' 
}) => {
  const isLight = variant === 'light';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group text-left ${className}`}>
      {/* Emblem */}
      <div className="relative flex-shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#7a1027] via-[#54091a] to-[#34040e] border-2 border-[#d4af37] shadow-md flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
          <path d="M26 68 Q50 32 74 28" fill="none" stroke="#f6e082" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
          <text 
            x="50" 
            y="62" 
            fontFamily="'Playfair Display', Georgia, serif" 
            fontSize="36" 
            fontWeight="bold" 
            fill="#f6e082" 
            textAnchor="middle" 
            letterSpacing="1"
          >
            RB
          </text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-serif text-xl md:text-2xl font-bold tracking-tight ${
            isLight ? 'text-white' : 'text-[#6b1126]'
          }`}>
            Rev’s
          </span>
          <span className={`font-serif text-lg md:text-xl font-medium tracking-wide ${
            isLight ? 'text-[#f6e082]' : 'text-[#b8911c]'
          }`}>
            Boutique
          </span>
        </div>
        
        {showTagline && (
          <span className={`text-[10px] md:text-xs tracking-wider uppercase font-medium ${
            isLight ? 'text-[#fce7f0]/80' : 'text-[#7a1027]/75'
          }`}>
            Your Style, Our Stitching
          </span>
        )}
      </div>
    </Link>
  );
};
