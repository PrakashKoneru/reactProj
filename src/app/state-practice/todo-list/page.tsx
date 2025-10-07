'use client';

import { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  category: string;
}

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'created' | 'priority' | 'alphabetical';

export default function TodoListExercise() {
  // TODO: Implement a comprehensive todo list with the following features:
  // 1. Add, edit, delete todos
  // 2. Mark todos as complete/incomplete
  // 3. Filter todos (all, active, completed)
  // 4. Sort todos (by date, priority, alphabetical)
  // 5. Categorize todos
  // 6. Priority levels
  // 7. Search functionality
  // 8. Bulk operations (select all, delete selected)
  
  // Your implementation here:
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('created');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Learning'];

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority,
        createdAt: new Date(),
        category: newCategory || 'General'
      };
      setTodos(prev => [todo, ...prev]);
      setNewTodo('');
      setNewCategory('');
      setPriority('medium');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTodos(prev => prev.map(todo => 
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    const filteredTodos = getFilteredTodos();
    const allSelected = filteredTodos.every(todo => selectedIds.has(todo.id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredTodos.map(todo => todo.id)));
    }
  };

  const deleteSelected = () => {
    setTodos(prev => prev.filter(todo => !selectedIds.has(todo.id)));
    setSelectedIds(new Set());
  };

  const toggleSelected = (completed: boolean) => {
    setTodos(prev => prev.map(todo => 
      selectedIds.has(todo.id) ? { ...todo, completed } : todo
    ));
  };

  const getFilteredTodos = () => {
    let filtered = todos.filter(todo => 
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'created':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });
  };

  const filteredTodos = getFilteredTodos();
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Todo List Exercise
          </h1>

          {/* Add Todo Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Todo</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter todo text..."
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <button
                onClick={addTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                Add Todo
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search todos..."
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Todos</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="created">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
            <div className="flex space-x-2">
              <button
                onClick={selectAll}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Select All
              </button>
              {selectedIds.size > 0 && (
                <>
                  <button
                    onClick={() => toggleSelected(true)}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => toggleSelected(false)}
                    className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                  >
                    Incomplete
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center mb-6 text-sm text-gray-600">
            <span>Total: {todos.length} | Active: {activeCount} | Completed: {completedCount}</span>
            <span>Selected: {selectedIds.size}</span>
          </div>

          {/* Todo List */}
          <div className="space-y-2">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? 'No todos match your search' : 'No todos yet. Add one above!'}
              </div>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                    todo.completed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  } ${selectedIds.has(todo.id) ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(todo.id)}
                    onChange={() => toggleSelect(todo.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        onBlur={saveEdit}
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {todo.text}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                          todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {todo.priority}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {todo.category}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="text-green-600 hover:text-green-800"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>✓ Manage complex state with arrays and objects</li>
              <li>✓ Implement CRUD operations (Create, Read, Update, Delete)</li>
              <li>✓ Handle multiple state variables that work together</li>
              <li>✓ Implement filtering and sorting logic</li>
              <li>✓ Manage selection state for bulk operations</li>
              <li>✓ Handle form state for adding and editing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
