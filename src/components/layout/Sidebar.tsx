import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Info, Package, Award, Phone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/useLanguage';
import { useTheme } from '../../contexts/useTheme';
import { Button } from '../common/Button';
import { getCompanyInfo } from '../../config/glob';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const companyInfo = getCompanyInfo();

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  // Icon mapping for navigation items
  const getNavigationIcon = (name: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      'Home': Home,
      'About': Info,
      'Products': Package,
      'Certifications': Award,
      'Contact': Phone,
    };
    return iconMap[name] || Home;
  };

  // Get navigation items from translations
  const navigationItems = (translations?.navigation?.items || []) as Array<{ name: string; href: string }>;

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Close sidebar on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  return (
    <>
      {/* Backdrop/Overlay */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-80 sm:w-96 max-w-[85vw] bg-gradient-to-b from-white via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Decorative Top Border */}
        <div className="h-1 bg-gradient-to-r from-primary-500 via-orange-500 to-amber-500"></div>

        {/* Sidebar Header */}
        <div className="relative px-6 pt-6 pb-4">
          {/* Close Button - Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo and Brand */}
          <Link to="/" onClick={onClose} className="block">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-primary-500">
                <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  {companyInfo.name}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Premium Spices Worldwide
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-2">
          <div className="space-y-1">
            {navigationItems.map((item, index) => {
              const IconComponent = getNavigationIcon(item.name);
              const isActive = isActiveRoute(item.href);
              
              return (
                <div
                  key={item.name}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`opacity-0 ${isOpen ? 'opacity-100' : ''} transition-opacity duration-300`}
                >
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-primary-500/10 to-orange-50 dark:from-primary-500/20 dark:to-orange-900/20 text-primary-500 shadow-sm border border-primary-500/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:translate-x-1'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary-500/10 text-primary-500' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-primary-500/10 group-hover:text-primary-500'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-all duration-200 ${
                      isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1'
                    }`} />
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Get Quote Button */}
        <div className="relative px-4 py-4 mb-2 z-10">
          <Link
            to="/contact"
            onClick={onClose}
            className="group flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] relative z-10 text-white font-semibold text-base"
            style={{
              background: 'linear-gradient(to right, #ec7513, #ea580c)',
            }}
          >
            <Phone className="h-5 w-5" />
            <span>{language === 'eng' ? 'Get a Quote' : 'Angebot anfordern'}</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Settings Section */}
        <div className="relative px-4 py-6 mt-2 pt-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/80 to-orange-50/30 dark:from-gray-800/50 dark:to-gray-900/30">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-2">
            {language === 'eng' ? 'Settings' : 'Einstellungen'}
          </h3>
          <div className="space-y-3">
            {/* Language Toggle */}
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {language === 'eng' ? 'Language' : 'Sprache'}
                </span>
              </div>
              <Button
                onClick={() => setLanguage(language === 'eng' ? 'ger' : 'eng')}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {language === 'eng' ? 'DE' : 'EN'}
              </Button>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-200/80 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {language === 'eng' ? 'Theme' : 'Design'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-6 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
              {language === 'eng' ? 'Delivering Quality Worldwide' : 'Qualität weltweit liefern'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} {companyInfo.name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

