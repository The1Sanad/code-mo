import { useState } from 'react';
import { ChevronRight, ChevronDown, Code, Shield, Zap, FileText, Terminal, RefreshCw, Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const toolCategories = [
  {
    name: "AI Tools",
    icon: <Brain className="w-5 h-5 text-blue-500" />,
    tools: [
      { name: "Prompt Builder", path: "/tools/prompt-builder" },
    ]
  },
  {
    name: "Formatters & Validators",
    icon: <Code className="w-5 h-5 text-blue-500" />,
    tools: [
      { name: "JSON Format/Validate", path: "/tools/json" },
      { name: "SQL Formatter", path: "/tools/sql" },
      { name: "YAML to JSON", path: "/tools/yaml" },
    ]
  },
  {
    name: "Encoders & Decoders",
    icon: <Shield className="w-5 h-5 text-blue-500" />,
    tools: [
      { name: "Base64 String Encode/Decode", path: "/tools/base64" },
      { name: "URL Encode/Decode", path: "/tools/url" },
      { name: "HTML Entity Encode/Decode", path: "/tools/html" },
      { name: "Backslash Escape/Unescape", path: "/tools/escape" },
      { name: "JSON Escape/Unescape", path: "/tools/json-escape" },
      { name: "PHP Serializer", path: "/tools/php" },
    ]
  },
  {
    name: "Generators",
    icon: <Zap className="w-5 h-5 text-blue-500" />,
    tools: [
      { name: "UUID/ULID Generator", path: "/tools/uuid" },
      { name: "Hash Generator", path: "/tools/hash" },
    ]
  },
  {
    name: "Testers & Debuggers",
    icon: <Terminal className="w-5 h-5 text-blue-500" />,
    tools: [
      { name: "JWT Debugger", path: "/tools/jwt" },
      { name: "RegExp Tester", path: "/tools/regexp" },
      { name: "Cron Job Parser", path: "/tools/cron" },
      { name: "URL Parser", path: "/tools/url-parser" },
    ]
  },
  {
    name: "Text & Content",
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    tools: [
      { name: "HTML Preview", path: "/tools/html-preview" },
      { name: "String Case Converter", path: "/tools/case" },
      { name: "Text Diff Checker", path: "/tools/diff" },
      { name: "Markdown Editor", path: "/tools/markdown" },
    ]
  },
] as const;

// Flatten tools for easy access
export const tools = toolCategories.flatMap(category => category.tools);

export default function Sidebar() {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(toolCategories.map(cat => cat.name));

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const isExpanded = (categoryName: string) => expandedCategories.includes(categoryName);

  return (
    <div className="sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Developer Tools</h3>
        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">{tools.length}+ tools</span>
      </div>
      
      <div className="space-y-4">
        {toolCategories.map((category) => (
          <div key={category.name} className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-800/50 transition"
            >
              <div className="flex items-center space-x-3">
                {category.icon}
                <span className="font-medium">{category.name}</span>
              </div>
              {isExpanded(category.name) ? 
                <ChevronDown className="w-4 h-4 text-gray-400" /> : 
                <ChevronRight className="w-4 h-4 text-gray-400" />
              }
            </button>
            
            {isExpanded(category.name) && (
              <div className="border-t border-gray-800 divide-y divide-gray-800">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`flex items-center space-x-2 p-3 transition ${
                      location.pathname === tool.path
                        ? 'text-blue-500 bg-blue-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 ml-2" />
                    <span>{tool.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border border-gray-800 rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <h4 className="font-medium mb-2 flex items-center">
          <RefreshCw className="w-4 h-4 mr-2 text-blue-400" />
          Recently Updated
        </h4>
        <p className="text-sm text-gray-400 mb-3">We're constantly adding new tools and improving existing ones.</p>
      </div>
    </div>
  );
}