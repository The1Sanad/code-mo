import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppContextState {
  darkMode: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextValue {
  state: AppContextState;
  toggleDarkMode: () => void;
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, setState] = useState<AppContextState>({
    darkMode: true, // Default to dark mode based on current UI
    notifications: [],
  });
  
  // Apply theme class to document based on dark mode state
  useEffect(() => {
    // Get the current theme from localStorage or use the state
    const savedTheme = localStorage.getItem('theme');
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : state.darkMode;
    
    // Update state if needed based on saved preference
    if (initialDarkMode !== state.darkMode) {
      setState(prev => ({
        ...prev,
        darkMode: initialDarkMode,
      }));
    }
    
    // Apply the appropriate theme class
    if (state.darkMode) {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
      document.documentElement.classList.add('light-theme');
    }
  }, [state.darkMode]);

  const toggleDarkMode = () => {
    setState(prev => {
      const newDarkMode = !prev.darkMode;
      // Save theme preference to localStorage
      localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
      return {
        ...prev,
        darkMode: newDarkMode,
      };
    });
  };

  const addNotification = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { id, type, message }],
    }));

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(notification => notification.id !== id),
    }));
  };

  const clearNotifications = () => {
    setState(prev => ({
      ...prev,
      notifications: [],
    }));
  };

  const value: AppContextValue = {
    state,
    toggleDarkMode,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}