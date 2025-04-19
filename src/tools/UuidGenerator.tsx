import React, { useState } from 'react';
import { Copy, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { ulid } from 'ulid';

export default function UuidGenerator() {
  const [ids, setIds] = useState<string[]>([uuidv4()]);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [idType, setIdType] = useState<string>('uuid');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleGenerate = () => {
    const newId = idType === 'uuid' ? uuidv4() : ulid();
    setIds([...ids, isUpperCase ? newId.toUpperCase() : newId.toLowerCase()]);
  };

  const handleRefreshAll = () => {
    const newIds = ids.map(() => {
      const newId = idType === 'uuid' ? uuidv4() : ulid();
      return isUpperCase ? newId.toUpperCase() : newId.toLowerCase();
    });
    setIds(newIds);
  };

  const formatId = (id: string) => {
    return isUpperCase ? id.toUpperCase() : id.toLowerCase();
  };

  const handleIdTypeChange = (newType: string) => {
    setIdType(newType);
    setTimeout(() => {
      setIds(prevIds => prevIds.map(() => {
        const newId = newType === 'uuid' ? uuidv4() : ulid();
        return isUpperCase ? newId.toUpperCase() : newId.toLowerCase();
      }));
    }, 0);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{idType === 'uuid' ? 'UUID' : 'ULID'} Generator</h3>
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
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleIdTypeChange('uuid')}
            className={`px-4 py-2 rounded-lg transition ${idType === 'uuid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            UUID
          </button>
          <button
            onClick={() => handleIdTypeChange('ulid')}
            className={`px-4 py-2 rounded-lg transition ${idType === 'ulid' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            ULID
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Case:</span>
          <button
            onClick={() => setIsUpperCase(!isUpperCase)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title={isUpperCase ? "Switch to lowercase" : "Switch to uppercase"}
          >
            {isUpperCase ? (
              <ToggleRight className="w-5 h-5 text-blue-500" />
            ) : (
              <ToggleLeft className="w-5 h-5" />
            )}
          </button>
          <span className="text-sm">{isUpperCase ? "UPPER" : "lower"}</span>
        </div>
      </div>

      <div className="space-y-4">
        {ids.map((id, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
            <code className="text-sm font-mono text-gray-300">{formatId(id)}</code>
            <button
              onClick={() => handleCopy(formatId(id))}
              className="p-2 hover:bg-gray-700 rounded transition"
              title={`Copy ${idType.toUpperCase()}`}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        ))}

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Generate New {idType.toUpperCase()}
        </button>
      </div>
    </div>
  );
}