import { useCallback } from 'react';

interface ScrollToOptions {
  /** Offset from the top of the element (useful for fixed headers) */
  offset?: number;
  /** Scroll behavior */
  behavior?: ScrollBehavior;
}

const DEFAULT_OPTIONS: ScrollToOptions = {
  offset: 80, // Account for fixed header height
  behavior: 'smooth',
};

export function useScrollTo(options: ScrollToOptions = {}) {
  const { offset, behavior } = { ...DEFAULT_OPTIONS, ...options };

  const scrollTo = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - (offset ?? 0);

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });
    },
    [offset, behavior]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, [behavior]);

  return { scrollTo, scrollToTop };
}
