import React, { useState } from 'react';
import { MessageCircle, X, Scissors, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { 
  getGeneralEnquiryWhatsApp, 
  getBlouseStitchingWhatsApp, 
  buildWhatsAppLink 
} from '../../services/storage';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const stockQueryLink = buildWhatsAppLink(
    "Hello Rev’s Boutique! I would like to check availability for sarees, salwar suits, and clothing currently in stock at your Karamadai shop.",
    settings.whatsappNumber
  );

  const directionsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'HDFC Bank and Post Office, Karamadai, Tamil Nadu'
  )}`;

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end">
      {/* Quick Action Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-[#ede4d1] overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#6b1126] to-[#54091a] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#f6e082]">Rev’s Boutique</h4>
                  <p className="text-[11px] text-white/80">Karamadai, Tamil Nadu • Typically replies fast</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#fce7f0]/90 mt-2">
              Vanakkam! How can we assist your fashion & tailoring needs today?
            </p>
          </div>

          {/* Action Options */}
          <div className="p-3 space-y-2 bg-[#fefcf9] text-xs">
            <a
              href={getGeneralEnquiryWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-100 hover:border-[#d4af37] hover:bg-[#fcf7ed] transition shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-stone-800 block">General Enquiry</span>
                <span className="text-[11px] text-stone-500">Ask about stitching or clothing</span>
              </div>
            </a>

            <a
              href={getBlouseStitchingWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-100 hover:border-[#d4af37] hover:bg-[#fcf7ed] transition shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#fce7f0] text-[#6b1126] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <Scissors className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-stone-800 block">Custom Blouse Stitching</span>
                <span className="text-[11px] text-stone-500">Bridal, aari work & designer blouses</span>
              </div>
            </a>

            <a
              href={stockQueryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-100 hover:border-[#d4af37] hover:bg-[#fcf7ed] transition shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-stone-800 block">Sarees, Salwars & Nighties</span>
                <span className="text-[11px] text-stone-500">Check current shop collection</span>
              </div>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-white border border-stone-200 text-stone-700 font-medium hover:bg-stone-50 transition text-[11px]"
              >
                <Phone className="w-3.5 h-3.5 text-[#6b1126]" />
                <span>Call Now</span>
              </a>
              <a
                href={directionsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-white border border-stone-200 text-stone-700 font-medium hover:bg-stone-50 transition text-[11px]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Shop Landmark</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Contact Rev’s Boutique on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-300"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </button>
    </div>
  );
};
