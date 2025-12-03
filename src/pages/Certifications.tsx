import React from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { getPageTranslations } from '../utils/translations';
import { Shield, X } from 'lucide-react';
import { QualityAssuranceCard } from '../components/common/QualityAssuranceCard';
import { normalizePath } from '../utils';

interface CertificationItem {
  name: string;
  description: string;
  image: string;
}

interface CertificationsContent {
  title: string;
  description: string;
  exportCertifications: {
    title: string;
    items: CertificationItem[];
  };
  qualityAssurance: {
    title: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
}

export const Certifications: React.FC = () => {
  const { language } = useLanguage();
  const content = getPageTranslations('certifications', language) as unknown as CertificationsContent;
  const { title, description, exportCertifications, qualityAssurance } = content;
  const [previewImageUrl, setPreviewImageUrl] = React.useState<string | null>(null);
  
  const getIcon = (iconName: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      ShieldCheck: <Shield size={24} />,
      Flask: <Shield size={24} />,
      Plant: <Shield size={24} />,
    };
    return icons[iconName] || <Shield size={24} />;
  };
  
  const openPreview = (imageUrl: string) => {
    setPreviewImageUrl(normalizePath(imageUrl));
  };

  const closePreview = () => {
    setPreviewImageUrl(null);
  };
  
  return (
    <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="tracking-light text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight w-full sm:min-w-72 text-gray-900 dark:text-white">{title}</p>
        </div>
        <p className="text-sm sm:text-base font-normal leading-normal pb-3 pt-1 px-4 text-gray-600 dark:text-slate-400">{description}</p>
        
        {/* Export Certifications */}
        <h2 className="text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5 text-gray-900 dark:text-white">
          {exportCertifications.title}
        </h2>
        
        {/* Mobile: 2 columns, Desktop: 3-4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4">
          {exportCertifications.items.map((item, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => openPreview(item.image)}
              className="group flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-lg sm:rounded-xl hover:shadow-lg hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              aria-label={`Open ${item.name} preview`}
            >
              {/* Certification Image - Responsive sizing */}
              <div className="w-full aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center p-2 sm:p-3">
                <img
                  src={normalizePath(item.image)}
                  alt={`${item.name} Certification`}
                  title={`${item.name} Certification - ${item.description}`}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f97316" width="200" height="200" rx="20"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="white" font-weight="bold"%3E%E2%9C%93%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              
              {/* Certification Info */}
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-base font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-spice-300 dark:text-slate-400 font-normal leading-normal line-clamp-2 sm:line-clamp-3">
                  {item.description}
                </p>
              </div>
              
              {/* View Indicator - Hidden on mobile, shown on desktop */}
              <div className="hidden sm:flex items-center gap-1 text-primary-500 text-xs font-medium mt-1">
                <span>View Certificate</span>
                <span>→</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Quality Assurance */}
        <h2 className="text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5 text-gray-900 dark:text-white">
          {qualityAssurance.title}
        </h2>
        <p className="text-sm sm:text-base font-normal leading-normal pb-3 pt-1 px-4 text-gray-600 dark:text-slate-400">
          {qualityAssurance.description}
        </p>
        
        <div className="flex flex-col gap-2 px-4">
          {qualityAssurance.items.map((item, index: number) => (
            <QualityAssuranceCard
              key={index}
              icon={getIcon(item.icon)}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      {/* Certificate Preview Modal - Enhanced for mobile and desktop */}
      {previewImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/90 p-2 sm:p-4"
          role="dialog"
          aria-modal="true"
          onClick={closePreview}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] sm:max-h-[95vh] bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Responsive positioning */}
            <button
              type="button"
              onClick={closePreview}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 dark:bg-black/70 dark:hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors duration-300 shadow-lg"
              aria-label="Close preview"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
            
            {/* Certificate Image - Responsive sizing */}
            <div className="overflow-auto max-h-[90vh] sm:max-h-[95vh]">
              <img
                src={previewImageUrl || ''}
                alt="Certification preview"
                title="Certification Document - RM Spices Quality Standards"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f97316" width="200" height="200" rx="20"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="white" font-weight="bold"%3E%E2%9C%93%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
