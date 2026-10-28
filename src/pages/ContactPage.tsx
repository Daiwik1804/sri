import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Mail, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Navigation,
  Globe,
  Share2
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { storage, buildWhatsAppLink } from '../services/storage';

export const ContactPage: React.FC = () => {
  const { settings } = useSettings();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    storage.createContactMessage(name.trim(), phone.trim(), message.trim());
    setSubmitted(true);
  };

  const getCustomWhatsAppLink = () => {
    const text = `Hello Rev’s Boutique! My name is ${name}. Phone: ${phone}. Enquiry: ${message}`;
    return buildWhatsAppLink(text, settings.whatsappNumber);
  };

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('HDFC Bank Post Office Karamadai Tamil Nadu')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30">
          We’d Love to Welcome You
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#6b1126]">
          Contact Rev’s Boutique
        </h1>
        <p className="text-xs sm:text-base text-stone-600 max-w-xl mx-auto">
          Visit our ladies’ tailoring and fashion boutique in Karamadai or contact us directly on phone or WhatsApp.
        </p>
      </div>

      {/* Main 3 Action CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href={`tel:${settings.phone}`}
          className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-lg hover:border-[#6b1126] transition text-center space-y-2 flex flex-col items-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#fce7f0] text-[#6b1126] flex items-center justify-center group-hover:scale-105 transition">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-900">Call Now</h3>
          <p className="text-sm font-semibold text-[#6b1126]">{settings.phone}</p>
          <span className="text-[11px] text-stone-400">Direct phone call</span>
        </a>

        <a
          href={`https://wa.me/${settings.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-2xs hover:shadow-lg hover:bg-emerald-100 transition text-center space-y-2 flex flex-col items-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-emerald-950">WhatsApp Us</h3>
          <p className="text-sm font-bold text-emerald-700">+{settings.whatsappNumber}</p>
          <span className="text-[11px] text-emerald-600">Instant chat & blouse photos</span>
        </a>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-[#fcf7ed] border border-[#ede4d1] shadow-2xs hover:shadow-lg hover:border-[#d4af37] transition text-center space-y-2 flex flex-col items-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-[#34040e] flex items-center justify-center group-hover:scale-105 transition">
            <Navigation className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base font-bold text-stone-900">Get Directions</h3>
          <p className="text-xs font-semibold text-[#b8911c]">Near HDFC Bank & Post Office</p>
          <span className="text-[11px] text-stone-500">Karamadai, Tamil Nadu</span>
        </a>
      </div>

      {/* Grid: Contact Form & Store Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Store Information Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-xl font-bold text-[#6b1126]">
              Rev’s Boutique
            </h2>
            <p className="text-xs text-stone-500">
              “{settings.tagline}”
            </p>
          </div>

          <div className="space-y-4 text-xs text-stone-600">
            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-800 block">Boutique Landmark:</strong>
                <p className="text-stone-700 leading-relaxed">{settings.landmark}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Karamadai, Tamil Nadu, India</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-800 block">Phone Support:</strong>
                <a href={`tel:${settings.phone}`} className="text-[#6b1126] font-bold hover:underline">
                  {settings.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3">
              <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-800 block">WhatsApp Number:</strong>
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                  +{settings.whatsappNumber}
                </a>
              </div>
            </div>

            {/* Opening Hours (Editable placeholder) */}
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-800 block">Tailoring Hours & Appointments:</strong>
                <p className="text-stone-600 leading-relaxed">{settings.openingHoursPlaceholder}</p>
              </div>
            </div>

            {/* Email placeholder */}
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-800 block">Electronic Enquiries:</strong>
                <p className="text-stone-600">{settings.emailPlaceholder}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-4 border-t border-stone-100 space-y-2">
            <span className="text-xs font-semibold text-stone-700 block">
              Follow & Connect:
            </span>
            <div className="flex gap-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <span className="p-2.5 rounded-xl bg-stone-100 text-stone-400" title="Instagram (placeholder)">
                <Share2 className="w-4 h-4" />
              </span>
              <span className="p-2.5 rounded-xl bg-stone-100 text-stone-400" title="Facebook (placeholder)">
                <Globe className="w-4 h-4" />
              </span>
            </div>
            <p className="text-[10px] text-stone-400">
              Social accounts can be updated directly from website settings by the boutique owner.
            </p>
          </div>
        </div>

        {/* Contact Enquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs">
          {submitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you for contacting Rev’s Boutique. We will get back to you shortly on {phone}.
              </p>
              <div className="pt-2">
                <a
                  href={getCustomWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Continue on WhatsApp</span>
                </a>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-stone-500 hover:underline block mx-auto mt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-stone-900">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-stone-500">
                  Have a question about blouse stitching charges, fabric availability, or custom appointments? Send us a note.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya M."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Message / Tailoring Enquiry <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. I need customized blouse stitching for a silk saree for a wedding next month. How many days does it take?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#f6e082]" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps / Landmark Card */}
      <div className="bg-[#fefcf9] rounded-3xl border border-[#ede4d1] p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#b8911c]" />
              <span>Location Landmark: Near HDFC Bank and Post Office</span>
            </h3>
            <p className="text-xs text-stone-500">
              Karamadai, Tamil Nadu 641104
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:border-[#d4af37] text-stone-800 text-xs font-semibold shadow-2xs transition flex items-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-[#b8911c]" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        {/* Embedded Map Representation */}
        <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-stone-200 relative bg-stone-100 flex items-center justify-center">
          <iframe
            title="Rev's Boutique Karamadai Landmark"
            src="https://maps.google.com/maps?q=HDFC+Bank+Post+Office+Karamadai+Tamil+Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};
