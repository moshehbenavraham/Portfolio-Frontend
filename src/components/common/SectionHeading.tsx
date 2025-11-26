import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}

export function SectionHeading({
  children,
  className,
  underline = false,
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'mb-8 text-3xl font-semibold',
        underline && 'inline-block border-b-2 border-[var(--primary-color)] pb-2',
        className
      )}
    >
      {children}
    </h2>
  );
}
