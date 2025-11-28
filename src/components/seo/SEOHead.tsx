import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import seoConfig from '../../config/glob/seo.json';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  productData?: {
    name: string;
    category: string;
    origin?: string;
    description: string;
    id: string;
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  productData
}) => {
  const location = useLocation();

  useEffect(() => {
    // Get current page from pathname
    const pathname = location.pathname;
    let pageKey = 'home';
    
    if (pathname.includes('/about')) pageKey = 'about';
    else if (pathname.includes('/products')) {
      if (pathname.includes('/products/') && pathname.split('/').length > 2) {
        pageKey = 'product-detail';
      } else {
        pageKey = 'products';
      }
    }
    else if (pathname.includes('/certifications')) pageKey = 'certifications';
    else if (pathname.includes('/contact')) pageKey = 'contact';

    // Get page-specific SEO config
    const pageConfig = (seoConfig.pages as any)[pageKey] || seoConfig.pages.home;
    const defaultConfig = seoConfig.default;

    // Process dynamic content for product detail pages
    let processedTitle = title || pageConfig.title;
    let processedDescription = description || pageConfig.description;
    let processedKeywords = keywords || pageConfig.keywords;
    
    // Generate URL - use provided URL, or page config URL, or build from canonical + pathname
    let processedUrl = url || pageConfig.og?.url;
    if (!processedUrl) {
      // Use window.location.origin for dynamic URL generation, or fallback to config canonical
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : defaultConfig.canonical.replace(/\/$/, '');
      processedUrl = `${baseUrl}${pathname}`;
    }

    if (productData && pageKey === 'product-detail') {
      processedTitle = processedTitle
        .replace('{productName}', productData.name)
        .replace('{category}', productData.category);
      
      processedDescription = processedDescription
        .replace('{productName}', productData.name)
        .replace('{category}', productData.category)
        .replace('{origin}', productData.origin || 'India')
        .replace('{description}', productData.description);
      
      processedKeywords = processedKeywords
        .replace('{productName}', productData.name)
        .replace('{category}', productData.category)
        .replace('{origin}', productData.origin || 'India');
      
      processedUrl = processedUrl.replace('{productId}', productData.id);
    }

    // Update document title
    document.title = processedTitle;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (property) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    // Update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let linkTag = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', rel);
        document.head.appendChild(linkTag);
      }
      linkTag.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', processedDescription);
    updateMetaTag('keywords', processedKeywords);
    updateMetaTag('author', defaultConfig.author);
    updateMetaTag('robots', defaultConfig.robots);

    // Canonical URL
    updateLinkTag('canonical', processedUrl);

    // Open Graph tags
    const ogImage = image || (pageConfig.og as any)?.image || defaultConfig.og.image;
    updateMetaTag('og:title', processedTitle, true);
    updateMetaTag('og:description', processedDescription, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', processedUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', defaultConfig.og.image_width, true);
    updateMetaTag('og:image:height', defaultConfig.og.image_height, true);
    updateMetaTag('og:image:alt', defaultConfig.og.image_alt, true);
    updateMetaTag('og:site_name', defaultConfig.og.site_name, true);
    updateMetaTag('og:locale', defaultConfig.og.locale, true);

    // Twitter Card tags
    updateMetaTag('twitter:card', defaultConfig.twitter.card);
    updateMetaTag('twitter:url', processedUrl);
    updateMetaTag('twitter:title', processedTitle);
    updateMetaTag('twitter:description', processedDescription);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', defaultConfig.twitter.site);
    updateMetaTag('twitter:creator', defaultConfig.twitter.creator);

    // Theme color
    updateMetaTag('theme-color', '#ec7513');

  }, [location.pathname, title, description, keywords, image, url, type, productData]);

  return null; // This component doesn't render anything
};

export default SEOHead;

