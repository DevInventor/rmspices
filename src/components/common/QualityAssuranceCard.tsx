import React, { ReactNode } from 'react';

interface QualityAssuranceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const QualityAssuranceCard: React.FC<QualityAssuranceCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-4 min-h-[72px] py-2 rounded-lg transition-colors">
      <div className="text-primary-500 dark:text-primary-400 flex items-center justify-center rounded-lg bg-spice-100 dark:bg-slate-800 shrink-0 w-12 h-12 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-base font-medium leading-normal text-gray-900 dark:text-white line-clamp-1">{title}</p>
        <p className="text-spice-300 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};

