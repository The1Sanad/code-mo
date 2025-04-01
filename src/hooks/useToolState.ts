import { useState, useCallback } from 'react';
import { formatErrorMessage } from '../utils/errorHandling';

/**
 * Custom hook for managing tool state including loading, error handling, and notifications
 */
export interface ToolState<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export interface ToolStateActions<T> {
  setData: (data: T) => void;
  startLoading: () => void;
  setError: (error: unknown) => void;
  setSuccess: (message: string) => void;
  clearError: () => void;
  clearSuccess: () => void;
  reset: () => void;
  processWithLoading: <R>(fn: () => Promise<R>) => Promise<R | undefined>;
}

/**
 * Hook for managing common tool state patterns including loading, error handling, and success messages
 * @param initialData - The initial data state
 * @returns Tool state and actions for updating it
 */
export function useToolState<T>(initialData: T): [ToolState<T>, ToolStateActions<T>] {
  const [state, setState] = useState<ToolState<T>>({
    data: initialData,
    isLoading: false,
    error: null,
    success: null,
  });

  const setData = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  const startLoading = useCallback(() => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
  }, []);

  const setError = useCallback((error: unknown) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: formatErrorMessage(error),
      success: null,
    }));
  }, []);

  const setSuccess = useCallback((message: string) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      success: message,
      error: null,
    }));

    // Auto-clear success message after 3 seconds
    setTimeout(() => {
      setState(prev => {
        // Only clear if it's still the same message
        if (prev.success === message) {
          return { ...prev, success: null };
        }
        return prev;
      });
    }, 3000);
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const clearSuccess = useCallback(() => {
    setState(prev => ({ ...prev, success: null }));
  }, []);

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isLoading: false,
      error: null,
      success: null,
    });
  }, [initialData]);

  /**
   * Process an async function with loading state management and error handling
   */
  const processWithLoading = useCallback(async <R>(fn: () => Promise<R>): Promise<R | undefined> => {
    try {
      startLoading();
      const result = await fn();
      return result;
    } catch (error) {
      setError(error);
      return undefined;
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [startLoading, setError]);

  const actions: ToolStateActions<T> = {
    setData,
    startLoading,
    setError,
    setSuccess,
    clearError,
    clearSuccess,
    reset,
    processWithLoading,
  };

  return [state, actions];
}