/**
 * Environment variables utility
 * 
 * This module provides a centralized way to access environment variables
 * with proper typing and default values.
 */

// Import environment variables from .env file
// Vite automatically loads environment variables from .env files
// See: https://vitejs.dev/guide/env-and-mode.html

/**
 * Get the OpenRouter API key from environment variables
 * Only reads from the .env file, no fallback to localStorage or user input
 * This ensures API keys are never exposed in the UI or client-side storage
 */
export const getOpenRouterApiKey = (): string => {
  // Vite prefixes environment variables with VITE_
  return import.meta.env.VITE_OPENROUTER_API_KEY || '';
};

// API keys should only be stored in .env files for security reasons
// Never store sensitive information in localStorage or expose it in the UI