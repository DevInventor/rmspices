import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { Button } from '../components/common/Button';
import { TopSellingProducts } from '../components/common/TopSellingProducts';
import { Shield, TrendingUp, Truck } from 'lucide-react';
import type { Product } from '../utils/translations';

interface ProductItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImages: string[];
  };
  productRange: {
    title: string;
    viewAll: string;
    items: ProductItem[];
    topSellingLabel?: string;
  };
  whyChooseUs: {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  cta: {
    title: string;
    description: string;
    button: string;
  };
}

export const Home: React.FC = () => {
  const { language } = useLanguage();
  const content = getPageTranslations('home', language) as unknown as HomeContent;
  const { hero, productRange, whyChooseUs, cta } = content;
  
  // Get products from products page translations
  interface ProductsData {
    products?: Product[];
    topSellingLabel?: string;
  }
  const productsContent = getPageTranslations('products', language) as unknown as ProductsData;
  const products: Product[] = productsContent.products || [];
  const topSellingLabel = productsContent.topSellingLabel || productRange.topSellingLabel || "Top Selling Products";
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    if (hero.backgroundImages && hero.backgroundImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % hero.backgroundImages.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [hero.backgroundImages]);
  
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      ShieldCheck: <Shield size={24} />,
      ChartLine: <TrendingUp size={24} />,
      Truck: <Truck size={24} />,
    };
    return icons[iconName] || <Shield size={24} />;
  };
  
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="px-10 flex justify-center py-5">
        <div className="container-fluid flex flex-col max-w-[960px]">
          <div className="relative flex min-h-[480px] flex-col gap-6 rounded-lg items-center justify-center p-4 overflow-hidden">
            {/* Banner Images with Sliding Animation */}
            <div className="absolute inset-0 w-full h-full">
              {hero.backgroundImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url(${image})`,
                  }}
                />
              ))}
            </div>
            
            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col gap-2 text-center max-w-4xl">
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                {hero.title}
              </h1>
              <p className="text-white text-sm md:text-base font-normal leading-normal">
                {hero.subtitle}
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-3 justify-center">
              <Button variant="primary" size="lg" href="/products">
                {hero.ctaPrimary}
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                {hero.ctaSecondary}
              </Button>
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute bottom-4 flex gap-2">
              {hero.backgroundImages.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Top Selling Products Section */}
          <div className="px-4 pb-3 pt-5">
            <TopSellingProducts 
              products={products}
              title={topSellingLabel}
              maxProducts={4}
            />
          </div>
          
          <div className="flex px-4 py-3 justify-center">
            <Button variant="primary" href="/products">
              {productRange.viewAll}
            </Button>
          </div>
          
          {/* Why Choose Us Section */}
          <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            {whyChooseUs.title}
          </h2>
          <div className="flex flex-col gap-10 px-4 py-10">
            <div className="flex flex-col gap-4">
              <h1 className="tracking-light text-[32px] md:text-4xl font-bold md:font-black leading-tight md:tracking-[-0.033em] max-w-[720px]">
                {whyChooseUs.subtitle}
              </h1>
              <p className="text-base font-normal leading-normal max-w-[720px]">
                {whyChooseUs.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {whyChooseUs.items.map((item, index) => (
                <div key={index} className="flex flex-1 gap-3 rounded-lg border border-spice-200 bg-white p-4 flex-col">
                  <div className="text-primary-500">
                    {getIcon(item.icon)}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-base font-bold leading-tight">{item.title}</h2>
                    <p className="text-spice-300 text-sm font-normal leading-normal">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="flex flex-col justify-center gap-6 md:gap-8 px-4 md:px-10 py-10 md:py-20">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="tracking-light text-[32px] md:text-4xl font-bold md:font-black leading-tight md:tracking-[-0.033em] max-w-[720px]">
                {cta.title}
              </h1>
              <p className="text-base font-normal leading-normal max-w-[720px]">
                {cta.description}
              </p>
            </div>
            <div className="flex justify-center">
              <Button variant="primary" size="lg" href="/contact">
                {cta.button}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
