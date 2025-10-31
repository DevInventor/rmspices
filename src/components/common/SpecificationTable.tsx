import React, { useMemo, useCallback } from 'react';

interface SpecificationTableProps {
  data: Record<string, unknown>;
  language?: 'eng' | 'ger';
}

const SpecificationTableComponent: React.FC<SpecificationTableProps> = ({ data, language = 'eng' }) => {
  // Memoize helper functions
  const renderValue = useCallback((value: unknown): string => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value || '');
  }, []);

  const formatKey = useCallback((key: string): string => {
    // Replace underscores with spaces, convert camelCase to Title Case
    return key
      .replace(/_/g, ' ')  // Replace underscores with spaces
      .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }, []);

  // Memoize entries to avoid recalculation
  const entries = useMemo(() => {
    if (!data || Object.keys(data).length === 0) return [];
    return Object.entries(data);
  }, [data]);

  if (entries.length === 0) {
    return (
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-center p-8 sm:p-12 border border-spice-100 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900">
          <p className="text-spice-300 dark:text-slate-400 text-sm sm:text-base text-center">
            {language === 'eng' ? 'No specifications available' : 'Keine Spezifikationen verfügbar'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
      <div className="overflow-hidden rounded-lg md:rounded-xl border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="hidden sm:table-header-group bg-gray-50 dark:bg-slate-800 border-b-2 border-spice-200 dark:border-slate-700">
              <tr>
                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-left text-gray-900 dark:text-white text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide">
                  {language === 'eng' ? 'Parameter' : 'Parameter'}
                </th>
                <th className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-left text-gray-900 dark:text-white text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wide">
                  {language === 'eng' ? 'Specification' : 'Spezifikation'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-spice-100 dark:divide-slate-700">
              {entries.map(([key, value], index) => (
                <tr 
                  key={key} 
                  className={`block sm:table-row hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors ${
                    index === 0 ? 'sm:border-t-0' : ''
                  }`}
                >
                  <td className="block sm:table-cell px-4 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 text-gray-700 dark:text-slate-300 text-xs sm:text-sm md:text-base font-semibold sm:font-medium whitespace-normal sm:whitespace-nowrap break-words sm:break-normal">
                    <div className="flex flex-col sm:block">
                      <span className="inline-block sm:hidden text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1.5">
                        {language === 'eng' ? 'Parameter' : 'Parameter'}:
                      </span>
                      <span className="sm:inline">{formatKey(key)}</span>
                    </div>
                  </td>
                  <td className="block sm:table-cell px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-spice-400 dark:text-slate-400 text-xs sm:text-sm md:text-base font-normal break-words sm:break-normal mt-1 sm:mt-0">
                    <div className="flex flex-col sm:block">
                      <span className="inline-block sm:hidden text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1.5">
                        {language === 'eng' ? 'Specification' : 'Spezifikation'}:
                      </span>
                      <span className="sm:inline">{renderValue(value)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Memoize component
export const SpecificationTable = React.memo(SpecificationTableComponent);
