import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ProductsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
        <div className="container-fluid flex flex-col max-w-[960px]">
          {/* Header Skeleton */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <div className="flex w-full sm:min-w-72 flex-col gap-2 sm:gap-3">
              <Skeleton height="32px" className="mb-2 max-w-[300px]" />
              <Skeleton height="20px" className="max-w-[400px]" />
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:p-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 sm:gap-4 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4"
              >
                <Skeleton height="200px" className="rounded-lg" />
                <Skeleton height="20px" className="mb-2" />
                <Skeleton height="16px" width="90%" className="mb-1" />
                <Skeleton height="16px" width="70%" className="mb-3" />
                <Skeleton height="32px" className="rounded-lg" />
              </div>
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="flex justify-center py-4">
            <Skeleton height="48px" width="200px" className="rounded-lg" />
          </div>

          {/* Results Count Skeleton */}
          <div className="text-center py-4 px-4">
            <Skeleton height="16px" width="200px" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

