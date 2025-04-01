import React, { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([uuidv4()]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleGenerate = () => {
    setUuids([...uuids, uuidv4()]);
  };

  const handleRefreshAll = () => {
    setUuids(uuids.map(() => uuidv4()));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">UUID Generator</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefreshAll}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Refresh All"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {uuids.map((uuid, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <code className="text-sm font-mono text-gray-300">{uuid}</code>
            <button
              onClick={() => handleCopy(uuid)}
              className="p-2 hover:bg-gray-700 rounded transition"
              title="Copy UUID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Generate New UUID
        </button>
      </div>
    </div>
  );
}