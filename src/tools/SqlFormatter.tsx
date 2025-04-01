import React, { useState } from 'react';
import { Clipboard, Trash2, Copy } from 'lucide-react';
import { format } from 'sql-formatter';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const formatted = format(input);
      setOutput(formatted);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setOutput(input);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">SQL Formatter</h3>
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
            onClick={() => handleCopy(output)}
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
            className="w-full h-[400px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Enter SQL query..."
          />
          <button
            onClick={handleFormat}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Format SQL
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          {error ? (
            <div className="text-red-400 text-sm font-mono">{error}</div>
          ) : (
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}