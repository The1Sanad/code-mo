import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, RefreshCw } from 'lucide-react';

export default function HtmlPreview() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
    setError(null);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">HTML Preview</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleCopy(input)}
            className="p-2 hover:bg-gray-700 rounded-lg transition" 
            title="Copy HTML"
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
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[400px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Enter HTML code..."
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div 
            className="w-full h-[400px] overflow-auto bg-white text-black rounded"
            dangerouslySetInnerHTML={{ __html: input }}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-500/10 text-red-400 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}