import React, { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { getProductEnquiryWhatsApp } from '../../services/storage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product?.images[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const currentPrice = product.discountedPrice || product.price;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#ede4d1] z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-sm transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery View */}
          <div className="p-6 bg-[#fefcf9] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ede4d1]">
            <div className="aspect-3/4 rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition ${
                      (selectedImage || product.images[0]) === img 
                        ? 'border-[#6b1126] shadow-xs' 
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Controls */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span className="uppercase tracking-wider font-semibold text-[#b8911c]">
                  {product.category.replace('-', ' ')}
                </span>
                <span>•</span>
                <span>{product.code}</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-bold text-[#6b1126]">
                  ₹{currentPrice}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-stone-400 line-through">
                    ₹{product.price}
                  </span>
                )}
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                  In Stock ({product.stock} available in Karamadai)
                </span>
              </div>

              <p className="text-xs text-stone-600 mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-700">Select Size:</span>
                    <span className="text-stone-500">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition ${
                          selectedSize === s
                            ? 'bg-[#6b1126] text-white border-[#6b1126]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-stone-700">Select Color:</span>
                    <span className="text-stone-500">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition ${
                          selectedColor === c
                            ? 'bg-[#d4af37] text-[#34040e] border-[#d4af37] font-bold'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold text-stone-600 hover:bg-stone-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-semibold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1 text-sm font-bold text-stone-600 hover:bg-stone-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable || product.stock === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-sm shadow-md transition disabled:opacity-50"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300 animate-bounce" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag • ₹{currentPrice * quantity}</span>
                  </>
                )}
              </button>

              <a
                href={getProductEnquiryWhatsApp(
                  product.name, 
                  product.code, 
                  currentPrice
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-semibold text-xs transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Enquire / Order on WhatsApp</span>
              </a>

              <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>Rev’s Boutique • Near HDFC Bank & Post Office, Karamadai</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
