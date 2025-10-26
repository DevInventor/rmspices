import React from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { getPageTranslations } from '../utils/translations';
import { Shield, Users, Leaf } from 'lucide-react';
import { cn } from '../utils';
import { ValueCard } from '../components/common/ValueCard';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface AboutContent {
  hero: {
    title: string;
    backgroundImage: string;
  };
  intro: {
    title: string;
    description: string;
  };
  timeline: {
    title: string;
    items: TimelineItem[];
  };
  values: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  team: {
    title: string;
    members: TeamMember[];
  };
}

export const About: React.FC = () => {
  const { language } = useLanguage();
  const content = getPageTranslations('about', language) as unknown as AboutContent;
  const { hero, intro, timeline, values, team } = content;
  
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      ShieldCheck: <Shield size={24} />,
      Users: <Users size={24} />,
      Leaf: <Leaf size={24} />,
    };
    return icons[iconName] || <Shield size={24} />;
  };
  
  return (
    <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        {/* Hero */}
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white dark:bg-slate-900 rounded-lg min-h-[150px] sm:min-h-[180px] md:min-h-[218px] transition-colors"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url(${hero.backgroundImage})`,
          }}
        >
          <div className="flex p-3 sm:p-4">
            <p className="text-white tracking-light text-xl sm:text-2xl md:text-[28px] font-bold leading-tight">
              {hero.title}
            </p>
          </div>
        </div>
        
        {/* Intro */}
        <h2 className="tracking-light text-xl sm:text-2xl md:text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5 text-gray-900 dark:text-white">
          {intro.title}
        </h2>
        <p className="text-sm sm:text-base font-normal leading-normal pb-3 pt-1 px-4 text-gray-600 dark:text-slate-400">
          {intro.description}
        </p>
        
        {/* Timeline */}
        <h2 className="text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5 text-gray-900 dark:text-white">
          {timeline.title}
        </h2>
        <div className="grid grid-cols-[40px_1fr] gap-x-2 sm:gap-x-3 px-4">
          {timeline.items.map((item, index: number) => (
            <React.Fragment key={index}>
              <div className={cn(
                'flex flex-col items-center gap-1',
                index === 0 ? 'pt-3' : '',
                index === timeline.items.length - 1 ? 'pb-3' : ''
              )}>
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-6 h-6"
                  style={{
                    backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuCKuIV9Hj1YxAYWjw9JxrLH7hsP5GW8OWvyaJoWdecxS9vFnGQJk8HbuFMFRuZZRcOlwwEMH-mUoBFnnZsAUBHp8CJkNGV4JXnNAfZqCPQN5QAyYzXhOuDOGLMYcLBg76faVEL-eAl9PgE7XXcIK9Anqcb4XQnrRhRYry49R--nFHKq0yMRzZS_nQI3A6dMNWYKUVHKqZ9znSV1zJtfg7rbhOLsVbngOKzbaudxbuXHMRvqZQVMwp8Zz_If_3rGW5x2mUl1hGCSWcw)`,
                  }}
                />
                {index < timeline.items.length - 1 && (
                  <div className="w-[1.5px] bg-spice-200 dark:bg-slate-800 h-2 grow transition-colors"></div>
                )}
              </div>
              <div className={cn('flex flex-1 flex-col', index === 0 ? 'py-3' : index === timeline.items.length - 1 ? 'py-3' : 'py-3')}>
                <p className="text-sm sm:text-base font-medium leading-normal text-gray-900 dark:text-white">{item.year}: {item.title}</p>
                <p className="text-spice-300 dark:text-slate-400 text-sm sm:text-base font-normal leading-normal">{item.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {/* Values */}
        <h2 className="text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5 text-gray-900 dark:text-white">
          {values.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {values.items.map((item, index: number) => (
            <ValueCard
              key={index}
              icon={getIcon(item.icon)}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        
        {/* Team */}
        <h2 className="text-lg sm:text-xl md:text-[22px] font-bold leading-tight tracking-tight px-4 pb-3 pt-5 text-gray-900 dark:text-white">
          {team.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4">
          {team.members.map((member, index: number) => (
            <div key={index} className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
              </div>
              <div>
                <p className="text-base font-medium leading-normal text-gray-900 dark:text-white">{member.name}</p>
                <p className="text-spice-300 dark:text-slate-400 text-sm font-normal leading-normal">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

