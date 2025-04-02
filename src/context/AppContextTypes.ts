// Types and constants for the AppContext

export interface AppContextState {
  darkMode: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface AppContextValue {
  state: AppContextState;
  toggleDarkMode: () => void;
  addNotification: (type: 'success' | 'error' | 'info', message: string) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}