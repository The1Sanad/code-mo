import React, { useState, useEffect } from 'react';
import { Clipboard, Trash2, Copy } from 'lucide-react';

type CaseType = 'lower' | 'upper' | 'title' | 'camel' | 'pascal' | 'snake' | 'kebab';

export default function StringCaseConverter() {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<Record<CaseType, string>>({
    lower: '',
    upper: '',
    title: '',
    camel: '',
    pascal: '',
    snake: '',
    kebab: '',
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setInput('');
  };

  const toTitleCase = (str: string): string => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const toCamelCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  const toPascalCase = (str: string): string => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase())
      .replace(/\s+/g, '');
  };

  const toSnakeCase = (str: string): string => {
    return str
      .replace(/\s+/g, '_')
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/^_/, '')
      .toLowerCase();
  };

  const toKebabCase = (str: string): string => {
    return str
      .replace(/\s+/g, '-')
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
      .replace(/^-/, '')
      .toLowerCase();
  };

  useEffect(() => {
    if (!input.trim()) {
      setOutputs({
        lower: '',
        upper: '',
        title: '',
        camel: '',
        pascal: '',
        snake: '',
        kebab: '',
      });
      return;
    }

    setOutputs({
      lower: input.toLowerCase(),
      upper: input.toUpperCase(),
      title: toTitleCase(input),
      camel: toCamelCase(input),
      pascal: toPascalCase(input),
      snake: toSnakeCase(input),
      kebab: toKebabCase(input),
    });
  }, [input]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">String Case Converter</h3>
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
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[100px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Enter text to convert..."
          />
        </div>

        <div className="space-y-2">
          {(Object.entries(outputs) as [CaseType, string][]).map(([type, value]) => (
            <div key={type} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-blue-400">
                  {type.charAt(0).toUpperCase() + type.slice(1)} Case
                </h4>
                <button
                  onClick={() => handleCopy(value)}
                  className="p-1 hover:bg-gray-700 rounded transition"
                  title={`Copy ${type} case`}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="text-sm font-mono text-gray-300">
                {value}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}