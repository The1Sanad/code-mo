import { useCallback, useEffect } from 'react';
import { createStorageKey, loadFromStorage, saveToStorage } from '../utils/storage';

interface ToolUsageData {
  toolName: string;
  usageCount: number;
  lastUsed: string; // ISO date string
  averageUsageTime?: number; // in seconds
}

interface ToolAnalyticsOptions {
  trackUsageTime?: boolean;
  trackErrors?: boolean;
}

/**
 * Hook for tracking tool usage analytics
 * @param toolName - The name of the tool being used
 * @param options - Configuration options for analytics tracking
 * @returns Functions for tracking tool usage events
 */
export function useToolAnalytics(toolName: string, options: ToolAnalyticsOptions = {}) {
  // const { addNotification } = useAppContext();
  const storageKey = createStorageKey('analytics', 'toolUsage');
  
  // Track when the tool was opened
  useEffect(() => {
    const now = new Date().toISOString();
    const allToolsUsage = loadFromStorage<Record<string, ToolUsageData>>(storageKey, {});
    
    // Update or create usage data for this tool
    const currentToolData = allToolsUsage[toolName] || {
      toolName,
      usageCount: 0,
      lastUsed: now,
    };
    
    allToolsUsage[toolName] = {
      ...currentToolData,
      usageCount: currentToolData.usageCount + 1,
      lastUsed: now,
    };
    
    saveToStorage(storageKey, allToolsUsage);
    
    // Optional: Start timing if tracking usage time
    if (options.trackUsageTime) {
      const startTime = Date.now();
      return () => {
        const usageTime = (Date.now() - startTime) / 1000; // in seconds
        const updatedData = loadFromStorage<Record<string, ToolUsageData>>(storageKey, {});
        
        if (updatedData[toolName]) {
          const currentAvg = updatedData[toolName].averageUsageTime || 0;
          const currentCount = updatedData[toolName].usageCount || 1;
          
          // Calculate new average: ((oldAvg * (count-1)) + newTime) / count
          const newAverage = currentCount > 1 
            ? ((currentAvg * (currentCount - 1)) + usageTime) / currentCount
            : usageTime;
          
          updatedData[toolName].averageUsageTime = newAverage;
          saveToStorage(storageKey, updatedData);
        }
      };
    }
  }, [toolName, storageKey, options.trackUsageTime]);
  
  // Track successful operations
  const trackSuccess = useCallback((operation: string) => {
    // Could track specific successful operations here
    console.log(`Tool ${toolName}: ${operation} successful`);
  }, [toolName]);
  
  // Track errors
  const trackError = useCallback((error: unknown, operation?: string) => {
    if (!options.trackErrors) return;
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Tool ${toolName}: Error during ${operation || 'operation'}`, error);
    
    // Store error information if needed
    const errorStorageKey = createStorageKey('analytics', 'errors');
    const errorsData = loadFromStorage<Array<{toolName: string, error: string, date: string, operation?: string}>>(errorStorageKey, []);
    
    errorsData.push({
      toolName,
      error: errorMessage,
      date: new Date().toISOString(),
      operation,
    });
    
    // Keep only the last 100 errors to avoid excessive storage
    if (errorsData.length > 100) {
      errorsData.shift();
    }
    
    saveToStorage(errorStorageKey, errorsData);
  }, [toolName, options.trackErrors]);
  
  return {
    trackSuccess,
    trackError,
  };
}