import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const HomeSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="px-3 sm:px-6 md:px-10 flex justify-center py-4 sm:py-5">
        <div className="container-fluid flex flex-col max-w-[960px]">
          {/* Hero Section Skeleton */}
          <div className="relative w-full flex min-h-[260px] sm:min-h-[350px] md:min-h-[480px] flex-col gap-3 sm:gap-4 md:gap-6 rounded-lg items-center justify-center p-3 sm:p-6 overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse">
            <div className="relative z-10 flex flex-col gap-2 text-center w-full max-w-3xl px-2 sm:px-4">
              <Skeleton height="60px" className="mb-4 mx-auto max-w-2xl" />
              <Skeleton height="24px" className="mb-8 mx-auto max-w-xl" />
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center px-2 sm:px-4">
                <Skeleton height="48px" width="200px" className="mx-auto rounded-lg" />
                <Skeleton height="48px" width="200px" className="mx-auto rounded-lg" />
              </div>
            </div>
          </div>

          {/* Top Selling Products Section Skeleton */}
          <div className="px-4 pb-3 pt-5">
            <Skeleton height="32px" className="mb-4 max-w-[200px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 sm:gap-4 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4"
                >
                  <Skeleton height="200px" className="rounded-lg" />
                  <Skeleton height="20px" className="mb-2" />
                  <Skeleton height="16px" width="90%" className="mb-1" />
                  <Skeleton height="16px" width="70%" />
                </div>
              ))}
            </div>
          </div>

          {/* View All Button Skeleton */}
          <div className="flex px-4 py-3 justify-center">
            <Skeleton height="48px" width="200px" className="rounded-lg" />
          </div>

          {/* Why Choose Us Section Skeleton */}
          <div className="px-4 py-6 sm:py-8 md:py-10">
            <Skeleton height="32px" className="mb-4 max-w-[300px]" />
            <div className="flex flex-col gap-3 sm:gap-4 mb-6">
              <Skeleton height="40px" className="mb-2 max-w-[600px]" />
              <Skeleton height="20px" className="max-w-[600px]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-1 gap-3 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex-col">
                  <Skeleton height="24px" width="24px" className="rounded" />
                  <Skeleton height="20px" className="mb-2" />
                  <Skeleton height="16px" width="90%" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section Skeleton */}
          <div className="flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-10 py-8 sm:py-10 md:py-20">
            <div className="flex flex-col gap-2 text-center">
              <Skeleton height="40px" className="mb-2 mx-auto max-w-[600px]" />
              <Skeleton height="20px" className="mx-auto max-w-[600px]" />
            </div>
            <div className="flex justify-center px-4">
              <Skeleton height="48px" width="200px" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

