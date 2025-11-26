import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems } from '@/data/navigation';
import { NavLink } from './NavLink';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function MobileNav({ isOpen, onOpenChange, className }: MobileNavProps) {
  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <div className={cn('md:hidden', className)}>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <button
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-md',
              'text-white transition-colors duration-200',
              'hover:bg-white/10 focus-visible:bg-white/10',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50'
            )}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 bg-gray-800 text-white border-gray-700"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="text-white text-xl font-bold">
              Menu
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-8" aria-label="Mobile navigation">
            <ul className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block w-full text-left text-lg py-3"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
