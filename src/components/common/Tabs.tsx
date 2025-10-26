import React from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b-2 border-spice-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 transition-colors">
      <div className="flex gap-2 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative inline-flex items-center px-6 py-3 text-sm font-semibold rounded-t-lg transition-all duration-200 whitespace-nowrap border-2 border-b-0 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-800 text-primary-600 border-primary-500 shadow-md z-10'
                : 'bg-transparent text-gray-600 dark:text-slate-400 border-transparent hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};