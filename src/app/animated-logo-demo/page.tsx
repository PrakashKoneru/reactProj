'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedLogoDemo() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Get all icon elements (exclude the central logo)
    const icons = svgRef.current.querySelectorAll('.floating-icon');
    
    icons.forEach((icon, index) => {
      // Randomize position within a circular boundary
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const radius = 80 + Math.random() * 100; // Between 80-180px from center
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      
      // Apply random position
      (icon as SVGElement).style.transform = `translate(${x}px, ${y}px)`;
      
      // Randomize animation delay and duration
      const delay = Math.random() * 2;
      const duration = 2 + Math.random() * 2; // 2-4 seconds
      
      (icon as SVGElement).style.animationDelay = `${delay}s`;
      (icon as SVGElement).style.animationDuration = `${duration}s`;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          SVG Animated Logo Demo
        </h1>
        
        <div className="bg-gray-900 rounded-lg p-12 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 400 400"
            className="w-full max-w-md"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Central Logo - stays fixed */}
            <g className="central-logo">
              <circle cx="200" cy="200" r="40" fill="#3B82F6" />
              <text
                x="200"
                y="210"
                textAnchor="middle"
                fill="white"
                fontSize="24"
                fontWeight="bold"
              >
                LOGO
              </text>
            </g>

            {/* Floating Icons - will be randomized */}
            {/* Icon 1: Star */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#EF4444" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ★
              </text>
            </g>

            {/* Icon 2: Heart */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#EC4899" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ♥
              </text>
            </g>

            {/* Icon 3: Lightning */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#F59E0B" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ⚡
              </text>
            </g>

            {/* Icon 4: Music */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#10B981" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ♪
              </text>
            </g>

            {/* Icon 5: Rocket */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#8B5CF6" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                🚀
              </text>
            </g>

            {/* Icon 6: Diamond */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#06B6D4" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ◆
              </text>
            </g>

            {/* Icon 7: Sun */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#FBBF24" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ☀
              </text>
            </g>

            {/* Icon 8: Cloud */}
            <g className="floating-icon">
              <circle cx="200" cy="200" r="20" fill="#60A5FA" />
              <text x="200" y="207" textAnchor="middle" fill="white" fontSize="20">
                ☁
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">✅ Advantages:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Randomized positions on each load</li>
              <li>• Smooth CSS animations (60fps)</li>
              <li>• No external dependencies</li>
              <li>• ~2KB vs 50KB+ Lottie file</li>
              <li>• Easy to create versions (just change colors/icons)</li>
              <li>• Full control with JavaScript</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2">🎨 Customization Options:</h3>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Change radius range for tighter/wider spread</li>
              <li>• Add rotation animations</li>
              <li>• Add floating/drift motion</li>
              <li>• Stagger animations for wave effect</li>
              <li>• Add hover interactions</li>
              <li>• Make it responsive to scroll/mouse</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .floating-icon {
          animation: floatAndZoom infinite ease-in-out;
          transform-origin: center;
          will-change: transform, opacity;
        }

        @keyframes floatAndZoom {
          0% {
            opacity: 0;
            transform: translate(var(--x, 0), var(--y, 0)) scale(0);
          }
          20% {
            opacity: 1;
            transform: translate(var(--x, 0), var(--y, 0)) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(var(--x, 0), var(--y, 0)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--x, 0), var(--y, 0)) scale(0);
          }
        }

        .central-logo {
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

