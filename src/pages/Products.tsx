import React, { useState } from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { getPageTranslations } from '../utils/translations';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/common/ProductCard';
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
    <div className="px-4 sm:px-6 md:px-10 flex justify-center py-5">
      <div className="container-fluid flex flex-col max-w-[960px]">
        {/* Header */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex w-full sm:min-w-72 flex-col gap-2 sm:gap-3">
            <p className="tracking-light text-2xl sm:text-3xl md:text-[32px] font-bold leading-tight text-gray-900 dark:text-white">{title}</p>
            <p className="text-spice-300 dark:text-slate-400 text-sm font-normal leading-normal">{description}</p>
          </div>
        </div>
        
        {/* Products Grid */}
        {displayedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:p-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  language={language}
                  showDetails={true}
                />
              ))}
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
            <div className="text-center py-4 text-spice-300 dark:text-slate-400 text-xs sm:text-sm px-4">
              {language === 'eng' ? 'Showing' : 'Anzeigen'} {displayedProducts.length} {language === 'eng' ? 'of' : 'von'} {products.length} {language === 'eng' ? 'products' : 'Produkte'}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
            <p className="text-base sm:text-lg font-semibold text-spice-300 dark:text-slate-400 mb-2 text-center">
              {language === 'eng' ? 'No products available' : 'Keine Produkte verfügbar'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
