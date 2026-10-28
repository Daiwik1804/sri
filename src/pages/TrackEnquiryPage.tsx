import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Scissors, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  AlertCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { storage, getEnquiryWhatsAppMessage } from '../services/storage';
import { StitchingEnquiry, StitchingStatus } from '../types';

export const TrackEnquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [refNumber, setRefNumber] = useState(initialRef);
  const [searchedEnquiry, setSearchedEnquiry] = useState<StitchingEnquiry | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const statusSteps: StitchingStatus[] = [
    'New Enquiry',
    'Contacted',
    'Confirmed',
    'In Progress',
    'Ready for Collection',
    'Completed'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!refNumber.trim()) {
      setErrorMsg('Please enter your stitching reference number (e.g. REV-ST-1082).');
      return;
    }

    const found = storage.getEnquiryByRef(refNumber.trim());
    if (found) {
      setSearchedEnquiry(found);
    } else {
      setSearchedEnquiry(null);
      setErrorMsg(`No stitching enquiry found for "${refNumber.trim()}". Please check the number or contact Rev’s Boutique.`);
    }
  };

  useEffect(() => {
    if (initialRef) {
      const found = storage.getEnquiryByRef(initialRef);
      if (found) setSearchedEnquiry(found);
    }
  }, [initialRef]);

  const getStepIndex = (status: StitchingStatus) => {
    return statusSteps.indexOf(status);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30">
          Tailoring Progress Tracker
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6b1126]">
          Track Stitching & Alteration Status
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Check live progress for your custom blouse, bridal aari work, salwar suit, or alteration order in Karamadai.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto">
        <div className="flex bg-white rounded-2xl border-2 border-[#ede4d1] focus-within:border-[#d4af37] shadow-sm overflow-hidden p-1.5">
          <input
            type="text"
            placeholder="e.g. REV-ST-1082"
            value={refNumber}
            onChange={(e) => setRefNumber(e.target.value)}
            className="flex-1 py-2 px-3 text-xs sm:text-sm text-stone-800 focus:outline-hidden uppercase"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Check</span>
          </button>
        </div>
        {errorMsg && (
          <p className="text-xs text-red-600 mt-2 text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMsg}</span>
          </p>
        )}
      </form>

      {/* Enquiry Status Card */}
      {searchedEnquiry && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs text-stone-400 block">Stitching Reference</span>
              <h2 className="font-mono text-xl font-bold text-[#6b1126]">
                {searchedEnquiry.referenceNumber}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-400 block">Current Status</span>
              <span className="inline-block px-3 py-1 rounded-full bg-[#fce7f0] text-[#6b1126] font-bold text-xs">
                {searchedEnquiry.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          {searchedEnquiry.status !== 'Cancelled' ? (
            <div className="space-y-4">
              <div className="relative flex justify-between items-center max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-stone-100 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-[#d4af37] -translate-y-1/2 z-0 transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (getStepIndex(searchedEnquiry.status) / (statusSteps.length - 1)) * 100)}%`
                  }}
                />

                {statusSteps.map((step, idx) => {
                  const currentIndex = getStepIndex(searchedEnquiry.status);
                  const isCompleted = idx <= currentIndex;
                  const isCurrent = idx === currentIndex;

                  return (
                    <div key={step} className="relative z-10 flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-[#6b1126] text-white ring-4 ring-[#fce7f0]'
                          : isCompleted
                          ? 'bg-[#d4af37] text-[#34040e]'
                          : 'bg-stone-200 text-stone-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <span className={`text-[10px] font-medium mt-2 hidden sm:block text-center max-w-[70px] leading-tight ${
                        isCurrent ? 'text-[#6b1126] font-bold' : 'text-stone-500'
                      }`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="sm:hidden text-center text-xs font-semibold text-[#6b1126]">
                Step {getStepIndex(searchedEnquiry.status) + 1} of {statusSteps.length}: {searchedEnquiry.status}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs text-center font-medium">
              This tailoring enquiry has been marked as Cancelled.
            </div>
          )}

          {/* Tailoring Details Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-[#fefcf9] p-4 rounded-2xl border border-stone-100">
            <div className="space-y-1">
              <span className="font-bold text-stone-800 block">Garment & Service:</span>
              <p>Customer: <strong className="text-stone-900">{searchedEnquiry.customerName}</strong></p>
              <p>Type: <strong className="text-stone-900">{searchedEnquiry.garmentType}</strong></p>
              <p>Service: <strong>{searchedEnquiry.stitchingService}</strong></p>
              {searchedEnquiry.preferredDesign && <p>Design: {searchedEnquiry.preferredDesign}</p>}
            </div>

            <div className="space-y-1">
              <span className="font-bold text-stone-800 block">Schedule & Pricing:</span>
              <p>Requested By: <strong>{searchedEnquiry.requiredDeliveryDate || 'Flexible'}</strong></p>
              {searchedEnquiry.confirmedCompletionDate && (
                <p className="text-emerald-700 font-bold">
                  Confirmed Ready Date: {searchedEnquiry.confirmedCompletionDate}
                </p>
              )}
              {searchedEnquiry.estimatedPrice && (
                <p>Estimated Stitching: <strong className="text-[#6b1126]">{searchedEnquiry.estimatedPrice}</strong></p>
              )}
              <p className="text-stone-500">Pick up at: Near HDFC Bank & Post Office, Karamadai</p>
            </div>
          </div>

          {/* Reference Image Thumbnail if available */}
          {searchedEnquiry.referenceImageUrl && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-800 block">Uploaded Design Pattern:</span>
              <div className="w-24 h-28 rounded-xl overflow-hidden border border-stone-200">
                <img src={searchedEnquiry.referenceImageUrl} alt="Pattern" className="w-full h-full object-cover" />
              </div>
            </div>
          )}

          {/* Action CTA */}
          <div className="pt-2 flex justify-center">
            <a
              href={getEnquiryWhatsAppMessage(searchedEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact Boutique on WhatsApp About This Enquiry</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
