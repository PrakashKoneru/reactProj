'use client';

import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hints: string[];
  solution: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's the difference between useState and useReducer?",
    category: "Hooks",
    difficulty: "Medium",
    hints: [
      "Think about when you have simple vs complex state",
      "Consider how many state variables you need to manage",
      "Think about the complexity of state updates"
    ],
    solution: `useState is for simple state management with a single value or simple object. useReducer is better for complex state with multiple sub-values or when the next state depends on the previous one. useReducer also makes state updates more predictable and easier to test.`,
    explanation: "useState is great for simple state like counters, toggles, or form inputs. useReducer shines when you have complex state logic, multiple related state values, or when you need to perform the same state update from multiple places."
  },
  {
    id: 2,
    question: "How do you prevent unnecessary re-renders in React?",
    category: "Performance",
    difficulty: "Hard",
    hints: [
      "Think about React.memo for components",
      "Consider useMemo and useCallback hooks",
      "Remember about dependency arrays"
    ],
    solution: `Use React.memo() for components, useMemo() for expensive calculations, useCallback() for functions, and ensure proper dependency arrays. Also avoid creating objects/functions in render.`,
    explanation: "React re-renders when props or state change. React.memo prevents re-renders when props haven't changed. useMemo caches expensive calculations. useCallback caches function references. Proper dependency arrays prevent unnecessary effect runs."
  },
  {
    id: 3,
    question: "When should you use Context vs prop drilling?",
    category: "State Management",
    difficulty: "Medium",
    hints: [
      "Consider how many components need the data",
      "Think about the component tree depth",
      "Consider if the data changes frequently"
    ],
    solution: `Use Context when you need to share data across many components at different nesting levels. Avoid Context for data that changes frequently or when only a few components need it.`,
    explanation: "Context is great for theme, user authentication, or language preferences that many components need. For data that only a few nearby components need, prop drilling might be simpler. Avoid Context for frequently changing data as it can cause performance issues."
  },
  {
    id: 4,
    question: "What's the difference between controlled and uncontrolled components?",
    category: "Forms",
    difficulty: "Easy",
    hints: [
      "Think about who controls the input value",
      "Consider React state vs DOM state",
      "Think about form validation"
    ],
    solution: `Controlled components have their value controlled by React state. Uncontrolled components let the DOM manage the value internally. Controlled components are preferred for form validation and React patterns.`,
    explanation: "In controlled components, the input value is stored in React state and updated via onChange. In uncontrolled components, you use refs to access the DOM value. Controlled components give you more control over validation and state management."
  },
  {
    id: 5,
    question: "How do you handle async operations in useEffect?",
    category: "Hooks",
    difficulty: "Medium",
    hints: [
      "Think about cleanup functions",
      "Consider dependency arrays",
      "Remember about race conditions"
    ],
    solution: `Use async/await inside useEffect, handle cleanup with return function, use AbortController for fetch requests, and ensure proper dependency arrays to prevent infinite loops.`,
    explanation: "You can't make useEffect itself async, but you can call async functions inside it. Always handle cleanup to prevent memory leaks and race conditions. Use AbortController to cancel ongoing requests when component unmounts."
  },
  {
    id: 6,
    question: "What's the purpose of the dependency array in useEffect?",
    category: "Hooks",
    difficulty: "Easy",
    hints: [
      "Think about when the effect should run",
      "Consider what values the effect depends on",
      "Remember about the empty array case"
    ],
    solution: `The dependency array tells React when to run the effect. If any value in the array changes, the effect runs again. Empty array means run only once on mount. No array means run on every render.`,
    explanation: "The dependency array is crucial for controlling when effects run. It prevents infinite loops and ensures effects run when their dependencies change. Always include all values from component scope that are used inside the effect."
  },
  {
    id: 7,
    question: "How do you share state between sibling components?",
    category: "State Management",
    difficulty: "Medium",
    hints: [
      "Think about lifting state up",
      "Consider Context API",
      "Remember about state management libraries"
    ],
    solution: `Lift state up to the common parent component and pass it down as props. For deeply nested components, use Context API. For complex apps, consider state management libraries like Redux or Zustand.`,
    explanation: "The most common pattern is lifting state up to the nearest common ancestor. This keeps the state close to where it's used. Context is useful when you need to share state across many components at different nesting levels."
  },
  {
    id: 8,
    question: "What's the difference between useCallback and useMemo?",
    category: "Hooks",
    difficulty: "Medium",
    hints: [
      "Think about what they return",
      "Consider when to use each",
      "Remember about dependency arrays"
    ],
    solution: `useCallback returns a memoized function, useMemo returns a memoized value. Use useCallback for functions passed as props, useMemo for expensive calculations. Both have dependency arrays.`,
    explanation: "useCallback caches a function and returns the same function reference if dependencies haven't changed. useMemo caches the result of a function and returns the cached value if dependencies haven't changed. Both help prevent unnecessary re-renders."
  },
  {
    id: 9,
    question: "How do you handle form state in React?",
    category: "Forms",
    difficulty: "Medium",
    hints: [
      "Think about controlled components",
      "Consider form validation",
      "Remember about form submission"
    ],
    solution: `Use controlled components with useState for each input, handle onChange events to update state, implement validation, and handle form submission with onSubmit. Consider using libraries like react-hook-form for complex forms.`,
    explanation: "Each form input should have its value controlled by React state. Use onChange handlers to update state on every keystroke. Implement validation before submission. Handle form submission with preventDefault to avoid page refresh."
  },
  {
    id: 10,
    question: "What's the purpose of the key prop in lists?",
    category: "Rendering",
    difficulty: "Easy",
    hints: [
      "Think about React's reconciliation",
      "Consider list updates and re-renders",
      "Remember about unique identifiers"
    ],
    solution: `The key prop helps React identify which items have changed, been added, or removed. It should be unique and stable. Use the item's unique ID, not the array index.`,
    explanation: "React uses keys to efficiently update the DOM when list items change. Without keys, React might re-render all items even when only one changes. Keys should be unique among siblings and stable across re-renders."
  }
];

