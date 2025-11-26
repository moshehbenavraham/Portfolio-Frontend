import { Section } from '@/components/layout';
import { SectionHeading, SkillCard, AnimatedElement } from '@/components/common';
import { skills } from '@/data';

export function Skills() {
  return (
    <Section id="skills" className="bg-gray-100 dark:bg-gray-900">
      <AnimatedElement animation="fadeUp">
        <SectionHeading>Core Competencies</SectionHeading>
      </AnimatedElement>
      <AnimatedElement
        animation="scaleIn"
        staggerChildren=".skill-card"
        staggerAmount={0.08}
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {skills.map((skill) => (
          <SkillCard key={skill.id} className="skill-card" {...skill} />
        ))}
      </AnimatedElement>
    </Section>
  );
}
