import React from 'react';
import { Skeleton } from '../common/Skeleton';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-4 sm:py-6 md:py-8">
      <div className="container-fluid max-w-[1200px] mx-auto px-2 sm:px-4 md:px-6">
        {/* Breadcrumb Skeleton */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6 md:mb-8">
          <Skeleton height="16px" width="100px" />
          <Skeleton height="16px" width="20px" />
          <Skeleton height="16px" width="150px" />
        </div>

        {/* Hero Section Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="h-[250px] sm:h-[300px] md:h-[400px]">
            <Skeleton height="100%" className="rounded-xl" />
          </div>
        </div>

        {/* Product Overview Card Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="bg-spice-50 dark:bg-slate-900 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div>
                <Skeleton height="32px" className="mb-3 sm:mb-4" />
                <Skeleton height="24px" className="mb-2" />
                <Skeleton height="16px" className="mb-1" />
                <Skeleton height="16px" width="90%" />
              </div>
              <div className="h-[200px] sm:h-[250px] md:h-[300px]">
                <Skeleton height="100%" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details and Highlights Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16 grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            <Skeleton height="28px" className="mb-4" />
            <div className="space-y-4">
              <Skeleton height="60px" className="rounded-lg" />
              <Skeleton height="60px" className="rounded-lg" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 md:p-8">
            <Skeleton height="28px" className="mb-4 sm:mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex justify-between py-3 border-b border-spice-100 dark:border-slate-800">
                  <Skeleton height="16px" width="100px" />
                  <Skeleton height="16px" width="80px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Specifications Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16 grid lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="lg:col-span-3">
            <Skeleton height="28px" className="mb-4 sm:mb-6" />
            <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl overflow-hidden">
              {/* Tabs Skeleton */}
              <div className="flex gap-2 p-4 border-b border-spice-200 dark:border-slate-800">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} height="40px" width="120px" className="rounded-lg" />
                ))}
              </div>
              {/* Table Skeleton */}
              <div className="p-4 sm:p-6 space-y-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-spice-100 dark:border-slate-800">
                    <Skeleton height="16px" width="150px" />
                    <Skeleton height="16px" width="100px" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Usage & Benefits Skeleton */}
          <div className="lg:col-span-2 mt-4 sm:mt-0">
            <Skeleton height="28px" className="mb-4 sm:mb-6" />
            <div className="space-y-6">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 dark:border-primary-500/30 rounded-xl p-4 sm:p-6">
                  <Skeleton height="24px" className="mb-2" />
                  <Skeleton height="16px" className="mb-1" />
                  <Skeleton height="16px" width="90%" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-primary-500/10 to-spice-50 dark:from-primary-500/5 dark:to-slate-900 rounded-xl p-6 sm:p-8 md:p-12">
            <div className="text-center">
              <Skeleton height="40px" className="mb-3 sm:mb-4 mx-auto max-w-md" />
              <Skeleton height="48px" width="250px" className="mx-auto rounded-lg" />
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <Skeleton height="32px" className="mb-4 sm:mb-6 max-w-[200px]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-3 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4">
                <Skeleton height="200px" className="rounded-lg" />
                <Skeleton height="20px" className="mb-2" />
                <Skeleton height="16px" width="80%" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

