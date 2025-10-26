import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../utils/translations';

interface RelatedProductsProps {
  products: Product[];
  currentProductId?: string;
  title?: string;
  maxProducts?: number;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({ 
  products, 
  currentProductId, 
  title = "Related Products",
  maxProducts = 3 
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      )}
      <div className="grid md:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="group bg-white border border-spice-200 rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-105"
          >
            <div className="aspect-square bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${product.image || product.backgroundImage || product.productImage})` 
              }} 
            />
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

