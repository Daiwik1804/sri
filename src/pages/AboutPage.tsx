import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scissors, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  MapPin, 
  Phone, 
  MessageCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export const AboutPage: React.FC = () => {
  const { settings } = useSettings();

  const qualityPoints = [
    {
      title: 'Flawless Fit & Precision Measurements',
      desc: 'Every garment is cut according to individual body measurements, with tailored armhole curves, bust shaping, and neat neckline depths.'
    },
    {
      title: 'Clean Seams & Generous Margin',
      desc: 'We reinforce seams with strong thread locking and leave up to 2 inches of inner allowance so you can comfortably loosen or tighten garments later.'
    },
    {
      title: 'Premium Linings & Hand Finishing',
      desc: 'Comfortable pre-shrunk cotton lining for blouses and dresses, sturdy metal hooks, hand-hemmed borders, and neat edge piping.'
    },
    {
      title: 'Artisanal Embroidery Work',
      desc: 'Handcrafted aari work, zardozi motifs, mirror embroidery, and delicate beads crafted with patient artisan attention.'
    }
  ];

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero / Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3 py-1 rounded-full border border-[#d4af37]/30">
          Our Story & Craftsmanship
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6b1126]">
          About Rev’s Boutique
        </h1>
        <p className="font-serif text-base sm:text-xl text-[#b8911c] italic">
          “{settings.tagline}”
        </p>
      </div>

      {/* Main Introduction Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#ede4d1] space-y-6">
          <div className="space-y-4 text-stone-700 leading-relaxed text-sm sm:text-base">
            <p className="font-medium text-stone-900 text-base sm:text-lg">
              {settings.aboutText}
            </p>
            <p>
              Located in the heart of Karamadai, near the HDFC Bank and Post Office, Rev’s Boutique was established to provide women in our town and surrounding areas with reliable, personalized tailoring and thoughtfully curated Indian fashion.
            </p>
            <p>
              We understand that true elegance is rooted in the perfect fit. A well-stitched blouse transforms a saree into a masterpiece; a tailored salwar suit ensures day-long confidence; and comfortable cotton nighties make home life truly relaxing.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-100 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-stone-600">
              <MapPin className="w-4 h-4 text-[#d4af37]" />
              <span>{settings.landmark}</span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={`tel:${settings.phone}`}
                className="text-xs font-bold text-[#6b1126] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call: {settings.phone}
              </a>
              <span className="text-stone-300">•</span>
              <a 
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp: +{settings.whatsappNumber}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#fdf4f7] to-[#fefcf9] rounded-3xl p-8 sm:p-12 border border-[#fad0e1] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#6b1126]">
              Our Guiding Purpose
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {settings.missionText}
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              We believe in respectful, honest customer service. Whether you need a simple blouse alteration, a daily wear kurti, or an ornate bridal muhurtham blouse, we give every garment the care and attention it deserves.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#ede4d1] shadow-2xs space-y-2">
              <Scissors className="w-6 h-6 text-[#6b1126]" />
              <h4 className="font-serif font-bold text-sm text-stone-900">Custom Fitting</h4>
              <p className="text-[11px] text-stone-500">Every design tailored to individual body curves.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#ede4d1] shadow-2xs space-y-2">
              <Sparkles className="w-6 h-6 text-[#b8911c]" />
              <h4 className="font-serif font-bold text-sm text-stone-900">Bridal Finishing</h4>
              <p className="text-[11px] text-stone-500">Maggam work, aari embroidery & bridal back-cuts.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#ede4d1] shadow-2xs space-y-2">
              <ShoppingBag className="w-6 h-6 text-[#6b1126]" />
              <h4 className="font-serif font-bold text-sm text-stone-900">Retail Clothing</h4>
              <p className="text-[11px] text-stone-500">Sarees, salwars, nighties, kurtis ready in stock.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#ede4d1] shadow-2xs space-y-2">
              <Heart className="w-6 h-6 text-[#b8911c]" />
              <h4 className="font-serif font-bold text-sm text-stone-900">Local Trust</h4>
              <p className="text-[11px] text-stone-500">Centrally located in Karamadai near Post Office.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Stitching Services & Collections Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Stitching Services Card */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fce7f0] text-[#6b1126] flex items-center justify-center">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Our Stitching Services
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We specialize in custom ladies’ tailoring for all occasions. From classic 4-tuck everyday blouses to elaborate wedding aari-work bridal blouses, flared Anarkalis, churidar suits, festive gowns, and precise garment alterations.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#b8911c]" />
                <span>Bridal and wedding blouses with aari & zardozi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#b8911c]" />
                <span>Modern cuts: boat neck, sweetheart, deep back & potli dori</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#b8911c]" />
                <span>Salwar kameez, patiala, and floor-length Anarkali suits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#b8911c]" />
                <span>Prompt garment alterations and saree fall-pico</span>
              </li>
            </ul>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6b1126] hover:text-[#b8911c] pt-4"
          >
            <span>View All Tailoring Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Clothing Collections Card */}
        <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#fcf7ed] text-[#b8911c] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Our Clothing Collections
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              In addition to bespoke tailoring, Rev’s Boutique carries a delightful variety of women’s ethnic clothing for purchase. Customers in Karamadai can shop online or inspect fabrics in-store.
            </p>
            <ul className="space-y-1.5 text-xs text-stone-600 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6b1126]" />
                <span>Silk, festive, and everyday drape sarees</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6b1126]" />
                <span>Readymade & semi-stitched salwar kameez sets</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6b1126]" />
                <span>100% pure cotton daily-wear printed nighties</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6b1126]" />
                <span>Trendy office and festive kurtis & tunics</span>
              </li>
            </ul>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#6b1126] hover:text-[#b8911c] pt-4"
          >
            <span>Explore Clothing Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Our Commitment to Quality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fefcf9] rounded-3xl p-8 sm:p-12 border border-[#ede4d1] space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c]">
              Excellence in Every Stitch
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#6b1126]">
              Our Commitment to Quality
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              We handle every fabric with meticulous care from cutting to finishing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPoints.map((q, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-stone-100 shadow-2xs space-y-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#fce7f0] text-[#6b1126] flex items-center justify-center text-xs font-bold">
                  0{idx + 1}
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900">
                  {q.title}
                </h4>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {q.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/book-stitching"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white text-xs sm:text-sm font-semibold shadow-md transition"
            >
              <Scissors className="w-4 h-4 text-[#f6e082]" />
              <span>Book Your Tailoring Appointment</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
