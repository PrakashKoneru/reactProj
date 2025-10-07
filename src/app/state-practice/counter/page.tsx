'use client';

import { useState, useCallback } from 'react';

// Render counter to track actual renders
let renderCount = 0;

export default function CounterExercise() {
  // TODO: Implement a counter with the following features:
  // 1. Display current count
  // 2. Increment button (+1)
  // 3. Decrement button (-1)
  // 4. Reset button (set to 0)
  // 5. Double button (multiply by 2)
  // 6. Show count history (last 5 counts)
  
  // Your implementation here:
  // Hint: You'll need useState for count and history
  // Hint: Create functions for each button action
  // Hint: Update history whenever count changes
   
  const [state, setState] = useState({
    count: 0,
    history: [] as number[]
  });

  renderCount++;
  console.log(`🔄 RENDER #${renderCount} - State:`, state);

  // TODO: Implement these functions
  const increment = useCallback(() => {
    setState(prev => {
      const newCount = prev.count + 1;
      return {
        count: newCount,
        history: [newCount, ...prev.history].slice(0, 5)
      };
    });
  }, []);

  const decrement = useCallback(() => {
    setState(prev => {
      const newCount = prev.count - 1;
      return {
        count: newCount,
        history: [newCount, ...prev.history].slice(0, 5)
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(() => ({
      count: 0,
      history: []
    }));
  }, []);

  const double = useCallback(() => {
    setState(prev => {
      const newCount = prev.count * 2;
      return {
        count: newCount,
        history: [newCount, ...prev.history].slice(0, 5)
      };
    });
  }, []);
// console.log(state)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Counter Exercise
          </h1>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {state.count}
            </div>
            <p className="text-gray-600">Current Count</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={increment}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              +1
            </button>
            <button
              onClick={decrement}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
              -1
            </button>
            <button
              onClick={double}
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              ×2
            </button>
            <button
              onClick={reset}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Reset
            </button>
          </div>

          <div className="text-center mb-4">
            <button
              onClick={() => {
                renderCount = 0;
                console.log('🔄 Render counter reset!');
              }}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm"
            >
              Reset Render Counter
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Check console for render count. In production, you should see only 1 render per button click.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Count History</h3>
            <div className="flex space-x-2">
              {state.history.length > 0 ? (
                state.history.map((value, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {value}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No history yet</span>
              )}
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>□ Use useState for count state</li>
              <li>□ Use useState for history array</li>
              <li>□ Implement all button functions</li>
              <li>□ Update history on each count change</li>
              <li>□ Limit history to last 5 values</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-50 rounded">
              <p className="text-blue-800 text-sm font-medium">💡 Tips:</p>
              <ul className="text-blue-700 text-xs mt-1 space-y-1">
                <li>• Use setCount with a function to update based on previous value</li>
                <li>• Use setHistory with a function to update the array</li>
                <li>• Use array spread operator to add new items</li>
                <li>• Use slice(0, 5) to keep only the last 5 items</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">🚨 Common Mistakes to Avoid:</h4>
            <ul className="text-red-700 text-sm space-y-1">
              <li>• Don&apos;t forget to call updateHistory in each function</li>
              <li>• Use functional updates (prev =&gt; prev + 1) instead of direct values</li>
              <li>• Remember to handle the history array properly</li>
              <li>• Make sure all buttons are connected to their functions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}