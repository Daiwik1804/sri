import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Scissors, ShieldCheck, Heart, Lock } from 'lucide-react';
import { Logo } from './Logo';
import { useSettings } from '../../context/SettingsContext';

export const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-gradient-to-b from-[#4a0815] to-[#2c040b] text-[#fdfaf5] pt-14 pb-8 border-t-2 border-[#d4af37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" />
            <p className="text-xs sm:text-sm text-[#fce7f0]/80 leading-relaxed max-w-md">
              {settings.supportingTagline} From bridal blouses and intricate aari embroidery to graceful sarees, salwar suits, kurtis, and nighties, Rev’s Boutique is Karamadai’s cherished ladies’ fashion and tailoring destination.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-[#fce7f0]/90">
                <MapPin className="w-4 h-4 text-[#f6e082] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Rev’s Boutique:</strong> {settings.landmark}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-[#fce7f0]/90">
                <Phone className="w-4 h-4 text-[#f6e082] flex-shrink-0" />
                <span>Call Us: <a href={`tel:${settings.phone}`} className="text-[#f6e082] font-semibold hover:underline">{settings.phone}</a></span>
              </div>
              <div className="flex items-center gap-2.5 text-[#fce7f0]/90">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>WhatsApp: <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald-300 font-semibold hover:underline">+{settings.whatsappNumber}</a></span>
              </div>
            </div>
          </div>

          {/* Stitching Services */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-[#f6e082] uppercase tracking-wider flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-[#d4af37]" /> Stitching Services
            </h3>
            <ul className="space-y-2 text-xs text-[#fce7f0]/75">
              <li><Link to="/services" className="hover:text-white transition">Bridal & Wedding Blouses</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Designer & Party Blouses</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Aari & Embroidery Work</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Salwar Kameez & Churidar</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Anarkali Suits & Gowns</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Customized Kurtis</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Alterations & Fitting</Link></li>
              <li><Link to="/book-stitching" className="text-[#f6e082] font-semibold hover:underline">Book Tailoring Online →</Link></li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-[#f6e082] uppercase tracking-wider">
              Shop Collections
            </h3>
            <ul className="space-y-2 text-xs text-[#fce7f0]/75">
              <li><Link to="/shop/sarees" className="hover:text-white transition">Sarees (Silk & Festive)</Link></li>
              <li><Link to="/shop/salwar-suits" className="hover:text-white transition">Salwar Suits & Anarkalis</Link></li>
              <li><Link to="/shop/nighties" className="hover:text-white transition">Nighties & Daily Wear</Link></li>
              <li><Link to="/shop/designer-blouses" className="hover:text-white transition">Designer Readymade Blouses</Link></li>
              <li><Link to="/shop/party-wear" className="hover:text-white transition">Party & Function Wear</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Browse All Products</Link></li>
              <li><Link to="/gallery" className="text-[#f6e082] hover:underline">Fashion Inspiration Gallery</Link></li>
            </ul>
          </div>

          {/* Customer & Policies */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-[#f6e082] uppercase tracking-wider">
              Help & Policies
            </h3>
            <ul className="space-y-2 text-xs text-[#fce7f0]/75">
              <li><Link to="/track-enquiry" className="hover:text-white transition">Track Stitching Status</Link></li>
              <li><Link to="/track-order" className="hover:text-white transition">Track Shopping Order</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact & Shop Landmark</Link></li>
              <li><Link to="/stitching-policy" className="hover:text-white transition">Stitching & Alteration Policy</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-white transition">Shipping, Returns & Cancellation</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li className="pt-2">
                <Link to="/admin" className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 transition">
                  <Lock className="w-3 h-3 text-[#d4af37]" />
                  <span>Admin Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Local SEO Note */}
        <div className="py-6 border-b border-white/5 text-[11px] text-[#fce7f0]/60 leading-relaxed">
          <p>
            <strong>Rev’s Boutique — Karamadai, Tamil Nadu:</strong> Serving women across Karamadai, Mettupalayam, Coimbatore rural, and neighbouring areas with custom blouse stitching, aari embroidery, salwar tailoring, festive sarees, and daily nightwear. Located conveniently near HDFC Bank and Post Office, Karamadai.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fce7f0]/60">
          <p>© {new Date().getFullYear()} Rev’s Boutique. All rights reserved. “Your Style, Our Stitching.”</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Local Boutique
            </span>
            <span>Karamadai, Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
