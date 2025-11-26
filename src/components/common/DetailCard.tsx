import { cn } from '@/lib/utils';
import type { DetailCard as DetailCardType } from '@/types/about';

interface DetailCardProps extends DetailCardType {
  className?: string;
}

export function DetailCard({ title, content, className }: DetailCardProps) {
  const isArray = Array.isArray(content);

  return (
    <div
      className={cn(
        'rounded-lg bg-gray-100 p-6 shadow-md',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        'dark:bg-gray-700',
        className
      )}
    >
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      {isArray ? (
        <ul className="list-inside list-disc space-y-1">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
}
