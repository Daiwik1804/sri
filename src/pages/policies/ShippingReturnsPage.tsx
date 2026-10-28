import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, RotateCcw } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const ShippingReturnsPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="space-y-2">
        <Link to="/" className="text-xs font-semibold text-stone-500 hover:text-[#6b1126] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#6b1126]">
          Shipping, Returns & Cancellation Policy
        </h1>
        <p className="text-xs text-stone-500">
          Rev’s Boutique • Karamadai, Tamil Nadu
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#6b1126]" />
            <span>1. Shipping & Local Delivery (Karamadai & Surroundings)</span>
          </h2>
          <p>
            Rev’s Boutique provides prompt local delivery across Karamadai, Mettupalayam, and nearby areas, as well as postal shipping across Tamil Nadu.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Standard Delivery Charge:</strong> ₹{settings.standardDeliveryCharge} for orders under ₹{settings.freeDeliveryThreshold}.</li>
            <li><strong>Free Delivery:</strong> All clothing orders of ₹{settings.freeDeliveryThreshold} or higher qualify for free delivery!</li>
            <li><strong>Store Pickup:</strong> Customers may also choose free in-person collection at our shop near HDFC Bank and Post Office in Karamadai.</li>
            <li><strong>Estimated Time:</strong> In-stock clothing items are typically dispatched within 24 to 48 hours. Tailored garments follow the agreed stitching timeline.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#6b1126]" />
            <span>2. Returns & Exchanges (Retail Clothing)</span>
          </h2>
          <p>
            For unstitched sarees, salwars, kurtis, and nighties:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Exchange requests must be initiated within <strong>3 days</strong> of receiving the garment.</li>
            <li>Garments must remain unused, unwashed, with tags intact and in original packing condition.</li>
            <li>In the rare event of transit damage or a manufacturing defect, please notify us immediately via WhatsApp (+918300141583) with photos.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            3. Cancellation Policy
          </h2>
          <p>
            <strong>Retail Orders:</strong> Orders may be cancelled before dispatch by calling or messaging us on WhatsApp (+918300141583). Once dispatched, the exchange policy applies.
          </p>
          <p>
            <strong>Custom Tailoring Orders:</strong> Once fabric has been cut or embroidery handwork has commenced, tailoring orders cannot be cancelled.
          </p>
        </section>
      </div>
    </div>
  );
};
