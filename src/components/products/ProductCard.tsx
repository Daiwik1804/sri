import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, MessageCircle, Eye, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { getProductEnquiryWhatsApp } from '../../services/storage';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();

  const currentPrice = product.discountedPrice || product.price;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100) 
    : 0;

  return (
    <div className="group bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#ede4d1] transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isNewArrival && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#6b1126] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
              New Arrival
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-[#d4af37] text-[#34040e] text-[10px] font-bold shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {product.isDemo && (
            <span className="px-2 py-0.5 rounded-full bg-white/90 text-stone-600 text-[9px] font-medium backdrop-blur-xs border border-stone-200">
              Demo Model
            </span>
          )}
        </div>

        {/* Stock status overlay if out of stock */}
        {!product.isAvailable || product.stock === 0 ? (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
            <span className="px-3 py-1 bg-white text-stone-800 text-xs font-bold rounded-full shadow-md uppercase">
              Made to Order / Out of Stock
            </span>
          </div>
        ) : null}

        {/* Quick View Button overlay on hover */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/95 text-stone-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#6b1126] hover:text-white"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span className="uppercase font-semibold tracking-wider text-[#b8911c]">
              {product.category.replace('-', ' ')}
            </span>
            <span>{product.code}</span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-serif text-sm font-semibold text-stone-900 group-hover:text-[#6b1126] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {product.fabric && (
            <p className="text-[11px] text-stone-500 mt-1">
              Fabric: <span className="text-stone-700 font-medium">{product.fabric}</span>
            </p>
          )}

          {/* Sizes available pill list */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.sizes.slice(0, 3).map((size) => (
                <span 
                  key={size}
                  className="px-1.5 py-0.5 rounded bg-stone-50 border border-stone-200 text-[10px] text-stone-600"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-[10px] text-stone-400 self-center">
                  +{product.sizes.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Price & Actions */}
        <div className="pt-2 border-t border-stone-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-[#6b1126]">
              ₹{currentPrice}
            </span>
            {hasDiscount && (
              <span className="text-xs text-stone-400 line-through">
                ₹{product.price}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.isAvailable || product.stock === 0}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#6b1126] hover:bg-[#54091a] disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-xs transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <a
              href={getProductEnquiryWhatsApp(product.name, product.code, currentPrice)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold transition"
              title="Enquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Enquire</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
