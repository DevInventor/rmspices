import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ContactSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="py-8 sm:py-12 md:py-14">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Form Section Skeleton */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8 lg:p-12 shadow-lg border border-spice-200 dark:border-slate-800">
            <div className="space-y-8">
              {/* Title Skeleton */}
              <Skeleton height="40px" className="max-w-[300px] mb-4" />

              {/* Form Fields Skeleton */}
              <div className="space-y-6">
                {/* Name and Company Row */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Skeleton height="20px" width="100px" className="mb-2" />
                    <Skeleton height="48px" className="rounded-lg" />
                  </div>
                  <div>
                    <Skeleton height="20px" width="100px" className="mb-2" />
                    <Skeleton height="48px" className="rounded-lg" />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <Skeleton height="20px" width="80px" className="mb-2" />
                  <Skeleton height="48px" className="rounded-lg" />
                </div>

                {/* Phone Field */}
                <div>
                  <Skeleton height="20px" width="100px" className="mb-2" />
                  <Skeleton height="48px" className="rounded-lg" />
                </div>

                {/* Product Field */}
                <div>
                  <Skeleton height="20px" width="120px" className="mb-2" />
                  <Skeleton height="48px" className="rounded-lg" />
                </div>

                {/* Message Field */}
                <div>
                  <Skeleton height="20px" width="100px" className="mb-2" />
                  <Skeleton height="150px" className="rounded-lg" />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Skeleton height="48px" width="200px" className="rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

