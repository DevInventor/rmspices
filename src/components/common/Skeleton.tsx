import React from 'react';
import { cn } from '../../utils';

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  height,
  width,
}) => {
  return (
    <div
      className={cn('animate-pulse bg-gray-300 dark:bg-gray-600 rounded', className)}
      style={{ height, width }}
    />
  );
};

// Card Skeleton
export const CardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <Skeleton height="200px" className="mb-4 rounded-lg" />
      <Skeleton height="20px" className="mb-2" />
      <Skeleton height="16px" width="80%" className="mb-2" />
      <Skeleton height="16px" width="60%" />
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Skeleton height="200px" />
      <div className="p-4">
        <Skeleton height="18px" className="mb-2" />
        <Skeleton height="14px" width="90%" className="mb-1" />
        <Skeleton height="14px" width="70%" />
      </div>
    </div>
  );
};

// Text Skeleton
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className = '',
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height="16px"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
};

