import React from 'react';
import { Phone } from 'lucide-react';
import { getCompanyContact } from '../../config/glob';

export const FloatingCallButton: React.FC = () => {
  const contact = getCompanyContact();

  const handleButtonClick = () => {
    // Clean the phone number and open call
    const cleanNumber = contact.phone.primary.replace(/\s/g, '');
    window.location.href = `tel:${cleanNumber}`;
  };

  return (
    <button
      onClick={handleButtonClick}
      className="fixed bottom-28 left-6 z-50 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center group"
      aria-label="Call us"
    >
      {/* Phone Icon */}
      <Phone className="w-6 h-6" />
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-0 mb-2 px-3 py-1 bg-gray-800 dark:bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Call us now
        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800 dark:border-t-slate-900"></div>
      </div>
    </button>
  );
};

