import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { Button } from '../components/common/Button';
import { Tabs, type Tab } from '../components/common/Tabs';
import { SpecificationTable } from '../components/common/SpecificationTable';
import { ImageGallery } from '../components/common/ImageGallery';
import { RelatedProducts } from '../components/common/RelatedProducts';
import { getCompanyContact } from '../config/glob';
import { Download, ChefHat, Heart, Eye, Sparkles, Package, Truck, Clock, Shield, AlertCircle } from 'lucide-react';
import type { Product } from '../utils/translations';

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
  
  if (!product) {
    return (
      <div className="px-10 flex justify-center py-5">
        <div className="container-fluid flex flex-col max-w-[960px] items-center text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{detailContent.productNotFound}</h1>
          <p className="text-gray-600 mb-8">{detailContent.productNotFoundDescription}</p>
          <Button href="/products">← {detailContent.backButton}</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-fluid max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link to="/products" className="text-spice-300 text-base font-medium hover:text-primary-500">
            {detailContent.breadcrumb.products}
          </Link>
          <span className="text-spice-300 text-base font-medium">/</span>
          <span className="text-gray-900 text-base font-medium">{product.name}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-16">
          <div
            className="relative h-[400px] rounded-xl bg-cover bg-center flex items-end p-8 md:p-12"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.6) 100%), url("${product.backgroundImage || product.image}")`
            }}
          >
            <div className="w-full z-10">
              <div className="mb-6">
                <p className="text-sm font-medium text-white/90 mb-2">{product.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{product.name}</h1>
                <p className="text-base text-white/90 max-w-2xl">
                  Premium Indian {product.name.split('(')[0].trim()} - Export Grade
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleWhatsAppSubmit}
                  className="px-6 py-3 bg-primary-500 text-gray-900 font-bold rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Request Quote
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  <Download className="h-4 w-4" />
                  Download Spec Sheet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Overview Card */}
        <div className="mb-16">
          <div className="bg-spice-50 rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Overview</h2>
                <div className="space-y-3 text-base text-gray-700">
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="leading-relaxed">{product.shortDescription || product.description}</p>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <img
                  src={product.productImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details and Highlights Side by Side */}
        <div className="mb-16 grid md:grid-cols-2 gap-6">
          {/* Key Details Card */}
          {product.details && (
            <div className="bg-white border border-spice-200 rounded-xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {language === 'eng' ? 'Product Details' : 'Produktdetails'}
              </h3>
              {product.details.appearance && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/10 p-3 rounded-lg">
                    <Eye className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {language === 'eng' ? 'Appearance' : 'Erscheinung'}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.details.appearance}</p>
                  </div>
                </div>
              )}
              
              {product.details.flavorAroma && (
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/10 p-3 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {language === 'eng' ? 'Flavor & Aroma' : 'Geschmack & Aroma'}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{product.details.flavorAroma}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Highlights Card */}
          <div className="bg-white border border-spice-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'eng' ? 'Highlights' : 'Highlights'}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-spice-100">
                <span className="text-gray-600 font-medium">{language === 'eng' ? 'Origin' : 'Herkunft'}</span>
                <span className="text-gray-900 font-semibold">{product.origin}</span>
              </div>
              {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-spice-100">
                  <span className="text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="text-gray-900 font-semibold">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Specifications & Usage & Benefits Side by Side */}
        <div className="mb-16 grid lg:grid-cols-5 gap-6">
          {/* Detailed Specifications */}
          {tabs.length > 0 && product.productCharacteristics && (
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Specifications</h2>
              <div className="bg-white border border-spice-200 rounded-xl overflow-hidden">
                <Tabs 
                  tabs={tabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  language={language}
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
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage & Benefits</h2>
              <div className="space-y-6">
                {product.details.culinaryUses && (
                  <div className="bg-primary-500/5 border border-primary-500/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary-500 p-3 rounded-lg">
                        <ChefHat className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {language === 'eng' ? 'Culinary Uses' : 'Kulinarische Verwendung'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{product.details.culinaryUses}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {product.details.healthBenefits && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-500 p-3 rounded-lg">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {language === 'eng' ? 'Health Benefits' : 'Gesundheitsvorteile'}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{product.details.healthBenefits}</p>
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
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {language === 'eng' ? 'Packing Images & Brand Labels' : 'Verpackungsbilder & Markenetiketten'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {product.packingImages && product.packingImages.length > 0 && (
                <ImageGallery
                  images={product.packingImages}
                  title={language === 'eng' ? 'Packing Images' : 'Verpackungsbilder'}
                />
              )}
              {product.brandLabels && product.brandLabels.length > 0 && (
                <ImageGallery
                  images={product.brandLabels}
                  title={language === 'eng' ? 'Brand Labels' : 'Markenetiketten'}
                />
              )}
            </div>
          </div>
        )}

        {/* Packaging & Logistics */}
        {product.logistics && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Packaging & Logistics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.logistics.containerCapacity && product.logistics.containerCapacity.length > 0 && (
                <div className="bg-white border border-spice-200 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Truck className="h-6 w-6 text-primary-500" />
                    <h3 className="text-lg font-bold text-gray-900">{language === 'eng' ? 'Container Capacity' : 'Containerkapazität'}</h3>
                  </div>
                  <div className="space-y-2">
                    {product.logistics.containerCapacity.map((container, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{container.type}</span>
                        <span className="font-semibold text-gray-900">{container.quantityMetricTons} MT</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {product.logistics.packing && (
                <div className="bg-white border border-spice-200 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Package className="h-6 w-6 text-primary-500" />
                    <h3 className="text-lg font-bold text-gray-900">{language === 'eng' ? 'Packing' : 'Verpackung'}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.logistics.packing}</p>
                </div>
              )}
              
              {product.logistics.shelfLife && (
                <div className="bg-white border border-spice-200 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Clock className="h-6 w-6 text-primary-500" />
                    <h3 className="text-lg font-bold text-gray-900">{language === 'eng' ? 'Shelf Life' : 'Haltbarkeit'}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.logistics.shelfLife}</p>
                </div>
              )}
              
              {product.logistics.pesticides && (
                <div className="bg-white border border-green-500/20 bg-green-500/5 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">{language === 'eng' ? 'Pesticides Compliance' : 'Pestizidkonformität'}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.logistics.pesticides}</p>
                </div>
              )}
              
              {product.logistics.allergens && (
                <div className="bg-white border border-green-500/20 bg-green-500/5 rounded-xl p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <AlertCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-900">{language === 'eng' ? 'Allergens' : 'Allergene'}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{product.logistics.allergens}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mb-16 relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-500/10 to-spice-50 p-12">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'eng' ? `Get a Quote for ${product.name}` : `Angebot für ${product.name} erhalten`}
            </h2>
            <button
              onClick={handleWhatsAppSubmit}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-gray-900 font-bold rounded-lg hover:bg-primary-600 transition-colors"
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
