import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { 
  getCompanyInfo, 
  getCompanyContact, 
  getCompanySocialMedia 
} from '../../config/glob';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About Us', href: '/about' },
  { name: 'Certifications', href: '/certifications' },
];

const supportLinks = [
  { name: 'Contact Us', href: '/contact' },
  { name: 'FAQs', href: '/faq' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  const companyInfo = getCompanyInfo();
  const contact = getCompanyContact();
  const socialMedia = getCompanySocialMedia();

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I am interested in RM Spices products.');
    window.open(`${contact.whatsapp.url}?text=${message}`, '_blank');
  };
  
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {companyInfo.name}
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-md">
              {companyInfo.description}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a 
                href={socialMedia.facebook.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={socialMedia.facebook.ariaLabel}
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={socialMedia.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={socialMedia.linkedin.ariaLabel}
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={socialMedia.instagram.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={socialMedia.instagram.ariaLabel}
                className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500/10 hover:text-primary-500 transition-all duration-200 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              {language === 'eng' ? 'Quick Links' : 'Schnellzugriff'}
            </h3>
            <ul className="space-y-3 text-sm">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              {language === 'eng' ? 'Support' : 'Support'}
            </h3>
            <ul className="space-y-3 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              {language === 'eng' ? 'Get in Touch' : 'Kontakt'}
            </h3>
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppClick}
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#20BA5A] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{language === 'eng' ? 'Chat on WhatsApp' : 'Bei WhatsApp kontaktieren'}</span>
              </button>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                <p className="mb-1">
                  <span className="font-medium">Email:</span> {contact.email.primary}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {contact.phone.primary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} {companyInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
