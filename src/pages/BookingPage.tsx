import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Scissors, 
  MessageCircle, 
  Upload, 
  CheckCircle2, 
  Calendar, 
  User, 
  Phone, 
  Sparkles, 
  AlertCircle, 
  X, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Clock
} from 'lucide-react';
import { storage, getEnquiryWhatsAppMessage } from '../services/storage';
import { StitchingEnquiry, StitchingMeasurements } from '../types';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  const preselectedDesign = searchParams.get('design') || '';

  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [garmentType, setGarmentType] = useState('Blouse');
  const [stitchingService, setStitchingService] = useState(preselectedService || 'Customized Blouse Stitching');
  const [preferredDesign, setPreferredDesign] = useState(preselectedDesign);
  const [occasion, setOccasion] = useState('Wedding / Reception');
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState('');
  const [preferredAppointmentDate, setPreferredAppointmentDate] = useState('');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [preferredContactMethod, setPreferredContactMethod] = useState<'whatsapp' | 'call' | 'either'>('whatsapp');
  
  // Design Reference Image Upload
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('');
  const [uploadError, setUploadError] = useState('');

  // Optional Measurements Collapsible
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [measurementUnit, setMeasurementUnit] = useState<'inches' | 'cm'>('inches');
  const [measurements, setMeasurements] = useState<StitchingMeasurements>({
    chest: '',
    waist: '',
    blouseLength: '',
    shoulder: '',
    armhole: '',
    sleeveLength: '',
    sleeveRound: '',
    frontNeckDepth: '',
    backNeckDepth: '',
    bottomLength: '',
    hip: '',
    unit: 'inches'
  });

  const [validationError, setValidationError] = useState('');
  const [submittedEnquiry, setSubmittedEnquiry] = useState<StitchingEnquiry | null>(null);

  useEffect(() => {
    if (preselectedService) setStitchingService(preselectedService);
    if (preselectedDesign) setPreferredDesign(preselectedDesign);
  }, [preselectedService, preselectedDesign]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size exceeds 5MB limit. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setReferenceImageUrl(event.target?.result as string);
      setUploadError('');
    };
    reader.readAsDataURL(file);
  };

  const handleMeasurementChange = (field: keyof StitchingMeasurements, val: string) => {
    setMeasurements(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!customerName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Save enquiry to database
    const newEnquiry = storage.createEnquiry({
      customerName: customerName.trim(),
      mobileNumber: cleanPhone,
      email: email.trim() || undefined,
      garmentType,
      stitchingService,
      preferredDesign: preferredDesign.trim() || undefined,
      occasion,
      requiredDeliveryDate: requiredDeliveryDate || undefined,
      preferredAppointmentDate: preferredAppointmentDate || undefined,
      referenceImageUrl: referenceImageUrl || undefined,
      measurements: showMeasurements ? { ...measurements, unit: measurementUnit } : undefined,
      additionalInstructions: additionalInstructions.trim() || undefined,
      preferredContactMethod
    });

    setSubmittedEnquiry(newEnquiry);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#b8911c] bg-[#fcf7ed] px-3.5 py-1.5 rounded-full border border-[#d4af37]/30">
          Personalized Tailoring in Karamadai
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6b1126]">
          Book Stitching & Request Tailoring Consultation
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
          Submit your requirements for customized bridal blouses, everyday tailoring, salwar suits, or gowns. Our master tailor will review and contact you.
        </p>
      </div>

      {submittedEnquiry ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#ede4d1] shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Enquiry Submitted Successfully
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Thank You, {submittedEnquiry.customerName}!
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Your stitching enquiry has been registered securely. Please note down your reference number:
            </p>
          </div>

          <div className="inline-block bg-[#fcf7ed] border border-[#ede4d1] rounded-2xl px-6 py-4 shadow-2xs">
            <span className="text-xs text-stone-500 uppercase tracking-widest block font-medium">
              Stitching Reference ID
            </span>
            <span className="font-mono text-2xl font-bold text-[#6b1126] tracking-wider">
              {submittedEnquiry.referenceNumber}
            </span>
          </div>

          <div className="max-w-md mx-auto bg-stone-50 rounded-2xl p-4 text-xs text-stone-600 space-y-2 text-left">
            <div className="flex justify-between border-b border-stone-200 pb-1.5">
              <span>Garment & Service:</span>
              <strong className="text-stone-800">{submittedEnquiry.garmentType} • {submittedEnquiry.stitchingService}</strong>
            </div>
            <div className="flex justify-between border-b border-stone-200 pb-1.5">
              <span>Contact Mobile:</span>
              <strong className="text-stone-800">{submittedEnquiry.mobileNumber}</strong>
            </div>
            {submittedEnquiry.requiredDeliveryDate && (
              <div className="flex justify-between border-b border-stone-200 pb-1.5">
                <span>Requested Delivery:</span>
                <strong className="text-stone-800">{submittedEnquiry.requiredDeliveryDate}</strong>
              </div>
            )}
            <div className="flex justify-between">
              <span>Current Status:</span>
              <span className="font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {submittedEnquiry.status}
              </span>
            </div>
          </div>

          {/* Prompt requirement: Direct WhatsApp contact button with enquiry details */}
          <div className="space-y-3 pt-2 max-w-md mx-auto">
            <a
              href={getEnquiryWhatsAppMessage(submittedEnquiry)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-md transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send Enquiry via WhatsApp Now</span>
            </a>

            <p className="text-[11px] text-stone-500">
              Sending your details on WhatsApp enables our boutique to instantly discuss neck patterns, lining options, and pricing!
            </p>

            <div className="pt-4 flex justify-center gap-4 text-xs font-semibold">
              <Link to="/track-enquiry" className="text-[#6b1126] hover:underline">
                Track Enquiry Status →
              </Link>
              <span className="text-stone-300">•</span>
              <button
                onClick={() => setSubmittedEnquiry(null)}
                className="text-stone-600 hover:underline"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* The Booking Form */
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-8"
        >
          {validationError && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Section 1: Customer Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-[#6b1126]" />
              <span>1. Your Contact Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Customer Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavitha Sundaram"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number (WhatsApp) <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-stone-200 bg-stone-50 text-stone-600 text-xs font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number (e.g. 9842100000)"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-r-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Preferred Contact Method
                </label>
                <select
                  value={preferredContactMethod}
                  onChange={(e) => setPreferredContactMethod(e.target.value as any)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                >
                  <option value="whatsapp">WhatsApp Message (Recommended)</option>
                  <option value="call">Phone Call</option>
                  <option value="either">Either WhatsApp or Call</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Stitching Service Selection */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#6b1126]" />
              <span>2. Garment & Stitching Preferences</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Garment Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={garmentType}
                  onChange={(e) => setGarmentType(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                >
                  <option value="Blouse">Blouse (Saree Blouse)</option>
                  <option value="Bridal Blouse">Bridal & Wedding Blouse (Aari Work)</option>
                  <option value="Salwar Kameez">Salwar Kameez / Churidar</option>
                  <option value="Anarkali Suit">Anarkali Suit / Floor Length</option>
                  <option value="Kurti">Custom Kurti / Tunics</option>
                  <option value="Party Gown">Party Wear Gown / Reception Dress</option>
                  <option value="Alterations">Alteration / Resizing Service</option>
                  <option value="Other Ladies Garment">Other Ladies Garment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Specific Stitching Service <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bridal Aari Blouse, Prince Cut, Boat Neck"
                  value={stitchingService}
                  onChange={(e) => setStitchingService(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Occasion
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                >
                  <option value="Wedding / Muhurtham">Wedding / Muhurtham</option>
                  <option value="Wedding Reception">Wedding Reception</option>
                  <option value="Diwali / Pongal Festival">Diwali / Pongal Festival</option>
                  <option value="Temple Function / Puja">Temple Function / Puja</option>
                  <option value="Party / Celebration">Party / Celebration</option>
                  <option value="Everyday / Work Wear">Everyday / Work Wear</option>
                  <option value="Other">Other Occasion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Required Delivery Date
                </label>
                <input
                  type="date"
                  value={requiredDeliveryDate}
                  onChange={(e) => setRequiredDeliveryDate(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2.5 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Preferred Design or Pattern Description
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Boat neck in front, deep round back with potli latkan buttons, elbow sleeves with 1 inch zari border."
                value={preferredDesign}
                onChange={(e) => setPreferredDesign(e.target.value)}
                className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
              />
            </div>
          </div>

          {/* Section 3: Reference Image Upload (Optional) */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#6b1126]" />
                <span>3. Upload Reference Design (Optional)</span>
              </span>
              <span className="text-[11px] font-normal text-stone-500">Pinterest / Instagram photo</span>
            </h3>

            {referenceImageUrl ? (
              <div className="relative w-36 h-44 rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-sm">
                <img src={referenceImageUrl} alt="Uploaded Design" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setReferenceImageUrl('')}
                  className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white hover:bg-black transition"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-stone-200 hover:border-[#d4af37] rounded-2xl p-6 text-center bg-[#fefcf9] transition">
                <input
                  type="file"
                  id="designUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="designUpload" className="cursor-pointer space-y-2 block">
                  <div className="w-10 h-10 rounded-full bg-[#fce7f0] text-[#6b1126] flex items-center justify-center mx-auto">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#6b1126] hover:underline">
                      Click to upload pattern photo
                    </span>
                    <p className="text-[11px] text-stone-400">PNG, JPG, WebP up to 5MB</p>
                  </div>
                </label>
                {uploadError && <p className="text-xs text-red-500 mt-2">{uploadError}</p>}
              </div>
            )}
          </div>

          {/* Section 4: Optional Measurements */}
          <div className="space-y-4 border border-stone-200 rounded-2xl p-5 bg-[#fefcf9]">
            <div 
              onClick={() => setShowMeasurements(!showMeasurements)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div>
                <h4 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-2">
                  <span>Garment Measurements (Optional)</span>
                  <span className="text-[10px] bg-[#fce7f0] text-[#6b1126] px-2 py-0.5 rounded font-medium">
                    Not required to submit enquiry
                  </span>
                </h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  You can also bring your sample blouse or give measurements in person at Rev’s Boutique, Karamadai.
                </p>
              </div>
              <button type="button" className="text-stone-500 p-1">
                {showMeasurements ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {showMeasurements && (
              <div className="pt-4 border-t border-stone-200 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-700">Measurement Unit:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit('inches')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        measurementUnit === 'inches' ? 'bg-[#6b1126] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      Inches
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasurementUnit('cm')}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        measurementUnit === 'cm' ? 'bg-[#6b1126] text-white' : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      Centimetres (cm)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-stone-600 block mb-1">Chest / Bust ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 36"
                      value={measurements.chest}
                      onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Waist ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 30"
                      value={measurements.waist}
                      onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Blouse Length ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 14"
                      value={measurements.blouseLength}
                      onChange={(e) => handleMeasurementChange('blouseLength', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Shoulder Width ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 14.5"
                      value={measurements.shoulder}
                      onChange={(e) => handleMeasurementChange('shoulder', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Armhole ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 16"
                      value={measurements.armhole}
                      onChange={(e) => handleMeasurementChange('armhole', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Sleeve Length ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 10.5"
                      value={measurements.sleeveLength}
                      onChange={(e) => handleMeasurementChange('sleeveLength', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Front Neck Depth ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 7"
                      value={measurements.frontNeckDepth}
                      onChange={(e) => handleMeasurementChange('frontNeckDepth', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1">Back Neck Depth ({measurementUnit})</label>
                    <input
                      type="text"
                      placeholder="e.g. 9"
                      value={measurements.backNeckDepth}
                      onChange={(e) => handleMeasurementChange('backNeckDepth', e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl py-2 px-3"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Additional Instructions */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              Additional Instructions / Special Requests
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Need 2 inch extra margin inside. Preferred boutique visit on Saturday morning."
              value={additionalInstructions}
              onChange={(e) => setAdditionalInstructions(e.target.value)}
              className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 px-3.5 text-xs text-stone-800 focus:outline-hidden focus:border-[#d4af37]"
            />
          </div>

          {/* Prompt requirement notice: Submitting does not guarantee appointment, price, or date */}
          <div className="p-4 rounded-2xl bg-[#fcf7ed] border border-[#ede4d1] text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">
              ⚠️ Important Tailoring Notice:
            </p>
            <p>
              Submitting this enquiry request does not guarantee a confirmed appointment, final price, or delivery date. The boutique team will review your requirements and reach out to confirm charges and schedules.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#6b1126] to-[#54091a] text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-[#7a1027] hover:to-[#6b1126] transition flex items-center justify-center gap-2"
          >
            <Scissors className="w-4 h-4 text-[#f6e082]" />
            <span>Submit Tailoring Enquiry</span>
          </button>
        </form>
      )}
    </div>
  );
};
