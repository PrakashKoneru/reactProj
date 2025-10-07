'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status: 'sending' | 'sent' | 'failed';
}

interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ChatState {
  messages: Message[];
  currentUser: User;
  isTyping: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  unreadCount: number;
}

export default function ChatAppExercise() {
  // TODO: Implement a real-time chat application with the following features:
  // 1. Send and receive messages
  // 2. Typing indicators
  // 3. Message status (sending, sent, failed)
  // 4. Connection status management
  // 5. Unread message count
  // 6. Message persistence
  // 7. Auto-scroll to bottom
  // 8. Message retry on failure
  // 9. User presence (online/offline)
  // 10. Message timestamps and formatting
  
  // Your implementation here:
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    currentUser: {
      id: 'user-1',
      name: 'You',
      avatar: '👤',
      isOnline: true
    },
    isTyping: false,
    connectionStatus: 'connected',
    unreadCount: 0
  });

  const [newMessage, setNewMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: ChatState['connectionStatus'][] = ['connected', 'disconnected', 'reconnecting'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setChatState(prev => ({ ...prev, connectionStatus: randomStatus }));
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate bot typing
  useEffect(() => {
    if (isBotTyping) {
      const timer = setTimeout(() => {
        setIsBotTyping(false);
        addBotMessage();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isBotTyping]);

  const addMessage = (text: string, sender: 'user' | 'bot', status: Message['status'] = 'sent') => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      status
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message]
    }));
  };

  const addBotMessage = () => {
    const responses = [
      "That's interesting! Tell me more.",
      "I understand what you mean.",
      "Thanks for sharing that with me.",
      "I see your point.",
      "That makes sense.",
      "I'm here to help!",
      "What do you think about that?",
      "That's a great question!",
      "I appreciate your input.",
      "Let me think about that..."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessage(randomResponse, 'bot', 'sent');
  };

  const sendMessage = () => {
    if (!newMessage.trim() || chatState.connectionStatus !== 'connected') return;

    // Add user message with sending status
    const tempId = Date.now().toString();
    const userMessage: Message = {
      id: tempId,
      text: newMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage]
    }));

    setNewMessage('');

    // Simulate network delay and potential failure
    setTimeout(() => {
      const success = Math.random() > 0.1; // 90% success rate

      if (success) {
        // Update message status to sent
        setChatState(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === tempId ? { ...msg, status: 'sent' } : msg
          )
        }));

        // Trigger bot response
        setIsBotTyping(true);
      } else {
        // Mark message as failed
        setChatState(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === tempId ? { ...msg, status: 'failed' } : msg
          )
        }));
      }
    }, 1000);
  };

  const retryMessage = (messageId: string) => {
    setChatState(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId ? { ...msg, status: 'sending' } : msg
      )
    }));

    // Simulate retry
    setTimeout(() => {
      setChatState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === messageId ? { ...msg, status: 'sent' } : msg
        )
      }));
      setIsBotTyping(true);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getConnectionStatusColor = () => {
    switch (chatState.connectionStatus) {
      case 'connected': return 'text-green-600';
      case 'disconnected': return 'text-red-600';
      case 'reconnecting': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (chatState.connectionStatus) {
      case 'connected': return '🟢';
      case 'disconnected': return '🔴';
      case 'reconnecting': return '🟡';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">💬</div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Chat App</h1>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm ${getConnectionStatusColor()}`}>
                    {getConnectionStatusIcon()} {chatState.connectionStatus}
                  </span>
                  {chatState.unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {chatState.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {chatState.currentUser.name} • {chatState.currentUser.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatState.messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <div className="text-4xl mb-4">💬</div>
              <p>Start a conversation!</p>
            </div>
          ) : (
            chatState.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{message.text}</span>
                    {message.status === 'sending' && (
                      <span className="text-xs opacity-75">⏳</span>
                    )}
                    {message.status === 'failed' && (
                      <button
                        onClick={() => retryMessage(message.id)}
                        className="text-xs opacity-75 hover:opacity-100"
                        title="Retry"
                      >
                        🔄
                      </button>
                    )}
                    {message.status === 'sent' && (
                      <span className="text-xs opacity-75">✓</span>
                    )}
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {isBotTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <span className="text-sm">Bot is typing</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                chatState.connectionStatus === 'connected'
                  ? "Type a message..."
                  : "Connection lost. Retrying..."
              }
              disabled={chatState.connectionStatus !== 'connected'}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || chatState.connectionStatus !== 'connected'}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>

      {/* State Debug Panel */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-4 rounded-lg max-w-sm text-xs">
        <h4 className="font-semibold mb-2">State Debug:</h4>
        <div className="space-y-1">
          <div>Messages: {chatState.messages.length}</div>
          <div>Status: {chatState.connectionStatus}</div>
          <div>Typing: {isBotTyping ? 'Yes' : 'No'}</div>
          <div>Unread: {chatState.unreadCount}</div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 mx-4">
        <h4 className="font-semibold text-yellow-800 mb-2">Exercise Goals:</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>✓ Manage complex real-time application state</li>
          <li>✓ Handle async operations and loading states</li>
          <li>✓ Implement error handling and retry logic</li>
          <li>✓ Manage connection status and user presence</li>
          <li>✓ Handle message status tracking</li>
          <li>✓ Implement auto-scroll and UI optimizations</li>
        </ul>
      </div>
    </div>
  );
}
