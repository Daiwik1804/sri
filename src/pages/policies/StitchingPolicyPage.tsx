import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scissors, CheckCircle2 } from 'lucide-react';

export const StitchingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <div className="space-y-2">
        <Link to="/" className="text-xs font-semibold text-stone-500 hover:text-[#6b1126] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#6b1126]">
          Customized Stitching & Alteration Policy
        </h1>
        <p className="text-xs text-stone-500">
          Rev’s Boutique • Karamadai, Tamil Nadu
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xs space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#6b1126]" />
            <span>1. Measurements & Fit Assurance</span>
          </h2>
          <p>
            At Rev’s Boutique, our goal is a flattering, comfortable fit for every customer. Measurements can be taken directly at our shop in Karamadai or referenced from your favourite fitting sample blouse.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We leave a generous <strong>1.5 to 2 inches of inner seam margin</strong> inside all blouses and dresses to facilitate future tightening or loosening.</li>
            <li>We provide a complimentary trial fitting and minor adjustment check within 7 days of collection.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            2. Fabric Handling & Pre-Washing
          </h2>
          <p>
            For pure cotton fabrics that have a tendency to shrink, customers are advised to inform us or pre-wash the fabric prior to cutting. All lining fabrics supplied by Rev’s Boutique are thoroughly checked for quality and shrinkage resistance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            3. Bridal & Maggam Embroidery Timelines
          </h2>
          <p>
            Handcrafted aari and zardozi bridal blouses require detailed artisan work. We kindly request customers to order wedding and reception blouses at least 10 to 14 days prior to the auspicious date to allow adequate time for tracing, embroidery, stitching, and trial fittings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900">
            4. Garment Collection & Storage
          </h2>
          <p>
            Customers are notified via WhatsApp or phone call once their garments are ready for pickup. Garments can be collected during regular shop hours near HDFC Bank and Post Office, Karamadai.
          </p>
        </section>
      </div>
    </div>
  );
};
