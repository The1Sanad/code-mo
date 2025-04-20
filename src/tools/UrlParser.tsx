import { useState } from "react";
import { Trash2, Copy } from "lucide-react";

function parseUrl(url: string) {
  try {
    const a = document.createElement("a");
    a.href = url;
    const protocol = a.protocol.replace(":", "");
    const username = a.username;
    const password = a.password;
    const hostname = a.hostname;
    const port = a.port;
    const pathname = a.pathname;
    const hash = a.hash.replace("#", "");
    const search = a.search.replace(/^\?/, "");
    const params: Record<string, string[]> = {};
    if (search) {
      for (const part of search.split("&")) {
        if (!part) continue;
        const [k, v = ""] = part.split("=");
        if (k.endsWith("[]")) {
          const key = k;
          if (!params[key]) params[key] = [];
          params[key].push(decodeURIComponent(v));
        } else {
          if (!params[k]) params[k] = [];
          params[k].push(decodeURIComponent(v));
        }
      }
    }
    return {
      protocol,
      username,
      password,
      hostname,
      port,
      pathname,
      hash,
      search,
      params,
    };
  } catch {
    return null;
  }
}

export default function UrlParser() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<any>(null);

  const handleParse = () => {
    setParsed(parseUrl(input));
  };

  const handleClear = () => {
    setInput("");
    setParsed(null);
  };

  const handleSample = () => {
    const sample =
      "https://user:pwd@code-mo.com:3007/url/parser?key1=value&key2=value2&key3[]=1&key3[]=ab&&key3[]=x#hash";
    setInput(sample);
    setParsed(parseUrl(sample));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">URL Parser</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSample}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Sample"
          >
            Sample
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
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-[60px] bg-gray-800 text-sm font-mono rounded-lg p-2 mb-4 focus:outline-none resize-none"
        placeholder="Paste or type a URL to parse..."
      />
      <div className="flex items-center space-x-3 mb-4">
        <button
          onClick={handleParse}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg transition"
        >
          Parse
        </button>
      </div>
      {parsed && (
        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">Protocol</span>
              <div className="flex items-center">
                <span>{parsed.protocol}</span>
                <button
                  onClick={() => handleCopy(parsed.protocol)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">Hostname</span>
              <div className="flex items-center">
                <span>{parsed.hostname}</span>
                <button
                  onClick={() => handleCopy(parsed.hostname)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">Username</span>
              <div className="flex items-center">
                <span>{parsed.username}</span>
                <button
                  onClick={() => handleCopy(parsed.username)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">Password</span>
              <div className="flex items-center">
                <span>{parsed.password}</span>
                <button
                  onClick={() => handleCopy(parsed.password)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">Port</span>
              <div className="flex items-center">
                <span>{parsed.port}</span>
                <button
                  onClick={() => handleCopy(parsed.port)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">Path</span>
              <div className="flex items-center">
                <span>{parsed.pathname}</span>
                <button
                  onClick={() => handleCopy(parsed.pathname)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-blue-400">fragment</span>
              <div className="flex items-center">
                <span>{parsed.hash}</span>
                <button
                  onClick={() => handleCopy(parsed.hash)}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="font-semibold text-blue-400 mb-2">Params</div>
            {Object.keys(parsed.params).length === 0 && (
              <div className="text-gray-400">No params</div>
            )}
            {Object.entries(parsed.params).map(([k, v]) => (
              <div key={k} className="flex items-center mb-2">
                <span className="bg-gray-700 px-2 py-1 rounded text-xs mr-2">
                  {k}
                </span>
                <span className="text-xs">{v.join(", ")}</span>
                <button
                  onClick={() => handleCopy(v.join(", "))}
                  className="ml-2 p-1 hover:bg-gray-700 rounded"
                  title="Copy Value"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
