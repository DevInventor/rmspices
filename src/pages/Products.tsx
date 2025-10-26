import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getPageTranslations } from '../utils/translations';
import { Button } from '../components/common/Button';
import { ChefHat, Heart, Package } from 'lucide-react';
import type { Product } from '../utils/translations';

// Extended Product interface to include new detailed fields
interface DetailedProduct extends Product {
  shortDescription?: string;
  details?: {
    appearance?: string;
    flavorAroma?: string;
    culinaryUses?: string;
    healthBenefits?: string;
  };
  logistics?: {
    containerCapacity?: Array<{ type: string; quantityMetricTons: number }>;
    packing?: string;
    shelfLife?: string;
    allergens?: string;
  };
}

interface ProductsContent {
  title: string;
  description: string;
  products: Product[];
  loadMore: string;
}

export const Products: React.FC = () => {
  const { language } = useLanguage();
  const content = getPageTranslations('products', language) as unknown as ProductsContent;
  const { title, description, products, loadMore } = content;
  
  const [productsToShow, setProductsToShow] = useState<number>(8);
  
  // Paginate products
  const displayedProducts = (products as DetailedProduct[]).slice(0, productsToShow);
  const hasMore = products.length > productsToShow;
  
  const handleLoadMore = () => {
    setProductsToShow(prev => prev + 8);
  };
  
  return (
    <div className="px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="tracking-light text-[32px] font-bold leading-tight">{title}</p>
            <p className="text-spice-300 text-sm font-normal leading-normal">{description}</p>
          </div>
        </div>
        
        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
              {displayedProducts.map((product) => {
                const detailedProduct = product as DetailedProduct;
                
                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="flex flex-col gap-4 rounded-lg border border-spice-200 bg-white p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                  {/* Product Image */}
                  <div
                    className="w-full aspect-square bg-cover bg-center rounded-lg"
                    style={{ backgroundImage: `url(${product.image || product.backgroundImage || product.productImage})` }}
                  />
                    
                    {/* Product Info */}
                    <div className="flex flex-col gap-2">
                      <h3 className="text-base font-bold leading-tight group-hover:text-primary-500 transition-colors">
                        {product.name}
                      </h3>
                      
                      {/* Use shortDescription if available, otherwise use regular description */}
                      <p className="text-spice-300 text-sm font-normal leading-normal line-clamp-2">
                        {detailedProduct.shortDescription || product.description}
                      </p>
                      
                      {/* Key Features */}
                      {detailedProduct.details && (
                        <div className="flex flex-col gap-2 mt-2">
                          {detailedProduct.details.culinaryUses && (
                            <div className="flex items-start gap-2">
                              <ChefHat className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-spice-300 line-clamp-1">
                                {language === 'eng' ? 'Culinary Uses' : 'Kulinarische Verwendung'}
                              </p>
                            </div>
                          )}
                          {detailedProduct.details.healthBenefits && (
                            <div className="flex items-start gap-2">
                              <Heart className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-spice-300 line-clamp-1">
                                {language === 'eng' ? 'Health Benefits' : 'Gesundheitsvorteile'}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Quick Specs */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-xs px-2 py-1 rounded bg-spice-100 text-spice-300"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                      
                      {/* Origin & Category */}
                      <div className="flex flex-col gap-1 text-xs text-spice-300 mt-2">
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>{product.category}</span>
                        </div>
                        <span className="text-xs">
                          {language === 'eng' ? 'Origin:' : 'Herkunft:'} {product.origin}
                        </span>
                      </div>
                      
                      {/* View Details Link */}
                      <div className="mt-2 pt-2 border-t border-spice-100">
                        <span className="text-primary-500 text-sm font-medium group-hover:underline">
                          {language === 'eng' ? 'View Details →' : 'Details anzeigen →'}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center py-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleLoadMore}
                >
                  {loadMore}
                </Button>
              </div>
            )}
            
            {/* Results Count */}
            <div className="text-center py-4 text-spice-300 text-sm">
              {language === 'eng' ? 'Showing' : 'Anzeigen'} {displayedProducts.length} {language === 'eng' ? 'of' : 'von'} {products.length} {language === 'eng' ? 'products' : 'Produkte'}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg font-semibold text-spice-300 mb-2">
              {language === 'eng' ? 'No products available' : 'Keine Produkte verfügbar'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
