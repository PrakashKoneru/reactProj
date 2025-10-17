'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Custom Hook 1: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// Custom Hook 2: useDebounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom Hook 3: useCounter
function useCounter(initialValue: number = 0, step: number = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(prev => prev + step), [step]);
  const decrement = useCallback(() => setCount(prev => prev - step), [step]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const setValue = useCallback((value: number) => setCount(value), []);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue
  };
}

// Custom Hook 4: useToggle
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse
  };
}

// Custom Hook 5: useAsync
interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useAsync<T>(asyncFunction: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as Error });
    }
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refetch: execute };
}

// Custom Hook 6: usePrevious
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// Custom Hook 7: useClickOutside
function useClickOutside<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
}

// Custom Hook 8: useWindowSize
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Demo Components
function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useLocalStorage Demo</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name (persists in localStorage):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <p className="text-sm text-gray-600">
          Try changing these values and refreshing the page - they'll persist!
        </p>
      </div>
    </div>
  );
}

function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useDebounce Demo</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search (debounced by 500ms):</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type something..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm">
            <strong>Current value:</strong> {searchTerm}
          </p>
          <p className="text-sm">
            <strong>Debounced value:</strong> {debouncedSearchTerm}
          </p>
        </div>
      </div>
    </div>
  );
}

function CounterDemo() {
  const counter = useCounter(0, 1);
  const [customValue, setCustomValue] = useState('');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useCounter Demo</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-4">{counter.count}</div>
          <div className="flex space-x-2 justify-center">
            <button
              onClick={counter.decrement}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              -1
            </button>
            <button
              onClick={counter.increment}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              +1
            </button>
            <button
              onClick={counter.reset}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex space-x-2">
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="Set custom value"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              const value = parseInt(customValue);
              if (!isNaN(value)) {
                counter.setValue(value);
                setCustomValue('');
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Set
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleDemo() {
  const toggle = useToggle(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useToggle Demo</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className={`text-2xl mb-4 ${toggle.value ? 'text-green-600' : 'text-red-600'}`}>
            {toggle.value ? 'ON' : 'OFF'}
          </div>
          <div className="flex space-x-2 justify-center">
            <button
              onClick={toggle.toggle}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Toggle
            </button>
            <button
              onClick={toggle.setTrue}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Set True
            </button>
            <button
              onClick={toggle.setFalse}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Set False
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AsyncDemo() {
  const fetchData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    if (!response.ok) throw new Error('Failed to fetch');
    return response.json();
  };

  const { data, loading, error, refetch } = useAsync(fetchData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useAsync Demo</h3>
      <div className="space-y-4">
        <button
          onClick={refetch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600">Error: {error.message}</p>}
        {data && (
          <div className="bg-gray-100 p-3 rounded">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function PreviousDemo() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">usePrevious Demo</h3>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">Current: {count}</div>
          <div className="text-lg text-gray-600 mb-4">Previous: {previousCount ?? 'None'}</div>
          <button
            onClick={() => setCount(prev => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}

function ClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useClickOutside Demo</h3>
      <div className="space-y-4">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Open Dropdown
        </button>
        
        {isOpen && (
          <div
            ref={ref}
            className="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-2"
          >
            <p className="text-sm text-gray-600 mb-2">This dropdown will close when you click outside!</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WindowSizeDemo() {
  const { width, height } = useWindowSize();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">useWindowSize Demo</h3>
      <div className="space-y-4">
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm">
            <strong>Window Size:</strong> {width} × {height}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Try resizing your browser window to see the values update!
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function CustomHooksExercise() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Custom Hooks Exercise
          </h1>
          <p className="text-lg text-gray-600">
            Learn to create and use custom hooks for reusable stateful logic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LocalStorageDemo />
          <DebounceDemo />
          <CounterDemo />
          <ToggleDemo />
          <AsyncDemo />
          <PreviousDemo />
          <ClickOutsideDemo />
          <WindowSizeDemo />
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>✓ Create custom hooks that encapsulate stateful logic</li>
            <li>✓ Use hooks like useState, useEffect, useCallback in custom hooks</li>
            <li>✓ Return objects and arrays from custom hooks</li>
            <li>✓ Handle side effects and cleanup in custom hooks</li>
            <li>✓ Make hooks reusable across different components</li>
            <li>✓ Implement proper TypeScript typing for custom hooks</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
