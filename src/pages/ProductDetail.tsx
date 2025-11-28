import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/useLanguage';
import { getPageTranslations } from '../utils/translations';
import { Button } from '../components/common/Button';
import { Tabs, type Tab } from '../components/common/Tabs';
import { SpecificationTable } from '../components/common/SpecificationTable';
import { ImageGallery } from '../components/common/ImageGallery';
import { RelatedProducts } from '../components/common/RelatedProducts';
import { SEOHead } from '../components/seo';
import { getCompanyContact } from '../config/glob';
import { Download, ChefHat, Heart, Eye, Sparkles, Package, Truck, Clock, Shield, AlertCircle } from 'lucide-react';
import type { Product } from '../utils/translations';
import { normalizeImagePath, normalizePath } from '../utils';

interface ProductDetailContent {
  breadcrumb: {
    home: string;
    products: string;
    current: string;
  };
  productNotFound: string;
  productNotFoundDescription: string;
  backButton: string;
  productOverview: string;
  highlights: string;
  detailedSpecifications: string;
  usageAndBenefits: string;
  packagingAndLogistics: string;
  relatedProducts: {
    title: string;
  };
  form: {
    successMessage: string;
  };
}

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  
  const detailContent = getPageTranslations('product-detail', language) as unknown as ProductDetailContent;
  const productsContent = getPageTranslations('products', language);
  const products = (productsContent.products as Product[]) || [];
  const product = products.find(p => p.id === id);
  const contact = getCompanyContact();
  const downloadFileName = React.useMemo(() => {
    if (!product) return undefined;
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    const safeName = product.name
      .replace(/[^a-z0-9\s()-]/gi, '')
      .trim()
      .replace(/\s+/g, '-');
    return `${safeName}-Specification-${dd}-${mm}-${yy}.pdf`;
  }, [product]);
  
  const tabs = useMemo(() => {
    if (!product || !product.productCharacteristics) return [];
    const tabList: Tab[] = [];
    
    if (product.productCharacteristics.physicalParameters) {
      tabList.push({
        id: 'physical',
        label: language === 'eng' ? 'Physical Parameters' : 'Physikalische Parameter'
      });
    }
    if (product.productCharacteristics.chemicalParameters) {
      tabList.push({
        id: 'chemical',
        label: language === 'eng' ? 'Chemical Parameters' : 'Chemische Parameter'
      });
    }
    if (product.productCharacteristics.microbiologyParameters) {
      tabList.push({
        id: 'microbiological',
        label: language === 'eng' ? 'Microbiological Parameters' : 'Mikrobiologische Parameter'
      });
    }
    return tabList;
  }, [product, language]);
  
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : '');
  
  const handleWhatsAppSubmit = () => {
    const message = language === 'eng' 
      ? 'Hello! I am interested in this product.' 
      : 'Hallo! Ich interessiere mich für dieses Produkt.';
    const whatsappUrl = `https://wa.me/${contact.whatsapp.international}?text=${encodeURIComponent(`${message}\n\nProduct: ${product?.name || 'N/A'}\n\nPlease contact me for more information and pricing. Thank you!`)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const handleDownloadSpec = async () => {
    if (!product?.specSheetUrl) return;
    const normalizedUrl = normalizePath(product.specSheetUrl);
    try {
      const response = await fetch(normalizedUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch spec sheet');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadFileName || 'Specification.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Fallback: open in new tab so the user can still access it
      window.open(normalizePath(product.specSheetUrl), '_blank');
    }
  };
  
  if (!product) {
    return (
      <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
        <div className="container-fluid flex flex-col max-w-[960px] items-center text-center py-8 sm:py-12 md:py-16 px-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{detailContent.productNotFound}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 mb-6 sm:mb-8">{detailContent.productNotFoundDescription}</p>
          <Button href="/products">← {detailContent.backButton}</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-4 sm:py-6 md:py-8 transition-colors">
      {product && (
        <SEOHead
          productData={{
            name: product.name,
            category: product.category,
            origin: 'India',
            description: product.shortDescription || product.description,
            id: product.id,
          }}
          image={normalizeImagePath(product.backgroundImage || product.image)}
          type="product"
        />
      )}
      <div className="container-fluid max-w-[1200px] mx-auto px-2 sm:px-4 md:px-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base">
          <Link to="/products" className="text-spice-300 dark:text-slate-400 font-medium hover:text-primary-500">
            {detailContent.breadcrumb.products}
          </Link>
          <span className="text-spice-300 dark:text-slate-400 font-medium">/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div
            className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-xl bg-cover bg-center flex items-end p-4 sm:p-6 md:p-8 lg:p-12"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url("${normalizeImagePath(product.backgroundImage || product.image)}")`
            }}
          >
            <div className="w-full z-10">
              <div className="mb-3 sm:mb-4 md:mb-6">
                <p className="text-xs sm:text-sm font-medium text-white/90 mb-1 sm:mb-2">{product.category}</p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">{product.name}</h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl">
                  Premium Indian {product.name.split('(')[0].trim()} - Export Grade
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={handleWhatsAppSubmit}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-primary-500 text-gray-900 font-bold rounded-lg hover:bg-primary-600 transition-colors text-sm sm:text-base"
                >
                  Request Quote
                </button>
                {product.specSheetUrl ? (
                  <button
                    onClick={handleDownloadSpec}
                    className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm sm:text-base"
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Download Spec Sheet</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg border border-white/20 text-sm sm:text-base opacity-60 cursor-not-allowed"
                    disabled
                    title={language === 'eng' ? 'Specification sheet not available' : 'Datenblatt nicht verfügbar'}
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Download Spec Sheet</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Overview Card */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="bg-spice-50 dark:bg-slate-900 rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 transition-colors">
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Product Overview</h2>
                <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700 dark:text-slate-400">
                  <p className="font-semibold text-base sm:text-lg dark:text-white">{product.name}</p>
                  <p className="leading-relaxed">{product.shortDescription || product.description}</p>
                </div>
              </div>
              <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden">
                <img
                  src={normalizeImagePath(product.productImage || product.image)}
                  alt={product.name}
                  title={`${product.name} - Premium Indian Spice`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details and Highlights Side by Side */}
        <div className="mb-8 sm:mb-12 md:mb-16 grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Key Details Card */}
          {product.details && (
            <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 transition-colors">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'eng' ? 'Product Details' : 'Produktdetails'}
              </h3>
              {product.details.appearance && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/10 dark:bg-primary-500/20 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {language === 'eng' ? 'Appearance' : 'Erscheinung'}
                    </h4>
                    <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.details.appearance}</p>
                  </div>
                </div>
              )}
              
              {product.details.flavorAroma && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/10 dark:bg-primary-500/20 p-3 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {language === 'eng' ? 'Flavor & Aroma' : 'Geschmack & Aroma'}
                    </h4>
                    <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.details.flavorAroma}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Highlights Card */}
          <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 md:p-8 transition-colors">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {language === 'eng' ? 'Highlights' : 'Highlights'}
            </h3>
              <div className="space-y-4">
              {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-spice-100 dark:border-slate-800">
                  <span className="text-gray-600 dark:text-slate-400 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-gray-900 dark:text-white font-semibold">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Specifications & Usage & Benefits Side by Side */}
        <div className="mb-8 sm:mb-12 md:mb-16 grid lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Detailed Specifications */}
          {tabs.length > 0 && product.productCharacteristics && (
            <div className="lg:col-span-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Detailed Specifications</h2>
              <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
                <Tabs 
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
                <SpecificationTable
                  data={
                    activeTab === 'physical' && product.productCharacteristics.physicalParameters
                      ? product.productCharacteristics.physicalParameters as Record<string, unknown>
                      : activeTab === 'chemical' && product.productCharacteristics.chemicalParameters
                      ? product.productCharacteristics.chemicalParameters as Record<string, unknown>
                      : activeTab === 'microbiological' && product.productCharacteristics.microbiologyParameters
                      ? product.productCharacteristics.microbiologyParameters as Record<string, unknown>
                      : {}
                  }
                  language={language}
                />
              </div>
            </div>
          )}

          {/* Usage & Benefits Cards */}
          {product.details && (
            <div className="lg:col-span-2 mt-4 sm:mt-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Usage & Benefits</h2>
              <div className="space-y-6">
                {product.details.culinaryUses && (
                  <div className="bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 dark:border-primary-500/30 rounded-xl p-4 sm:p-6 transition-colors">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-primary-500 p-2.5 sm:p-3 rounded-lg">
                        <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {language === 'eng' ? 'Culinary Uses' : 'Kulinarische Verwendung'}
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.details.culinaryUses}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {product.details.healthBenefits && (
                  <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 dark:border-red-500/30 rounded-xl p-4 sm:p-6 transition-colors">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="bg-red-500 p-2.5 sm:p-3 rounded-lg">
                        <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {language === 'eng' ? 'Health Benefits' : 'Gesundheitsvorteile'}
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.details.healthBenefits}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Packing Images & Brand Labels */}
        {(product.packingImages || product.brandLabels) && (
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              {language === 'eng' ? 'Packing Images & Brand Labels' : 'Verpackungsbilder & Markenetiketten'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {product.packingImages && product.packingImages.length > 0 && (
                <ImageGallery
                  images={product.packingImages.map(img => ({ ...img, src: normalizePath(img.src) }))}
                  title={language === 'eng' ? 'Packing Images' : 'Verpackungsbilder'}
                />
              )}
              {product.brandLabels && product.brandLabels.length > 0 && (
                <ImageGallery
                  images={product.brandLabels.map(img => ({ ...img, src: normalizePath(img.src) }))}
                  title={language === 'eng' ? 'Brand Labels' : 'Markenetiketten'}
                />
              )}
            </div>
          </div>
        )}

        {/* Packaging & Logistics */}
        {product.logistics && (
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Packaging & Logistics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.logistics.containerCapacity && product.logistics.containerCapacity.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Truck className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{language === 'eng' ? 'Container Capacity' : 'Containerkapazität'}</h3>
                  </div>
                  <div className="space-y-2">
                    {product.logistics.containerCapacity.map((container, index) => (
                      <div key={index} className="flex justify-between text-sm sm:text-base">
                        <span className="text-gray-600 dark:text-slate-400 truncate pr-2">{container.type}</span>
                        <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">{container.quantityMetricTons} MT</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {product.logistics.packing && (
                <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Package className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{language === 'eng' ? 'Packing' : 'Verpackung'}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.logistics.packing}</p>
                </div>
              )}
              
              {product.logistics.shelfLife && (
                <div className="bg-white dark:bg-slate-900 border border-spice-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary-500" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{language === 'eng' ? 'Shelf Life' : 'Haltbarkeit'}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.logistics.shelfLife}</p>
                </div>
              )}
              
              {product.logistics.pesticides && (
                <div className="bg-white dark:bg-slate-900 border border-green-500/20 dark:border-green-500/30 bg-green-500/5 dark:bg-green-500/10 rounded-xl p-4 sm:p-6 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{language === 'eng' ? 'Pesticides Compliance' : 'Pestizidkonformität'}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.logistics.pesticides}</p>
                </div>
              )}
              
              {product.logistics.allergens && (
                <div className="bg-white dark:bg-slate-900 border border-green-500/20 dark:border-green-500/30 bg-green-500/5 dark:bg-green-500/10 rounded-xl p-4 sm:p-6 transition-colors">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{language === 'eng' ? 'Allergens' : 'Allergene'}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{product.logistics.allergens}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-500/10 to-spice-50 dark:from-primary-500/5 dark:to-slate-900 p-6 sm:p-8 md:p-12 transition-colors">
          <div className="relative z-10 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              {language === 'eng' ? `Get a Quote for ${product.name}` : `Angebot für ${product.name} erhalten`}
            </h2>
            <button
              onClick={handleWhatsAppSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary-500 text-gray-900 font-bold rounded-lg hover:bg-primary-600 transition-colors text-sm sm:text-base"
            >
              Request Quote via WhatsApp
            </button>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts
          products={products}
          currentProductId={product.id}
          title={detailContent.relatedProducts.title}
          maxProducts={3}
        />
      </div>
    </div>
  );
};
