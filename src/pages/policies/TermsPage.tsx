import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const TermsPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="space-y-2">
        <Link to="/" className="text-xs font-semibold text-stone-500 hover:text-[#6b1126] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#6b1126]">
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-500">
          Rev’s Boutique • Karamadai, Tamil Nadu, India
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            1. Agreement to Terms
          </h2>
          <p>
            By accessing or ordering from Rev’s Boutique, you agree to these Terms and Conditions. Rev’s Boutique operates as both an in-store tailoring studio in Karamadai and an online catalogue & shopping service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            2. Tailoring Services & Enquiries
          </h2>
          <p>
            Submitting a stitching booking or enquiry via the website indicates interest and intent to discuss tailoring requirements. Submitting an enquiry does not constitute an automatically confirmed contract until Rev’s Boutique verifies fabric suitability, schedule availability, and pricing with the customer.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            3. Pricing & Product Descriptions
          </h2>
          <p>
            Prices are listed in Indian Rupees (₹). While we strive for absolute accuracy, handmade fabrics and custom aari embroideries may have slight artisanal variations in texture, color tone, or dye lot compared to display photographs. Demonstration items are clearly indicated during developmental phases.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            4. WhatsApp Orders
          </h2>
          <p>
            When customers choose the "Order via WhatsApp" facility, the message sent conveys an order summary. The order becomes binding upon mutual WhatsApp confirmation and acceptance of stock availability and dispatch terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            5. Governing Law
          </h2>
          <p>
            These terms are governed by and construed in accordance with the laws of Tamil Nadu and the Republic of India.
          </p>
        </section>
      </div>
    </div>
  );
};
