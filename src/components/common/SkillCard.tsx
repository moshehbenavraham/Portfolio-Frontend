import { cn } from '@/lib/utils';
import {
  Bot,
  Code,
  Brain,
  Palette,
  Server,
  Users,
  LineChart,
  HandCoins,
  type LucideIcon,
} from 'lucide-react';
import type { Skill } from '@/types/skill';

// Map icon names to components for tree-shaking
const iconMap: Record<string, LucideIcon> = {
  Bot,
  Code,
  Brain,
  Palette,
  Server,
  Users,
  LineChart,
  HandCoins,
};

interface SkillCardProps extends Skill {
  className?: string;
}

export function SkillCard({ icon, label, className }: SkillCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={cn(
        'rounded-lg bg-white p-6 text-center shadow-md',
        'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        'dark:bg-gray-800',
        className
      )}
    >
      {IconComponent && (
        <IconComponent className="mx-auto mb-3 h-8 w-8 text-[var(--primary-color)]" />
      )}
      <h3 className="text-lg font-semibold">{label}</h3>
    </div>
  );
}
