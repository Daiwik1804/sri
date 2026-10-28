import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Download, 
  MessageCircle, 
  Eye, 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Truck,
  Phone
} from 'lucide-react';
import { storage, buildWhatsAppLink } from '../../services/storage';
import { Order, OrderStatus, PaymentStatus } from '../../types';

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(storage.getOrders());
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Edit fields
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('Order Received');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('pending');
  const [trackingNotes, setTrackingNotes] = useState('');

  useEffect(() => {
    const handleUpdate = () => setOrders(storage.getOrders());
    window.addEventListener('revs_storage_update', handleUpdate);
    return () => window.removeEventListener('revs_storage_update', handleUpdate);
  }, []);

  const openOrderModal = (ord: Order) => {
    setViewingOrder(ord);
    setOrderStatus(ord.status);
    setPaymentStatus(ord.paymentStatus);
    setTrackingNotes(ord.trackingNotes || '');
  };

  const handleSaveOrderUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!viewingOrder) return;

    const updated = storage.updateOrder(viewingOrder.id, {
      status: orderStatus,
      paymentStatus,
      trackingNotes: trackingNotes.trim() || undefined
    });

    if (updated) {
      setViewingOrder(updated);
      alert('Order status updated successfully!');
    }
  };

  const exportOrdersCSV = () => {
    let csv = 'Order Number,Customer Name,Mobile,City,Total Amount,Payment Method,Status,Created At\n';
    orders.forEach(o => {
      csv += `"${o.orderNumber}","${o.customerName}","${o.mobileNumber}","${o.city}","${o.finalAmount}","${o.paymentMethod}","${o.status}","${o.createdAt}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revs_boutique_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  const filtered = selectedStatus === 'all'
    ? orders
    : orders.filter(o => o.status === selectedStatus);

  const getCustomerWhatsAppChat = (ord: Order) => {
    const msg = `Hello ${ord.customerName}! This is Rev’s Boutique in Karamadai regarding your order *${ord.orderNumber}*. Current status: *${ord.status}*. Thank you for shopping with us!`;
    return buildWhatsAppLink(msg, ord.mobileNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Customer Orders Management
          </h1>
          <p className="text-xs text-stone-500">
            Track online and WhatsApp shopping orders, update dispatch and payments.
          </p>
        </div>

        <button
          onClick={exportOrdersCSV}
          className="px-4 py-2 rounded-xl bg-white border border-stone-200 hover:bg-[#fcf7ed] text-stone-700 font-semibold text-xs shadow-2xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Orders (CSV)</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fefcf9] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order Ref #</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Items</th>
                <th className="py-3.5 px-4 font-semibold">Total</th>
                <th className="py-3.5 px-4 font-semibold">Payment</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filtered.map((ord) => (
                <tr key={ord.id} className="hover:bg-stone-50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#6b1126]">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-stone-900 block">{ord.customerName}</span>
                    <span className="text-stone-400 text-[11px]">{ord.mobileNumber}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-stone-800">
                      {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                    </span>
                    <span className="text-stone-400 text-[10px] block line-clamp-1">
                      {ord.items[0]?.productName}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">
                    ₹{ord.finalAmount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="capitalize font-semibold block">{ord.paymentMethod.replace('_', ' ')}</span>
                    <span className={`text-[10px] font-bold ${
                      ord.paymentStatus === 'verified' || ord.paymentStatus === 'paid_at_shop'
                        ? 'text-emerald-700'
                        : 'text-amber-700'
                    }`}>
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      ord.status === 'Order Received'
                        ? 'bg-amber-100 text-amber-800'
                        : ord.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : ord.status === 'Ready for Dispatch'
                        ? 'bg-purple-100 text-purple-800'
                        : ord.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-100 text-stone-600'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={getCustomerWhatsAppChat(ord)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => openOrderModal(ord)}
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
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setViewingOrder(null)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#6b1126]">
                  {viewingOrder.orderNumber}
                </span>
                <h2 className="font-serif text-lg font-bold text-stone-900">
                  Order Details & Fulfillment
                </h2>
              </div>
              <button onClick={() => setViewingOrder(null)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Address Details */}
            <div className="bg-[#fefcf9] p-4 rounded-2xl border border-stone-100 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-400 block">Customer</span>
                  <strong className="text-stone-900 text-sm">{viewingOrder.customerName}</strong>
                </div>
                <div>
                  <span className="text-stone-400 block">Mobile Number</span>
                  <a href={`tel:${viewingOrder.mobileNumber}`} className="font-bold text-[#6b1126]">
                    {viewingOrder.mobileNumber}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <span className="text-stone-400 block">Delivery Address:</span>
                <p className="text-stone-800 font-medium">
                  {viewingOrder.deliveryAddress}, {viewingOrder.city} - {viewingOrder.pinCode}
                </p>
                {viewingOrder.orderNotes && (
                  <p className="text-stone-500 mt-1">Note: {viewingOrder.orderNotes}</p>
                )}
              </div>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-700 block">Ordered Items:</span>
              <div className="divide-y divide-stone-100 border rounded-2xl p-3 bg-white">
                {viewingOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="" className="w-10 h-12 object-cover rounded-lg border" />
                      <div>
                        <strong className="text-stone-900 block">{item.productName}</strong>
                        <span className="text-stone-400 text-[11px]">
                          Qty: {item.quantity} | Size: {item.selectedSize} | Color: {item.selectedColor}
                        </span>
                      </div>
                    </div>
                    <div className="text-right font-bold text-stone-900">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Form */}
            <form onSubmit={handleSaveOrderUpdate} className="space-y-4 text-xs pt-2 border-t border-stone-100">
              <h3 className="font-serif text-sm font-bold text-stone-900">
                Update Order Status & Dispatch
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Order Status</label>
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value as any)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 font-semibold text-stone-800"
                  >
                    <option value="Order Received">Order Received</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing / Packing</option>
                    <option value="Ready for Dispatch">Ready for Dispatch / Pickup</option>
                    <option value="Shipped">Shipped / Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Payment Status</label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 font-semibold text-stone-800"
                  >
                    <option value="pending">Pending (Cash on Delivery / Unpaid)</option>
                    <option value="verified">Verified & Paid Online</option>
                    <option value="paid_at_shop">Paid at Boutique Counter</option>
                    <option value="failed">Failed / Refunded</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Tracking Notes for Customer</label>
                <input
                  type="text"
                  placeholder="e.g. Dispatched with local courier or ready for pickup near Post Office"
                  value={trackingNotes}
                  onChange={(e) => setTrackingNotes(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <a
                  href={getCustomerWhatsAppChat(viewingOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify via WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setViewingOrder(null)}
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
