import { cn } from '@/lib/utils';
import { useScrollTo } from '@/hooks/useScrollTo';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const { scrollTo } = useScrollTo();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = href.replace('#', '');
    scrollTo(id);
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'rounded px-4 py-2 font-medium',
        'transition-colors duration-200',
        'hover:bg-white/10 focus-visible:bg-white/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        className
      )}
    >
      {children}
    </a>
  );
}
