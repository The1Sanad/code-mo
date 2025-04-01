import React, { Suspense, lazy, ComponentType } from 'react';
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

/**
 * Creates a lazy-loaded component with a loading fallback
 * @param importFunc - Dynamic import function for the component
 * @returns Lazy-loaded component wrapped in Suspense
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <LoadingFallback />
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}