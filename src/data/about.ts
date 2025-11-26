import type { AboutData } from '@/types/about';

export const aboutData: AboutData = {
  headline: 'About Me',
  description:
    'With over 14 years of experience in web services and AI solutions, I bring innovation and strategic thinking to every project. My expertise spans AI development, full-stack web development, and organizational leadership.',
  details: [
    {
      id: 'languages',
      title: 'Languages',
      content: 'Hebrew, English',
    },
    {
      id: 'education',
      title: 'Education',
      content: 'B.S. in Computer Science, San Diego State University',
    },
    {
      id: 'certifications',
      title: 'Certifications',
      content: [
        'Generative AI: Introduction and Applications',
        'Introduction to Artificial Intelligence (AI)',
      ],
    },
  ],
};
