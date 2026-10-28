import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { buildWhatsAppLink } from '../../services/storage';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryCharge, 
    totalAmount 
  } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const freeShippingDifference = settings.freeDeliveryThreshold - subtotal;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / settings.freeDeliveryThreshold) * 100));

  const handleSendCartToWhatsApp = () => {
    let msg = `*CART ENQUIRY - REV’S BOUTIQUE (KARAMADAI)*\n\n`;
    msg += `Hello! I would like to order the following items from your boutique:\n\n`;
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fefcf9] border-l border-[#ede4d1] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#ede4d1] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#6b1126]" />
              <h2 className="font-serif text-lg font-bold text-[#6b1126]">Your Shopping Bag</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#fce7f0] text-[#6b1126]">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#fcf7ed] px-4 py-3 border-b border-[#ede4d1] text-xs">
            {freeShippingDifference > 0 ? (
              <p className="text-stone-700 font-medium mb-1.5">
                Add <span className="font-bold text-[#6b1126]">₹{freeShippingDifference}</span> more for <span className="text-emerald-700 font-bold">FREE Delivery</span> in Karamadai!
              </p>
            ) : (
              <p className="text-emerald-700 font-bold mb-1.5 flex items-center gap-1">
                🎉 Congratulations! You qualify for FREE Delivery!
              </p>
            )}
            <div className="w-full bg-[#ede4d1] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#d4af37] to-[#6b1126] h-full transition-all duration-300 rounded-full" 
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#fce7f0] flex items-center justify-center text-[#6b1126]">
                  <ShoppingBag className="w-8 h-8 opacity-75" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-stone-800">Your bag is empty</h3>
                  <p className="text-xs text-stone-500">
                    Explore our sarees, salwar suits, kurtis, and designer blouses.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#6b1126] text-white text-xs font-semibold hover:bg-[#54091a] shadow-sm transition"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map(item => {
                const unitPrice = item.product.discountedPrice || item.product.price;
                return (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-3 bg-white p-3 rounded-xl border border-stone-100 shadow-2xs hover:border-[#ede4d1] transition"
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-20 h-24 object-cover rounded-lg flex-shrink-0 bg-stone-100"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-sm font-medium text-stone-800 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                            className="text-stone-400 hover:text-red-600 transition p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">
                          Size: <span className="font-semibold text-stone-700">{item.selectedSize}</span> | Color: <span className="font-semibold text-stone-700">{item.selectedColor}</span>
                        </p>
                        <p className="text-[11px] text-stone-400">Code: {item.product.code}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-50">
                        <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 transition"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-semibold text-stone-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="p-1 hover:bg-stone-200 text-stone-600 transition"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-stone-400 mr-1.5">
                            ₹{unitPrice} × {item.quantity}
                          </span>
                          <span className="text-sm font-bold text-[#6b1126]">
                            ₹{unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-[#ede4d1] space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Charges (Karamadai & surroundings)</span>
                  <span className={deliveryCharge === 0 ? "font-bold text-emerald-700" : "font-semibold text-stone-800"}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 pt-1.5 border-t border-stone-100">
                  <span>Estimated Total</span>
                  <span className="text-base text-[#6b1126]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Option A: Send Cart to WhatsApp */}
              <button
                onClick={handleSendCartToWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Cart to WhatsApp (Instant Confirmation)</span>
              </button>

              {/* Option B: Proceed to Online Checkout */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-2 px-3 text-center rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-medium text-xs transition"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs shadow-sm transition"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <p className="text-[10px] text-stone-400 text-center">
                📍 Pick up at Rev’s Boutique (Near HDFC Bank & Post Office, Karamadai) or local doorstep delivery.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
