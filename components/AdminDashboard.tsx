
import React, { useState, useEffect } from 'react';
import { HeritageItem, User } from '../types';
import { ADARA_VILLAGES } from '../constants';

interface AdminDashboardProps {
  items: HeritageItem[];
  onAdd: (item: HeritageItem) => void;
  onUpdate: (item: HeritageItem) => void;
  onDelete: (id: string) => void;
  editingItem: HeritageItem | null;
  setEditingItem: (item: HeritageItem | null) => void;
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  items, onAdd, onUpdate, onDelete, editingItem, setEditingItem, user 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'text' as 'video' | 'audio' | 'text' | 'image',
    village: ADARA_VILLAGES[0],
    url: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        description: editingItem.description,
        type: editingItem.type,
        village: editingItem.village,
        url: editingItem.url
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: 'text',
        village: ADARA_VILLAGES[0],
        url: ''
      });
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      onUpdate({
        ...editingItem,
        ...formData,
        timestamp: Date.now()
      });
      alert('Heritage record updated successfully!');
      setEditingItem(null);
    } else {
      const newItem: HeritageItem = {
        id: Date.now().toString(),
        ...formData,
        author: user.name,
        timestamp: Date.now(),
        url: formData.url || `https://picsum.photos/seed/${Math.random()}/800/600`
      };
      onAdd(newItem);
      alert('New heritage content preserved successfully!');
    }
    setFormData({ ...formData, title: '', description: '', url: '' });
  };

  const filteredItems = items.filter(i => 
    i.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.village.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* CMS Form Section */}
      <div className={`border rounded-3xl p-8 transition-all shadow-xl ${editingItem ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-black flex items-center ${editingItem ? 'text-amber-900' : 'text-emerald-900'}`}>
            <div className={`p-2 rounded-xl mr-3 ${editingItem ? 'bg-amber-200 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {editingItem ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                )}
              </svg>
            </div>
            {editingItem ? 'Content Editor' : 'Upload New Heritage'}
          </h2>
          {editingItem && (
            <button 
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 text-sm font-bold text-amber-700 bg-amber-200/50 hover:bg-amber-200 rounded-xl transition-colors"
            >
              Cancel Editing
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Item Title</label>
              <input 
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. History of the Agwom Adara"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Contextual Description</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Detail the cultural or historical importance..."
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Resource Type</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="text">Historical Text</option>
                  <option value="image">Artifact Photo</option>
                  <option value="video">Ceremonial Video</option>
                  <option value="audio">Oral Tradition / Audio</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Village Root</label>
                <select 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                  value={formData.village}
                  onChange={e => setFormData({...formData, village: e.target.value})}
                >
                  {ADARA_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Resource URL (Storage Link)</label>
              <input 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all"
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
                placeholder="https://cloud.adara-heritage.org/files/..."
              />
            </div>
            <button 
              type="submit"
              className={`w-full text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2 ${editingItem ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200' : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-200'}`}
            >
              <span>{editingItem ? 'Commit Changes' : 'Publish to Repository'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </button>
          </div>
        </form>
      </div>

      {/* Repository Manager List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Repository Management</h3>
            <p className="text-xs text-slate-400 font-medium">Manage existing cultural assets and metadata.</p>
          </div>
          <div className="relative">
            <input 
              type="text"
              placeholder="Filter by title or village..."
              className="bg-slate-50 border border-slate-200 rounded-full px-10 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Village</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredItems.map(item => (
                <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${editingItem?.id === item.id ? 'bg-amber-50/50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${item.type === 'image' ? 'bg-blue-100 text-blue-600' : item.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {item.type === 'image' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                        {item.type === 'video' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        {item.type === 'text' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.village}</span>
                  </td>
                  <td className="px-6 py-4 capitalize text-xs text-slate-500 font-medium">{item.type}</td>
                  <td className="px-6 py-4 text-xs text-slate-400 font-medium">{new Date(item.timestamp).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                        title="Edit Record"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button 
                        onClick={() => { if(confirm('Permanently delete this piece of heritage?')) onDelete(item.id); }}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Record"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic text-sm">
                    No matching records found in the repository.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
