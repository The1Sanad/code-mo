import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy, RotateCcw } from 'lucide-react';
import { serialize, unserialize } from 'php-serialize';

export default function PhpSerializer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'serialize' | 'unserialize'>('serialize');
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'serialize' ? 'unserialize' : 'serialize');
  };

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'serialize') {
        const parsed = JSON.parse(input);
        setOutput(serialize(parsed));
        setError(null);
      } else {
        const unserialized = unserialize(input);
        setOutput(JSON.stringify(unserialized, null, 2));
        setError(null);
      }
    } catch (err) {
      setError((err as Error).message);
    }
  }, [input, mode]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">PHP Serializer</h3>
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
          onClick={() => setMode('serialize')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'serialize'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Serialize
        </button>
        <button
          onClick={() => setMode('unserialize')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'unserialize'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Unserialize
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[300px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder={mode === 'serialize' ? "Enter JSON to serialize..." : "Enter PHP serialized string..."}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          {error ? (
            <div className="text-red-400 text-sm font-mono">{error}</div>
          ) : (
            <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all">
              {output}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}