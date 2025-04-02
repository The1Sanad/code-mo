import { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy, RotateCcw } from 'lucide-react';

export default function JsonEscape() {
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

  const escapeJson = (str: string): string => {
    return str
      .replace(/[\b]/g, '\\b')
      .replace(/\f/g, '\\f')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t')
      .replace(/"/g, '\\"')
      .replace(/\\/g, '\\\\');
  };

  const unescapeJson = (str: string): string => {
    return str
      .replace(/\\\\/g, '\\')
      .replace(/\\"/g, '"')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\n/g, '\n')
      .replace(/\\f/g, '\f')
      .replace(/\\b/g, '\b');
  };

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    try {
      if (mode === 'escape') {
        setOutput(escapeJson(input));
      } else {
        setOutput(unescapeJson(input));
      }
    } catch {
      setOutput(mode === 'unescape' ? 'Invalid escaped JSON string' : 'Cannot escape this input');
    }
  }, [input, mode]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">JSON Escape / Unescape</h3>
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
      
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">
          Escapes or unescapes a JSON string removing traces of offending characters that could prevent parsing.
        </p>
        <div className="text-sm text-gray-300 mb-2">
          <p>The following characters are reserved in JSON and must be properly escaped to be used in strings:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><span className="font-mono">Backspace</span> is replaced with <span className="font-mono">\b</span></li>
            <li><span className="font-mono">Form feed</span> is replaced with <span className="font-mono">\f</span></li>
            <li><span className="font-mono">Newline</span> is replaced with <span className="font-mono">\n</span></li>
            <li><span className="font-mono">Carriage return</span> is replaced with <span className="font-mono">\r</span></li>
            <li><span className="font-mono">Tab</span> is replaced with <span className="font-mono">\t</span></li>
            <li><span className="font-mono">Double quote</span> is replaced with <span className="font-mono">\"</span></li>
            <li><span className="font-mono">Backslash</span> is replaced with <span className="font-mono">\\</span></li>
          </ul>
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
          Escape JSON
        </button>
        <button
          onClick={() => setMode('unescape')}
          className={`px-4 py-2 rounded-lg transition ${
            mode === 'unescape'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Unescape JSON
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-xs text-gray-500 mb-2">Copy-paste the JSON to escape or unescape here</p>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[300px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder={mode === 'escape' ? "Enter JSON text to escape..." : "Enter escaped JSON text to unescape..."}
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap break-all h-[300px] overflow-auto">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}