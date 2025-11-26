import { cn } from '@/lib/utils';
import { OptimizedImage } from './OptimizedImage';
import type { Project } from '@/types/project';

interface ProjectCardProps extends Project {
  className?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  link,
  linkText = 'Learn More',
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg bg-gray-100 shadow-md',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        'dark:bg-gray-700',
        className
      )}
    >
      <OptimizedImage
        src={image}
        alt={imageAlt}
        className="h-48 w-full object-cover"
        containerClassName="h-48"
      />
      <div className="flex flex-col p-4">
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
        {link && (
          <a
            href={link}
            className={cn(
              'mt-auto inline-block rounded px-4 py-2 text-center font-medium text-white',
              'bg-[var(--primary-color)] transition-all hover:opacity-90'
            )}
          >
            {linkText}
          </a>
        )}
      </div>
    </div>
  );
}