export default function InterviewQuestions() {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [filter, setFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [category, setCategory] = useState<string>('All');

  const categories = ['All', ...new Set(questions.map(q => q.category))];

  const filteredQuestions = questions.filter(q => {
    const difficultyMatch = filter === 'All' || q.difficulty === filter;
    const categoryMatch = category === 'All' || q.category === category;
    return difficultyMatch && categoryMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuestionSelect = (question: Question) => {
    setSelectedQuestion(question);
    setShowSolution(false);
    setShowHints(false);
    setCurrentHint(0);
  };

  const showNextHint = () => {
    if (selectedQuestion && currentHint < selectedQuestion.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React State Management Interview Questions
          </h1>
          <p className="text-lg text-gray-600">
            Practice common interview questions about React state management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Questions List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions</h2>
              
              {/* Filters */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {filteredQuestions.map(question => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionSelect(question)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      selectedQuestion?.id === question.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        Q{question.id}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {question.question}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {question.category}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Question Details */}
          <div className="lg:col-span-2">
            {selectedQuestion ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-blue-600">
                      Q{selectedQuestion.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedQuestion.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {selectedQuestion.question}
                </h3>

                {/* Hints Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-gray-800">Hints</h4>
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                    >
                      {showHints ? 'Hide Hints' : 'Show Hints'}
                    </button>
                  </div>
                  
                  {showHints && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="space-y-2">
                        {selectedQuestion.hints.slice(0, currentHint + 1).map((hint, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <span className="text-yellow-600 font-bold">{index + 1}.</span>
                            <p className="text-yellow-800 text-sm">{hint}</p>
                          </div>
                        ))}
                        {currentHint < selectedQuestion.hints.length - 1 && (
                          <button
                            onClick={showNextHint}
                            className="mt-2 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
                          >
                            Show Next Hint
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Solution Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-medium text-gray-800">Solution</h4>
                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>
                  
                  {showSolution && (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">Answer:</h5>
                        <p className="text-green-700 text-sm leading-relaxed">
                          {selectedQuestion.solution}
                        </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-medium text-blue-800 mb-2">Explanation:</h5>
                        <p className="text-blue-700 text-sm leading-relaxed">
                          {selectedQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Practice Tips */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-800 mb-2">Practice Tips:</h5>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Try to answer without looking at hints first</li>
                    <li>• Explain your reasoning out loud</li>
                    <li>• Think about real-world examples</li>
                    <li>• Consider edge cases and potential issues</li>
                    <li>• Practice coding examples for each concept</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">❓</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Question
                </h3>
                <p className="text-gray-600">
                  Choose a question from the list to start practicing
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Interview Preparation Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Before the Interview:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Practice explaining concepts out loud</li>
                <li>• Review common patterns and anti-patterns</li>
                <li>• Prepare real-world examples</li>
                <li>• Practice coding state management solutions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-800 mb-2">During the Interview:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Think out loud and explain your reasoning</li>
                <li>• Ask clarifying questions</li>
                <li>• Start with simple solutions, then optimize</li>
                <li>• Discuss trade-offs and alternatives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
