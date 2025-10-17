'use client';

import { useEffect, useRef, useState } from 'react';

type AnimationStyle = 'random' | 'circular' | 'wave' | 'spiral';

export default function AnimatedLogoAdvanced() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animationStyle, setAnimationStyle] = useState<AnimationStyle>('random');
  const [isAnimating, setIsAnimating] = useState(true);

  const applyAnimation = (style: AnimationStyle) => {
    if (!svgRef.current) return;

    const icons = svgRef.current.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
      const total = icons.length;
      let x = 0, y = 0, rotation = 0;

      switch (style) {
        case 'circular':
          // Evenly distributed in a circle
          const angle = (index / total) * Math.PI * 2;
          const radius = 120;
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius;
          rotation = (angle * 180) / Math.PI;
          break;

        case 'random':
          // Random positions
          const randomAngle = (Math.random() * 360) * (Math.PI / 180);
          const randomRadius = 80 + Math.random() * 100;
          x = Math.cos(randomAngle) * randomRadius;
          y = Math.sin(randomAngle) * randomRadius;
          rotation = Math.random() * 360;
          break;

        case 'wave':
          // Wave pattern
          const waveAngle = (index / total) * Math.PI * 2;
          x = Math.cos(waveAngle) * 150;
          y = Math.sin(waveAngle * 2) * 80;
          rotation = (waveAngle * 180) / Math.PI;
          break;

        case 'spiral':
          // Spiral pattern
          const spiralAngle = (index / total) * Math.PI * 4;
          const spiralRadius = 50 + (index / total) * 100;
          x = Math.cos(spiralAngle) * spiralRadius;
          y = Math.sin(spiralAngle) * spiralRadius;
          rotation = (spiralAngle * 180) / Math.PI;
          break;
      }

      // Apply transform with custom properties for CSS
      const element = icon as SVGElement;
      element.style.setProperty('--x', `${x}px`);
      element.style.setProperty('--y', `${y}px`);
      element.style.setProperty('--rotation', `${rotation}deg`);
      
      // Stagger animation delays
      const delay = (index / total) * 0.5;
      element.style.animationDelay = `${delay}s`;
    });
  };

  useEffect(() => {
    applyAnimation(animationStyle);
  }, [animationStyle]);

  const toggleAnimation = () => {
    if (!svgRef.current) return;
    
    const icons = svgRef.current.querySelectorAll('.floating-icon');
    icons.forEach((icon) => {
      const element = icon as SVGElement;
      if (isAnimating) {
        element.style.animationPlayState = 'paused';
      } else {
        element.style.animationPlayState = 'running';
      }
    });
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Advanced SVG Animation Demo
          </h1>
          
          {/* Controls */}
          <div className="mb-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setAnimationStyle('random')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                animationStyle === 'random'
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Random
            </button>
            <button
              onClick={() => setAnimationStyle('circular')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                animationStyle === 'circular'
                  ? 'bg-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Circular
            </button>
            <button
              onClick={() => setAnimationStyle('wave')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                animationStyle === 'wave'
                  ? 'bg-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Wave
            </button>
            <button
              onClick={() => setAnimationStyle('spiral')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                animationStyle === 'spiral'
                  ? 'bg-green-500 text-white shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Spiral
            </button>
            <button
              onClick={toggleAnimation}
              className="px-6 py-3 rounded-lg font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition-all"
            >
              {isAnimating ? 'Pause' : 'Play'}
            </button>
          </div>

          {/* SVG Animation */}
          <div className="bg-slate-950/50 rounded-lg p-12 flex items-center justify-center border border-white/10">
            <svg
              ref={svgRef}
              viewBox="0 0 400 400"
              className="w-full max-w-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Logo */}
              <defs>
                <radialGradient id="logoGradient">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <g className="central-logo" filter="url(#glow)">
                <circle cx="200" cy="200" r="50" fill="url(#logoGradient)" />
                <text
                  x="200"
                  y="215"
                  textAnchor="middle"
                  fill="white"
                  fontSize="28"
                  fontWeight="bold"
                >
                  LOGO
                </text>
              </g>

              {/* Floating Icons with actual SVG icons instead of emojis */}
              {/* Icon 1: Star */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#EF4444" opacity="0.9" />
                <path
                  d="M 200 185 L 205 195 L 215 195 L 207 202 L 210 212 L 200 205 L 190 212 L 193 202 L 185 195 L 195 195 Z"
                  fill="white"
                />
              </g>

              {/* Icon 2: Heart */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#EC4899" opacity="0.9" />
                <path
                  d="M 200 210 C 195 205, 190 200, 190 195 C 190 190, 193 187, 197 187 C 199 187, 200 188, 200 190 C 200 188, 201 187, 203 187 C 207 187, 210 190, 210 195 C 210 200, 205 205, 200 210 Z"
                  fill="white"
                />
              </g>

              {/* Icon 3: Lightning */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#F59E0B" opacity="0.9" />
                <path
                  d="M 205 185 L 195 200 L 202 200 L 198 215 L 208 200 L 201 200 Z"
                  fill="white"
                />
              </g>

              {/* Icon 4: Music Note */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#10B981" opacity="0.9" />
                <path
                  d="M 205 190 L 205 206 C 205 209, 202 211, 199 211 C 196 211, 193 209, 193 206 C 193 203, 196 201, 199 201 C 200 201, 201 201, 202 202 L 202 193 L 208 191 Z"
                  fill="white"
                />
              </g>

              {/* Icon 5: Rocket */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#8B5CF6" opacity="0.9" />
                <path
                  d="M 200 187 L 197 197 L 193 212 L 200 207 L 207 212 L 203 197 Z M 200 197 C 200 197, 198 199, 198 201 C 198 203, 200 203, 200 203 C 200 203, 202 203, 202 201 C 202 199, 200 197, 200 197 Z"
                  fill="white"
                />
              </g>

              {/* Icon 6: Diamond */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#06B6D4" opacity="0.9" />
                <path
                  d="M 200 187 L 210 197 L 200 210 L 190 197 Z"
                  fill="white"
                />
              </g>

              {/* Icon 7: Sun */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#FBBF24" opacity="0.9" />
                <circle cx="200" cy="200" r="6" fill="white" />
                <line x1="200" y1="188" x2="200" y2="193" stroke="white" strokeWidth="2" />
                <line x1="200" y1="207" x2="200" y2="212" stroke="white" strokeWidth="2" />
                <line x1="188" y1="200" x2="193" y2="200" stroke="white" strokeWidth="2" />
                <line x1="207" y1="200" x2="212" y2="200" stroke="white" strokeWidth="2" />
              </g>

              {/* Icon 8: Cloud */}
              <g className="floating-icon">
                <circle cx="200" cy="200" r="25" fill="#60A5FA" opacity="0.9" />
                <path
                  d="M 193 200 C 193 197, 195 195, 198 195 C 198 193, 200 191, 203 191 C 206 191, 208 193, 208 196 C 210 196, 212 198, 212 200 C 212 202, 210 204, 208 204 L 195 204 C 193 204, 193 202, 193 200 Z"
                  fill="white"
                />
              </g>
            </svg>
          </div>

          {/* Info Section */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-200 mb-3">🎯 Why This Beats Lottie:</h3>
              <ul className="text-sm text-blue-100 space-y-2">
                <li>✅ <strong>Size:</strong> ~3KB vs 50-200KB Lottie</li>
                <li>✅ <strong>Performance:</strong> Native browser rendering</li>
                <li>✅ <strong>Dynamic:</strong> Change patterns on the fly</li>
                <li>✅ <strong>Maintainable:</strong> Pure code, no exports</li>
                <li>✅ <strong>Versioning:</strong> Easy to create variants</li>
              </ul>
            </div>

            <div className="bg-purple-500/20 border border-purple-400/50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-200 mb-3">🚀 Easy Variations:</h3>
              <ul className="text-sm text-purple-100 space-y-2">
                <li>• Change colors → 1 line per icon</li>
                <li>• Add new pattern → 10 lines of code</li>
                <li>• Adjust timing → CSS variables</li>
                <li>• Responsive → Media queries</li>
                <li>• Interactive → Mouse/scroll events</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-green-500/20 border border-green-400/50 rounded-lg p-4">
            <h3 className="font-semibold text-green-200 mb-2">💡 Production Tips:</h3>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• Extract to reusable component with props</li>
              <li>• Use CSS custom properties for easy theming</li>
              <li>• Add prefers-reduced-motion support</li>
              <li>• Consider using Framer Motion for complex sequences</li>
              <li>• Can export as standalone SVG file for emails/static</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating-icon {
          animation: floatZoomDrift 4s infinite ease-in-out;
          transform-origin: center;
          will-change: transform, opacity;
        }

        @keyframes floatZoomDrift {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0) rotate(0deg);
          }
          15% {
            opacity: 1;
            transform: translate(
              calc(var(--x) * 0.3),
              calc(var(--y) * 0.3)
            ) scale(0.8) rotate(calc(var(--rotation) * 0.3));
          }
          50% {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1) rotate(var(--rotation));
          }
          85% {
            opacity: 1;
            transform: translate(
              calc(var(--x) * 0.3),
              calc(var(--y) * 0.3)
            ) scale(0.8) rotate(calc(var(--rotation) * 0.3));
          }
          100% {
            opacity: 0;
            transform: translate(0, 0) scale(0) rotate(0deg);
          }
        }

        .central-logo {
          animation: logoGlow 3s infinite ease-in-out;
          transform-origin: center;
        }

        @keyframes logoGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.95;
          }
        }
      `}</style>
    </div>
  );
}

