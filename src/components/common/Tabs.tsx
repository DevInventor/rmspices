import React from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  language?: 'eng' | 'ger';
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, language = 'eng' }) => {
  return (
    <div className="border-b-2 border-spice-200 bg-gray-50">
      <div className="flex gap-2 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative inline-flex items-center px-6 py-3 text-sm font-semibold rounded-t-lg transition-all duration-200 whitespace-nowrap border-2 border-b-0 ${
              activeTab === tab.id
                ? 'bg-white text-primary-600 border-primary-500 shadow-md z-10'
                : 'bg-transparent text-gray-600 border-transparent hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

