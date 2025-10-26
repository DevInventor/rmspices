import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

interface ReachOutFormProps {
  title?: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  onSubmit?: (formData: FormData) => void;
  language?: 'eng' | 'ger';
}

export const ReachOutForm: React.FC<ReachOutFormProps> = ({
  title = "Let's connect",
  email,
  phone,
  whatsapp,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const productOptions = [
    'Whole Spices',
    'Ground Spices',
    'Spice Blends',
    'Organic Spices',
    'Processed Spices',
    'Other',
  ];

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: language === 'eng' ? 'Email' : 'E-Mail',
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: language === 'eng' ? 'Phone' : 'Telefon',
      value: phone,
      href: `tel:${phone}`,
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: language === 'eng' ? 'WhatsApp' : 'WhatsApp',
      value: whatsapp,
      href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: language === 'eng' ? 'Address' : 'Adresse',
      value: address,
    },
  ];

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left Column - Contact Info */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h3 className="text-primary-600 font-semibold text-sm uppercase tracking-wide mb-2">
            {language === 'eng' ? 'Contact' : 'Kontakt'}
          </h3>
          <h2 className="text-gray-800 text-3xl font-bold">
            {title}
          </h2>
          <p className="text-gray-600 mt-3">
            {language === 'eng'
              ? "We're here to help and answer any question you might have. We look forward to hearing from you."
              : 'Wir sind hier, um zu helfen und alle Ihre Fragen zu beantworten. Wir freuen uns auf Ihre Nachricht.'}
          </p>
        </div>

        <div className="space-y-4">
          {contactMethods.map((method, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              <div className="flex-none w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-primary-600 group-hover:bg-primary-50 transition-colors">
                {method.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800 mb-1">{method.title}</p>
                {method.href ? (
                  <a
                    href={method.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-gray-600">{method.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Contact Form Card */}
      <div className="lg:col-span-3">
        <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-xl p-8 relative overflow-hidden">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-bl-full opacity-30" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-50 rounded-tr-full opacity-20" />

          <div className="relative z-10">
            <h3 className="text-gray-800 text-2xl font-bold mb-6">
              {language === 'eng' ? "Send us a message" : "Senden Sie uns eine Nachricht"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'eng' ? 'Name' : 'Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? 'Your name' : 'Ihr Name'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'eng' ? 'Email' : 'E-Mail'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? 'your@email.com' : 'ihre@email.com'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'eng' ? 'Company' : 'Firma'}
                  </label>
                  <input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? 'Your company' : 'Ihre Firma'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'eng' ? 'Phone' : 'Telefon'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={language === 'eng' ? '+1 234 567 890' : '+49 123 456789'}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'eng' ? 'Product interest' : 'Produktinteresse'}
                </label>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">{language === 'eng' ? 'Select a product' : 'Produkt auswählen'}</option>
                  {productOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'eng' ? 'Message' : 'Nachricht'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={language === 'eng' ? 'Tell us about your project...' : 'Erzählen Sie uns von Ihrem Projekt...'}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition-all resize-none"
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

