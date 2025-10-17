'use client';

import { useEffect, useState } from 'react';

interface IconData {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
  color: string;
  icon: string;
}

export default function AnimatedLogoSmooth() {
  const [icons, setIcons] = useState<IconData[]>([]);

  const iconColors = [
    '#EF4444', // red
    '#EC4899', // pink
    '#F59E0B', // amber
    '#10B981', // green
    '#8B5CF6', // purple
    '#06B6D4', // cyan
    '#FBBF24', // yellow
    '#60A5FA', // blue
  ];

  const iconShapes = ['★', '♥', '⚡', '♪', '🚀', '◆', '☀', '☁'];

  const calculatePositions = (): IconData[] => {
    const total = 8;
    
    // Generate fixed circular coordinate positions
    const positions = Array.from({ length: total }, (_, index) => {
      const angle = (index / total) * Math.PI * 2;
      const radius = 130;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (angle * 180) / Math.PI + 90;
      return { x, y, rotation };
    });

    // Create shuffled icon indices to randomly assign icons to positions
    const shuffledIndices = Array.from({ length: total }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    return positions.map((pos, positionIndex) => {
      const iconIndex = shuffledIndices[positionIndex];
      return {
        id: positionIndex,
        x: pos.x,
        y: pos.y,
        rotation: pos.rotation,
        delay: 0,
        color: iconColors[iconIndex],
        icon: iconShapes[iconIndex],
      };
    });
  };

  useEffect(() => {
    setIcons(calculatePositions());
    
    // Recalculate positions after each animation cycle (2.25s animation)
    const interval = setInterval(() => {
      setIcons(calculatePositions());
    }, 2250); // Match animation duration

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full h-full flex items-center justify-center">
            <svg
              viewBox="0 0 500 500"
              className="w-full h-full max-w-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definitions */}
              <defs>
                <radialGradient id="logoGradient">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Central Logo - Always centered */}
              <g className="central-logo">
                <circle cx="250" cy="250" r="60" fill="url(#logoGradient)" filter="url(#glow)" />
                <text
                  x="250"
                  y="265"
                  textAnchor="middle"
                  fill="white"
                  fontSize="32"
                  fontWeight="bold"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  LOGO
                </text>
              </g>

              {/* Floating Icons */}
              {icons.map((icon) => (
                <g
                  key={icon.id}
                  className="floating-icon"
                  style={{
                    transformOrigin: '250px 250px',
                    animationDelay: `${icon.delay}s`,
                  }}
                >
                  <circle
                    cx="250"
                    cy="250"
                    r="30"
                    fill={icon.color}
                    opacity="0.95"
                    style={{
                      transform: `translate(${icon.x}px, ${icon.y}px)`,
                    }}
                  />
                  <text
                    x="250"
                    y="260"
                    textAnchor="middle"
                    fill="white"
                    fontSize="24"
                    fontWeight="bold"
                    style={{
                      transform: `translate(${icon.x}px, ${icon.y}px) rotate(${icon.rotation}deg)`,
                      transformOrigin: '250px 250px',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {icon.icon}
                  </text>
                </g>
              ))}
            </svg>
      </div>

      <style jsx>{`
        .floating-icon {
          animation: smoothZoom 2.25s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes smoothZoom {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }

        .central-logo {
          animation: subtlePulse 3s ease-in-out infinite;
        }

        @keyframes subtlePulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Smooth transitions when icons shuffle to new positions */
        .floating-icon circle,
        .floating-icon text {
          transition: transform 0.7s ease-in-out;
        }
      `}</style>
    </div>
  );
}

