import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Scissors, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight,
  MessageCircle,
  ExternalLink,
  Plus
} from 'lucide-react';
import { storage } from '../../services/storage';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState(storage.getProducts());
  const [enquiries, setEnquiries] = useState(storage.getEnquiries());
  const [orders, setOrders] = useState(storage.getOrders());

  useEffect(() => {
    const handleUpdate = () => {
      setProducts(storage.getProducts());
      setEnquiries(storage.getEnquiries());
      setOrders(storage.getOrders());
    };
    window.addEventListener('revs_storage_update', handleUpdate);
    return () => window.removeEventListener('revs_storage_update', handleUpdate);
  }, []);

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isAvailable && p.stock > 0).length;
  const newEnquiries = enquiries.filter(e => e.status === 'New Enquiry').length;
  const inProgressEnquiries = enquiries.filter(e => e.status === 'In Progress' || e.status === 'Confirmed').length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Order Received' || o.status === 'Processing').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.finalAmount, 0);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#b8911c]">
            Shop Overview
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Rev’s Boutique Dashboard
          </h1>
          <p className="text-xs text-stone-500">
            Near HDFC Bank and Post Office, Karamadai • Phone: 8300141583
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-[#fcf7ed] border border-[#ede4d1] hover:bg-stone-50 text-stone-700 font-semibold text-xs transition flex items-center gap-1.5"
          >
            <Scissors className="w-3.5 h-3.5 text-[#6b1126]" />
            <span>Review Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Total Products</span>
            <div className="w-8 h-8 rounded-lg bg-[#fcf7ed] text-[#b8911c] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-stone-900">{totalProducts}</div>
          <p className="text-[11px] text-emerald-600 font-medium">
            {activeProducts} active in catalogue
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">New Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-[#fce7f0] text-[#6b1126] flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#6b1126]">{newEnquiries}</div>
          <p className="text-[11px] text-stone-500">
            {inProgressEnquiries} in progress / confirmed
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-stone-900">{totalOrders}</div>
          <p className="text-[11px] text-amber-600 font-medium">
            {pendingOrders} awaiting dispatch
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 font-medium">Order Value</span>
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-stone-900">₹{totalRevenue}</div>
          <p className="text-[11px] text-stone-500">Recorded order volume</p>
        </div>
      </div>

      {/* Recent Enquiries & Orders Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Stitching Enquiries */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <Scissors className="w-4 h-4 text-[#6b1126]" />
              <h2 className="font-serif text-base font-bold text-stone-900">
                Recent Stitching Enquiries
              </h2>
            </div>
            <Link to="/admin/enquiries" className="text-xs font-semibold text-[#6b1126] hover:underline">
              View All ({enquiries.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 4).map((enq) => (
              <div 
                key={enq.id}
                className="p-3 bg-[#fefcf9] rounded-2xl border border-stone-100 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{enq.customerName}</span>
                    <span className="font-mono text-[10px] text-stone-400">{enq.referenceNumber}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {enq.garmentType} • {enq.stitchingService}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    enq.status === 'New Enquiry' 
                      ? 'bg-amber-100 text-amber-800' 
                      : enq.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {enq.status}
                  </span>
                  <span className="block text-[10px] text-stone-400 mt-0.5">
                    Req: {enq.requiredDeliveryDate || 'Flexible'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#b8911c]" />
              <h2 className="font-serif text-base font-bold text-stone-900">
                Recent Customer Orders
              </h2>
            </div>
            <Link to="/admin/orders" className="text-xs font-semibold text-[#6b1126] hover:underline">
              View All ({orders.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((ord) => (
              <div 
                key={ord.id}
                className="p-3 bg-[#fefcf9] rounded-2xl border border-stone-100 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{ord.customerName}</span>
                    <span className="font-mono text-[10px] text-stone-400">{ord.orderNumber}</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {ord.items.length} item(s) • Total: ₹{ord.finalAmount}
                  </p>
                </div>

                <div className="text-right flex-shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                    ord.status === 'Order Received'
                      ? 'bg-amber-100 text-amber-800'
                      : ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ord.status}
                  </span>
                  <span className="block text-[10px] text-stone-400 mt-0.5 uppercase">
                    {ord.paymentMethod}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
