import { Sun, Moon } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function ThemeToggle() {
  const { state, toggleDarkMode } = useAppContext();
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-colors"
      aria-label={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={state.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {state.darkMode ? (
        <Sun className="w-5 h-5 text-gray-300 hover:text-yellow-300" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700 hover:text-blue-500" />
      )}
    </button>
  );
}