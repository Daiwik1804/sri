import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  MessageCircle, 
  MapPin, 
  AlertCircle,
  Truck,
  CreditCard
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { storage, getOrderWhatsAppMessage } from '../services/storage';
import { OrderItem, PaymentMethod } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, deliveryCharge, totalAmount, clearCart } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Karamadai');
  const [pinCode, setPinCode] = useState('641104');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-800">Your bag is empty</h2>
        <p className="text-xs text-stone-500">Please add items to your shopping bag before proceeding to checkout.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6b1126] text-white text-xs font-semibold"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  const orderItems: OrderItem[] = cart.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    productCode: item.product.code,
    price: item.product.discountedPrice || item.product.price,
    quantity: item.quantity,
    selectedSize: item.selectedSize,
    selectedColor: item.selectedColor,
    image: item.product.images[0]
  }));

  // Handle Option A: WhatsApp Ordering
  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const newOrder = storage.createOrder({
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.replace(/\D/g, ''),
      email: email.trim() || undefined,
      deliveryAddress: deliveryAddress.trim(),
      city: city.trim(),
      pinCode: pinCode.trim(),
      orderNotes: orderNotes.trim() || undefined,
      items: orderItems,
      subtotal,
      deliveryCharge,
      discount: 0,
      finalAmount: totalAmount,
      orderType: 'whatsapp',
      paymentMethod: 'whatsapp_order',
      paymentStatus: 'pending'
    });

    const url = getOrderWhatsAppMessage(newOrder);
    window.open(url, '_blank');
    clearCart();
    navigate(`/order-confirmation/${newOrder.orderNumber}`);
  };

  // Handle Option B: Online Ordering (Website Database)
  const handleOnlineOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const newOrder = storage.createOrder({
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.replace(/\D/g, ''),
      email: email.trim() || undefined,
      deliveryAddress: deliveryAddress.trim(),
      city: city.trim(),
      pinCode: pinCode.trim(),
      orderNotes: orderNotes.trim() || undefined,
      items: orderItems,
      subtotal,
      deliveryCharge,
      discount: 0,
      finalAmount: totalAmount,
      orderType: 'online',
      paymentMethod,
      paymentStatus: paymentMethod === 'pay_at_shop' ? 'paid_at_shop' : 'pending'
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    clearCart();
    navigate(`/order-confirmation/${newOrder.orderNumber}`);
  };

  const validateForm = (): boolean => {
    setErrorMsg('');
    if (!customerName.trim()) {
      setErrorMsg('Please enter customer full name.');
      return false;
    }
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!deliveryAddress.trim()) {
      setErrorMsg('Please enter your full delivery address.');
      return false;
    }
    if (!pinCode.trim() || pinCode.length < 6) {
      setErrorMsg('Please enter a valid 6-digit postal PIN code.');
      return false;
    }
    return true;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/cart" className="hover:text-[#6b1126] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold">Secure Checkout</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#6b1126]">
          Complete Your Order
        </h1>
        <p className="text-xs text-stone-600">
          Rev’s Boutique • Near HDFC Bank & Post Office, Karamadai
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6b1126]" />
              <span>Customer & Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavitha Sundaram"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-stone-200 bg-stone-50 text-stone-600 text-xs font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-r-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery Address / House / Flat / Street <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. No. 14, Gandhi Nagar, Near Mariamman Temple"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City / Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Karamadai, Mettupalayam, Coimbatore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Postal PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="e.g. 641104"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Order Notes / Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver after 5 PM or keep for boutique pickup"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <label className="block text-xs font-semibold text-stone-800">
                Choose Payment / Settlement Method:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <label className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'cod' ? 'border-[#6b1126] bg-[#fce7f0]/40 shadow-xs' : 'border-stone-200 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 text-[#6b1126] focus:ring-[#6b1126]"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-stone-500">Pay when your order is delivered to your doorstep in Karamadai</span>
                  </div>
                </label>

                <label className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition ${
                  paymentMethod === 'pay_at_shop' ? 'border-[#6b1126] bg-[#fce7f0]/40 shadow-xs' : 'border-stone-200 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="pay_at_shop"
                    checked={paymentMethod === 'pay_at_shop'}
                    onChange={() => setPaymentMethod('pay_at_shop')}
                    className="mt-0.5 text-[#6b1126] focus:ring-[#6b1126]"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">Pay at Boutique Pickup</span>
                    <span className="text-[11px] text-stone-500">Pay via Cash, GPay, PhonePe or Card at the shop near HDFC Bank</span>
                  </div>
                </label>
              </div>

              {/* Online payment gateway configuration status notice */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Secure Checkout Guarantee:</strong> Rev’s Boutique never collects or stores raw customer credit/debit card numbers in the database. When online card gateways are enabled, verified UPI and gateway services are used directly.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Review & Ordering Options (Option A & Option B) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-6 sticky top-28">
            <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
              Order Review ({cart.length} items)
            </h2>

            {/* Selected items miniature breakdown */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-stone-100">
              {cart.map((item) => {
                const unitPrice = item.product.discountedPrice || item.product.price;
                return (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="pt-2 first:pt-0 flex gap-3 items-center">
                    <img 
                      src={item.product.images[0]} 
                      alt="" 
                      className="w-12 h-14 object-cover rounded-lg border border-stone-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-stone-800 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} • {item.selectedSize}
                      </p>
                    </div>
                    <div className="text-right text-xs font-bold text-[#6b1126]">
                      ₹{unitPrice * item.quantity}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-stone-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charge</span>
                <span className={deliveryCharge === 0 ? "font-bold text-emerald-700" : "font-semibold text-stone-800"}>
                  {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-100">
                <span>Final Payable Amount</span>
                <span className="text-lg text-[#6b1126]">₹{totalAmount}</span>
              </div>
            </div>

            {/* Two Ordering Options from Prompt */}
            <div className="space-y-3 pt-2">
              {/* Option A: WhatsApp Ordering */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Option A: Order via WhatsApp (Direct Chat)</span>
              </button>

              {/* Option B: Online Ordering */}
              <button
                type="button"
                onClick={handleOnlineOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-[#f6e082]" />
                <span>Option B: Place Order Online (Save to Store)</span>
              </button>
            </div>

            <p className="text-[11px] text-stone-400 text-center leading-relaxed">
              📍 Rev’s Boutique confirms stock, size, and dispatch schedule with you immediately upon receiving your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
