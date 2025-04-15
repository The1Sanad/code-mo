
import { Trash2, Copy, Send, Globe } from 'lucide-react';
import { useToolState } from '../hooks/useToolState';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToolAnalytics } from '../hooks/useToolAnalytics';
import { useAppContext } from '../context/AppContext';
import { createStorageKey } from '../utils/storage';
import { getOpenRouterApiKey } from '../utils/env';
import { useState } from 'react';

interface PromptBuilderState {
  output: string;
  isLoading: boolean;
  detectedLanguage?: string;
}

export default function PromptBuilder() {
  // Use local storage to persist input between sessions
  const [input, setInput] = useLocalStorage(createStorageKey('prompt-builder', 'input'), '');
  
  // Track if we're using Arabic mode
  const [isArabic, setIsArabic] = useState(false);
  
  // Use our custom hook for managing tool state
  const [state, actions] = useToolState<PromptBuilderState>({
    output: '',
    isLoading: false,
    detectedLanguage: undefined
  });
  
  // Get notification function from context
  const { addNotification } = useAppContext();
  
  // Track tool usage
  const { trackSuccess, trackError } = useToolAnalytics('prompt-builder', {
    trackUsageTime: true,
    trackErrors: true
  });

  // No need to initialize API key as we'll always read it from .env file

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
    setInput('');
    actions.setData({
      ...state.data,
      output: ''
    });
  };

  const handleGeneratePrompt = async () => {
    if (!input.trim()) {
      addNotification('error', 'Please enter some text to generate a prompt');
      return;
    }

    const apiKey = getOpenRouterApiKey();
    if (!apiKey.trim()) {
      addNotification('error', 'OpenRouter API key is not set in the .env file');
      return;
    }

    actions.startLoading();
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Code-mo Prompt Builder'
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick:free',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that converts user input into well-structured, effective prompts. Your task is to take the user\'s input and transform it into a clear, detailed prompt that would get the best results from an AI system. You should detect the language of the input and respond in the same language. You have excellent support for Arabic language (العربية) and should maintain the same quality for Arabic prompts as you do for English ones.'
            },
            {
              role: 'user',
              content: `Convert this text into a well-structured prompt: ${input}`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const generatedPrompt = data.choices[0]?.message?.content || 'No response generated';
      
      // Simple language detection - check if the text contains Arabic characters
      const containsArabic = /[؀-ۿ]/.test(generatedPrompt);
      
      actions.setData({
        ...state.data,
        output: generatedPrompt,
        detectedLanguage: containsArabic ? 'Arabic' : 'English'
      });
      
      // Use the new setLoading function to explicitly set loading state to false
      actions.setLoading(false);
      
      trackSuccess('generate');
    } catch (error) {
      actions.setError(error);
      trackError(error, 'generate');
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">AI Prompt Builder {isArabic && <span className="mr-2 text-sm text-gray-400">(منشئ الطلبات الذكي)</span>}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsArabic(!isArabic)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            aria-label="Toggle Arabic mode"
            title={isArabic ? "Switch to English" : "Switch to Arabic"}
          >
            <Globe className="w-5 h-5" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            aria-label="Clear"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

     

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-gray-300 mb-1">
            {isArabic ? "النص المدخل" : "Input Text"}
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isArabic ? "أدخل النص هنا لتحويله إلى طلب منسق..." : "Enter your text here to convert it to a prompt..."}
            className={`w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 ${isArabic ? 'text-right' : ''}`}
            dir={isArabic ? "rtl" : "ltr"}
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleGeneratePrompt}
              disabled={state.isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{isArabic ? "إنشاء الطلب" : "Generate Prompt"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="output" className="block text-sm font-medium text-gray-300">
              {isArabic ? "الطلب المنسق" : "Generated Prompt"}
              {state.data.detectedLanguage && <span className="ml-2 text-xs text-gray-400">({state.data.detectedLanguage})</span>}
            </label>
            {state.data.output && (
              <button
                onClick={() => handleCopy(state.data.output)}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                aria-label="Copy to clipboard"
              >
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </button>
            )}
          </div>
          <div 
            id="output"
            className={`w-full h-64 p-3 bg-gray-800 border border-gray-700 rounded-md text-white overflow-auto whitespace-pre-wrap ${state.data.detectedLanguage === 'Arabic' ? 'text-right' : ''}`}
            dir={state.data.detectedLanguage === 'Arabic' ? "rtl" : "ltr"}
          >
            {state.error ? (
              <div className="text-red-400">{state.error}</div>
            ) : state.data.output ? (
              state.data.output
            ) : (
              <div className="text-gray-500 italic">{isArabic ? "سيظهر الطلب المنسق هنا..." : "Generated prompt will appear here..."}</div>
            )}
          </div>
        </div>
      </div>

      {/* Error message */}
      {state.error && (
        <div className="mt-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-400 text-sm">
          {state.error}
        </div>
      )}

      {/* Success message */}
      {state.success && (
        <div className="mt-4 p-3 bg-green-900/30 border border-green-800 rounded-md text-green-400 text-sm">
          {state.success}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-400">
        <h4 className="font-medium mb-2">{isArabic ? "عن هذه الأداة" : "About this tool"}</h4>
        <p className={isArabic ? 'text-right' : ''} dir={isArabic ? "rtl" : "ltr"}>
          {isArabic 
            ? "تساعدك هذه الأداة على تحويل النص إلى طلبات منسقة بشكل جيد لأنظمة الذكاء الاصطناعي. أدخل النص الخاص بك، وانقر على 'إنشاء الطلب'، واحصل على طلب منسق سيساعدك في الحصول على نتائج أفضل من نماذج الذكاء الاصطناعي."
            : "This tool helps you convert your text into well-structured prompts for AI systems. Enter your text, click \"Generate Prompt\", and get a refined prompt that will help you get better results from AI models."
          }
        </p>
      </div>
    </div>
  );
}