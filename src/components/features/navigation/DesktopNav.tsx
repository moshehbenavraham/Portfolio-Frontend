import { cn } from '@/lib/utils';
import { navItems } from '@/data/navigation';
import { NavLink } from './NavLink';

interface DesktopNavProps {
  className?: string;
}

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav
      className={cn('hidden md:block', className)}
      aria-label="Desktop navigation"
    >
      <ul className="flex items-center justify-center space-x-1">
        {navItems.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
