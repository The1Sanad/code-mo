/**
 * Error handling utilities for consistent error management across the application
 */

// Custom error types
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Safely parse JSON with improved error handling
 * @param jsonString - The JSON string to parse
 * @returns The parsed JSON object
 * @throws ValidationError with a user-friendly message
 */
export function safeJsonParse<T>(jsonString: string): { success: true; data: T } | { success: false; error: string } {
  try {
    const data = JSON.parse(jsonString) as T;
    return { success: true, data };
  } catch (error) {
    // Extract line and position from error message if available
    const errorMessage = (error as Error).message;
    const positionMatch = errorMessage.match(/position (\d+)/i);
    
    let errorWithContext = `Invalid JSON: ${errorMessage}`;
    
    if (positionMatch && positionMatch[1]) {
      const position = parseInt(positionMatch[1]);
      const errorContext = getErrorContext(jsonString, position);
      errorWithContext = `${errorWithContext}\n${errorContext}`;
    }
    
    return { success: false, error: errorWithContext };
  }
}

/**
 * Get context around the error position in the JSON string with line and column information
 */
function getErrorContext(jsonString: string, position: number): string {
  // Find line and column information
  let line = 1;
  let column = 1;
  let currentPos = 0;
  
  while (currentPos < position && currentPos < jsonString.length) {
    if (jsonString[currentPos] === '\n') {
      line++;
      column = 1;
    } else {
      column++;
    }
    currentPos++;
  }
  
  // Get the line content for better context
  const lines = jsonString.split('\n');
  
  // Get surrounding lines for context
  const startLine = Math.max(0, line - 2);
  const endLine = Math.min(lines.length, line + 2);
  
  const contextLines = [];
  for (let i = startLine; i < endLine; i++) {
    const lineNumber = i + 1;
    const isErrorLine = lineNumber === line;
    const prefix = isErrorLine ? '> ' : '  ';
    contextLines.push(`${prefix}${lineNumber}: ${lines[i] || ''}`);
    
    // Add caret pointer under the error line
    if (isErrorLine) {
      contextLines.push(`  ${' '.repeat(column + String(line).length + 1)}^`);
    }
  }
  
  return `at line ${line}, column ${column}:\n${contextLines.join('\n')}`;
}

/**
 * Format error messages for display
 * @param error - The error object
 * @returns A user-friendly error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }
  
  if (error instanceof ApiError) {
    return `API Error (${error.status}): ${error.message}`;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
}

/**
 * Try to execute a function and handle any errors
 * @param fn - The function to execute
 * @param fallback - The fallback value to return if an error occurs
 * @returns The result of the function or the fallback value
 */
export function tryCatch<T, F>(fn: () => T, fallback: F): T | F {
  try {
    return fn();
  } catch (error) {
    console.error('Error caught in tryCatch:', error);
    return fallback;
  }
}