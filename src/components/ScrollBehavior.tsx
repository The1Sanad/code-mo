import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to handle scroll behavior when navigating between pages
 * This ensures clicking on a tool in the sidebar scrolls to the top of the page
 */
export default function ScrollBehavior() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when navigating to any page
    // This ensures that when a user clicks on a tool in the sidebar,
    // the page will scroll to the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // This is a behavior-only component with no UI
}