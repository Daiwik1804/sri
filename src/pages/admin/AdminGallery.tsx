import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  X, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { storage } from '../../services/storage';
import { GalleryItem, GalleryCategory } from '../../types';

export const AdminGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(storage.getGallery());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<GalleryCategory>('Designer Blouses');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Blouse, Designer, Karamadai');
  const [isInspiration, setIsInspiration] = useState(true);

  useEffect(() => {
    const handleUpdate = () => setGallery(storage.getGallery());
    window.addEventListener('revs_storage_update', handleUpdate);
    return () => window.removeEventListener('revs_storage_update', handleUpdate);
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !image.trim()) return;

    const newItem: GalleryItem = {
      id: 'g-' + Date.now(),
      title: title.trim(),
      category,
      image: image.trim(),
      description: description.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      isInspiration
    };

    storage.saveGalleryItem(newItem);
    setIsModalOpen(false);
    setTitle('');
    setImage('');
    setDescription('');
  };

  const handleDelete = (id: string, itemTitle: string) => {
    if (window.confirm(`Delete "${itemTitle}" from gallery?`)) {
      storage.deleteGalleryItem(id);
    }
  };

  const categories: GalleryCategory[] = [
    'Designer Blouses',
    'Bridal Blouses',
    'Traditional Blouses',
    'Embroidery Designs',
    'Party Wear',
    'Sarees',
    'Salwar Suits',
    'Nighties',
    'Kurtis',
    'Festive Collections'
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Gallery & Fashion Inspiration CMS
          </h1>
          <p className="text-xs text-stone-500">
            Upload and organize blouse patterns, bridal embroideries, and saree draping inspirations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#6b1126] hover:bg-[#54091a] text-white font-semibold text-xs shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Image / Inspiration</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div 
            key={item.id}
            className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs flex flex-col justify-between"
          >
            <div className="aspect-4/5 overflow-hidden bg-stone-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#6b1126] text-white text-[9px] font-bold">
                {item.category}
              </span>
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/90 text-white hover:bg-red-700 transition opacity-0 group-hover:opacity-100 shadow-md"
                title="Delete Image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3 space-y-1">
              <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">{item.title}</h4>
              <p className="text-[11px] text-stone-500 line-clamp-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl z-10 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif text-base font-bold text-stone-900">
                Add Gallery Pattern
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">Pattern Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Peacock Motifs Aari Bridal Blouse"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                >
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Short description of the neck cut, embroidery style, or drape"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full bg-[#fefcf9] border border-stone-200 rounded-xl p-2.5"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#6b1126] text-white font-semibold hover:bg-[#54091a]"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
