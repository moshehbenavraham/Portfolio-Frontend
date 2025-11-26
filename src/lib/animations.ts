/**
 * Animation configurations for the portfolio site.
 * These define the "from" state - elements animate FROM these values TO their natural state.
 */

// Hero section animation sequence
export const heroAnimations = {
  h1: {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: 'power3.out',
  },
  h2: {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out',
  },
  p: {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 1,
    ease: 'power3.out',
  },
  img: {
    opacity: 0,
    scale: 0.5,
    duration: 1,
    delay: 1.5,
    ease: 'back.out(1.7)',
  },
  buttons: {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.2,
    delay: 2,
    ease: 'power2.out',
  },
} as const satisfies Record<string, GSAPTweenVars>;

// Scroll-triggered animation presets
export const scrollAnimations = {
  fadeUp: {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  scaleIn: {
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    ease: 'power2.out',
  },
  slideInLeft: {
    opacity: 0,
    x: -60,
    duration: 0.8,
    ease: 'power3.out',
  },
  slideInRight: {
    opacity: 0,
    x: 60,
    duration: 0.8,
    ease: 'power3.out',
  },
} as const satisfies Record<string, GSAPTweenVars>;

// Stagger configuration for grid items
export const staggerConfigs = {
  grid: {
    amount: 0.4,
    from: 'start' as const,
  },
  list: {
    each: 0.1,
  },
} as const;

// ScrollTrigger default configuration
export const defaultScrollTrigger = {
  start: 'top 85%',
  end: 'bottom 15%',
  toggleActions: 'play none none reverse',
} as const;
