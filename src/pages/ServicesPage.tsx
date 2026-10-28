import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  MessageCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { storage, getBlouseStitchingWhatsApp } from '../services/storage';
import { StitchingCategory, StitchingService } from '../types';

export const ServicesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const navigate = useNavigate();
  const services = storage.getServices();

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Stitching Services' },
    { id: 'blouse', name: 'Blouse Stitching & Bridal' },
    { id: 'salwar', name: 'Salwar Kameez & Anarkali' },
    { id: 'kurtis-gowns', name: 'Kurtis, Gowns & Dresses' },
    { id: 'alterations', name: 'Alterations & Fitting' }
  ];

  const blouseSpecialties = [
    'Customized blouse stitching',
    'Simple and everyday blouses',
    'Designer blouses',
    'Bridal and wedding blouses',
    'Party-wear blouses',
    'Traditional blouses',
    'Modern designer blouses',
    'Embroidery and decorative aari designs',
    'Sleeveless, puff, elbow & cap sleeve styles',
    'Customized neck designs (sweetheart, boat, potli)',
    'Back-design variations & stylish dori latkans',
    'Saree-matching blouses',
    'Festive and function-wear blouses'
  ];

  const tailoringSpecialties = [
    'Salwar kameez',
    'Churidar stitching',
    'Flared Anarkali suits',
    'Straight & A-line kurtis',
    'Festive & reception gowns',
    'Party-wear dresses',
    'Bridal & function-wear garments',
    'Festive clothing',
    'Traditional outfits',
    'Other customized ladies’ garments'
  ];

  return (
    <div className="space-y-12 sm:space-y-16 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30">
          Tailored to Perfection in Karamadai
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6b1126]">
          Complete Ladies’ Stitching Services
        </h1>
        <p className="text-xs sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
          From customized designer blouses and ornate bridal aari work to salwar suits, gowns, and everyday alterations, our tailoring combines precise fitting with graceful Indian fashion.
        </p>
      </div>

      {/* Specialty Highlights Pill Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fefcf9] border border-[#ede4d1] rounded-3xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-[#6b1126]" />
            <h3 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wide">
              Blouse Styles & Tailoring Capabilities
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {blouseSpecialties.map((item, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-medium hover:border-[#d4af37] transition"
              >
                ✨ {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-stone-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                selectedCategory === cat.id
                  ? 'bg-[#6b1126] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-[#fcf7ed] border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#ede4d1] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Delivery Badge */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold">
                  <Clock className="w-3 h-3 text-[#f6e082]" />
                  <span>Est: {service.deliveryDaysEstimate}</span>
                </div>
                {service.isPopular && (
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#d4af37] text-[#34040e] text-[10px] font-bold uppercase tracking-wider">
                    Customer Favourite
                  </div>
                )}
              </div>

              {/* Service Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                    {service.name}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      Included with Tailoring:
                    </span>
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b8911c] flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons from prompt */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-500">Stitching Charges:</span>
                    <span className="font-bold text-[#6b1126] text-sm">
                      {service.priceNote}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to={`/book-stitching?service=${encodeURIComponent(service.name)}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white text-xs font-semibold shadow-xs transition"
                    >
                      <Scissors className="w-3.5 h-3.5 text-[#f6e082]" />
                      <span>Request Stitching</span>
                    </Link>

                    <a
                      href={getBlouseStitchingWhatsApp(service.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tailoring & Alteration Scope Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#fcf7ed] to-white rounded-3xl p-8 border border-[#ede4d1] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c]">
              Other Ladies’ Tailoring & Fitting
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Custom Garments & Expert Alterations in Karamadai
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We also handle complete custom stitching and alterations for readymade garments purchased anywhere:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {tailoringSpecialties.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 bg-white rounded-xl border border-stone-200 text-xs font-medium text-stone-700 text-center shadow-2xs hover:border-[#6b1126] transition"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#ede4d1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Free trial fitting & minor adjustment included within 7 days of collection.</span>
            </div>

            <Link
              to="/book-stitching"
              className="px-5 py-2.5 rounded-xl bg-[#6b1126] text-white font-semibold hover:bg-[#54091a] transition flex items-center gap-1.5"
            >
              <span>Book Online Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
