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
        className="flex gap-2 px-2 sm:px-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        role="tablist"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative inline-flex items-center px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold rounded-t-lg transition-all duration-200 whitespace-nowrap border-2 border-b-0 snap-start ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-primary-600 border-primary-500 shadow-md z-10'
                : 'bg-transparent text-gray-600 dark:text-slate-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Memoize component
export const Tabs = React.memo(TabsComponent);