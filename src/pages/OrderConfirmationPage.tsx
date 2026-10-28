import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Printer, 
  MessageCircle, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { storage, getOrderWhatsAppMessage } from '../services/storage';

export const OrderConfirmationPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const order = storage.getOrderByNumber(orderNumber || '');

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-800">Order Reference Not Found</h2>
        <p className="text-xs text-stone-500">Please check your order reference number or contact Rev’s Boutique.</p>
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6b1126] text-white text-xs font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Success Badge & Headline */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Placed Successfully
        </span>
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Thank You For Shopping at Rev’s Boutique!
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          We have received your order. Our Karamadai boutique team is preparing your items.
        </p>
      </div>

      {/* Printable Receipt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 print:border-none print:shadow-none">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-stone-100">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#6b1126]">
              Rev’s Boutique
            </h2>
            <p className="text-xs text-stone-500">
              Near HDFC Bank and Post Office, Karamadai, Tamil Nadu
            </p>
            <p className="text-xs text-stone-500">
              Phone: 8300141583 | WhatsApp: +918300141583
            </p>
          </div>

          <div className="text-left sm:text-right bg-[#fcf7ed] p-3 rounded-2xl border border-[#ede4d1]">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">
              Order Reference
            </span>
            <span className="font-mono text-lg font-bold text-[#6b1126]">
              {order.orderNumber}
            </span>
            <span className="text-[11px] text-stone-500 block mt-0.5">
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Customer & Delivery Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-[#fefcf9] p-4 rounded-2xl border border-stone-100">
          <div className="space-y-1">
            <span className="font-bold text-stone-800 block">Customer Information:</span>
            <p>Name: <strong className="text-stone-900">{order.customerName}</strong></p>
            <p>Mobile: <strong className="text-stone-900">{order.mobileNumber}</strong></p>
            {order.email && <p>Email: {order.email}</p>}
          </div>

          <div className="space-y-1">
            <span className="font-bold text-stone-800 block">Delivery Address:</span>
            <p>{order.deliveryAddress}</p>
            <p>{order.city} - {order.pinCode}</p>
            <p className="text-[11px] text-[#b8911c] font-medium pt-0.5">
              Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod === 'pay_at_shop' ? 'Pay at Boutique Pickup' : 'Online / WhatsApp Order'}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wide">
            Ordered Items
          </h3>
          <div className="divide-y divide-stone-100 border-t border-b border-stone-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-12 h-14 object-cover rounded-lg border border-stone-100 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-stone-900">{item.productName}</h4>
                    <p className="text-[11px] text-stone-500">
                      Code: {item.productCode} | Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="text-[11px] text-stone-400">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="text-right font-bold text-stone-900">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-2 text-xs text-stone-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-stone-800">₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges:</span>
            <span className={order.deliveryCharge === 0 ? "font-bold text-emerald-700" : "font-semibold text-stone-800"}>
              {order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
            <span>Total Payable:</span>
            <span className="text-[#6b1126]">₹{order.finalAmount}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="p-4 rounded-2xl bg-[#fcf7ed] border border-[#ede4d1] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#b8911c]" />
            <span className="text-stone-700">Order Status:</span>
            <span className="font-bold text-[#6b1126] bg-[#fce7f0] px-2.5 py-0.5 rounded-full">
              {order.status}
            </span>
          </div>
          <Link 
            to={`/track-order?ref=${order.orderNumber}`}
            className="text-xs font-semibold text-[#6b1126] hover:underline"
          >
            Live Tracking →
          </Link>
        </div>
      </div>

      {/* Actions (WhatsApp, Print, Continue) */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center print:hidden">
        <a
          href={getOrderWhatsAppMessage(order)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Send Order on WhatsApp (+918300141583)</span>
        </a>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-xs shadow-2xs transition flex items-center justify-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <Link
          to="/shop"
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};
