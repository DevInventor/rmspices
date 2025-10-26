import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { Button } from '../components/common/Button';
import { Shield } from 'lucide-react';

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
  
  const getIcon = (iconName: string): React.ReactNode => {
    const icons: Record<string, React.ReactNode> = {
      ShieldCheck: <Shield size={24} />,
      Flask: <Shield size={24} />,
      Plant: <Shield size={24} />,
    };
    return icons[iconName] || <Shield size={24} />;
  };
  
  return (
    <div className="px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="tracking-light text-[32px] font-bold leading-tight min-w-72">{title}</p>
        </div>
        <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">{description}</p>
        
        {/* Export Certifications */}
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {exportCertifications.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 p-4">
          {exportCertifications.items.map((item, index: number) => (
            <div key={index} className="flex flex-col gap-3 pb-3">
              <div
                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div>
                <p className="text-base font-medium leading-normal">{item.name}</p>
                <p className="text-spice-300 text-sm font-normal leading-normal">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <Button variant="secondary">
              Download
            </Button>
            <Button variant="primary">
              View
            </Button>
          </div>
        </div>
        
        {/* Quality Assurance */}
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {qualityAssurance.title}
        </h2>
        <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
          {qualityAssurance.description}
        </p>
        
        <div className="flex flex-col gap-2 px-4">
          {qualityAssurance.items.map((item, index: number) => (
            <div key={index} className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div className="text-primary-500 flex items-center justify-center rounded-lg bg-spice-100 shrink-0 w-12 h-12">
                {getIcon(item.icon)}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-base font-medium leading-normal line-clamp-1">{item.title}</p>
                <p className="text-spice-300 text-sm font-normal leading-normal line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
