import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Scissors, 
  ShoppingBag, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Layers, 
  Clock, 
  Heart,
  ChevronRight
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { storage, getGeneralEnquiryWhatsApp, getBlouseStitchingWhatsApp } from '../services/storage';
import { ProductCard } from '../components/products/ProductCard';
import { ProductModal } from '../components/products/ProductModal';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = storage.getProducts();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const services = storage.getServices();

  const featuredCategories = [
    {
      title: 'Customized Blouse Stitching',
      desc: 'Flawless fitting, tailored sleeve cuts & durable seams',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
      link: '/services',
      badge: 'Tailoring Service'
    },
    {
      title: 'Designer & Bridal Blouses',
      desc: 'Maggam work, aari embroidery & wedding neck patterns',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      link: '/services',
      badge: 'Bridal Specialty'
    },
    {
      title: 'Party-Wear Stitching',
      desc: 'Reception gowns, designer suits & festive wear',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
      link: '/services',
      badge: 'Party Tailoring'
    },
    {
      title: 'Function and Festive Wear',
      desc: 'Elegant traditional ensembles crafted for celebrations',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
      link: '/shop/party-wear',
      badge: 'Festive Wear'
    },
    {
      title: 'Sarees',
      desc: 'Kanchipuram, soft silk & daily cotton sarees',
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      link: '/shop/sarees',
      badge: 'Retail Product'
    },
    {
      title: 'Salwar Suits',
      desc: 'Ready-to-wear Anarkalis, churidars & semi-stitched sets',
      image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=600&q=80',
      link: '/shop/salwar-suits',
      badge: 'Retail Product'
    },
    {
      title: 'Nighties & Daily Comfort',
      desc: '100% breathable pure cotton printed nightwear with pockets',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80',
      link: '/shop/nighties',
      badge: 'Daily Wear'
    },
    {
      title: 'Kurtis and Daily Wear',
      desc: 'Chic rayon & cotton kurtis for office and daily elegance',
      image: 'https://images.unsplash.com/photo-1596783049514-98c47a505b39?auto=format&fit=crop&w=600&q=80',
      link: '/shop/kurtis',
      badge: 'Retail Product'
    },
    {
      title: 'All Ladies’ Tailoring & Alterations',
      desc: 'Complete garment resizing, sleeve adjustment, fall & pico',
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=600&q=80',
      link: '/services',
      badge: 'Alterations'
    }
  ];

  const whyChooseUs = [
    {
      title: 'Customized Designs to Suit Customer Preferences',
      desc: 'Bring your favourite neck pattern, sleeve style, or bridal Pinterest reference. We stitch garments to match your unique personal style.',
      icon: Scissors
    },
    {
      title: 'Personalized Fitting',
      desc: 'Tailored specifically for your body measurements ensuring snug bust lines, comfortable armholes, and graceful drape.',
      icon: CheckCircle2
    },
    {
      title: 'Traditional and Modern Fashion',
      desc: 'From sacred Kanchipuram bridal blouses with aari work to contemporary boat neck cutouts, trendy gowns, and modern salwar cuts.',
      icon: Sparkles
    },
    {
      title: 'Quality Stitching and Finishing',
      desc: 'Double-locked seams, sturdy cotton linings, smooth piping, durable hooks, and ample inner margins for hassle-free future adjustments.',
      icon: Layers
    },
    {
      title: 'Clothing for Weddings, Festivals & Daily Wear',
      desc: 'One complete boutique destination in Karamadai for both grand festive occasions and comfortable everyday nighties and kurtis.',
      icon: Heart
    },
    {
      title: 'Convenient WhatsApp Enquiry Facility',
      desc: 'Easily send blouse photos, clarify stitching charges, check product stock, and track your order directly on WhatsApp.',
      icon: MessageCircle
    },
    {
      title: 'Local Service in Karamadai & Surrounding Areas',
      desc: 'Centrally located near HDFC Bank and Post Office in Karamadai. Friendly local service you can trust in person.',
      icon: MapPin
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf4f7] via-[#fefcf9] to-white border-b border-[#ede4d1]">
        {/* Decorative background embellishments */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#fad0e1]/40 to-[#f6e082]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#ede4d1]/50 to-[#fce7f0]/30 blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Landmark Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fce7f0] border border-[#d4af37]/40 text-[#6b1126] text-xs font-semibold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#b8911c]" />
                <span>Karamadai’s Trusted Ladies’ Boutique</span>
              </div>

              {/* Main Heading from prompt */}
              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#6b1126] leading-tight tracking-tight">
                  Welcome to Rev’s Boutique
                </h1>
                <p className="font-serif text-lg sm:text-2xl text-[#b8911c] font-medium italic">
                  Your Favourite Destination for Ladies’ Stitching and Fashion in Karamadai.
                </p>
              </div>

              {/* Description from prompt */}
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From customized designer blouses and bridal stitching to party wear, function wear, sarees, salwar suits, and nighties, discover beautiful styles for every occasion at Rev’s Boutique.
              </p>

              {/* Functional CTA Buttons specified in Prompt */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <Link
                  to="/services"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#6b1126] to-[#54091a] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:from-[#7a1027] hover:to-[#6b1126] transition border border-[#d4af37]/30 flex items-center gap-2"
                >
                  <Scissors className="w-4 h-4 text-[#f6e082]" />
                  <span>Book Your Stitching</span>
                </Link>

                <Link
                  to="/shop"
                  className="px-6 py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#c59b27] text-[#34040e] font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Now</span>
                </Link>

                <Link
                  to="/gallery"
                  className="px-5 py-3.5 rounded-2xl bg-white hover:bg-[#fcf7ed] text-stone-800 border border-[#ede4d1] font-semibold text-xs sm:text-sm shadow-2xs transition"
                >
                  Explore Collections
                </Link>

                <a
                  href={getGeneralEnquiryWhatsApp()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs sm:text-sm shadow-2xs transition flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Verified Trust Badges */}
              <div className="pt-6 border-t border-[#ede4d1]/80 grid grid-cols-3 gap-4 text-left max-w-lg mx-auto lg:mx-0">
                <div className="space-y-0.5">
                  <span className="font-serif text-lg font-bold text-[#6b1126]">100%</span>
                  <p className="text-[11px] text-stone-500">Customized Tailoring</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-serif text-lg font-bold text-[#b8911c]">Aari & Maggam</span>
                  <p className="text-[11px] text-stone-500">Bridal Embroidery</p>
                </div>
                <div className="space-y-0.5">
                  <span className="font-serif text-lg font-bold text-[#6b1126]">Local</span>
                  <p className="text-[11px] text-stone-500">Karamadai Landmark</p>
                </div>
              </div>
            </div>

            {/* Right Fashion Banner Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card */}
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
                    alt="Bridal Blouse & Saree Elegance at Rev's Boutique Karamadai"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a0815]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#f6e082]">
                      “Your Style, Our Stitching”
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">
                      Handcrafted Bridal & Designer Blouses
                    </h3>
                    <p className="text-xs text-[#fce7f0]/80 mt-1">
                      Near HDFC Bank and Post Office, Karamadai
                    </p>
                  </div>
                </div>

                {/* Floating Overlay Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#ede4d1] max-w-xs hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#fce7f0] flex items-center justify-center text-[#6b1126] flex-shrink-0">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Online Tailoring Booking</h4>
                    <p className="text-[11px] text-stone-500">Submit measurements or request a callback</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c]">
            Explore By Department
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#6b1126]">
            Featured Categories
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Choose from custom ladies’ tailoring services or shop our ready-to-wear boutique clothing collections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCategories.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-200 transition-all duration-300 flex flex-col h-72 bg-white"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-700"
              />
              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#34040e]/95 via-[#34040e]/40 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f6e082] bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs self-start mb-1.5">
                  {cat.badge}
                </span>
                <h3 className="font-serif text-lg font-bold group-hover:text-[#f6e082] transition-colors flex items-center justify-between">
                  <span>{cat.title}</span>
                  <ChevronRight className="w-4 h-4 text-[#f6e082] transform group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-[#fce7f0]/80 mt-1 line-clamp-2">
                  {cat.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products and Latest Designs Grid */}
      <section className="bg-white py-14 border-y border-[#ede4d1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c]">
                Ready-to-Wear Catalogue
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#6b1126] mt-1">
                Featured Products & New Arrivals
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Real demonstration items available at Rev’s Boutique Karamadai. Add to cart or enquire on WhatsApp.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6b1126] hover:text-[#b8911c] transition"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedProduct} 
              />
            ))}
          </div>

          {/* Dedicated Section for Latest Blouse Patterns & Embroidery */}
          <div className="mt-14 pt-12 border-t border-stone-200">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6b1126]">
                Bespoke Tailoring Showcase
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Latest Blouse Patterns & Embroidery Work
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
                Explore our popular stitching styles. Order customized blouse stitching matching your exact saree fabric.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.slice(0, 3).map(service => (
                <div 
                  key={service.id}
                  className="bg-[#fefcf9] rounded-2xl border border-[#ede4d1] overflow-hidden shadow-2xs hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div className="aspect-16/10 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#6b1126] text-white text-[10px] font-bold">
                      {service.deliveryDaysEstimate}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {service.name}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>
                      <ul className="mt-3 space-y-1 text-[11px] text-stone-500">
                        {service.features.slice(0, 3).map((f, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-[#b8911c] flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#b8911c]">
                        {service.priceNote}
                      </span>
                      <Link
                        to="/book-stitching"
                        className="px-3.5 py-1.5 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white text-xs font-semibold shadow-2xs transition"
                      >
                        Book Stitching
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Rev’s Boutique? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c]">
            Our Distinction
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#6b1126]">
            Why Choose Rev’s Boutique?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Honest ladies’ tailoring craftsmanship and quality ethnic clothing built on care, personal fit, and friendly local service in Karamadai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#d4af37] transition space-y-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#fce7f0] text-[#6b1126] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-stone-900">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Location and Contact Banner (Strictly Verified Landmark) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#4a0815] via-[#6b1126] to-[#54091a] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#d4af37]/40 relative overflow-hidden">
          {/* Subtle gold accent ring */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full border border-[#d4af37]/20 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f6e082]/15 text-[#f6e082] text-xs font-semibold border border-[#d4af37]/30">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Us in Karamadai</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Visit Rev’s Boutique
              </h2>

              <p className="text-sm sm:text-base text-[#fce7f0] leading-relaxed">
                <strong>Landmark:</strong> Near HDFC Bank and Post Office, Karamadai, Tamil Nadu, India.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-[#f6e082]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Phone className="w-4 h-4" />
                  <span>Call: 8300141583</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: +918300141583</span>
                </div>
              </div>
            </div>

            {/* Action Buttons from prompt */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={`tel:${settings.phone}`}
                className="py-3 px-6 rounded-2xl bg-white hover:bg-stone-100 text-[#6b1126] font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#6b1126]" />
                <span>Call Now (8300141583)</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('HDFC Bank Post Office Karamadai Tamil Nadu')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-2xl bg-[#d4af37] hover:bg-[#c59b27] text-[#34040e] font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                <span>Get Directions (Near HDFC Bank & Post Office)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
