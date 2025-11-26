import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Section } from '@/components/layout';
import { OptimizedImage } from '@/components/common';
import { heroData } from '@/data';
import { heroAnimations } from '@/lib/animations';
import { useReducedMotion } from '@/hooks';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { Card } from '@/components/ui/card';

export function Hero() {
  const { name, title, tagline, profileImage, cta } = heroData;
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline();

      tl.from('.hero-title', heroAnimations.h1)
        .from('.hero-subtitle', heroAnimations.h2, '-=0.5')
        .from('.hero-tagline', heroAnimations.p, '-=0.5')
        .from('.hero-image', heroAnimations.img, '-=0.5')
        .from('.hero-button', heroAnimations.buttons, '-=0.5');
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section id="home" className="overflow-x-clip bg-black py-0 text-white">
      <Card className="relative h-[600px] w-full rounded-none border-0 bg-black/[0.96] md:h-[700px] lg:rounded-xl">
        <Spotlight className="left-0 top-0 md:left-48 md:-top-20" fill="#646cff" />

        <div ref={containerRef} className="flex h-full flex-col md:flex-row">
          {/* Left content - Profile info */}
          <div className="relative z-10 flex flex-1 flex-col justify-center p-8 md:p-12 lg:p-16">
            <div className="hero-image mb-6 flex items-center gap-4">
              <OptimizedImage
                src={profileImage.src}
                alt={profileImage.alt}
                priority
                width={80}
                height={80}
                aspectRatio="square"
                className="h-16 w-16 rounded-full object-cover md:h-20 md:w-20"
                containerClassName="h-16 w-16 rounded-full border-2 border-white/20 shadow-lg md:h-20 md:w-20"
              />
              <span className="rounded-full bg-white/10 px-4 py-1 text-sm text-neutral-300">
                Available for projects
              </span>
            </div>

            <h1 className="hero-title mb-3 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              {name}
            </h1>

            <h2 className="hero-subtitle mb-4 text-xl text-[var(--primary-color)] md:text-2xl lg:text-3xl">
              {title}
            </h2>

            <p className="hero-tagline mb-8 max-w-lg text-base text-neutral-300 md:text-lg">
              {tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={cta.primary.href}
                className="hero-button rounded-lg bg-white px-6 py-3 font-medium text-black transition-all hover:-translate-y-0.5 hover:bg-neutral-200 hover:shadow-lg"
              >
                {cta.primary.text}
              </a>
              <a
                href={cta.secondary.href}
                className="hero-button rounded-lg border-2 border-white/20 bg-transparent px-6 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 hover:shadow-lg"
              >
                {cta.secondary.text}
              </a>
            </div>
          </div>

          {/* Right content - 3D Spline Scene */}
          <div className="relative hidden flex-1 overflow-hidden md:block">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full w-full"
            />
            {/* Gradient overlay to blend with content side */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/80 to-transparent" />
          </div>

          {/* Mobile fallback - subtle gradient background */}
          <div className="absolute inset-0 -z-10 md:hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 via-transparent to-purple-500/10" />
          </div>
        </div>
      </Card>
    </Section>
  );
}
