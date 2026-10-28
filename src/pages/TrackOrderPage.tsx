import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Phone,
  AlertCircle
} from 'lucide-react';
import { storage, getOrderWhatsAppMessage } from '../services/storage';
import { Order, OrderStatus } from '../types';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [orderNumber, setOrderNumber] = useState(initialRef);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const statusSteps: OrderStatus[] = [
    'Order Received',
    'Confirmed',
    'Processing',
    'Ready for Dispatch',
    'Shipped',
    'Delivered'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!orderNumber.trim()) {
      setErrorMsg('Please enter your order reference number (e.g. REV-ORD-5001).');
      return;
    }

    const found = storage.getOrderByNumber(orderNumber.trim());
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setErrorMsg(`No order found matching "${orderNumber.trim()}". Please verify your reference number or contact Rev’s Boutique.`);
    }
  };

  useEffect(() => {
    if (initialRef) {
      const found = storage.getOrderByNumber(initialRef);
      if (found) setSearchedOrder(found);
    }
  }, [initialRef]);

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30">
          Live Order Status
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6b1126]">
          Track Your Shopping Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Enter your order number received after ordering online or via WhatsApp to see live delivery updates in Karamadai.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="flex bg-white rounded-2xl border-2 border-[#ede4d1] focus-within:border-[#d4af37] shadow-sm overflow-hidden p-1.5">
          <input
            type="text"
            placeholder="e.g. REV-ORD-5011"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 py-2 px-3 text-xs sm:text-sm text-stone-800 focus:outline-hidden uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </div>
        {errorMsg && (
          <p className="text-xs text-red-600 mt-2 text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </p>
        )}
      </form>

      {/* Order Status Display */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs text-stone-400 block">Order Reference</span>
              <h2 className="font-mono text-xl font-bold text-[#6b1126]">
                {searchedOrder.orderNumber}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-400 block">Current Status</span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#fce7f0] text-[#6b1126] font-bold text-xs">
                {searchedOrder.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          {searchedOrder.status !== 'Cancelled' ? (
            <div className="space-y-4">
              <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-100 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-[#d4af37] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (getStepIndex(searchedOrder.status) / (statusSteps.length - 1)) * 100)}%`
                  }}
                />

                {statusSteps.map((step, idx) => {
                  const currentIndex = getStepIndex(searchedOrder.status);
                  const isCompleted = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#6b1126] text-white ring-4 ring-[#fce7f0]'
                          : isCompleted
                          ? 'bg-[#d4af37] text-[#34040e]'
                          : 'bg-stone-200 text-stone-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <span className={`text-[10px] font-medium mt-2 hidden sm:block text-center max-w-[70px] leading-tight ${
                        isCurrent ? 'text-[#6b1126] font-bold' : 'text-stone-500'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="sm:hidden text-center text-xs font-semibold text-[#6b1126]">
                Step {getStepIndex(searchedOrder.status) + 1} of {statusSteps.length}: {searchedOrder.status}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs text-center font-medium">
              This order has been marked as Cancelled. Please contact the boutique for questions.
            </div>
          )}

          {/* Tracking Notes from boutique */}
          {searchedOrder.trackingNotes && (
            <div className="p-4 rounded-2xl bg-[#fcf7ed] border border-[#ede4d1] text-xs text-stone-700 space-y-1">
              <span className="font-bold text-[#b8911c] block">Boutique Update Note:</span>
              <p>{searchedOrder.trackingNotes}</p>
            </div>
          )}

          {/* Order Details Brief */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-[#fefcf9] p-4 rounded-2xl border border-stone-100">
            <div>
              <span className="font-bold text-stone-800 block mb-1">Customer & Delivery:</span>
              <p>{searchedOrder.customerName} ({searchedOrder.mobileNumber})</p>
              <p>{searchedOrder.deliveryAddress}, {searchedOrder.city} - {searchedOrder.pinCode}</p>
            </div>
            <div>
              <span className="font-bold text-stone-800 block mb-1">Payment & Amount:</span>
              <p>Total: <strong className="text-stone-900">₹{searchedOrder.finalAmount}</strong> ({searchedOrder.paymentMethod})</p>
              <p>Status: <span className="capitalize font-semibold">{searchedOrder.paymentStatus}</span></p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={getOrderWhatsAppMessage(searchedOrder)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Boutique on WhatsApp</span>
            </a>
            <Link
              to={`/order-confirmation/${searchedOrder.orderNumber}`}
              className="px-6 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition text-center"
            >
              View Full Invoice
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
