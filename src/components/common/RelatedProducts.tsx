import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../utils/translations';
import { Package } from 'lucide-react';
import { normalizeImagePath } from '../../utils';

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
  maxProducts = 4
}) => {
  // Filter out current product and get related products
  // Use deterministic selection instead of random to avoid re-renders
  const relatedProducts = React.useMemo(() => {
    const filtered = currentProductId 
      ? products.filter(p => p.id !== currentProductId)
      : products;
    
    // Take first N products deterministically (random causes re-renders)
    return filtered.slice(0, maxProducts);
  }, [products, currentProductId, maxProducts]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {relatedProducts.map((product) => {
          const imageUrl = normalizeImagePath(product.image || product.backgroundImage || product.productImage);
          const specEntries = Object.entries(product.specifications).slice(0, 2);
          const shortText = (product as Product & { shortDescription?: string }).shortDescription || product.description;

          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="flex flex-col gap-3 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
            >
              {/* Image */}
              <div
                className="w-full aspect-square bg-cover bg-center rounded-md"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-spice-300 dark:text-slate-400 line-clamp-2">
                  {shortText}
                </p>

                {/* Two quick specs */}
                {specEntries.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {specEntries.map(([key, value]) => (
                      <span
                        key={key}
                        className="text-xs px-2 py-1 rounded bg-spice-100 dark:bg-slate-800 text-spice-300 dark:text-slate-400"
                        title={`${key}: ${String(value)}`}
                      >
                        {String(value)}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer: category */}
                <div className="flex items-center pt-2 mt-1 border-t border-spice-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-xs text-spice-300 dark:text-slate-400">
                    <Package className="h-3 w-3" />
                    <span className="line-clamp-1">{product.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

