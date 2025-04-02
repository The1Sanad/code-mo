import { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  [key: string]: unknown;
}

export default function JwtDebugger() {
  const [input, setInput] = useState('');
  const [header, setHeader] = useState<JwtPayload | null>(null);
  const [payload, setPayload] = useState<JwtPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
    setHeader(null);
    setPayload(null);
    setError(null);
  };

  useEffect(() => {
    if (!input.trim()) {
      setHeader(null);
      setPayload(null);
      setError(null);
      return;
    }

    try {
      const decoded = jwtDecode(input, { header: true });
      const payload = jwtDecode(input);
      setHeader(decoded);
      setPayload(payload);
      setError(null);
    } catch {
      setHeader(null);
      setPayload(null);
      setError('Invalid JWT token');
    }
  }, [input]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">JWT Debugger</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleCopy(input)}
            className="p-2 hover:bg-gray-700 rounded-lg transition" 
            title="Copy Token"
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

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[100px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Paste your JWT token here..."
          />
        </div>

        {error ? (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-sm">
            {error}
          </div>
        ) : (
          <>
            {header && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-blue-400">HEADER</h4>
                  <button
                    onClick={() => handleCopy(JSON.stringify(header, null, 2))}
                    className="p-1 hover:bg-gray-700 rounded transition"
                    title="Copy Header"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(header, null, 2)}
                </pre>
              </div>
            )}

            {payload && (
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-green-400">PAYLOAD</h4>
                  <button
                    onClick={() => handleCopy(JSON.stringify(payload, null, 2))}
                    className="p-1 hover:bg-gray-700 rounded transition"
                    title="Copy Payload"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(payload, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}