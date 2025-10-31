import React, { useRef, useCallback } from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabsComponent: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current == null) return;
    const currentX = e.touches[0].clientX;
    touchDeltaXRef.current = currentX - touchStartXRef.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const threshold = 40; // pixels
    const delta = touchDeltaXRef.current;
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    if (Math.abs(delta) < threshold) return;
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex === -1) return;
    if (delta < 0 && currentIndex < tabs.length - 1) {
      onTabChange(tabs[currentIndex + 1].id);
    } else if (delta > 0 && currentIndex > 0) {
      onTabChange(tabs[currentIndex - 1].id);
    }
  }, [tabs, activeTab, onTabChange]);

  return (
    <div className="border-b-2 border-spice-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 transition-colors">
      <div
        className="flex flex-col md:flex-row gap-2 md:gap-0 md:gap-x-1 px-3 sm:px-4 md:px-6 py-2 md:py-0 overflow-x-auto overflow-y-hidden md:overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        role="tablist"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative inline-flex items-center justify-center md:justify-start w-full md:w-auto px-4 py-2.5 sm:py-3 md:px-5 md:py-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap snap-start rounded-lg md:rounded-t-lg md:rounded-b-none border-2 md:border-b-0 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900 hover:transition-colors active:scale-[0.98] md:active:scale-100 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 border-l-4 md:border-l-2 border-primary-500 shadow-sm md:shadow-md z-10 mb-0 md:mb-[-2px]'
                : 'bg-transparent text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 md:border-transparent hover:bg-gray-100 dark:hover:bg-slate-800 md:hover:bg-white/50 md:hover:border-gray-300 hover:text-gray-900 dark:hover:text-white md:hover:text-primary-500'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
          >
            <span className="text-center md:text-left">{tab.label}</span>
            {activeTab === tab.id && (
              <span className="absolute left-2 md:hidden w-2 h-2 rounded-full bg-primary-500" aria-hidden="true" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Memoize component
export const Tabs = React.memo(TabsComponent);