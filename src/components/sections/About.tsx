import { Section } from '@/components/layout';
import { SectionHeading, DetailCard, AnimatedElement } from '@/components/common';
import { aboutData } from '@/data';

export function About() {
  const { headline, description, details } = aboutData;

  return (
    <Section id="about" className="bg-white dark:bg-gray-800">
      <AnimatedElement animation="fadeUp">
        <SectionHeading>{headline}</SectionHeading>
      </AnimatedElement>
      <AnimatedElement animation="fadeUp" delay={0.1}>
        <p className="mb-8 text-lg">{description}</p>
      </AnimatedElement>
      <AnimatedElement
        animation="fadeUp"
        staggerChildren=".detail-card"
        staggerAmount={0.15}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {details.map((detail) => (
          <DetailCard key={detail.id} className="detail-card" {...detail} />
        ))}
      </AnimatedElement>
    </Section>
  );
}
