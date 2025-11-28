import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const CertificationsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
        <div className="container-fluid flex flex-col max-w-[960px]">
          {/* Header Skeleton */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <Skeleton height="32px" className="w-full sm:min-w-72 max-w-[400px]" />
          </div>
          <Skeleton height="16px" className="mb-3 px-4 max-w-[600px]" />

          {/* Export Certifications Grid Skeleton */}
          <div className="px-4 pt-5">
            <Skeleton height="24px" className="mb-3 max-w-[250px]" />
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 p-2 sm:p-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-3 pb-3">
                  <Skeleton height="150px" className="rounded-lg" />
                  <Skeleton height="20px" className="mb-1" />
                  <Skeleton height="16px" width="90%" />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex justify-center px-4 py-3">
            <div className="flex flex-1 gap-3 flex-wrap max-w-[480px] justify-center">
              <Skeleton height="40px" width="120px" className="rounded-lg" />
              <Skeleton height="40px" width="120px" className="rounded-lg" />
            </div>
          </div>

          {/* Quality Assurance Skeleton */}
          <div className="px-4 pt-5">
            <Skeleton height="24px" className="mb-3 max-w-[250px]" />
            <Skeleton height="16px" className="mb-3 px-4 max-w-[600px]" />
            <div className="flex flex-col gap-2 px-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                  <Skeleton height="24px" width="24px" className="rounded flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton height="20px" className="mb-2" />
                    <Skeleton height="16px" width="90%" />
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

