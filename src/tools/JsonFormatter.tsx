import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy, AlertCircle, CheckCircle } from 'lucide-react';
import { useToolState } from '../hooks/useToolState';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToolAnalytics } from '../hooks/useToolAnalytics';
import { useAppContext } from '../context/AppContext';
import { safeJsonParse, formatErrorMessage } from '../utils/errorHandling';
import { createStorageKey } from '../utils/storage';
import { debounce } from '../utils/performance';

interface JsonFormatterState {
  output: string;
  isValid: boolean;
}

export default function JsonFormatter() {
  // Use local storage to persist input between sessions
  const [input, setInput] = useLocalStorage(createStorageKey('json', 'input'), '');
  
  // Use our custom hook for managing tool state
  const [state, actions] = useToolState<JsonFormatterState>({
    output: '',
    isValid: false
  });
  
  // Get notification function from context
  const { addNotification } = useAppContext();
  
  // Track tool usage
  const { trackSuccess, trackError } = useToolAnalytics('json-formatter', {
    trackUsageTime: true,
    trackErrors: true
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        addNotification('success', 'Copied to clipboard');
        trackSuccess('copy');
      })
      .catch(err => {
        addNotification('error', 'Failed to copy to clipboard');
        trackError(err, 'copy');
      });
  };

  const handleClear = () => {
    setInput('');
    actions.setData({
      output: '',
      isValid: false
    });
  };

  // Create a debounced version of the parse function to avoid excessive processing
  const debouncedParse = debounce(() => {
    if (!input.trim()) {
      actions.setData({
        output: '',
        isValid: false
      });
      return;
    }

    try {
      const parsed = safeJsonParse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      
      actions.setData({
        output: formatted,
        isValid: true
      });
      
      trackSuccess('format');
    } catch (err) {
      actions.setData({
        output: input,
        isValid: false
      });
      
      actions.setError(err);
      trackError(err, 'format');
    }
  }, 300);

  // Run the parser when input changes
  useEffect(() => {
    debouncedParse();
  }, [input]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">JSON Format/Validate</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleCopy(input)}
            className="p-2 hover:bg-gray-700 rounded-lg transition" 
            title="Copy Input"
          >
            <Clipboard className="w-5 h-5" />
          </button>
          <button 
            onClick={handleClear}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Clear"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleCopy(state.data.output)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Copy Output"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[300px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Paste your JSON here..."
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg relative">
          {state.error ? (
            <div className="text-red-400 text-sm font-mono">{state.error}</div>
          ) : (
            <pre className={`text-sm font-mono ${state.data.isValid ? 'text-green-400' : 'text-red-400'}`}>
              {state.data.output}
            </pre>
          )}
          {state.data.isValid && (
            <div className="absolute top-2 right-2 bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">
              Valid JSON
            </div>
          )}
        </div>
      </div>
    </div>
  );
}