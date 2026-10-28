import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  MessageCircle, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  Eye, 
  X,
  User,
  AlertCircle
} from 'lucide-react';
import { storage, buildWhatsAppLink } from '../../services/storage';
import { StitchingEnquiry, StitchingStatus } from '../../types';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<StitchingEnquiry[]>(storage.getEnquiries());
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewingEnquiry, setViewingEnquiry] = useState<StitchingEnquiry | null>(null);

  // Edit fields
  const [status, setStatus] = useState<StitchingStatus>('New Enquiry');
  const [adminNotes, setAdminNotes] = useState('');
  const [confirmedCompletionDate, setConfirmedCompletionDate] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');

  useEffect(() => {
    const handleUpdate = () => setEnquiries(storage.getEnquiries());
    window.addEventListener('revs_storage_update', handleUpdate);
    return () => window.removeEventListener('revs_storage_update', handleUpdate);
  }, []);

  const openDetailsModal = (enq: StitchingEnquiry) => {
    setViewingEnquiry(enq);
    setStatus(enq.status);
    setAdminNotes(enq.adminNotes || '');
    setConfirmedCompletionDate(enq.confirmedCompletionDate || '');
    setEstimatedPrice(enq.estimatedPrice || '');
  };

  const handleSaveUpdates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingEnquiry) return;

    const updated = storage.updateEnquiry(viewingEnquiry.id, {
      status,
      adminNotes: adminNotes.trim() || undefined,
      confirmedCompletionDate: confirmedCompletionDate || undefined,
      estimatedPrice: estimatedPrice.trim() || undefined
    });

    if (updated) {
      setViewingEnquiry(updated);
      alert('Stitching enquiry updated successfully!');
    }
  };

  const filtered = selectedStatus === 'all'
    ? enquiries
    : enquiries.filter(e => e.status === selectedStatus);

  const getCustomerWhatsAppChat = (enq: StitchingEnquiry) => {
    const msg = `Hello ${enq.customerName}, this is Rev’s Boutique in Karamadai regarding your stitching enquiry (${enq.referenceNumber}) for ${enq.stitchingService}. How can we assist you with design and scheduling?`;
    return buildWhatsAppLink(msg, enq.mobileNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Stitching Bookings & Enquiries
          </h1>
          <p className="text-xs text-stone-500">
            Manage custom blouse, bridal tailoring, and alteration requests in Karamadai.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'New Enquiry', 'In Progress', 'Ready for Collection', 'Completed'].map(st => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedStatus === st
                  ? 'bg-[#6b1126] text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-[#fcf7ed]'
              }`}
            >
              {st === 'all' ? 'All Enquiries' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fefcf9] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Ref #</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Garment & Service</th>
                <th className="py-3.5 px-4 font-semibold">Req. Delivery</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-stone-50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#6b1126]">
                    {enq.referenceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-stone-900 block">{enq.customerName}</span>
                    <span className="text-stone-400 text-[11px]">{enq.mobileNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-stone-800 block">{enq.garmentType}</span>
                    <span className="text-stone-500 text-[11px]">{enq.stitchingService}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium">{enq.requiredDeliveryDate || 'Flexible'}</span>
                    {enq.confirmedCompletionDate && (
                      <span className="text-emerald-700 font-bold block text-[10px]">
                        Done: {enq.confirmedCompletionDate}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.status === 'New Enquiry'
                        ? 'bg-amber-100 text-amber-800'
                        : enq.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : enq.status === 'Ready for Collection'
                        ? 'bg-purple-100 text-purple-800'
                        : enq.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={getCustomerWhatsAppChat(enq)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                        title="Chat with customer on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openDetailsModal(enq)}
                        className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-[#6b1126] hover:text-white font-semibold text-stone-700 transition"
                      >
                        View & Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Update Modal */}
      {viewingEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setViewingEnquiry(null)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#6b1126]">
                  {viewingEnquiry.referenceNumber}
                </span>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Stitching Enquiry Details
                </h2>
              </div>
              <button onClick={() => setViewingEnquiry(null)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Garment Overview */}
            <div className="bg-[#fefcf9] p-4 rounded-2xl border border-stone-100 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-400 block">Customer Name</span>
                  <strong className="text-stone-900 text-sm">{viewingEnquiry.customerName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Mobile Number</span>
                  <a href={`tel:${viewingEnquiry.mobileNumber}`} className="font-bold text-[#6b1126] hover:underline">
                    {viewingEnquiry.mobileNumber}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                <div>
                  <span className="text-stone-400 block">Garment & Service</span>
                  <p className="text-stone-800 font-medium">
                    {viewingEnquiry.garmentType} • {viewingEnquiry.stitchingService}
                  </p>
                </div>
                <div>
                  <span className="text-stone-400 block">Occasion</span>
                  <p className="text-stone-800 font-medium">{viewingEnquiry.occasion || 'Standard'}</p>
                </div>
              </div>

              {viewingEnquiry.preferredDesign && (
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 block">Design Preference:</span>
                  <p className="text-stone-800">{viewingEnquiry.preferredDesign}</p>
                </div>
              )}

              {viewingEnquiry.additionalInstructions && (
                <div className="pt-1">
                  <span className="text-stone-400 block">Additional Instructions:</span>
                  <p className="text-stone-800">{viewingEnquiry.additionalInstructions}</p>
                </div>
              )}
            </div>

            {/* Uploaded Reference Pattern */}
            {viewingEnquiry.referenceImageUrl && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 block">Uploaded Design Pattern:</span>
                <div className="w-32 h-40 rounded-xl overflow-hidden border border-stone-200">
                  <img src={viewingEnquiry.referenceImageUrl} alt="Reference" className="w-full h-full object-cover" />
                </div>
              </div>
            )}

            {/* Measurements if provided */}
            {viewingEnquiry.measurements && (
              <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-xs font-bold text-stone-700 block">
                  Customer Measurements ({viewingEnquiry.measurements.unit})
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-xs">
                  {Object.entries(viewingEnquiry.measurements).map(([key, val]) => {
                    if (key === 'unit' || !val) return null;
                    return (
                      <div key={key} className="bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-400 text-[10px] block capitalize">{key}</span>
                        <strong className="text-stone-900">{val}</strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Update Form (Status, Completion Date, Price, Private Notes) */}
            <form onSubmit={handleSaveUpdates} className="space-y-4 text-xs pt-2 border-t border-stone-100">
              <h3 className="font-serif text-sm font-bold text-stone-900">
                Update Status & Tailor Notes
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 font-semibold text-stone-800"
                  >
                    <option value="New Enquiry">New Enquiry</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress (Tailoring / Aari Work)</option>
                    <option value="Ready for Collection">Ready for Collection</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Confirmed Completion Date</label>
                  <input
                    type="date"
                    value={confirmedCompletionDate}
                    onChange={(e) => setConfirmedCompletionDate(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Estimated / Quoted Price (₹)</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹1,200"
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Private Internal Notes (Admin only)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Customer provided saree on Oct 20. Extra 1.5 margin required. Aari work artisan: Kumar."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <a
                  href={getCustomerWhatsAppChat(viewingEnquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingEnquiry(null)}
                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#6b1126] text-white font-semibold hover:bg-[#54091a]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
