import React from 'react';
import type { Product } from '../../utils/translations';
import { ProductCard } from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
  currentProductId?: string;
  title?: string;
  maxProducts?: number;
  language?: 'eng' | 'ger';
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  currentProductId, 
  title = "Related Products",
  maxProducts = 3,
  language = 'eng'
}) => {
  // Filter out current product and get random related products
  const relatedProducts = React.useMemo(() => {
    const filtered = currentProductId 
      ? products.filter(p => p.id !== currentProductId)
      : products;
    
    // Shuffle and take first N products
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, maxProducts);
  }, [products, currentProductId, maxProducts]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            language={language}
            showDetails={false}
          />
        ))}
      </div>
    </div>
  );
};

