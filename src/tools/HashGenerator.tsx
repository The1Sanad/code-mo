import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy } from 'lucide-react';
import CryptoJS from 'crypto-js';

type HashAlgorithm = 'MD5' | 'SHA1' | 'SHA256' | 'SHA512' | 'RIPEMD160';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('MD5');
  const [output, setOutput] = useState('');

  const algorithms: HashAlgorithm[] = ['MD5', 'SHA1', 'SHA256', 'SHA512', 'RIPEMD160'];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
  };

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    let hash = '';
    switch (algorithm) {
      case 'MD5':
        hash = CryptoJS.MD5(input).toString();
        break;
      case 'SHA1':
        hash = CryptoJS.SHA1(input).toString();
        break;
      case 'SHA256':
        hash = CryptoJS.SHA256(input).toString();
        break;
      case 'SHA512':
        hash = CryptoJS.SHA512(input).toString();
        break;
      case 'RIPEMD160':
        hash = CryptoJS.RIPEMD160(input).toString();
        break;
    }
    setOutput(hash);
  }, [input, algorithm]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Hash Generator</h3>
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
            onClick={() => handleCopy(output)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Copy Hash"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        {algorithms.map((algo) => (
          <button
            key={algo}
            onClick={() => setAlgorithm(algo)}
            className={`px-4 py-2 rounded-lg transition ${
              algorithm === algo
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {algo}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[200px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Enter text to hash..."
          />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-blue-400">{algorithm} Hash</h4>
          </div>
          <pre className="text-sm font-mono text-gray-300 break-all">
            {output}
          </pre>
        </div>
      </div>
    </div>
  );
}