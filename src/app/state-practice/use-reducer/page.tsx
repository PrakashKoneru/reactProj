'use client';

import { useReducer, useState } from 'react';

// State interface
interface CounterState {
  count: number;
  history: number[];
  step: number;
  isAutoIncrementing: boolean;
}

// Action types
type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'START_AUTO_INCREMENT' }
  | { type: 'STOP_AUTO_INCREMENT' }
  | { type: 'CLEAR_HISTORY' };

// Reducer function
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      const newCount = state.count + state.step;
      return {
        ...state,
        count: newCount,
        history: [newCount, ...state.history].slice(0, 10) // Keep last 10 values
      };
    
    case 'DECREMENT':
      const decrementedCount = state.count - state.step;
      return {
        ...state,
        count: decrementedCount,
        history: [decrementedCount, ...state.history].slice(0, 10)
      };
    
    case 'RESET':
      return {
        ...state,
        count: 0,
        history: [0, ...state.history].slice(0, 10)
      };
    
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload
      };
    
    case 'SET_COUNT':
      return {
        ...state,
        count: action.payload,
        history: [action.payload, ...state.history].slice(0, 10)
      };
    
    case 'START_AUTO_INCREMENT':
      return {
        ...state,
        isAutoIncrementing: true
      };
    
    case 'STOP_AUTO_INCREMENT':
      return {
        ...state,
        isAutoIncrementing: false
      };
    
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: []
      };
    
    default:
      return state;
  }
};

// Initial state
const initialState: CounterState = {
  count: 0,
  history: [],
  step: 1,
  isAutoIncrementing: false
};

export default function UseReducerExercise() {
  // TODO: Implement a counter using useReducer with the following features:
  // 1. Increment/decrement by step amount
  // 2. Reset counter
  // 3. Set custom step value
  // 4. Set custom count value
  // 5. Auto-increment functionality
  // 6. History tracking
  // 7. Clear history
  // 8. Undo last action (bonus)
  
  // Your implementation here:
  const [state, dispatch] = useReducer(counterReducer, initialState);
  const [customValue, setCustomValue] = useState('');

  // Auto-increment effect
  useState(() => {
    let interval: NodeJS.Timeout;
    if (state.isAutoIncrementing) {
      interval = setInterval(() => {
        dispatch({ type: 'INCREMENT' });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  const handleSetCustomCount = () => {
    const value = parseInt(customValue);
    if (!isNaN(value)) {
      dispatch({ type: 'SET_COUNT', payload: value });
      setCustomValue('');
    }
  };

  const handleSetStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const toggleAutoIncrement = () => {
    if (state.isAutoIncrementing) {
      dispatch({ type: 'STOP_AUTO_INCREMENT' });
    } else {
      dispatch({ type: 'START_AUTO_INCREMENT' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            useReducer Exercise
          </h1>

          {/* Main Counter Display */}
          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-blue-600 mb-4">
              {state.count}
            </div>
            <p className="text-gray-600 text-lg">Current Count</p>
            <p className="text-sm text-gray-500">Step: {state.step}</p>
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <button
              onClick={() => dispatch({ type: 'INCREMENT' })}
              disabled={state.isAutoIncrementing}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-300 transition-colors font-semibold"
            >
              +{state.step}
            </button>
            <button
              onClick={() => dispatch({ type: 'DECREMENT' })}
              disabled={state.isAutoIncrementing}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 disabled:bg-gray-300 transition-colors font-semibold"
            >
              -{state.step}
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              disabled={state.isAutoIncrementing}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition-colors font-semibold"
            >
              Reset
            </button>
            <button
              onClick={toggleAutoIncrement}
              className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
                state.isAutoIncrementing
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {state.isAutoIncrementing ? 'Stop Auto' : 'Start Auto'}
            </button>
          </div>

          {/* Step Controls */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Step Controls</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 5, 10, 25, 50, 100].map(step => (
                <button
                  key={step}
                  onClick={() => handleSetStep(step)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    state.step === step
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Current step: <span className="font-mono font-semibold">{state.step}</span>
            </div>
          </div>

          {/* Custom Value Input */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Set Custom Value</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder="Enter custom count"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSetCustomCount}
                className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Set Count
              </button>
            </div>
          </div>

          {/* History */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Count History</h3>
              <button
                onClick={() => dispatch({ type: 'CLEAR_HISTORY' })}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Clear History
              </button>
            </div>
            {state.history.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {state.history.map((value, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      index === 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {value}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No history yet</p>
            )}
          </div>

          {/* State Debug */}
          <div className="bg-gray-100 rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Current State</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(state, null, 2)}
            </pre>
          </div>

          {/* Action Examples */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Available Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Basic Actions:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li>• INCREMENT - Add step to count</li>
                  <li>• DECREMENT - Subtract step from count</li>
                  <li>• RESET - Set count to 0</li>
                  <li>• SET_COUNT - Set specific count value</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Advanced Actions:</h4>
                <ul className="space-y-1 text-blue-600">
                  <li>• SET_STEP - Change increment/decrement amount</li>
                  <li>• START_AUTO_INCREMENT - Begin auto-incrementing</li>
                  <li>• STOP_AUTO_INCREMENT - Stop auto-incrementing</li>
                  <li>• CLEAR_HISTORY - Remove all history</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>✓ Understand useReducer vs useState for complex state</li>
              <li>✓ Implement action types and reducer function</li>
              <li>✓ Handle multiple action types in reducer</li>
              <li>✓ Manage complex state updates with immutable patterns</li>
              <li>✓ Use dispatch to trigger state changes</li>
              <li>✓ Implement side effects with useEffect</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
