import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const PrivacyPolicyPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="space-y-2">
        <Link to="/" className="text-xs font-semibold text-stone-500 hover:text-[#6b1126] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#6b1126]">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500">
          Last Updated: October 2026 • Rev’s Boutique, Karamadai, Tamil Nadu
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            1. Overview & Business Identity
          </h2>
          <p>
            Rev’s Boutique (“we”, “our”, or “us”), located near HDFC Bank and Post Office, Karamadai, Tamil Nadu, India, respects your personal privacy. This Privacy Policy describes how we collect, store, and handle your information when you browse our website, book stitching services, or purchase ladies’ clothing from us.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            2. Information We Collect
          </h2>
          <p>We only collect information necessary to fulfill stitching enquiries and deliver clothing orders:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact details:</strong> Customer name, mobile phone number, optional email address.</li>
            <li><strong>Delivery information:</strong> Shipping street address, landmark, town/city, and PIN code.</li>
            <li><strong>Tailoring details:</strong> Garment preferences, occasion dates, optional body measurements, and optional uploaded design reference photographs.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            3. Financial & Payment Data
          </h2>
          <p>
            Rev’s Boutique never collects, views, or stores customers’ credit card numbers, debit card numbers, or CVV codes directly on the website database. When online card or UPI payments are enabled, they are processed through verified, secure third-party payment gateways.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            4. How We Use Your Information
          </h2>
          <p>Your details are used exclusively for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processing tailoring enquiries and coordinating trial fitting appointments.</li>
            <li>Packing and delivering sarees, salwars, nighties, and kurtis to your designated address.</li>
            <li>Communicating order status or delivery updates via WhatsApp or telephone calls.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            5. Contacting Us About Privacy
          </h2>
          <p>
            If you have questions regarding your personal details or wish to request deletion of your order contact history, please call or WhatsApp us at <strong>{settings.phone}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
