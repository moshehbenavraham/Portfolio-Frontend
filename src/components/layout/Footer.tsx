import { cn } from '@/lib/utils';
import { Container } from './Container';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'mt-auto bg-gray-800 py-4 text-center text-white',
        className
      )}
    >
      <Container>
        <p>&copy; {currentYear} Max Gibson. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-400">
          Special thanks to{' '}
          <a
            href="https://21st.dev/community/components/serafim/splite"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary-color)] hover:underline"
          >
            21st.dev
          </a>{' '}
          for Robot Component!
        </p>
      </Container>
    </footer>
  );
}
