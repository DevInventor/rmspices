import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { Shield, Users, Leaf } from 'lucide-react';
import { cn } from '../utils';

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
    <div className="px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        {/* Hero */}
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white rounded-lg min-h-[218px]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url(${hero.backgroundImage})`,
          }}
        >
          <div className="flex p-4">
            <p className="text-white tracking-light text-[28px] font-bold leading-tight">
              {hero.title}
            </p>
          </div>
        </div>
        
        {/* Intro */}
        <h2 className="tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">
          {intro.title}
        </h2>
        <p className="text-base font-normal leading-normal pb-3 pt-1 px-4">
          {intro.description}
        </p>
        
        {/* Timeline */}
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {timeline.title}
        </h2>
        <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
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
                  <div className="w-[1.5px] bg-spice-200 h-2 grow"></div>
                )}
              </div>
              <div className={cn('flex flex-1 flex-col', index === 0 ? 'py-3' : index === timeline.items.length - 1 ? 'py-3' : 'py-3')}>
                <p className="text-base font-medium leading-normal">{item.year}: {item.title}</p>
                <p className="text-spice-300 text-base font-normal leading-normal">{item.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        
        {/* Values */}
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {values.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
          {values.items.map((item, index: number) => (
            <div key={index} className="flex flex-1 gap-3 rounded-lg border border-spice-200 bg-white p-4 flex-col">
              <div className="text-primary-500">
                {getIcon(item.icon)}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-base font-bold leading-tight">{item.title}</h2>
                <p className="text-spice-300 text-sm font-normal leading-normal">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Team */}
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          {team.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">
          {team.members.map((member, index: number) => (
            <div key={index} className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
                  style={{ backgroundImage: `url(${member.image})` }}
                />
              </div>
              <div>
                <p className="text-base font-medium leading-normal">{member.name}</p>
                <p className="text-spice-300 text-sm font-normal leading-normal">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

