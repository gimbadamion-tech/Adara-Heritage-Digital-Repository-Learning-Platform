
import React, { useState } from 'react';
import { HeritageItem, User } from '../types';
import { ADARA_VILLAGES } from '../constants';

interface AdminUploadProps {
  onAdd: (item: HeritageItem) => void;
  user: User;
}

const AdminUpload: React.FC<AdminUploadProps> = ({ onAdd, user }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'text' as 'video' | 'audio' | 'text' | 'image',
    village: ADARA_VILLAGES[0],
    url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: HeritageItem = {
      id: Date.now().toString(),
      ...formData,
      author: user.name,
      timestamp: Date.now(),
      url: formData.url || `https://picsum.photos/seed/${Math.random()}/800/600`
    };
    onAdd(newItem);
    setFormData({ ...formData, title: '', description: '', url: '' });
    alert('Heritage content uploaded successfully!');
  };

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Preserve Heritage (Admin)
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">Title</label>
            <input 
              required
              className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Traditional Wedding Rites"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">Description</label>
            <textarea 
              required
              rows={3}
              className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Explain the cultural significance..."
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">Media Type</label>
              <select 
                className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="text">Document / Text</option>
                <option value="image">Photograph</option>
                <option value="video">Video Recording</option>
                <option value="audio">Oral History / Audio</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">Village</label>
              <select 
                className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
                value={formData.village}
                onChange={e => setFormData({...formData, village: e.target.value})}
              >
                {ADARA_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-emerald-800 uppercase mb-1">Resource URL (Optional)</label>
            <input 
              className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-2 text-sm"
              value={formData.url}
              onChange={e => setFormData({...formData, url: e.target.value})}
              placeholder="Link to file storage..."
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg transition-all shadow-md mt-2"
          >
            Upload to Repository
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUpload;
