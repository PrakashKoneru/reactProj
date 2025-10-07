'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// User Context
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    notifications: boolean;
    language: string;
  };
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Notification Context
interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification['type']) => void;
  removeNotification: (id: number) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Custom Hooks
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Theme Provider Component
function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// User Provider Component
function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    setUser(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, ...preferences }
    } : null);
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    updatePreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Notification Provider Component
function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification['type']) => {
    const notification: Notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

// Header Component
function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();
  const { addNotification } = useNotifications();

  const handleLogout = () => {
    logout();
    addNotification('Successfully logged out', 'success');
  };

  return (
    <header className={`p-4 border-b ${
      theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Context API Demo
        </h1>
        <div className="flex items-center space-x-4">
          {user && (
            <span className={`${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Welcome, {user.name}!
            </span>
          )}
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-700 text-white hover:bg-gray-800'
            }`}
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// User Profile Component
function UserProfile() {
  const { user, updateUser, updatePreferences } = useUser();
  const { addNotification } = useNotifications();
  const { theme } = useTheme();

  if (!user) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ name: e.target.value });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ email: e.target.value });
  };

  const handleNotificationToggle = () => {
    updatePreferences({ notifications: !user.preferences.notifications });
    addNotification(
      `Notifications ${!user.preferences.notifications ? 'enabled' : 'disabled'}`,
      'info'
    );
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updatePreferences({ language: e.target.value });
    addNotification(`Language changed to ${e.target.value}`, 'success');
  };

  return (
    <div className={`p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-md`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        User Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Name
          </label>
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email
          </label>
          <input
            type="email"
            value={user.email}
            onChange={handleEmailChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`flex items-center space-x-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <input
              type="checkbox"
              checked={user.preferences.notifications}
              onChange={handleNotificationToggle}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Enable notifications</span>
          </label>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Language
          </label>
          <select
            value={user.preferences.language}
            onChange={handleLanguageChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// Login Component
function LoginForm() {
  const { login } = useUser();
  const { addNotification } = useNotifications();
  const { theme } = useTheme();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (name && email) {
      const user: User = {
        id: 1,
        name,
        email,
        avatar: '👤',
        preferences: {
          notifications: true,
          language: 'en'
        }
      };
      login(user);
      addNotification('Successfully logged in!', 'success');
    }
  };

  return (
    <div className={`p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-md`}>
      <h2 className={`text-xl font-semibold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}

// Notification Component
function NotificationPanel() {
  const { notifications, removeNotification, clearAllNotifications } = useNotifications();
  const { theme } = useTheme();

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 border-green-500 text-green-800';
      case 'error': return 'bg-red-100 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'info': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  return (
    <div className={`p-6 rounded-lg ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    } shadow-md`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Notifications ({notifications.length})
        </h2>
        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            No notifications
          </p>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)}`}
            >
              <div className="flex justify-between items-start">
                <p className="text-sm">{notification.message}</p>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-500 hover:text-gray-700 ml-2"
                >
                  ×
                </button>
              </div>
              <p className="text-xs opacity-75 mt-1">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Main App Component
export default function ContextDemo() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <LoginForm />
                </div>
                <div>
                  <UserProfile />
                </div>
                <div className="lg:col-span-2">
                  <NotificationPanel />
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>✓ Create and use React Context for global state</li>
                  <li>✓ Implement custom hooks for context consumption</li>
                  <li>✓ Manage multiple contexts with providers</li>
                  <li>✓ Share state between multiple components</li>
                  <li>✓ Handle context updates and re-renders</li>
                  <li>✓ Implement proper TypeScript typing for contexts</li>
                </ul>
              </div>
            </div>
          </div>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
