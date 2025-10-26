import homeEng from '../config/eng/home.json';
import homeGer from '../config/ger/home.json';
import aboutEng from '../config/eng/about.json';
import aboutGer from '../config/ger/about.json';
import certificationsEng from '../config/eng/certifications.json';
import certificationsGer from '../config/ger/certifications.json';
import contactEng from '../config/eng/contact.json';
import contactGer from '../config/ger/contact.json';
import productsEng from '../config/eng/products.json';
import productsGer from '../config/ger/products.json';
import productDetailEng from '../config/eng/product-detail.json';
import productDetailGer from '../config/ger/product-detail.json';

type Language = 'eng' | 'ger';
type Page = 'home' | 'about' | 'certifications' | 'contact' | 'products' | 'product-detail';

type PageTranslations = Record<string, unknown>;

// Product types
export type Product = {
  id: string;
  topSelling?: boolean;
  name: string;
  category: string;
  origin: string;
  description: string;
  image?: string;
  backgroundImage?: string;
  productImage?: string;
  specifications: Record<string, string>;
  shortDescription?: string;
  details?: {
    appearance?: string;
    flavorAroma?: string;
    culinaryUses?: string;
    healthBenefits?: string;
  };
  productCharacteristics?: {
    physicalParameters?: Record<string, unknown>;
    chemicalParameters?: Record<string, unknown>;
    microbiologyParameters?: Record<string, unknown>;
  };
  logistics?: {
    containerCapacity?: Array<{ type: string; quantityMetricTons: number }>;
    packing?: string;
    shelfLife?: string;
    pesticides?: string;
    allergens?: string;
  };
  packingImages?: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  brandLabels?: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
};

// Get page-specific translations
export const getPageTranslations = (page: Page, language: Language): PageTranslations => {
  const translations: Record<string, Record<string, PageTranslations>> = {
    'home': { 'eng': homeEng, 'ger': homeGer },
    'about': { 'eng': aboutEng, 'ger': aboutGer },
    'certifications': { 'eng': certificationsEng, 'ger': certificationsGer },
    'contact': { 'eng': contactEng, 'ger': contactGer },
    'products': { 'eng': productsEng, 'ger': productsGer },
    'product-detail': { 'eng': productDetailEng, 'ger': productDetailGer },
  };
  
  return translations[page][language] || translations[page]['eng'];
};

