import React from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { getPageTranslations } from '../utils/translations';
import { ReachOutForm } from '../components/common/ReachOutForm';

interface ContactContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  form: {
    title: string;
    fields: {
      name: { label: string; placeholder: string };
      company: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      product: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    whatsappText: string;
    defaultWhatsAppMessage: string;
  };
  contactInfo: {
    title: string;
    address: { title: string; value: string };
    email: { title: string; value: string };
    phone: { title: string; value1: string; value2?: string };
    whatsapp: { title: string; value?: string; value1?: string; value2?: string };
  };
  productOptions: string[];
  map: {
    backgroundImage: string;
  };
}

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const content = getPageTranslations('contact', language) as unknown as ContactContent;
  const { hero, contactInfo } = content;

  return (
    <div className="py-8 sm:py-12 md:py-14">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-gray-600 md:px-8">
        <ReachOutForm
          title={hero.title}
          email={contactInfo.email.value}
          phone={contactInfo.phone.value1}
          phone2={contactInfo.phone.value2}
          whatsapp={contactInfo.whatsapp.value || contactInfo.whatsapp.value1 || ''}
          whatsapp2={contactInfo.whatsapp.value2}
          address={contactInfo.address.value}
          language={language}
          onSubmit={(data) => {
            // Handle form submission with WhatsApp integration
            const whatsappNumber = (contactInfo.whatsapp.value || contactInfo.whatsapp.value1 || '').replace(/\D/g, '');
            const message = `Hello! I'm interested in your products.

Name: ${data.name || 'Not provided'}
Company: ${data.company || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Product: ${data.product || 'Not provided'}

Message: ${data.message || 'No message provided'}

Please contact me for more information. Thank you!`;
            
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
          }}
        />
      </div>
    </div>
  );
};
