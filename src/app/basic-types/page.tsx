'use client';

import { useState } from 'react';

export default function BasicTypes() {
  // Let's explore basic TypeScript types interactively
  
  // 1. STRING TYPE
  const [name, setName] = useState<string>('John');
  
  // 2. NUMBER TYPE  
  const [age, setAge] = useState<number>(25);
  
  // 3. BOOLEAN TYPE
  const [isActive, setIsActive] = useState<boolean>(true);
  
  // 4. ARRAY TYPES
  const [hobbies, setHobbies] = useState<string[]>(['reading', 'coding']);
  const [scores, setScores] = useState<number[]>([85, 92, 78]);
  
  // 5. ARRAY OF OBJECTS
  const [users, setUsers] = useState<{name: string, age: number, isActive: boolean}[]>([
    { name: 'John', age: 25, isActive: true },
    { name: 'Jane', age: 30, isActive: false }
  ]);
  
  // 6. ANY TYPE (avoid this in real code!)
  const [anything, setAnything] = useState<any>('This can be anything');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          TypeScript Basic Types
        </h1>
        
        <div className="grid gap-6">
          {/* String Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">1. String Type</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name (string):
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Type: <code className="bg-gray-100 px-2 py-1 rounded">string</code>
                </p>
              </div>
            </div>
          </div>

          {/* Number Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-green-600">2. Number Type</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (number):
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Type: <code className="bg-gray-100 px-2 py-1 rounded">number</code>
                </p>
              </div>
            </div>
          </div>

          {/* Boolean Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">3. Boolean Type</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label className="text-sm font-medium text-gray-700">
                  Is Active: {isActive ? 'Yes' : 'No'}
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Type: <code className="bg-gray-100 px-2 py-1 rounded">boolean</code>
              </p>
            </div>
          </div>

          {/* Array Types */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">4. Array Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hobbies (string[]):
                </label>
                <input
                  type="text"
                  value={hobbies.join(', ')}
                  onChange={(e) => setHobbies(e.target.value.split(', ').filter(h => h.trim()))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="reading, coding, gaming"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Type: <code className="bg-gray-100 px-2 py-1 rounded">string[]</code>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scores (number[]):
                </label>
                <input
                  type="text"
                  value={scores.join(', ')}
                  onChange={(e) => setScores(e.target.value.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="85, 92, 78"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Type: <code className="bg-gray-100 px-2 py-1 rounded">number[]</code>
                </p>
              </div>
            </div>
          </div>

          {/* Array of Objects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-600">5. Array of Objects</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Users (array of objects):
                </label>
                <div className="space-y-2">
                  {users.map((user, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => {
                          const newUsers = [...users];
                          newUsers[index] = { ...user, name: e.target.value };
                          setUsers(newUsers);
                        }}
                        className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Name"
                      />
                      <input
                        type="number"
                        value={user.age}
                        onChange={(e) => {
                          const newUsers = [...users];
                          newUsers[index] = { ...user, age: Number(e.target.value) };
                          setUsers(newUsers);
                        }}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Age"
                      />
                      <input
                        type="checkbox"
                        checked={user.isActive}
                        onChange={(e) => {
                          const newUsers = [...users];
                          newUsers[index] = { ...user, isActive: e.target.checked };
                          setUsers(newUsers);
                        }}
                        className="h-4 w-4"
                      />
                      <span className="text-sm text-gray-600">Active</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => setUsers([...users, { name: '', age: 0, isActive: false }])}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm hover:bg-indigo-200"
                  >
                    Add User
                  </button>
                  <button
                    onClick={() => setUsers(users.slice(0, -1))}
                    disabled={users.length <= 1}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 disabled:opacity-50"
                  >
                    Remove Last
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Type: <code className="bg-gray-100 px-2 py-1 rounded">{`{name: string, age: number, isActive: boolean}[]`}</code>
                </p>
              </div>
            </div>
          </div>

          {/* Any Type */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-600">6. Any Type (Avoid!)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anything (any):
                </label>
                <input
                  type="text"
                  value={anything}
                  onChange={(e) => setAnything(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Type: <code className="bg-gray-100 px-2 py-1 rounded">any</code> (loses type safety!)
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What You Learned:</h3>
            <ul className="space-y-2 text-blue-800">
              <li><strong>string:</strong> Text data - names, messages, etc.</li>
              <li><strong>number:</strong> Numeric data - ages, prices, counts</li>
              <li><strong>boolean:</strong> True/false values - flags, toggles</li>
              <li><strong>string[]:</strong> Array of strings - lists of text</li>
              <li><strong>number[]:</strong> Array of numbers - lists of numbers</li>
              <li><strong>Object[]:</strong> Array of objects - lists of complex data</li>
              <li><strong>any:</strong> Any type (avoid - loses TypeScript benefits)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
