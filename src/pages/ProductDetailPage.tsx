import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { storage, getProductEnquiryWhatsApp } from '../services/storage';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/products/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = storage.getProductById(id || '');

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0] || '');
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-800">Product Not Found</h2>
        <p className="text-xs text-stone-500">The product you are looking for may have been updated or removed.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6b1126] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const currentPrice = product.discountedPrice || product.price;
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100) 
    : 0;

  const relatedProducts = storage
    .getProducts()
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  return (
    <div className="space-y-12 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-stone-500">
        <Link to="/" className="hover:text-[#6b1126]">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#6b1126]">Shop</Link>
        <span>/</span>
        <Link to={`/shop/${product.category}`} className="hover:text-[#6b1126] capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-stone-800 font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-xs">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-4/5 rounded-2xl overflow-hidden bg-stone-100 shadow-inner relative group">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#d4af37] text-[#34040e] text-xs font-bold shadow-md">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    (selectedImage || product.images[0]) === img
                      ? 'border-[#6b1126] shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="uppercase font-bold tracking-wider text-[#b8911c]">
                {product.category.replace('-', ' ')}
              </span>
              <span className="font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                Code: {product.code}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              {product.name}
            </h1>

            {/* Price section */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-[#6b1126]">
                ₹{currentPrice}
              </span>
              {hasDiscount && (
                <span className="text-base text-stone-400 line-through">
                  ₹{product.price}
                </span>
              )}
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                Available in Karamadai ({product.stock} units)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Fabric & Care Specs */}
            <div className="bg-[#fefcf9] p-4 rounded-2xl border border-[#ede4d1] grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block">Fabric Material</span>
                <span className="font-semibold text-stone-800">{product.fabric || 'Standard Boutique Fabric'}</span>
              </div>
              <div>
                <span className="text-stone-400 block">Wash & Care</span>
                <span className="font-semibold text-stone-800">{product.careInstructions || 'Gentle wash or dry clean'}</span>
              </div>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-800">Select Size:</span>
                  <span className="text-[#6b1126] font-medium">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                        selectedSize === size
                          ? 'bg-[#6b1126] text-white border-[#6b1126] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-stone-800">Available Colors:</span>
                  <span className="text-[#b8911c] font-medium">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                        selectedColor === color
                          ? 'bg-[#d4af37] text-[#34040e] border-[#d4af37] font-bold shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="pt-2 flex items-center gap-4">
              <span className="text-xs font-semibold text-stone-800">Quantity:</span>
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-stone-600 hover:bg-stone-200"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-semibold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-sm font-bold text-stone-600 hover:bg-stone-200"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-stone-100">
            {addedToast && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added {quantity} item(s) to your shopping bag!</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.isAvailable || product.stock === 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={!product.isAvailable || product.stock === 0}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#d4af37] hover:bg-[#c59b27] text-[#34040e] font-bold text-xs sm:text-sm shadow-md transition disabled:opacity-50"
              >
                <span>Buy Now • Checkout</span>
              </button>
            </div>

            {/* Option A: WhatsApp Enquiry */}
            <a
              href={getProductEnquiryWhatsApp(
                product.name,
                product.code,
                currentPrice
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-xs transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Enquire & Order on WhatsApp (+918300141583)</span>
            </a>

            {/* Landmark reassurance */}
            <div className="pt-2 flex items-center justify-center gap-2 text-stone-500 text-xs">
              <MapPin className="w-3.5 h-3.5 text-[#b8911c]" />
              <span>Available for pickup or local delivery in Karamadai</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Related Styles
            </h3>
            <Link to="/shop" className="text-xs font-semibold text-[#6b1126] hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
