'use client';

import { useState } from 'react';

export default function ToggleExercise() {
  // TODO: Implement a toggle component with the following features:
  // 1. Toggle visibility of content
  // 2. Toggle between light/dark theme
  // 3. Toggle between different text sizes
  // 4. Show toggle state in multiple ways
  // 5. Toggle between different layouts
  
  // Your implementation here:
  // Hint: You'll need multiple useState hooks for different toggles
  // Hint: Create toggle functions that update state
  // Hint: Use conditional rendering and CSS classes based on state
  
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  // TODO: Implement these toggle functions
  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const cycleTextSize = () => {
    setTextSize(prev => {
      if (prev === 'small') return 'medium';
      if (prev === 'medium') return 'large';
      return 'small';
    });
  };

  const toggleLayout = () => {
    setLayout(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl'
  };

  const layoutClasses = layout === 'grid' 
    ? 'grid grid-cols-2 gap-4' 
    : 'flex flex-col space-y-2';

  return (
    <div className={`min-h-screen py-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`rounded-lg shadow-md p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h1 className={`text-3xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Toggle Exercise
          </h1>
          
          {/* Toggle Controls */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={toggleVisibility}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isVisible 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {isVisible ? 'Hide' : 'Show'} Content
            </button>
            
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                isDarkMode 
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                  : 'bg-gray-700 text-white hover:bg-gray-800'
              }`}
            >
              {isDarkMode ? 'Light' : 'Dark'} Mode
            </button>
            
            <button
              onClick={cycleTextSize}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Text: {textSize}
            </button>
            
            <button
              onClick={toggleLayout}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
            >
              Layout: {layout}
            </button>
          </div>

          {/* State Display */}
          <div className={`mb-8 p-4 rounded-lg ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <h3 className="text-lg font-semibold mb-3">Current State:</h3>
            <div className="space-y-2">
              <p>Visibility: <span className="font-mono">{isVisible ? 'true' : 'false'}</span></p>
              <p>Theme: <span className="font-mono">{isDarkMode ? 'dark' : 'light'}</span></p>
              <p>Text Size: <span className="font-mono">{textSize}</span></p>
              <p>Layout: <span className="font-mono">{layout}</span></p>
            </div>
          </div>

          {/* Toggleable Content */}
          {isVisible && (
            <div className="mb-8">
              <h3 className={`text-lg font-semibold mb-4 ${textSizeClasses[textSize]}`}>
                Toggleable Content
              </h3>
              <div className={layoutClasses}>
                {[1, 2, 3, 4].map(item => (
                  <div
                    key={item}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <h4 className={`font-semibold mb-2 ${textSizeClasses[textSize]}`}>
                      Item {item}
                    </h4>
                    <p className={`${textSizeClasses[textSize]} ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      This is some content that can be toggled. The appearance changes based on your settings.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={`mt-8 p-4 rounded-lg ${
            isDarkMode ? 'bg-yellow-900 border-yellow-700' : 'bg-yellow-50 border-yellow-200'
          } border`}>
            <h4 className={`font-semibold mb-2 ${
              isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
            }`}>
              Exercise Goals:
            </h4>
            <ul className={`text-sm space-y-1 ${
              isDarkMode ? 'text-yellow-300' : 'text-yellow-700'
            }`}>
              <li>□ Use multiple useState hooks for different toggles</li>
              <li>□ Implement toggle functions with proper state updates</li>
              <li>□ Apply conditional rendering based on state</li>
              <li>□ Use state to control CSS classes and styling</li>
              <li>□ Create interactive UI that responds to state changes</li>
            </ul>
            <div className={`mt-3 p-3 rounded ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
            }`}>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-blue-200' : 'text-blue-800'
              }`}>
                💡 Tips:
              </p>
              <ul className={`text-xs mt-1 space-y-1 ${
                isDarkMode ? 'text-blue-300' : 'text-blue-700'
              }`}>
                <li>• Use setIsVisible(prev =&gt; !prev) to toggle boolean values</li>
                <li>• For cycling through options, use conditional logic</li>
                <li>• Use template literals for dynamic CSS classes</li>
                <li>• Remember to update all related UI elements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}