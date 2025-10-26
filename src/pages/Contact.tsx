import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { MapPin, Mail, Phone, MessageCircle, ChevronDown } from 'lucide-react';

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
    phone: { title: string; value: string };
    whatsapp: { title: string; value: string };
  };
  productOptions: string[];
  map: {
    backgroundImage: string;
  };
}

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const content = getPageTranslations('contact', language) as unknown as ContactContent;
  const { hero, form, contactInfo, productOptions, map } = content;

  // Format phone number for WhatsApp (remove all non-digits)
  const whatsappNumber = contactInfo.whatsapp.value.replace(/\D/g, '');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Dropdown state for product field
  const [isProductFocused, setIsProductFocused] = useState(false);

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Generate WhatsApp message with form data
  const generateWhatsAppMessage = () => {
    const message = `${form.defaultWhatsAppMessage}

Name: ${formData.name || 'Not provided'}
Company: ${formData.company || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Product: ${formData.product || 'Not provided'}

Message: ${formData.message || 'No message provided'}

Please contact me for more information. Thank you!`;
    
    return encodeURIComponent(message);
  };

  // Handle WhatsApp click with validation
  const handleWhatsAppClick = () => {
    if (!validateForm()) {
      return;
    }

    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          {/* Left Column - Contact Info */}
          <div className="max-w-lg space-y-3">
            <h3 className="text-primary-600 font-semibold">
              {language === 'eng' ? 'Contact' : 'Kontakt'}
            </h3>
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              {hero.title}
            </h3>
            <p>
              {hero.subtitle}
            </p>
            
            {/* Contact Methods */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-none text-primary-500 mt-1">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{contactInfo.email.title}</p>
                  <a
                    href={`mailto:${contactInfo.email.value}`}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {contactInfo.email.value}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-none text-primary-500 mt-1">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{contactInfo.phone.title}</p>
                  <a
                    href={`tel:${contactInfo.phone.value}`}
                    className="text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {contactInfo.phone.value}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-none text-primary-500 mt-1">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{contactInfo.whatsapp.title}</p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-gray-600 hover:text-primary-600 transition-colors text-left"
                  >
                    {contactInfo.whatsapp.value}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-none text-primary-500 mt-1">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{contactInfo.address.title}</p>
                  <p className="text-gray-600">{contactInfo.address.value}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8">
              <div
                className="w-full bg-center bg-no-repeat rounded-lg bg-cover h-[200px] shadow-md"
                style={{ backgroundImage: `url(${map.backgroundImage})` }}
              />
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8">
              <h2 className="text-gray-800 text-2xl font-semibold mb-6">{form.title}</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleWhatsAppClick(); }} className="space-y-5">
              <div>
                <label className="font-medium text-gray-700">
                  {form.fields.name.label} <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={form.fields.name.placeholder}
                  className="w-full mt-2 px-4 py-3 text-gray-600 bg-transparent outline-none border border-gray-300 focus:border-primary-600 shadow-sm rounded-lg transition-colors"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  {form.fields.email.label} <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={form.fields.email.placeholder}
                  className="w-full mt-2 px-4 py-3 text-gray-600 bg-transparent outline-none border border-gray-300 focus:border-primary-600 shadow-sm rounded-lg transition-colors"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  {form.fields.company.label}
                </label>
                <input
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={form.fields.company.placeholder}
                  className="w-full mt-2 px-4 py-3 text-gray-600 bg-transparent outline-none border border-gray-300 focus:border-primary-600 shadow-sm rounded-lg transition-colors"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  {form.fields.phone.label} <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={form.fields.phone.placeholder}
                  className="w-full mt-2 px-4 py-3 text-gray-600 bg-transparent outline-none border border-gray-300 focus:border-primary-600 shadow-sm rounded-lg transition-colors"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Product */}
              <div>
                <label className="font-medium text-gray-700">
                  {form.fields.product.label}
                </label>
                <div className="relative mt-2">
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleInputChange}
                    onFocus={() => setIsProductFocused(true)}
                    onBlur={() => setIsProductFocused(false)}
                    className="appearance-none w-full px-4 py-3 text-gray-600 bg-transparent outline-none border border-gray-300 focus:border-primary-600 shadow-sm rounded-lg cursor-pointer"
                  >
                    <option value="">{form.fields.product.placeholder}</option>
                    {productOptions.map((option: string) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown 
                    className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none transition-all duration-300 ${
                      isProductFocused ? 'text-primary-600 rotate-180' : ''
                    }`} 
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-medium text-gray-700">
                  {form.fields.message.label}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={form.fields.message.placeholder}
                  rows={6}
                  className="w-full mt-2 px-4 py-3 text-gray-600 bg-transparent outline-none border border-gray-300 focus:border-primary-600 shadow-sm rounded-lg resize-none appearance-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 text-white font-medium bg-primary-600 hover:bg-primary-500 active:bg-primary-600 rounded-lg duration-150"
              >
                {form.whatsappText}
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
