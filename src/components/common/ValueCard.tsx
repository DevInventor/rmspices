import React, { ReactNode } from 'react';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex-col transition-colors">
      <div className="text-primary-500">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-bold leading-tight text-gray-900 dark:text-white">{title}</h2>
        <p className="text-spice-300 dark:text-slate-400 text-sm font-normal leading-normal">{description}</p>
      </div>
    </div>
  );
};

