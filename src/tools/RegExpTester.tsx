import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy } from 'lucide-react';

interface Match {
  text: string;
  index: number;
  groups?: { [key: string]: string };
}

export default function RegExpTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [input, setInput] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setPattern('');
    setInput('');
    setMatches([]);
    setError(null);
  };

  useEffect(() => {
    if (!pattern || !input) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches: Match[] = [];
      let match;

      if (flags.includes('g')) {
        while ((match = regex.exec(input)) !== null) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.groups,
          });
        }
      } else {
        match = regex.exec(input);
        if (match) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.groups,
          });
        }
      }

      setMatches(matches);
      setError(null);
    } catch (err) {
      setMatches([]);
      setError((err as Error).message);
    }
  }, [pattern, flags, input]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">RegExp Tester</h3>
        <div className="flex items-center space-x-3">
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
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded-lg text-sm font-mono focus:outline-none"
              placeholder="Regular expression pattern..."
            />
          </div>
          <div>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded-lg text-sm font-mono focus:outline-none"
              placeholder="Flags (e.g., g, i, m)"
            />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[200px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Test string..."
          />
        </div>

        {error ? (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-sm">
            {error}
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-blue-400">
                Matches ({matches.length})
              </h4>
            </div>
            {matches.length > 0 ? (
              <div className="space-y-2">
                {matches.map((match, index) => (
                  <div key={index} className="bg-gray-900 p-2 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-mono text-gray-400">
                        Match {index + 1} at index {match.index}
                      </span>
                      <button
                        onClick={() => handleCopy(match.text)}
                        className="p-1 hover:bg-gray-700 rounded transition"
                        title="Copy Match"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <pre className="text-sm font-mono text-gray-300 mt-1">
                      {match.text}
                    </pre>
                    {match.groups && Object.keys(match.groups).length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-gray-400">Groups:</div>
                        <pre className="text-sm font-mono text-gray-300">
                          {JSON.stringify(match.groups, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-400">No matches found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}