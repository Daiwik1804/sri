import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, KeyRound, ShieldAlert, Sparkles, ArrowLeft } from 'lucide-react';
import { storage } from '../../services/storage';
import { useSettings } from '../../context/SettingsContext';

export const AdminLogin: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const targetPin = settings.adminPin || '8300';
    if (pin.trim() === targetPin) {
      storage.setAdminLoggedIn(true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Administrator PIN. Please try again.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#ede4d1] shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#fce7f0] text-[#6b1126] flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-7 h-7" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#b8911c]">
            Staff & Owner Portal
          </span>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Rev’s Boutique Admin
          </h1>
          <p className="text-xs text-stone-500">
            Karamadai, Tamil Nadu • Manage products, stitching requests & orders
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Enter Administrator PIN / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter PIN (Default: 8300)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-stone-800 tracking-widest focus:outline-hidden focus:border-[#d4af37]"
              />
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Hint: Default demo PIN is <code className="bg-stone-100 px-1 rounded text-stone-600 font-mono font-bold">8300</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs sm:text-sm shadow-md transition"
          >
            Access Dashboard
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-stone-500 hover:text-[#6b1126] inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </button>
        </div>
      </div>
    </div>
  );
};
