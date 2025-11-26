import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
}

// Resolve asset path with base URL for production builds
function resolveAssetPath(src: string): string {
  // If src starts with /, prepend the base URL (handles GitHub Pages deployment)
  if (src.startsWith('/') && !src.startsWith('//')) {
    const base = import.meta.env.BASE_URL || '/';
    // Avoid double slashes: if base ends with / and src starts with /, remove one
    return base.endsWith('/') ? base + src.slice(1) : base + src;
  }
  return src;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  aspectRatio = 'auto',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const resolvedSrc = resolveAssetPath(src);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  return (
    <div
      className={cn('relative overflow-hidden', aspectRatioClasses[aspectRatio], containerClassName)}
      style={width && height ? { width, height } : undefined}
    >
      {isLoading && (
        <Skeleton
          className={cn(
            'absolute inset-0 h-full w-full',
            aspectRatioClasses[aspectRatio]
          )}
        />
      )}
      {hasError ? (
        <div
          className={cn(
            'flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700',
            className
          )}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Failed to load image
          </span>
        </div>
      ) : (
        <img
          src={resolvedSrc}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
        />
      )}
    </div>
  );
}
