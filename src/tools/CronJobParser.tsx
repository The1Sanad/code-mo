import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2 } from 'lucide-react';
import parser from 'cron-parser';

export default function CronJobParser() {
  const [input, setInput] = useState('');
  const [nextDates, setNextDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
    setNextDates([]);
    setError(null);
  };

  useEffect(() => {
    if (!input.trim()) {
      setNextDates([]);
      setError(null);
      return;
    }

    try {
      const interval = parser.parseExpression(input);
      const dates: string[] = [];
      for (let i = 0; i < 10; i++) {
        dates.push(interval.next().toDate().toLocaleString());
      }
      setNextDates(dates);
      setError(null);
    } catch (err) {
      setNextDates([]);
      setError((err as Error).message);
    }
  }, [input]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Cron Job Parser</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleCopy(input)}
            className="p-2 hover:bg-gray-700 rounded-lg transition" 
            title="Copy Expression"
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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-transparent text-sm font-mono focus:outline-none"
            placeholder="Enter cron expression (e.g., * * * * *)"
          />
        </div>

        {error ? (
          <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-sm">
            {error}
          </div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-400 mb-4">
              Next 10 Execution Times
            </h4>
            <div className="space-y-2">
              {nextDates.map((date, index) => (
                <div key={index} className="text-sm font-mono text-gray-300">
                  {date}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}