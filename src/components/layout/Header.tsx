import { cn } from '@/lib/utils';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { DesktopNav, MobileNav } from '@/components/features/navigation';
import { Container } from './Container';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { isOpen, setIsOpen } = useMobileMenu();

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full bg-gray-800 py-4 text-white',
        className
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Mobile navigation */}
          <MobileNav isOpen={isOpen} onOpenChange={setIsOpen} />

          {/* Desktop navigation - centered */}
          <DesktopNav className="flex-1" />

          {/* Spacer for mobile layout balance */}
          <div className="w-10 md:hidden" aria-hidden="true" />
        </div>
      </Container>
    </header>
  );
}
