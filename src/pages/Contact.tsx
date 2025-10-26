import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

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
    <div className="px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        {/* Hero */}
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white rounded-lg min-h-[218px]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 25%), url(${hero.backgroundImage})`,
          }}
        >
          <div className="flex flex-col gap-1 p-4">
            <p className="text-white tracking-light text-[28px] font-bold leading-tight">
              {hero.title}
            </p>
            <p className="text-white/90 text-sm font-normal leading-normal max-w-2xl">
              {hero.subtitle}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 py-5">
          {/* Contact Form */}
          <div className="flex flex-col gap-4">
            <h2 className="tracking-light text-[28px] font-bold leading-tight px-4 text-left">{form.title}</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); handleWhatsAppClick(); }} className="flex flex-col gap-4 px-4">
              {/* Name */}
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal">
                  {form.fields.name.label} <span className="text-red-500">*</span>
                </p>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={form.fields.name.placeholder}
                  className="flex w-full rounded-lg text-spice-500 focus:outline-0 focus:ring-0 border border-spice-200 bg-white focus:border-spice-500 h-12 placeholder:text-spice-300 p-[15px] text-base font-normal leading-normal"
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </label>

              {/* Company */}
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal">{form.fields.company.label}</p>
                <input
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={form.fields.company.placeholder}
                  className="flex w-full rounded-lg text-spice-500 focus:outline-0 focus:ring-0 border border-spice-200 bg-white focus:border-spice-500 h-12 placeholder:text-spice-300 p-[15px] text-base font-normal leading-normal"
                />
              </label>

              {/* Email */}
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal">
                  {form.fields.email.label} <span className="text-red-500">*</span>
                </p>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={form.fields.email.placeholder}
                  className="flex w-full rounded-lg text-spice-500 focus:outline-0 focus:ring-0 border border-spice-200 bg-white focus:border-spice-500 h-12 placeholder:text-spice-300 p-[15px] text-base font-normal leading-normal"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </label>

              {/* Phone */}
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal">
                  {form.fields.phone.label} <span className="text-red-500">*</span>
                </p>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={form.fields.phone.placeholder}
                  className="flex w-full rounded-lg text-spice-500 focus:outline-0 focus:ring-0 border border-spice-200 bg-white focus:border-spice-500 h-12 placeholder:text-spice-300 p-[15px] text-base font-normal leading-normal"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </label>

              {/* Product */}
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal">{form.fields.product.label}</p>
                <select
                  name="product"
                  value={formData.product}
                  onChange={handleInputChange}
                  className="flex w-full rounded-lg text-spice-500 focus:outline-0 focus:ring-0 border border-spice-200 bg-white focus:border-spice-500 h-12 p-[15px] text-base font-normal leading-normal"
                >
                  <option value="">{form.fields.product.placeholder}</option>
                  {productOptions.map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              {/* Message */}
              <label className="flex flex-col gap-2">
                <p className="text-base font-medium leading-normal">{form.fields.message.label}</p>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={form.fields.message.placeholder}
                  rows={6}
                  className="flex w-full rounded-lg text-spice-500 focus:outline-0 focus:ring-0 border border-spice-200 bg-white focus:border-spice-500 placeholder:text-spice-300 p-[15px] text-base font-normal leading-normal resize-none"
                />
              </label>

              {/* Submit Button */}
              <div className="flex px-0 py-3 justify-start">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-spice-500 text-white font-medium hover:bg-spice-600 transition-colors"
                >
                  <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                  </svg>
                  {form.whatsappText}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col gap-6">
            <h2 className="tracking-light text-[28px] font-bold leading-tight px-4 text-left">
              {contactInfo.title}
            </h2>

            {/* Map */}
            <div className="px-4">
              <div
                className="w-full bg-center bg-no-repeat rounded-lg bg-cover h-[200px]"
                style={{ backgroundImage: `url(${map.backgroundImage})` }}
              />
            </div>

            {/* Contact Details */}
            <div className="space-y-4 px-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="text-spice-500" size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium leading-normal">{contactInfo.address.title}</p>
                  <p className="text-spice-300 text-sm font-normal leading-normal">{contactInfo.address.value}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Mail className="text-spice-500" size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium leading-normal">{contactInfo.email.title}</p>
                  <a
                    href={`mailto:${contactInfo.email.value}`}
                    className="text-spice-300 hover:text-spice-500 transition-colors text-sm font-normal leading-normal"
                  >
                    {contactInfo.email.value}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <Phone className="text-spice-500" size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium leading-normal">{contactInfo.phone.title}</p>
                  <a
                    href={`tel:${contactInfo.phone.value}`}
                    className="text-spice-300 hover:text-spice-500 transition-colors text-sm font-normal leading-normal"
                  >
                    {contactInfo.phone.value}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <MessageCircle className="text-spice-500" size={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-medium leading-normal">{contactInfo.whatsapp.title}</p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-spice-300 hover:text-spice-500 transition-colors text-sm font-normal leading-normal text-left"
                  >
                    {contactInfo.whatsapp.value}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
