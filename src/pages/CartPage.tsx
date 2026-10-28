import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  MessageCircle, 
  ShieldCheck, 
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { buildWhatsAppLink } from '../services/storage';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    deliveryCharge, 
    totalAmount 
  } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const freeShippingDifference = settings.freeDeliveryThreshold - subtotal;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / settings.freeDeliveryThreshold) * 100));

  const handleSendCartToWhatsApp = () => {
    let msg = `*CART ORDER ENQUIRY - REV’S BOUTIQUE (KARAMADAI)*\n\n`;
    msg += `Hello! I would like to order the following items:\n\n`;
    cart.forEach((item, index) => {
      const price = item.product.discountedPrice || item.product.price;
      msg += `${index + 1}. *${item.product.name}*\n`;
      msg += `   Code: ${item.product.code} | Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      msg += `   Qty: ${item.quantity} × ₹${price} = ₹${price * item.quantity}\n\n`;
    });
    msg += `*Subtotal:* ₹${subtotal}\n`;
    msg += `*Estimated Delivery:* ${deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}\n`;
    msg += `*Estimated Total:* ₹${totalAmount}\n\n`;
    msg += `Please confirm availability and how I can receive or pick up these items in Karamadai.`;

    const url = buildWhatsAppLink(msg, settings.whatsappNumber);
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#fce7f0] text-[#6b1126] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 opacity-75" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Your Shopping Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            You haven’t added any items to your bag yet. Explore our latest sarees, salwar suits, kurtis, and nighties!
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs sm:text-sm shadow-md transition"
          >
            <span>Explore Boutique Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#6b1126]">Home</Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold">Shopping Bag</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#6b1126]">
          Shopping Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h1>
      </div>

      {/* Free Shipping Meter */}
      <div className="bg-[#fcf7ed] p-4 rounded-2xl border border-[#ede4d1] text-xs space-y-2">
        {freeShippingDifference > 0 ? (
          <p className="text-stone-700 font-medium">
            Add <span className="font-bold text-[#6b1126]">₹{freeShippingDifference}</span> more to get <span className="text-emerald-700 font-bold">FREE Delivery</span> in Karamadai & nearby areas!
          </p>
        ) : (
          <p className="text-emerald-700 font-bold">
            🎉 Congratulations! Your order qualifies for FREE Delivery in Karamadai!
          </p>
        )}
        <div className="w-full bg-[#ede4d1] h-2 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#d4af37] to-[#6b1126] h-full rounded-full transition-all duration-300" 
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs divide-y divide-stone-100">
            {cart.map((item) => {
              const unitPrice = item.product.discountedPrice || item.product.price;
              return (
                <div 
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover object-top rounded-xl border border-stone-100 bg-stone-50 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#b8911c] uppercase tracking-wider block">
                        {item.product.category.replace('-', ' ')}
                      </span>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-serif text-sm sm:text-base font-bold text-stone-900 hover:text-[#6b1126] transition">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-stone-500">
                        Size: <span className="font-semibold text-stone-700">{item.selectedSize}</span> | Color: <span className="font-semibold text-stone-700">{item.selectedColor}</span>
                      </p>
                      <p className="text-[11px] text-stone-400">Code: {item.product.code}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-stone-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                        className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right min-w-[80px]">
                      <span className="text-sm sm:text-base font-bold text-[#6b1126] block">
                        ₹{unitPrice * item.quantity}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        ₹{unitPrice} each
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-stone-400 hover:text-red-600 p-1 transition"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs">
            <Link to="/shop" className="text-stone-600 hover:text-[#6b1126] flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-red-600 hover:underline"
            >
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery (Karamadai & surroundings)</span>
                <span className={deliveryCharge === 0 ? "font-bold text-emerald-700" : "font-semibold text-stone-800"}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-100">
                <span>Final Amount</span>
                <span className="text-lg text-[#6b1126]">₹{totalAmount}</span>
              </div>
            </div>

            {/* Option A: WhatsApp ordering */}
            <button
              onClick={handleSendCartToWhatsApp}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Cart to WhatsApp (+918300141583)</span>
            </button>

            {/* Option B: Online checkout */}
            <Link
              to="/checkout"
              className="w-full py-3.5 px-4 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Online Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 text-[11px] text-stone-400 space-y-1.5 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b8911c]" />
                <span>Pickup at boutique or local delivery in Karamadai</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on delivery / Pay at boutique supported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
