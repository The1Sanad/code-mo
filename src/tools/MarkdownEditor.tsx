import React, { useEffect } from 'react';
import { Clipboard, Trash2, Copy, Download, FileText } from 'lucide-react';
import { marked } from 'marked';
import { useToolState } from '../hooks/useToolState';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToolAnalytics } from '../hooks/useToolAnalytics';
import { useAppContext } from '../context/AppContext';
import { createStorageKey } from '../utils/storage';
import { debounce } from '../utils/performance';

interface MarkdownEditorState {
  html: string;
  wordCount: number;
}

export default function MarkdownEditor() {
  // Use local storage to persist input between sessions
  const [markdown, setMarkdown] = useLocalStorage(createStorageKey('markdown', 'input'), '');
  
  // Use our custom hook for managing tool state
  const [state, actions] = useToolState<MarkdownEditorState>({
    html: '',
    wordCount: 0
  });
  
  // Get notification function from context
  const { addNotification } = useAppContext();
  
  // Track tool usage
  const { trackSuccess, trackError } = useToolAnalytics('markdown-editor', {
    trackUsageTime: true,
    trackErrors: true
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        addNotification('success', 'Copied to clipboard');
        trackSuccess('copy');
      })
      .catch(err => {
        addNotification('error', 'Failed to copy to clipboard');
        trackError(err, 'copy');
      });
  };

  const handleClear = () => {
    setMarkdown('');
    actions.setData({
      html: '',
      wordCount: 0
    });
  };

  const handleDownloadHTML = () => {
    try {
      const blob = new Blob([state.data.html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addNotification('success', 'HTML file downloaded');
      trackSuccess('download-html');
    } catch (err) {
      addNotification('error', 'Failed to download HTML');
      trackError(err, 'download-html');
    }
  };

  const handleDownloadMarkdown = () => {
    try {
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addNotification('success', 'Markdown file downloaded');
      trackSuccess('download-md');
    } catch (err) {
      addNotification('error', 'Failed to download Markdown');
      trackError(err, 'download-md');
    }
  };

  // Parse markdown with debounce to avoid performance issues with large inputs
  const debouncedParse = debounce((markdown: string) => {
    if (!markdown.trim()) {
      actions.setData({
        html: '',
        wordCount: 0
      });
      return;
    }

    try {
      const html = marked(markdown);
      const wordCount = markdown.split(/\s+/).filter(Boolean).length;
      
      actions.setData({
        html,
        wordCount
      });
      
      trackSuccess('parse');
    } catch (error) {
      console.error('Error parsing markdown:', error);
      trackError(error instanceof Error ? error : new Error('Unknown error'), 'parse');
    }
  }, 300);

  // Parse markdown when it changes
  useEffect(() => {
    debouncedParse(markdown);
  }, [markdown, debouncedParse]);

  // Insert markdown formatting
  const insertFormatting = (format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText || 'italic text'}*`;
        break;
      case 'heading':
        formattedText = `## ${selectedText || 'Heading'}`;
        break;
      case 'link':
        formattedText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText || 'list item'}\n- another item\n`;
        break;
      case 'code':
        formattedText = `\`${selectedText || 'code'}\``;
        break;
      case 'codeblock':
        formattedText = `\`\`\`\n${selectedText || 'code block'}\n\`\`\``;
        break;
      default:
        formattedText = selectedText;
    }

    const newText = markdown.substring(0, start) + formattedText + markdown.substring(end);
    setMarkdown(newText);

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + formattedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Markdown Editor</h3>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleCopy(markdown)}
            className="p-2 hover:bg-gray-700 rounded-lg transition" 
            title="Copy Markdown"
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
            onClick={() => handleCopy(state.data.html)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Copy HTML"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button 
            onClick={handleDownloadHTML}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Download HTML"
          >
            <FileText className="w-5 h-5" />
          </button>
          <button 
            onClick={handleDownloadMarkdown}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
            title="Download Markdown"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Markdown formatting toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 bg-gray-800 p-2 rounded-lg">
        <button 
          onClick={() => insertFormatting('bold')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition"
          title="Bold"
        >
          B
        </button>
        <button 
          onClick={() => insertFormatting('italic')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm italic transition"
          title="Italic"
        >
          I
        </button>
        <button 
          onClick={() => insertFormatting('heading')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition"
          title="Heading"
        >
          H
        </button>
        <button 
          onClick={() => insertFormatting('link')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition"
          title="Link"
        >
          Link
        </button>
        <button 
          onClick={() => insertFormatting('list')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition"
          title="List"
        >
          List
        </button>
        <button 
          onClick={() => insertFormatting('code')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-mono transition"
          title="Inline Code"
        >
          Code
        </button>
        <button 
          onClick={() => insertFormatting('codeblock')}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm font-mono transition"
          title="Code Block"
        >
          Code Block
        </button>
        <div className="ml-auto text-xs text-gray-400 flex items-center">
          Words: {state.data.wordCount}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[400px] bg-transparent text-sm font-mono focus:outline-none resize-none"
            placeholder="Write your markdown here..."
          />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg overflow-auto h-[400px]">
          {state.error ? (
            <div className="text-red-400 text-sm">{state.error}</div>
          ) : (
            <div 
              className="prose prose-invert prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: state.data.html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}