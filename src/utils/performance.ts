/**
 * Utilities for monitoring and improving application performance
 */

/**
 * Measure the execution time of a function
 * @param fn - The function to measure
 * @param label - Optional label for logging
 * @returns The result of the function
 */
export function measurePerformance<T>(fn: () => T, label = 'Performance'): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;
  
  // Performance logging removed
  
  // Log to performance monitoring if duration exceeds threshold
  if (duration > 100) {
    console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
  }
  
  return result;
}

/**
 * Measure the execution time of an async function
 * @param fn - The async function to measure
 * @param label - Optional label for logging
 * @returns A promise that resolves to the result of the function
 */
export async function measureAsyncPerformance<T>(
  fn: () => Promise<T>,
  label = 'Async Performance'
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    const duration = end - start;
    
    // Performance logging removed
    
    // Log to performance monitoring if duration exceeds threshold
    if (duration > 500) {
      console.warn(`Performance warning: ${label} took ${duration.toFixed(2)}ms`);
    }
    
    return result;
  } catch (error) {
    const end = performance.now();
    console.error(`${label} failed after ${(end - start).toFixed(2)}ms:`, error);
    throw error;
  }
}

/**
 * Debounce a function to limit how often it can be called
 * @param fn - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  let timeoutId: number | undefined;
  
  return function(...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * Throttle a function to limit how often it can be called
 * @param fn - The function to throttle
 * @param limit - The limit in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit = 300
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Create a memoized version of a function that caches results
 * @param fn - The function to memoize
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  fn: T
): (...args: Parameters<T>) => ReturnType<T> {
  const cache = new Map<string, ReturnType<T>>();
  
  return function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key) as ReturnType<T>;
    }
    
    const result = fn(...args);
    cache.set(key, result as ReturnType<T>);
    return result as ReturnType<T>;
  };
}