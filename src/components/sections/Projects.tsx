import { Section } from '@/components/layout';
import { SectionHeading, ProjectCard, AnimatedElement } from '@/components/common';
import { projects } from '@/data';

export function Projects() {
  return (
    <Section id="projects" className="bg-white dark:bg-gray-800">
      <AnimatedElement animation="fadeUp">
        <SectionHeading underline>Featured Projects</SectionHeading>
      </AnimatedElement>
      <AnimatedElement
        animation="fadeUp"
        staggerChildren=".project-card"
        staggerAmount={0.15}
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} className="project-card" {...project} />
        ))}
      </AnimatedElement>
    </Section>
  );
}
