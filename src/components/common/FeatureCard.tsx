import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconColor?: 'primary' | 'red' | 'green';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  iconColor = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-primary-500/5 border-primary-500/20 bg-primary-500',
    red: 'bg-red-500/5 border-red-500/20 bg-red-500',
    green: 'bg-green-500/5 border-green-500/20 bg-green-600'
  };

  return (
    <div className={`${colorClasses[iconColor]} border rounded-xl p-6 transition-colors`}>
      <div className="flex items-start gap-4">
        <div className={`${iconColor === 'primary' ? 'bg-primary-500' : iconColor === 'red' ? 'bg-red-500' : 'bg-green-600'} p-3 rounded-lg`}>
          <div className="h-6 w-6 text-white">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

