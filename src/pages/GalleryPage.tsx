import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  X, 
  Scissors, 
  MessageCircle, 
  ZoomIn, 
  Info,
  Filter
} from 'lucide-react';
import { storage, getBlouseStitchingWhatsApp } from '../services/storage';
import { GalleryCategory, GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const galleryItems = storage.getGallery();

  const categories: GalleryCategory[] = [
    'All',
    'Designer Blouses',
    'Bridal Blouses',
    'Traditional Blouses',
    'Embroidery Designs',
    'Party Wear',
    'Sarees',
    'Salwar Suits',
    'Nighties',
    'Kurtis',
    'Festive Collections'
  ];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-10 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30">
          Fashion Inspiration & Pattern Ideas
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6b1126]">
          Fashion & Blouse Pattern Gallery
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Explore design inspirations for bridal blouses, intricate maggam handwork, stylish neckline cutouts, and festive Indian wear tailored at Rev’s Boutique in Karamadai.
        </p>

        {/* Clear Inspiration vs Sale distinction banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fefcf9] border border-[#ede4d1] text-xs text-stone-600 text-left max-w-xl mx-auto mt-2">
          <Info className="w-4 h-4 text-[#b8911c] flex-shrink-0" />
          <span>
            <strong>Note:</strong> Gallery images feature design inspirations and custom craftsmanship references. To buy ready-made stock, please browse our <Link to="/shop" className="text-[#6b1126] font-bold underline">Shop Catalogue</Link>.
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#6b1126] text-white shadow-2xs'
                : 'bg-white text-stone-700 hover:bg-[#fcf7ed] border border-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-2xs hover:shadow-xl cursor-pointer transition-all duration-300 flex flex-col"
          >
            <div className="aspect-4/5 overflow-hidden bg-stone-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-3 rounded-full bg-white/90 text-stone-900 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <ZoomIn className="w-5 h-5 text-[#6b1126]" />
                </span>
              </div>

              {/* Tag Badge */}
              <div className="absolute top-2.5 left-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#6b1126]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-1">
              <h3 className="font-serif text-sm font-semibold text-stone-900 line-clamp-1 group-hover:text-[#6b1126] transition">
                {item.title}
              </h3>
              <p className="text-[11px] text-stone-500 line-clamp-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
            onClick={() => setLightboxItem(null)}
          />

          <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] sm:max-h-[65vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>

            <div className="p-6 space-y-4 bg-white">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-bold text-[#b8911c] uppercase tracking-wider">
                  {lightboxItem.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#fcf7ed] text-stone-600 font-medium">
                  Fashion Reference
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {lightboxItem.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {lightboxItem.description}
                </p>
              </div>

              {/* Tags */}
              {lightboxItem.tags && lightboxItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {lightboxItem.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px]">
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to={`/book-stitching?design=${encodeURIComponent(lightboxItem.title)}`}
                  onClick={() => setLightboxItem(null)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white text-xs font-semibold shadow-xs transition"
                >
                  <Scissors className="w-4 h-4 text-[#f6e082]" />
                  <span>Stitch this Design</span>
                </Link>

                <a
                  href={getBlouseStitchingWhatsApp(lightboxItem.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ask Charges on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
