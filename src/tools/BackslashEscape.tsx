import { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy, RotateCcw } from 'lucide-react';

export default function BackslashEscape() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'escape' ? 'unescape' : 'escape');
  };

  const escapeString = (str: string): string => {
    return str.replace(/[\\"']/g, '\\$&');
  };

  const unescapeString = (str: string): string => {
    return str.replace(/\\([\\"'])/g, '$1');
  };

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'escape') {
        setOutput(escapeString(input));
      } else {
        setOutput(unescapeString(input));
      }
    } catch  {
      setOutput(mode === 'unescape' ? 'Invalid escaped string' : 'Cannot escape this input');
    }
  }, [input, mode]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Backslash Escape/Unescape</h3>
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
            onClick={handleSwap}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Swap Input/Output"
          >
            <RotateCcw className="w-5 h-5" />
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
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setMode('escape')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'escape'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Escape
        </button>
        <button
          onClick={() => setMode('unescape')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'unescape'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Unescape
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[300px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder={mode === 'escape' ? "Enter text to escape..." : "Enter escaped text to unescape..."}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}