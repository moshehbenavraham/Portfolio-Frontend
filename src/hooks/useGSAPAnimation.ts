import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { defaultScrollTrigger } from '@/lib/animations';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export interface AnimationConfig {
  from: GSAPTweenVars;
  scrollTrigger?: ScrollTrigger.Vars | boolean;
  target?: string; // CSS selector for child elements
}

/**
 * Hook for creating GSAP animations with React integration.
 * Automatically handles cleanup and respects reduced motion preferences.
 *
 * @example
 * const containerRef = useGSAPAnimation({
 *   from: { opacity: 0, y: 50 },
 *   scrollTrigger: true,
 * });
 */
export function useGSAPAnimation<T extends HTMLElement = HTMLDivElement>(
  config: AnimationConfig
) {
  const containerRef = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element) return;

      // Skip animations if user prefers reduced motion
      if (prefersReducedMotion) {
        gsap.set(element, { clearProps: 'all' });
        if (config.target) {
          gsap.set(element.querySelectorAll(config.target), { clearProps: 'all' });
        }
        return;
      }

      const target = config.target ? element.querySelectorAll(config.target) : element;

      // Build ScrollTrigger config if requested
      let scrollTriggerConfig: ScrollTrigger.Vars | undefined;
      if (config.scrollTrigger === true) {
        scrollTriggerConfig = {
          trigger: element,
          ...defaultScrollTrigger,
        };
      } else if (config.scrollTrigger && typeof config.scrollTrigger === 'object') {
        scrollTriggerConfig = {
          trigger: element,
          ...defaultScrollTrigger,
          ...config.scrollTrigger,
        };
      }

      gsap.from(target, {
        ...config.from,
        scrollTrigger: scrollTriggerConfig,
      });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return containerRef;
}

/**
 * Hook for creating a GSAP timeline with React integration.
 * Returns a ref and a function to add animations to the timeline.
 *
 * @example
 * const { containerRef, addToTimeline } = useGSAPTimeline();
 *
 * useGSAP(() => {
 *   addToTimeline('.hero-title', { opacity: 0, y: -50 });
 *   addToTimeline('.hero-subtitle', { opacity: 0, y: 50 }, '-=0.5');
 * }, { scope: containerRef });
 */
export function useGSAPTimeline<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const getTimeline = useCallback(() => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline();
    }
    return timelineRef.current;
  }, []);

  const addToTimeline = useCallback(
    (
      target: gsap.TweenTarget,
      vars: GSAPTweenVars,
      position?: gsap.Position
    ) => {
      if (prefersReducedMotion) return;
      getTimeline().from(target, vars, position);
    },
    [getTimeline, prefersReducedMotion]
  );

  return {
    containerRef,
    timelineRef,
    getTimeline,
    addToTimeline,
    prefersReducedMotion,
  };
}
