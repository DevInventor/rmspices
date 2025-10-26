import React from 'react';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { 
  getCompanyInfo, 
  getCompanyContact, 
  getCompanyBusinessHours, 
  getCompanySocialMedia 
} from '../../config/glob';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface SocialMediaItem {
  name: string;
  url: string;
  icon: string;
  ariaLabel: string;
}

export const TopbarBanner: React.FC = () => {
  const companyInfo = getCompanyInfo();
  const contact = getCompanyContact();
  const businessHours = getCompanyBusinessHours();
  const socialMedia = getCompanySocialMedia();

  // Icon mapping for dynamic icon rendering
  const iconMap: Record<string, LucideIcon> = {
    facebook: Facebook,
    instagram: Instagram,
    linkedin: Linkedin,
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contact.email.primary}`;
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I am interested in RM Spices products.');
    window.open(`${contact.whatsapp.url}?text=${message}`, '_blank');
  };

  const socialMediaArray = Object.values(socialMedia) as SocialMediaItem[];

  return (
    <div className="bg-slate-900 text-white py-2 px-4 text-xs">
      <div className="container-fluid">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Social Media Icons */}
          <div className="flex items-center gap-3">
            {socialMediaArray.map((social) => {
              const IconComponent = iconMap[social.icon];
              if (!IconComponent) return null;
              
              return (
                <a
                  key={social.icon}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="w-6 h-6 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all duration-200 rounded-full hover:bg-white/10 p-1"
                >
                  <IconComponent className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Center: Company Tagline */}
          <div className="hidden md:block flex-1 text-center px-4">
            <p className="text-white/90 font-medium tracking-wide">
              {companyInfo.tagline}
            </p>
          </div>

          {/* Right: Contact Details */}
          <div className="flex items-center gap-4">
            {/* Working Hours */}
            <div className="hidden lg:flex items-center gap-1.5 text-white/80">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{businessHours.display}</span>
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px h-4 bg-white/30"></div>

            {/* Email */}
            <button
              onClick={handleEmailClick}
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 group"
              aria-label={`Send email to ${contact.email.primary}`}
            >
              <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">{contact.email.primary}</span>
              <span className="md:hidden">Email</span>
            </button>

            {/* Separator */}
            <div className="hidden lg:block w-px h-4 bg-white/30"></div>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 group"
              aria-label={`Chat on WhatsApp: ${contact.whatsapp.number}`}
            >
              <MessageCircle className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
              <span className="hidden md:inline">{contact.whatsapp.number}</span>
              <span className="md:hidden">Chat</span>
            </button>
          </div>
        </div>

        {/* Mobile: Tagline and working hours below main content */}
        <div className="md:hidden mt-2 pt-2 border-t border-white/10 flex flex-col items-center gap-1">
          <p className="text-white/90 font-medium text-xs tracking-wide text-center">
            {companyInfo.tagline}
          </p>
          {businessHours.display && (
            <div className="flex items-center gap-1 text-white/70 text-xs">
              <Clock className="w-3 h-3" />
              <span>{businessHours.display}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
