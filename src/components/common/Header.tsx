import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  ShoppingBag, 
  Scissors, 
  Menu, 
  X, 
  Search, 
  ChevronDown, 
  Clock, 
  Truck,
  Sparkles
} from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '../../context/CartContext';
import { useSettings } from '../../context/SettingsContext';
import { buildWhatsAppLink, getGeneralEnquiryWhatsApp } from '../../services/storage';
import { CartDrawer } from '../cart/CartDrawer';

export const Header: React.FC = () => {
  const { totalItems, setIsCartDrawerOpen } = useCart();
  const { settings } = useSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition py-1 relative ${
      isActive
        ? 'text-[#6b1126] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#d4af37]'
        : 'text-stone-700 hover:text-[#6b1126]'
    }`;

  const shopCategories = [
    { name: 'All Products', path: '/shop' },
    { name: 'Sarees', path: '/shop/sarees' },
    { name: 'Salwar Suits', path: '/shop/salwar-suits' },
    { name: 'Nighties & Daily Wear', path: '/shop/nighties' },
    { name: 'Designer Blouses', path: '/shop/designer-blouses' },
    { name: 'Party & Function Wear', path: '/shop/party-wear' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ede4d1] shadow-2xs">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#54091a] via-[#6b1126] to-[#4a0815] text-[#fdfaf5] text-[11px] sm:text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-flex items-center gap-1 font-medium bg-[#f6e082]/15 text-[#f6e082] px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider border border-[#d4af37]/30">
              <Sparkles className="w-2.5 h-2.5" /> Karamadai Boutique
            </span>
            <span className="truncate hidden sm:inline text-white/90">
              📍 Near HDFC Bank & Post Office, Karamadai, Tamil Nadu
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs flex-shrink-0">
            <Link 
              to="/track-enquiry" 
              className="hidden md:inline-flex items-center gap-1 text-[#fdfaf5]/85 hover:text-[#f6e082] transition"
            >
              <Clock className="w-3 h-3" />
              <span>Track Stitching</span>
            </Link>
            <Link 
              to="/track-order" 
              className="hidden md:inline-flex items-center gap-1 text-[#fdfaf5]/85 hover:text-[#f6e082] transition"
            >
              <Truck className="w-3 h-3" />
              <span>Track Order</span>
            </Link>
            <a 
              href={`tel:${settings.phone}`} 
              className="inline-flex items-center gap-1 font-semibold text-[#f6e082] hover:underline"
            >
              <Phone className="w-3 h-3" />
              <span>{settings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop Search Bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm relative mx-4"
          >
            <input
              type="text"
              placeholder="Search blouses, sarees, salwar, nighties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fcf7ed] border border-[#ede4d1] rounded-full py-2 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
          </form>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
            <NavLink to="/services" className={navLinkClass}>Stitching Services</NavLink>

            {/* Shop Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1 text-sm font-medium text-stone-700 hover:text-[#6b1126] py-1 transition"
                onClick={() => navigate('/shop')}
              >
                <span>Shop</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-[#ede4d1] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.path}
                      to={cat.path}
                      onClick={() => setShopDropdownOpen(false)}
                      className="block px-4 py-2 text-xs text-stone-700 hover:bg-[#fcf7ed] hover:text-[#6b1126] font-medium transition"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/gallery" className={navLinkClass}>Gallery</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact Us</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Quick CTA */}
            <a
              href={getGeneralEnquiryWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition shadow-2xs"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Book Stitching Primary CTA */}
            <Link
              to="/book-stitching"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#6b1126] to-[#54091a] text-white text-xs font-semibold hover:from-[#7a1027] hover:to-[#6b1126] shadow-sm hover:shadow transition border border-[#d4af37]/30"
            >
              <Scissors className="w-3.5 h-3.5 text-[#f6e082]" />
              <span className="hidden xs:inline">Book Stitching</span>
              <span className="xs:hidden">Book</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-[#6b1126] hover:bg-[#fcf7ed] transition"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#d4af37] text-[#4a0815] font-bold text-[10px] flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:text-[#6b1126] hover:bg-stone-100 lg:hidden transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#ede4d1] bg-white animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search blouses, sarees, salwar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fcf7ed] border border-[#ede4d1] rounded-full py-2 pl-9 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            </form>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col space-y-1 text-sm font-medium">
              <NavLink 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#fcf7ed] text-stone-800 hover:text-[#6b1126]"
              >
                Home
              </NavLink>
              <NavLink 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#fcf7ed] text-stone-800 hover:text-[#6b1126]"
              >
                About Us
              </NavLink>
              <NavLink 
                to="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#fcf7ed] text-stone-800 hover:text-[#6b1126]"
              >
                Stitching Services
              </NavLink>
              
              <div className="pl-3 py-1 space-y-1 border-l-2 border-[#d4af37]/40 ml-2">
                <span className="text-[11px] font-bold text-[#6b1126] uppercase tracking-wider block mb-1">
                  Shop Categories
                </span>
                {shopCategories.map(cat => (
                  <NavLink
                    key={cat.path}
                    to={cat.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-1 text-xs text-stone-600 hover:text-[#6b1126]"
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>

              <NavLink 
                to="/gallery" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#fcf7ed] text-stone-800 hover:text-[#6b1126]"
              >
                Gallery & Inspiration
              </NavLink>
              <NavLink 
                to="/book-stitching" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-[#fce7f0] text-[#6b1126] font-semibold flex items-center justify-between"
              >
                <span>Book Stitching</span>
                <Scissors className="w-4 h-4" />
              </NavLink>
              <NavLink 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-[#fcf7ed] text-stone-800 hover:text-[#6b1126]"
              >
                Contact Us & Landmark
              </NavLink>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
                <Link 
                  to="/track-enquiry" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#6b1126] underline"
                >
                  Track Stitching Status
                </Link>
                <Link 
                  to="/track-order" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#6b1126] underline"
                >
                  Track Order
                </Link>
              </div>
            </nav>

            {/* Mobile Contact Quick Card */}
            <div className="p-3 rounded-xl bg-[#fcf7ed] border border-[#ede4d1] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800">Need help or tailoring advice?</span>
                <span className="text-[10px] bg-[#d4af37]/20 text-[#6b1126] px-1.5 py-0.5 rounded font-bold">Karamadai</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white border border-stone-200 text-stone-800 font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-[#6b1126]" />
                  <span>Call {settings.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 text-white font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer />
    </header>
  );
};
