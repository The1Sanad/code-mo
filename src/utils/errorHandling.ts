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
export function safeJsonParse<T>(jsonString: string): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    // Extract line and position from error message if available
    const errorMessage = (error as Error).message;
    const positionMatch = errorMessage.match(/position (\d+)/i);
    
    if (positionMatch && positionMatch[1]) {
      const position = parseInt(positionMatch[1]);
      const errorContext = getErrorContext(jsonString, position);
      throw new ValidationError(`Invalid JSON: ${errorMessage}\n${errorContext}`);
    }
    
    throw new ValidationError(`Invalid JSON: ${errorMessage}`);
  }
}

/**
 * Get context around the error position in the JSON string
 */
function getErrorContext(jsonString: string, position: number): string {
  const start = Math.max(0, position - 20);
  const end = Math.min(jsonString.length, position + 20);
  const context = jsonString.substring(start, end);
  
  // Mark the error position with a caret
  const caretPosition = position - start;
  const caretLine = ' '.repeat(caretPosition) + '^';
  
  return `...${context}...\n${caretLine}`;
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