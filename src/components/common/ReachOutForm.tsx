import React, { useState, useMemo, useCallback } from 'react';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  product: string;
  message: string;
}

interface ReachOutFormProps {
  title?: string;
  email: string;
  phone: string;
  phone2?: string;
  whatsapp: string;
  whatsapp2?: string;
  address: string;
  onSubmit?: (formData: FormData) => void;
  language?: 'eng' | 'ger';
}

const ReachOutFormComponent: React.FC<ReachOutFormProps> = ({
  title = "Let's connect",
  email,
  phone,
  phone2,
  whatsapp,
  whatsapp2,
  address,
  onSubmit,
  language = 'eng',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    product: '',
    message: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  }, [formData, onSubmit]);

  // Memoize product options to avoid recreation
  const productOptions = useMemo(() => [
    'Whole Spices',
    'Ground Spices',
    'Spice Blends',
    'Organic Spices',
    'Processed Spices',
    'Other',
  ], []);

  // Memoize contact methods to avoid recreation
  const contactMethods = useMemo(() => {
    const methods: Array<{
      icon: React.ReactNode;
      title: string;
      value: string | Array<{ value: string; href: string }>;
      href?: string;
    }> = [
      {
        icon: <Mail className="h-6 w-6" />,
        title: language === 'eng' ? 'Email' : 'E-Mail',
        value: email,
        href: `mailto:${email}`,
      },
    ];

    // Add phone numbers - both with single icon
    const phoneNumbers: Array<{ value: string; href: string }> = [
      { value: phone, href: `tel:${phone.replace(/\s/g, '')}` }
    ];
    if (phone2) {
      phoneNumbers.push({ value: phone2, href: `tel:${phone2.replace(/\s/g, '')}` });
    }
    methods.push({
      icon: <Phone className="h-6 w-6" />,
      title: language === 'eng' ? 'Phone' : 'Telefon',
      value: phoneNumbers,
    });

    // Add WhatsApp numbers - both with single icon
    const whatsappNumbers: Array<{ value: string; href: string }> = [
      { value: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` }
    ];
    if (whatsapp2) {
      whatsappNumbers.push({ value: whatsapp2, href: `https://wa.me/${whatsapp2.replace(/\D/g, '')}` });
    }
    methods.push({
      icon: <MessageCircle className="h-6 w-6" />,
      title: language === 'eng' ? 'WhatsApp' : 'WhatsApp',
      value: whatsappNumbers,
    });

    // Add address
    methods.push({
      icon: <MapPin className="h-6 w-6" />,
      title: language === 'eng' ? 'Address' : 'Adresse',
      value: address,
    });

    return methods;
  }, [language, email, phone, phone2, whatsapp, whatsapp2, address]);

  return (
    <div className="grid lg:grid-cols-5 gap-6 sm:gap-8">
      {/* Left Column - Contact Info */}
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        <div>
          <h3 className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-2">
            {language === 'eng' ? 'Contact' : 'Kontakt'}
          </h3>
          <h2 className="text-gray-800 dark:text-white text-2xl sm:text-3xl font-bold">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-slate-400 mt-2 sm:mt-3 text-sm sm:text-base">
            {language === 'eng'
              ? "We're here to help and answer any question you might have. We look forward to hearing from you."
              : 'Wir sind hier, um zu helfen und alle Ihre Fragen zu beantworten. Wir freuen uns auf Ihre Nachricht.'}
          </p>
        </div>

        <div className="space-y-4">
          {contactMethods.map((method, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              <div className="flex-none w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-primary-600 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 transition-colors">
                {method.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">{method.title}</p>
                {Array.isArray(method.value) ? (
                  <div className="flex flex-col gap-1">
                    {method.value.map((item, itemIdx) => (
                      <a
                        key={itemIdx}
                        href={item.href}
                        className="text-gray-600 dark:text-slate-400 hover:text-primary-600 transition-colors"
                      >
                        {item.value}
                      </a>
                    ))}
                  </div>
                ) : method.href ? (
                  <a
                    href={method.href}
                    className="text-gray-600 dark:text-slate-400 hover:text-primary-600 transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-gray-600 dark:text-slate-400">{method.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Contact Form Card */}
      <div className="lg:col-span-3">
        <div className="bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 relative overflow-hidden transition-colors">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-50 rounded-tr-full opacity-20" />

          <div className="relative z-10">
            <h3 className="text-gray-800 dark:text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              {language === 'eng' ? "Send us a message" : "Senden Sie uns eine Nachricht"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'eng' ? 'Name' : 'Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? 'Your name' : 'Ihr Name'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'eng' ? 'Email' : 'E-Mail'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? 'your@email.com' : 'ihre@email.com'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'eng' ? 'Company' : 'Firma'}
                  </label>
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? 'Your company' : 'Ihre Firma'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {language === 'eng' ? 'Phone' : 'Telefon'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? '+1 234 567 890' : '+49 123 456789'}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'eng' ? 'Product interest' : 'Produktinteresse'}
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">{language === 'eng' ? 'Select a product' : 'Produkt auswählen'}</option>
                  {productOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'eng' ? 'Message' : 'Nachricht'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={language === 'eng' ? 'Tell us about your project...' : 'Erzählen Sie uns von Ihrem Projekt...'}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 active:bg-primary-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {language === 'eng' ? 'Send Message' : 'Nachricht senden'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize component
export const ReachOutForm = React.memo(ReachOutFormComponent);
