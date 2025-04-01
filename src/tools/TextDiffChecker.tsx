import React, { useState } from 'react';
import { Clipboard, Trash2 } from 'lucide-react';
import { diffLines, Change } from 'diff';

export default function TextDiffChecker() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<Change[]>([]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setText1('');
    setText2('');
    setDiff([]);
  };

  const handleCompare = () => {
    const differences = diffLines(text1, text2);
    setDiff(differences);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Text Diff Checker</h3>
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
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Original Text</label>
            <div className="bg-gray-800 p-4 rounded-lg">
              <textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                className="w-full h-[200px] bg-transparent text-sm font-mono focus:outline-none resize-none"
                placeholder="Enter original text..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Modified Text</label>
            <div className="bg-gray-800 p-4 rounded-lg">
              <textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                className="w-full h-[200px] bg-transparent text-sm font-mono focus:outline-none resize-none"
                placeholder="Enter modified text..."
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleCompare}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Compare Texts
        </button>

        {diff.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-400 mb-4">Differences</h4>
            <div className="space-y-1">
              {diff.map((part, index) => (
                <pre
                  key={index}
                  className={`text-sm font-mono ${
                    part.added
                      ? 'text-green-400'
                      : part.removed
                      ? 'text-red-400'
                      : 'text-gray-300'
                  }`}
                >
                  {part.value}
                </pre>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}