/**
 * Utilities for working with localStorage with type safety and error handling
 */

/**
 * Save data to localStorage with error handling
 * @param key - The storage key
 * @param data - The data to store
 * @returns true if successful, false if failed
 */
export function saveToStorage<T>(key: string, data: T): boolean {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Load data from localStorage with error handling
 * @param key - The storage key
 * @param defaultValue - Default value to return if key doesn't exist or on error
 * @returns The stored data or defaultValue
 */
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return defaultValue;
    }
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error(`Error loading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
}

/**
 * Remove data from localStorage with error handling
 * @param key - The storage key
 * @returns true if successful, false if failed
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Clear all data from localStorage with error handling
 * @returns true if successful, false if failed
 */
export function clearStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

/**
 * Create a hook for persisting tool state in localStorage
 * @param key - The storage key prefix
 * @returns The stored data or defaultValue
 */
export function createStorageKey(toolName: string, subKey?: string): string {
  return `code-mo:${toolName}${subKey ? `:${subKey}` : ''}`;
}