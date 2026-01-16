
import React from 'react';
import { HeritageItem, User, UserRole } from '../types';

interface VillageGalleryProps {
  village: string;
  items: HeritageItem[];
  user: User;
  onEdit?: (item: HeritageItem) => void;
  onDelete?: (id: string) => void;
}

const VillageGallery: React.FC<VillageGalleryProps> = ({ village, items, user, onEdit, onDelete }) => {
  const filteredItems = items.filter(i => i.village === village || village === 'All');
  const isAdmin = user.role === UserRole.ADMIN;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.length === 0 ? (
        <div className="col-span-full py-20 text-center text-slate-400 border-2 border-dashed rounded-xl">
          No cultural artifacts or records found for {village}.
        </div>
      ) : (
        filteredItems.map(item => (
          <div key={item.id} className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all relative">
            {/* Admin Controls Overlay */}
            {isAdmin && (
              <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button 
                  onClick={() => onEdit?.(item)}
                  className="p-2 bg-white/90 text-amber-600 hover:text-amber-700 rounded-full shadow-sm border border-slate-100"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button 
                  onClick={() => {
                    if(confirm('Are you sure you want to delete this record?')) onDelete?.(item.id);
                  }}
                  className="p-2 bg-white/90 text-red-600 hover:text-red-700 rounded-full shadow-sm border border-slate-100"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            )}

            {item.type === 'image' && (
              <img src={item.url} alt={item.title} className="w-full h-48 object-cover transition-transform group-hover:scale-105" />
            )}
            {item.type === 'video' && (
              <div className="w-full h-48 bg-slate-900 flex items-center justify-center relative group-hover:bg-black transition-colors">
                <svg className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded">VIDEO</div>
              </div>
            )}
            {item.type === 'audio' && (
              <div className="w-full h-48 bg-emerald-50 flex flex-col items-center justify-center space-y-3 group-hover:bg-emerald-100 transition-colors">
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <div className="text-emerald-700 font-semibold">Oral History Recording</div>
              </div>
            )}
            {item.type === 'text' && (
              <div className="w-full h-48 bg-slate-50 flex flex-col items-center justify-center space-y-3">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-slate-500 font-semibold">Document / Scripture</div>
              </div>
            )}

            <div className="p-4 bg-white relative">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono uppercase">{item.village}</span>
              </div>
              <p className="text-slate-600 text-sm line-clamp-2 mb-3 h-10">{item.description}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded capitalize">{item.type}</span>
                  {isAdmin && <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">Managed</span>}
                </div>
                <span className="text-xs text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VillageGallery;
