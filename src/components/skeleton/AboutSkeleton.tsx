import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const AboutSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
        <div className="container-fluid flex flex-col max-w-[960px]">
          {/* Hero Skeleton */}
          <div className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-lg min-h-[150px] sm:min-h-[180px] md:min-h-[218px] animate-pulse">
            <div className="flex p-3 sm:p-4">
              <Skeleton height="32px" className="max-w-[300px]" />
            </div>
          </div>

          {/* Intro Skeleton */}
          <div className="px-4 pt-5">
            <Skeleton height="28px" className="mb-3 max-w-[400px]" />
            <Skeleton height="16px" className="mb-1" />
            <Skeleton height="16px" width="95%" />
          </div>

          {/* Timeline Skeleton */}
          <div className="px-4 pt-5">
            <Skeleton height="24px" className="mb-3 max-w-[200px]" />
            <div className="grid grid-cols-[40px_1fr] gap-x-2 sm:gap-x-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center gap-1 py-3">
                    <Skeleton height="24px" width="24px" className="rounded-full" />
                    {index < 3 && <Skeleton height="16px" width="2px" />}
                  </div>
                  <div className="flex flex-1 flex-col py-3">
                    <Skeleton height="20px" className="mb-2" />
                    <Skeleton height="16px" width="90%" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Values Skeleton */}
          <div className="px-4 pt-5">
            <Skeleton height="24px" className="mb-3 max-w-[200px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-3 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <Skeleton height="24px" width="24px" className="rounded" />
                  <Skeleton height="20px" className="mb-2" />
                  <Skeleton height="16px" width="90%" />
                </div>
              ))}
            </div>
          </div>

          {/* Team Skeleton */}
          <div className="px-4 pt-5">
            <Skeleton height="24px" className="mb-3 max-w-[200px]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-3 text-center pb-3">
                  <div className="px-4">
                    <Skeleton height="200px" width="200px" className="rounded-full mx-auto" />
                  </div>
                  <div>
                    <Skeleton height="20px" width="150px" className="mx-auto mb-2" />
                    <Skeleton height="16px" width="120px" className="mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

