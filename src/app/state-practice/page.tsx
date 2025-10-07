'use client';

export default function StatePractice() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            State Management Practice
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Master React state management with increasingly complex exercises
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Level 1: Basic State */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Level 1: Basic State</h2>
            <p className="text-gray-600 mb-4">Master the fundamentals of useState</p>
            <div className="space-y-3">
              <a 
                href="/state-practice/counter"
                className="block bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
              >
                Counter App
              </a>
              <a 
                href="/state-practice/toggle"
                className="block bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
              >
                Toggle Components
              </a>
              <a 
                href="/state-practice/form"
                className="block bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200 transition-colors"
              >
                Form State
              </a>
            </div>
          </div>

          {/* Level 2: Complex State */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Level 2: Complex State</h2>
            <p className="text-gray-600 mb-4">Handle objects, arrays, and multiple state values</p>
            <div className="space-y-3">
              <a 
                href="/state-practice/todo-list"
                className="block bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200 transition-colors"
              >
                Todo List
              </a>
              <a 
                href="/state-practice/shopping-cart"
                className="block bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200 transition-colors"
              >
                Shopping Cart
              </a>
              <a 
                href="/state-practice/user-profile"
                className="block bg-yellow-100 text-yellow-800 px-4 py-2 rounded hover:bg-yellow-200 transition-colors"
              >
                User Profile
              </a>
            </div>
          </div>

          {/* Level 3: Advanced State */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Level 3: Advanced State</h2>
            <p className="text-gray-600 mb-4">useReducer, Context, and custom hooks</p>
            <div className="space-y-3">
              <a 
                href="/state-practice/use-reducer"
                className="block bg-orange-100 text-orange-800 px-4 py-2 rounded hover:bg-orange-200 transition-colors"
              >
                useReducer Counter
              </a>
              <a 
                href="/state-practice/context-demo"
                className="block bg-orange-100 text-orange-800 px-4 py-2 rounded hover:bg-orange-200 transition-colors"
              >
                Context API
              </a>
              <a 
                href="/state-practice/custom-hooks"
                className="block bg-orange-100 text-orange-800 px-4 py-2 rounded hover:bg-orange-200 transition-colors"
              >
                Custom Hooks
              </a>
            </div>
          </div>

          {/* Level 4: Real-world Scenarios */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Level 4: Real-world</h2>
            <p className="text-gray-600 mb-4">Complex applications with multiple features</p>
            <div className="space-y-3">
              <a 
                href="/state-practice/chat-app"
                className="block bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 transition-colors"
              >
                Chat Application
              </a>
              <a 
                href="/state-practice/dashboard"
                className="block bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 transition-colors"
              >
                Data Dashboard
              </a>
              <a 
                href="/state-practice/game"
                className="block bg-red-100 text-red-800 px-4 py-2 rounded hover:bg-red-200 transition-colors"
              >
                Mini Game
              </a>
            </div>
          </div>

          {/* Level 5: Performance & Optimization */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Level 5: Performance</h2>
            <p className="text-gray-600 mb-4">Optimization and advanced patterns</p>
            <div className="space-y-3">
              <a 
                href="/state-practice/optimization"
                className="block bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200 transition-colors"
              >
                State Optimization
              </a>
              <a 
                href="/state-practice/async-state"
                className="block bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200 transition-colors"
              >
                Async State Management
              </a>
              <a 
                href="/state-practice/state-machine"
                className="block bg-purple-100 text-purple-800 px-4 py-2 rounded hover:bg-purple-200 transition-colors"
              >
                State Machine
              </a>
            </div>
          </div>

          {/* Interview Prep */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Interview Prep</h2>
            <p className="text-gray-600 mb-4">Common interview questions and solutions</p>
            <div className="space-y-3">
              <a 
                href="/state-practice/interview-questions"
                className="block bg-indigo-100 text-indigo-800 px-4 py-2 rounded hover:bg-indigo-200 transition-colors"
              >
                State Questions
              </a>
              <a 
                href="/state-practice/state-patterns"
                className="block bg-indigo-100 text-indigo-800 px-4 py-2 rounded hover:bg-indigo-200 transition-colors"
              >
                Common Patterns
              </a>
              <a 
                href="/state-practice/state-anti-patterns"
                className="block bg-indigo-100 text-indigo-800 px-4 py-2 rounded hover:bg-indigo-200 transition-colors"
              >
                Anti-patterns to Avoid
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Practice</h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Start with Level 1 and work your way up</li>
            <li>Try to implement each exercise without looking at the solution first</li>
            <li>Focus on understanding the state flow and data updates</li>
            <li>Practice explaining your state management decisions out loud</li>
            <li>Time yourself to simulate interview pressure</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
