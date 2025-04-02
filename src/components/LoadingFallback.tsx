import React from 'react';
import { Loader } from 'lucide-react';

/**
 * Loading component shown while the lazy-loaded component is being loaded
 */
export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center">
        <Loader className="w-8 h-8 text-blue-500 animate-spin mb-2" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}