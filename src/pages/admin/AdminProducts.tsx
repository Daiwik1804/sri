import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Check, 
  ShoppingBag, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { storage } from '../../services/storage';
import { Product, ProductCategory } from '../../types';

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(storage.getProducts());
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<ProductCategory>('sarees');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number | undefined>(undefined);
  const [images, setImages] = useState<string[]>(['']);
  const [sizes, setSizes] = useState<string>('Free Size');
  const [colors, setColors] = useState<string>('Red, Gold');
  const [stock, setStock] = useState<number>(10);
  const [fabric, setFabric] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handleUpdate = () => setProducts(storage.getProducts());
    window.addEventListener('revs_storage_update', handleUpdate);
    return () => window.removeEventListener('revs_storage_update', handleUpdate);
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCode(`REV-${Math.floor(100 + Math.random() * 900)}`);
    setCategory('sarees');
    setDescription('');
    setPrice(1499);
    setDiscountedPrice(1299);
    setImages(['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80']);
    setSizes('Free Size');
    setColors('Crimson Red, Gold');
    setStock(10);
    setFabric('Silk');
    setCareInstructions('Dry clean only');
    setIsAvailable(true);
    setIsFeatured(false);
    setIsNewArrival(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCode(p.code);
    setCategory(p.category);
    setDescription(p.description);
    setPrice(p.price);
    setDiscountedPrice(p.discountedPrice);
    setImages(p.images.length ? p.images : ['']);
    setSizes(p.sizes.join(', '));
    setColors(p.colors.join(', '));
    setStock(p.stock);
    setFabric(p.fabric || '');
    setCareInstructions(p.careInstructions || '');
    setIsAvailable(p.isAvailable);
    setIsFeatured(p.isFeatured);
    setIsNewArrival(p.isNewArrival);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim() || price <= 0) {
      setFormError('Please enter a valid product name, code, and price.');
      return;
    }

    const cleanSizes = sizes.split(',').map(s => s.trim()).filter(Boolean);
    const cleanColors = colors.split(',').map(c => c.trim()).filter(Boolean);
    const cleanImages = images.map(img => img.trim()).filter(Boolean);

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : 'p-' + Date.now(),
      name: name.trim(),
      code: code.trim().toUpperCase(),
      category,
      description: description.trim(),
      price: Number(price),
      discountedPrice: discountedPrice ? Number(discountedPrice) : undefined,
      images: cleanImages.length ? cleanImages : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: cleanSizes.length ? cleanSizes : ['Free Size'],
      colors: cleanColors.length ? cleanColors : ['Standard'],
      stock: Number(stock),
      isAvailable,
      isFeatured,
      isNewArrival,
      fabric: fabric.trim() || undefined,
      careInstructions: careInstructions.trim() || undefined,
      isDemo: false,
      createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
    };

    storage.saveProduct(productPayload);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      storage.deleteProduct(id);
    }
  };

  const filteredProducts = products.filter(p => {
    if (selectedCat !== 'all' && p.category !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Products & Inventory Management
          </h1>
          <p className="text-xs text-stone-500">
            Add, update, or archive sarees, salwars, nighties, kurtis and blouses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800 focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-[#fefcf9] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-700 focus:outline-hidden"
          >
            <option value="all">All Categories</option>
            <option value="sarees">Sarees</option>
            <option value="salwar-suits">Salwar Suits</option>
            <option value="nighties">Nighties</option>
            <option value="kurtis">Kurtis</option>
            <option value="designer-blouses">Designer Blouses</option>
            <option value="party-wear">Party Wear</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fefcf9] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price</th>
                <th className="py-3.5 px-4 font-semibold">Stock</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt=""
                        className="w-10 h-12 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                      />
                      <div>
                        <span className="font-bold text-stone-900 block line-clamp-1">{p.name}</span>
                        <span className="font-mono text-[11px] text-stone-400">{p.code}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize">{p.category.replace('-', ' ')}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-stone-900">
                      ₹{p.discountedPrice || p.price}
                    </span>
                    {p.discountedPrice && (
                      <span className="text-stone-400 line-through text-[10px] block">
                        ₹{p.price}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${p.stock > 0 ? 'text-stone-800' : 'text-red-600'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.isAvailable && p.stock > 0 ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          Available
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-[10px] font-bold">
                          Out of Stock
                        </span>
                      )}
                      {p.isFeatured && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#6b1126] hover:bg-stone-100 transition"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h2 className="font-serif text-lg font-bold text-stone-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Product Code *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5 uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  >
                    <option value="sarees">Sarees</option>
                    <option value="salwar-suits">Salwar Suits</option>
                    <option value="nighties">Nighties & Daily Wear</option>
                    <option value="kurtis">Kurtis</option>
                    <option value="designer-blouses">Designer Blouses</option>
                    <option value="party-wear">Party & Function Wear</option>
                    <option value="traditional-wear">Traditional Wear</option>
                    <option value="other">Other Ladies Clothing</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min={0}
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Original Price (₹) *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Discounted Price (₹, optional)</label>
                  <input
                    type="number"
                    min={1}
                    value={discountedPrice || ''}
                    onChange={(e) => setDiscountedPrice(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Primary Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={images[0] || ''}
                  onChange={(e) => setImages([e.target.value])}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Sizes (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Free Size, S, M, L, XL"
                    value={sizes}
                    onChange={(e) => setSizes(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Colors (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. Maroon, Mustard, Navy"
                    value={colors}
                    onChange={(e) => setColors(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Fabric Material</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Cotton, Soft Silk, Georgette"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">Care Instructions</label>
                  <input
                    type="text"
                    placeholder="e.g. Dry clean recommended"
                    value={careInstructions}
                    onChange={(e) => setCareInstructions(e.target.value)}
                    className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="rounded text-[#6b1126]"
                  />
                  <span>Is Available</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-[#6b1126]"
                  />
                  <span>Featured Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="rounded text-[#6b1126]"
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6b1126] text-white font-semibold hover:bg-[#54091a]"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
