/**
 * Utilities for improving application accessibility
 */

/**
 * Focus trap for modal dialogs and other UI elements that need to trap focus
 * @param containerRef - Ref to the container element
 * @param isActive - Whether the focus trap is active
 */
export function setupFocusTrap(
  containerElement: HTMLElement | null,
  isActive: boolean = true
): () => void {
  if (!containerElement || !isActive) return () => {};
  
  // Find all focusable elements within the container
  const focusableElements = containerElement.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  // Focus the first element initially
  firstElement.focus();
  
  // Handle keydown events to trap focus
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    // Shift + Tab
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } 
    // Tab
    else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Announce a message to screen readers using ARIA live regions
 * @param message - The message to announce
 * @param priority - The priority of the announcement
 */
export function announceToScreenReader(
  message: string,
  priority: 'assertive' | 'polite' = 'polite'
): void {
  // Create or get the live region element
  let liveRegion = document.getElementById('screen-reader-announcer');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'screen-reader-announcer';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.setAttribute('role', 'status');
    liveRegion.style.position = 'absolute';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.padding = '0';
    liveRegion.style.overflow = 'hidden';
    liveRegion.style.clip = 'rect(0, 0, 0, 0)';
    liveRegion.style.whiteSpace = 'nowrap';
    liveRegion.style.border = '0';
    document.body.appendChild(liveRegion);
  }
  
  // Update the live region to trigger announcement
  liveRegion.textContent = '';
  
  // Use setTimeout to ensure the DOM update happens
  setTimeout(() => {
    liveRegion!.textContent = message;
  }, 50);
}

/**
 * Check if high contrast mode is enabled
 * @returns Whether high contrast mode is enabled
 */
export function isHighContrastMode(): boolean {
  // Check for Windows high contrast mode
  const isHighContrast = window.matchMedia('(forced-colors: active)').matches;
  return isHighContrast;
}

/**
 * Create a keyboard shortcut handler
 * @param keyMap - Map of key combinations to handler functions
 * @returns A function to remove the event listener
 */
export function setupKeyboardShortcuts(
  keyMap: Record<string, () => void>
): () => void {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Create a string representation of the key combination
    const keyCombo = [];
    if (e.ctrlKey) keyCombo.push('ctrl');
    if (e.altKey) keyCombo.push('alt');
    if (e.shiftKey) keyCombo.push('shift');
    if (e.metaKey) keyCombo.push('meta');
    keyCombo.push(e.key.toLowerCase());
    
    const keyString = keyCombo.join('+');
    
    // Check if this key combination has a handler
    if (keyMap[keyString]) {
      e.preventDefault();
      keyMap[keyString]();
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}