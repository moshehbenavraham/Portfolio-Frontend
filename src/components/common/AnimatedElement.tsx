import { useRef, type ReactNode, type ElementType } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';
import { scrollAnimations, defaultScrollTrigger, staggerConfigs } from '@/lib/animations';

// Register plugin
gsap.registerPlugin(ScrollTrigger);

type AnimationPreset = keyof typeof scrollAnimations;

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Animation preset from scrollAnimations */
  animation?: AnimationPreset;
  /** Custom animation config (overrides preset) */
  customAnimation?: GSAPTweenVars;
  /** Delay before animation starts */
  delay?: number;
  /** Duration override */
  duration?: number;
  /** Enable scroll trigger (default: true) */
  scrollTrigger?: boolean | ScrollTrigger.Vars;
  /** CSS selector for child elements to animate (for stagger effects) */
  staggerChildren?: string;
  /** Stagger amount for child elements */
  staggerAmount?: number;
}

/**
 * Wrapper component for scroll-triggered GSAP animations.
 * Automatically respects user's reduced motion preference.
 *
 * @example
 * // Simple fade up on scroll
 * <AnimatedElement animation="fadeUp">
 *   <h2>Section Title</h2>
 * </AnimatedElement>
 *
 * @example
 * // Stagger children
 * <AnimatedElement animation="fadeUp" staggerChildren=".card" staggerAmount={0.1}>
 *   <div className="card">Card 1</div>
 *   <div className="card">Card 2</div>
 * </AnimatedElement>
 */
export function AnimatedElement({
  children,
  className,
  as: Component = 'div',
  animation = 'fadeUp',
  customAnimation,
  delay = 0,
  duration,
  scrollTrigger = true,
  staggerChildren,
  staggerAmount,
}: AnimatedElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const element = containerRef.current;
      if (!element || prefersReducedMotion) return;

      // Determine animation config
      const baseAnimation = customAnimation || scrollAnimations[animation];
      const animationConfig: GSAPTweenVars = {
        ...baseAnimation,
        ...(delay && { delay }),
        ...(duration && { duration }),
      };

      // Build ScrollTrigger config
      let scrollTriggerConfig: ScrollTrigger.Vars | undefined;
      if (scrollTrigger === true) {
        scrollTriggerConfig = {
          trigger: element,
          ...defaultScrollTrigger,
        };
      } else if (scrollTrigger && typeof scrollTrigger === 'object') {
        scrollTriggerConfig = {
          trigger: element,
          ...defaultScrollTrigger,
          ...scrollTrigger,
        };
      }

      // Animate children with stagger or the container itself
      // immediateRender: false prevents elements from being set to "from" state until ScrollTrigger fires
      if (staggerChildren) {
        const targets = element.querySelectorAll(staggerChildren);
        if (targets.length > 0) {
          gsap.from(targets, {
            ...animationConfig,
            immediateRender: false,
            stagger: staggerAmount ?? staggerConfigs.grid.amount,
            scrollTrigger: scrollTriggerConfig,
          });
        }
      } else {
        gsap.from(element, {
          ...animationConfig,
          immediateRender: false,
          scrollTrigger: scrollTriggerConfig,
        });
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion, animation] }
  );

  return (
    <Component ref={containerRef} className={cn(className)}>
      {children}
    </Component>
  );
}
