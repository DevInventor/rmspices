import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, Package } from 'lucide-react';
import type { Product } from '../../utils/translations';

interface ProductCardProps {
  product: Product;
  language?: 'eng' | 'ger';
  showDetails?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  language = 'eng',
  showDetails = true,
  className = ''
}) => {
  const detailedProduct = product as Product & {
    shortDescription?: string;
    details?: {
      culinaryUses?: string;
      healthBenefits?: string;
    };
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={`flex flex-col gap-4 rounded-lg border border-spice-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 group ${className}`}
    >
      {/* Product Image */}
      <div
        className="w-full aspect-square bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${product.image || product.backgroundImage || product.productImage})` }}
      />
        
      {/* Product Info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold leading-tight text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>
        
        {/* Description */}
        {showDetails && (
          <p className="text-spice-300 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
            {detailedProduct.shortDescription || product.description}
          </p>
        )}
        
        {/* Key Features */}
        {showDetails && detailedProduct.details && (
          <div className="flex flex-col gap-2 mt-2">
            {detailedProduct.details.culinaryUses && (
              <div className="flex items-start gap-2">
                <ChefHat className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-spice-300 dark:text-slate-400 line-clamp-1">
                  {language === 'eng' ? 'Culinary Uses' : 'Kulinarische Verwendung'}
                </p>
              </div>
            )}
            {detailedProduct.details.healthBenefits && (
              <div className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-spice-300 dark:text-slate-400 line-clamp-1">
                  {language === 'eng' ? 'Health Benefits' : 'Gesundheitsvorteile'}
                </p>
              </div>
            )}
          </div>
        )}
        
        {/* Quick Specs */}
        {showDetails && (
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
              <span
                key={key}
                className="text-xs px-2 py-1 rounded bg-spice-100 dark:bg-slate-800 text-spice-300 dark:text-slate-400"
              >
                {String(value)}
              </span>
            ))}
          </div>
        )}
        
        {/* Origin & Category */}
        {showDetails && (
          <div className="flex flex-col gap-1 text-xs text-spice-300 dark:text-slate-400 mt-2">
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3" />
              <span>{product.category}</span>
            </div>
            <span className="text-xs">
              {language === 'eng' ? 'Origin:' : 'Herkunft:'} {product.origin}
            </span>
          </div>
        )}
        
        {/* View Details Link */}
        {showDetails && (
          <div className="mt-2 pt-2 border-t border-spice-100 dark:border-slate-800">
            <span className="text-primary-500 text-sm font-medium group-hover:underline">
              {language === 'eng' ? 'View Details →' : 'Details anzeigen →'}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

