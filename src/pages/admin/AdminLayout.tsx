import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Scissors, 
  ShoppingCart, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  ExternalLink, 
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { storage } from '../../services/storage';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!storage.isAdminLoggedIn()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    storage.setAdminLoggedIn(false);
    navigate('/admin/login');
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo products, enquiries, orders, and settings to original factory demonstration defaults?')) {
      storage.resetAllData();
      window.location.reload();
    }
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition ${
      isActive
        ? 'bg-[#6b1126] text-white shadow-xs'
        : 'text-stone-600 hover:bg-[#fcf7ed] hover:text-[#6b1126]'
    }`;

  return (
    <div className="min-h-screen bg-[#fefcf9] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-[#ede4d1] p-5 flex flex-col justify-between flex-shrink-0 shadow-2xs">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#b8911c]">
                Administration
              </span>
              <h2 className="font-serif text-lg font-bold text-[#6b1126]">
                Rev’s Boutique
              </h2>
              <p className="text-[11px] text-stone-400">Karamadai, Tamil Nadu</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Online & Secured" />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <NavLink to="/admin/dashboard" className={navItemClass}>
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </NavLink>

            <NavLink to="/admin/products" className={navItemClass}>
              <ShoppingBag className="w-4 h-4" />
              <span>Products & Stock</span>
            </NavLink>

            <NavLink to="/admin/enquiries" className={navItemClass}>
              <Scissors className="w-4 h-4" />
              <span>Stitching Requests</span>
            </NavLink>

            <NavLink to="/admin/orders" className={navItemClass}>
              <ShoppingCart className="w-4 h-4" />
              <span>Orders Management</span>
            </NavLink>

            <NavLink to="/admin/gallery" className={navItemClass}>
              <ImageIcon className="w-4 h-4" />
              <span>Gallery & Inspiration</span>
            </NavLink>

            <NavLink to="/admin/settings" className={navItemClass}>
              <Settings className="w-4 h-4" />
              <span>Website Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-stone-100 space-y-2 mt-6">
          <button
            onClick={handleResetData}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-xl transition"
            title="Reset to initial demonstration catalogue"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-xl transition font-medium"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </span>
            <span className="text-[10px] text-stone-400">Karamadai</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
