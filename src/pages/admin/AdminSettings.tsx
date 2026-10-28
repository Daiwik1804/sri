import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Check, 
  Phone, 
  MessageCircle, 
  MapPin, 
  CreditCard, 
  Lock,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const [form, setForm] = useState({ ...settings });
  const [savedToast, setSavedToast] = useState(false);

  const handleChange = (field: string, val: any) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Website & Boutique Settings
          </h1>
          <p className="text-xs text-stone-500">
            Configure boutique phone numbers, Karamadai landmark, announcement banners, and delivery charges.
          </p>
        </div>

        {savedToast && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact & Landmark Settings */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 border-b pb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#6b1126]" />
            <span>Contact & Boutique Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Business Name</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Calling Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">WhatsApp Number (with country code)</label>
              <input
                type="tel"
                value={form.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Location Landmark (Verified)</label>
              <input
                type="text"
                value={form.landmark}
                onChange={(e) => handleChange('landmark', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>
          </div>
        </div>

        {/* Brand Taglines & Content */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 border-b pb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#b8911c]" />
            <span>Brand Identity & Taglines</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Primary Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Supporting Tagline</label>
              <input
                type="text"
                value={form.supportingTagline}
                onChange={(e) => handleChange('supportingTagline', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Announcement Top Bar Text</label>
              <input
                type="text"
                value={form.announcementText}
                onChange={(e) => handleChange('announcementText', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">About Us Text</label>
              <textarea
                rows={3}
                value={form.aboutText}
                onChange={(e) => handleChange('aboutText', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Opening Hours Note (Editable Placeholder)</label>
              <input
                type="text"
                value={form.openingHoursPlaceholder}
                onChange={(e) => handleChange('openingHoursPlaceholder', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>
          </div>
        </div>

        {/* Delivery & Payment Configuration */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 border-b pb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Delivery & Online Payment Gateway</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">Standard Delivery Fee (₹)</label>
              <input
                type="number"
                min={0}
                value={form.standardDeliveryCharge}
                onChange={(e) => handleChange('standardDeliveryCharge', Number(e.target.value))}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">Free Delivery Order Threshold (₹)</label>
              <input
                type="number"
                min={0}
                value={form.freeDeliveryThreshold}
                onChange={(e) => handleChange('freeDeliveryThreshold', Number(e.target.value))}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-stone-700 block mb-1">Razorpay Key ID (When ready for online payments)</label>
              <input
                type="text"
                placeholder="rzp_live_..."
                value={form.razorpayKeyId || ''}
                onChange={(e) => handleChange('razorpayKeyId', e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 font-mono"
              />
              <p className="text-[11px] text-stone-400 mt-1">
                Leave blank while using Cash on Delivery, WhatsApp orders, or Counter pickup.
              </p>
            </div>
          </div>
        </div>

        {/* Security & Admin PIN */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="font-serif text-base font-bold text-stone-900 border-b pb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#6b1126]" />
            <span>Admin PIN / Access Password</span>
          </h3>

          <div className="max-w-xs text-xs space-y-1">
            <label className="font-semibold text-stone-700 block">Dashboard Access PIN</label>
            <input
              type="text"
              value={form.adminPin}
              onChange={(e) => handleChange('adminPin', e.target.value)}
              className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 font-mono tracking-widest font-bold"
            />
            <p className="text-[11px] text-stone-400">
              Change the PIN used to log in to this administrative portal.
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#6b1126] hover:bg-[#54091a] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-[#f6e082]" />
            <span>Save Website Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
