import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Heart, MapPin } from 'lucide-react';
import type { Product } from '../../utils/translations';

interface TopSellingProductsProps {
  products: Product[];
  title?: string;
  maxProducts?: number;
}

export const TopSellingProducts: React.FC<TopSellingProductsProps> = ({ 
  products, 
  title = "Top Selling Products",
  maxProducts = 4 
}) => {
  // Filter products that have topSelling flag set to true
  const topSellingProducts = React.useMemo(() => {
    const filtered = products.filter(product => product.topSelling === true);
    return filtered.slice(0, maxProducts);
  }, [products, maxProducts]);

  if (topSellingProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
          {title}
        </h2>
      )}
      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex items-stretch p-4 gap-4">
          {topSellingProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group relative flex h-full w-[280px] flex-shrink-0 flex-col gap-4 rounded-xl border-2 border-primary-200 bg-white hover:border-primary-500 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Top Selling Badge */}
              <div className="absolute top-3 right-3 z-10 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                🔥 Top Seller
              </div>

              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <div
                  className="w-full aspect-square bg-center bg-no-repeat bg-cover"
                  style={{ 
                    backgroundImage: `url(${product.image || product.backgroundImage || product.productImage})` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-3 px-4 pb-4">
                <div>
                  <h3 className="text-lg font-bold leading-tight text-gray-900 group-hover:text-primary-500 transition-colors mb-1">
                    {product.name}
                  </h3>
                  <p className="text-spice-300 text-xs font-medium capitalize mb-2">
                    {product.category}
                  </p>
                </div>

                {/* Short Description */}
                <p className="text-spice-300 text-sm font-normal leading-normal line-clamp-2 min-h-[40px]">
                  {product.shortDescription || product.description}
                </p>

                {/* Key Features */}
                {product.details && (
                  <div className="flex flex-col gap-2 border-t border-spice-100 pt-3">
                    {product.details.culinaryUses && (
                      <div className="flex items-start gap-2">
                        <ChefHat className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-spice-300 line-clamp-1">
                          {product.details.culinaryUses}
                        </p>
                      </div>
                    )}
                    {product.details.healthBenefits && (
                      <div className="flex items-start gap-2">
                        <Heart className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-spice-300 line-clamp-1">
                          {product.details.healthBenefits}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Origin */}
                <div className="flex items-center gap-2 text-xs text-spice-300 border-t border-spice-100 pt-3">
                  <MapPin className="h-3.5 w-3.5 text-primary-500" />
                  <span>{product.origin}</span>
                </div>

                {/* Quick Specs */}
                {product.specifications && (
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                      <span
                        key={key}
                        className="text-xs px-2 py-1 rounded-md bg-primary-50 text-primary-700 font-medium"
                      >
                        {String(value)}
                      </span>
                    ))}
                  </div>
                )}

                {/* View Details Link */}
                <div className="mt-2 pt-3 border-t border-primary-100">
                  <span className="text-primary-500 text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
                    View Details <span className="text-xs">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

