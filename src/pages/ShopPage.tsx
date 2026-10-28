import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ShoppingBag, 
  Info, 
  X,
  Filter
} from 'lucide-react';
import { storage } from '../services/storage';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/products/ProductCard';
import { ProductModal } from '../components/products/ProductModal';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryParam } = useParams<{ categoryParam?: string }>();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category from route parameter or search param
  const activeCategory = categoryParam || searchParams.get('category') || 'all';

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'sarees', name: 'Sarees' },
    { id: 'salwar-suits', name: 'Salwar Suits' },
    { id: 'nighties', name: 'Nighties & Daily Wear' },
    { id: 'kurtis', name: 'Kurtis' },
    { id: 'designer-blouses', name: 'Designer Blouses' },
    { id: 'party-wear', name: 'Party & Function Wear' },
    { id: 'traditional-wear', name: 'Traditional Wear' },
  ];

  const products = storage.getProducts();

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCode = product.code.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesFabric = product.fabric?.toLowerCase().includes(query);
        if (!matchesName && !matchesCode && !matchesDesc && !matchesFabric) {
          return false;
        }
      }

      // Stock filter
      if (inStockOnly && (!product.isAvailable || product.stock === 0)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.discountedPrice || a.price;
      const priceB = b.discountedPrice || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, inStockOnly, sortBy]);

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-8 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Title & Breadcrumb */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#6b1126]">Home</Link>
          <span>/</span>
          <span className="text-stone-800 font-semibold">Clothing Store</span>
          {activeCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#6b1126] font-semibold capitalize">
                {activeCategory.replace('-', ' ')}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#6b1126]">
              {activeCategory === 'all' 
                ? 'Ladies’ Fashion Catalogue' 
                : `${categories.find(c => c.id === activeCategory)?.name || activeCategory} in Karamadai`}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Browse sarees, salwar suits, pure cotton nighties, and designer blouses available at Rev’s Boutique.
            </p>
          </div>

          {/* Demonstration Notice */}
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#fcf7ed] border border-[#ede4d1] text-stone-700 text-xs">
            <Info className="w-4 h-4 text-[#b8911c] flex-shrink-0" />
            <span>Demonstration catalogue for Rev’s Boutique, Karamadai.</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Field */}
          <div className="sm:col-span-6 relative">
            <input
              type="text"
              placeholder="Search by name, fabric, product code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 pl-9 pr-8 text-xs text-stone-800 placeholder-stone-400 focus:outline-hidden focus:border-[#d4af37]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-700 focus:outline-hidden focus:border-[#d4af37]"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="newest">Sort by: Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* In-Stock Filter Toggle */}
          <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-700 font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-[#6b1126] rounded border-stone-300 focus:ring-[#6b1126]"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </div>

        {/* Categories Tab Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-[#6b1126] text-white shadow-2xs'
                  : 'bg-[#fefcf9] text-stone-600 hover:bg-[#fcf7ed] border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Results Summary */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>Showing <strong>{filteredProducts.length}</strong> items in Karamadai</span>
        {(searchQuery || activeCategory !== 'all' || inStockOnly) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setInStockOnly(false);
              handleCategoryChange('all');
            }}
            className="text-[#6b1126] font-semibold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#fce7f0] text-[#6b1126] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8 opacity-70" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              No matching products found
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              We couldn't find any products matching your query. Try resetting your search or enquiry about customized stitching.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setInStockOnly(false);
                handleCategoryChange('all');
              }}
              className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition"
            >
              Reset Filters
            </button>
            <Link
              to="/book-stitching"
              className="px-4 py-2 rounded-xl bg-[#6b1126] text-white text-xs font-semibold hover:bg-[#54091a] transition"
            >
              Request Custom Stitching
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
