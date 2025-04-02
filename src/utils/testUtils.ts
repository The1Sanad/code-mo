/**
 * Utilities for testing components and functions
 */

/**
 * Wait for a specified amount of time
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the specified time
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Mock the localStorage API for testing
 * @returns An object with methods to manipulate the mocked localStorage
 */
export function mockLocalStorage() {
  const store: Record<string, string> = {};
  
  const mockStorage = {
    getItem: jest.fn((key: string): string | null => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string): void => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string): void => {
      delete store[key];
    }),
    clear: jest.fn((): void => {
      Object.keys(store).forEach(key => {
        delete store[key];
      });
    }),
    key: jest.fn((index: number): string | null => {
      return Object.keys(store)[index] || null;
    }),
    length: 0,
    // Add methods to inspect and manipulate the mock for testing
    __getStore: () => ({ ...store }),
    __setStore: (newStore: Record<string, string>) => {
      Object.keys(store).forEach(key => {
        delete store[key];
      });
      Object.keys(newStore).forEach(key => {
        store[key] = newStore[key];
      });
    },
  };
  
  // Update length property
  Object.defineProperty(mockStorage, 'length', {
    get: () => Object.keys(store).length,
  });
  
  return mockStorage;
}

/**
 * Create a mock for the Fetch API
 * @param response - The response to return from fetch
 * @returns A mock fetch function
 */
export function mockFetch(response: unknown) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      blob: () => Promise.resolve(new Blob([JSON.stringify(response)])),
      status: 200,
      headers: {
        get: () => 'application/json',
        forEach: () => {},
      },
    })
  );
}

/**
 * Create a failed mock for the Fetch API
 * @param status - The HTTP status code to return
 * @param errorMessage - The error message to return
 * @returns A mock fetch function that rejects
 */
export function mockFetchError(status = 500, errorMessage = 'Internal Server Error') {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      status,
      statusText: errorMessage,
      json: () => Promise.resolve({ error: errorMessage }),
      text: () => Promise.resolve(errorMessage),
    })
  );
}

/**
 * Create a mock for the clipboard API
 * @returns A mock clipboard object
 */
export function mockClipboard() {
  let clipboardText = '';
  
  const mockClipboardObj = {
    writeText: jest.fn((text: string) => {
      clipboardText = text;
      return Promise.resolve();
    }),
    readText: jest.fn(() => Promise.resolve(clipboardText)),
    // Helper for tests
    __getText: () => clipboardText,
    __setText: (text: string) => {
      clipboardText = text;
    },
  };
  
  return mockClipboardObj;
}