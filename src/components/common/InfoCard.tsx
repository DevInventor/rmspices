import React from 'react';
import type { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  content,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-6 transition-colors ${className}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-primary-500">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
      {typeof content === 'string' ? (
        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{content}</p>
      ) : (
        <div className="text-gray-600 dark:text-slate-400">{content}</div>
      )}
    </div>
  );
};

