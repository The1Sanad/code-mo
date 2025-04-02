import React, { lazy, ComponentType } from 'react';
import { LoadingFallback } from '../components/LoadingFallback';

/**
 * Creates a lazy-loaded component with a loading fallback
 * @param importFunc - Dynamic import function for the component
 * @returns Lazy-loaded component wrapped in Suspense
 */
export function lazyLoad<T extends ComponentType<unknown>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = <LoadingFallback />
) {
  const LazyComponent = lazy(importFunc);
  
  return (props: React.ComponentPropsWithRef<T>) => (
    <React.Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
}