
import React, { useState, useEffect } from 'react';
import { LineageData, Ancestor } from '../types';
import { ADARA_VILLAGES } from '../constants';

const LineageTracer: React.FC = () => {
  const [lineage, setLineage] = useState<LineageData>({});
  const [editingKey, setEditingKey] = useState<keyof LineageData | null>(null);
  const [tempData, setTempData] = useState({ name: '', village: ADARA_VILLAGES[0] });

  useEffect(() => {
    const saved = localStorage.getItem('adara_lineage');
    if (saved) setLineage(JSON.parse(saved));
  }, []);

  const handleSaveNode = () => {
    if (!editingKey) return;
    const newNode: Ancestor = {
      id: Date.now().toString(),
      relation: editingKey,
      ...tempData
    };
    const updated = { ...lineage, [editingKey]: newNode };
    setLineage(updated);
    localStorage.setItem('adara_lineage', JSON.stringify(updated));
    setEditingKey(null);
  };

  const startEdit = (key: keyof LineageData) => {
    setEditingKey(key);
    setTempData({
      name: lineage[key]?.name || '',
      village: lineage[key]?.village || ADARA_VILLAGES[0]
    });
  };

  const Node = ({ title, relationKey, className = "" }: { title: string, relationKey: keyof LineageData, className?: string }) => (
    <div className={`relative p-4 bg-white border-2 rounded-2xl shadow-sm hover:border-emerald-400 transition-all cursor-pointer group ${className} ${lineage[relationKey] ? 'border-emerald-100' : 'border-dashed border-slate-200'}`}
         onClick={() => startEdit(relationKey)}>
      <span className="absolute -top-3 left-4 px-2 bg-white text-[10px] font-black text-slate-400 uppercase tracking-tighter">{title}</span>
      {lineage[relationKey] ? (
        <div>
          <p className="font-bold text-slate-800">{lineage[relationKey]?.name}</p>
          <p className="text-[10px] text-emerald-600 font-bold uppercase">{lineage[relationKey]?.village}</p>
        </div>
      ) : (
        <p className="text-slate-300 text-xs italic">+ Add Ancestor</p>
      )}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-emerald-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black text-slate-800">Ancestral Lineage Tracer</h2>
        <p className="text-slate-500 mt-2">Connect your roots and visualize your family's journey through the Adara lands.</p>
      </div>

      <div className="space-y-16">
        {/* Grandparents Layer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Node title="Paternal G-Father" relationKey="paternalGrandFather" />
          <Node title="Paternal G-Mother" relationKey="paternalGrandMother" />
          <Node title="Maternal G-Father" relationKey="maternalGrandFather" />
          <Node title="Maternal G-Mother" relationKey="maternalGrandMother" />
        </div>

        {/* Parents Layer */}
        <div className="flex justify-around items-center">
          <div className="w-1/3"><Node title="Father (Ada)" relationKey="father" /></div>
          <div className="h-px bg-slate-200 flex-1 mx-4"></div>
          <div className="w-1/3"><Node title="Mother (Ama)" relationKey="mother" /></div>
        </div>

        {/* User Layer */}
        <div className="flex justify-center">
          <div className="w-1/2 p-6 bg-emerald-700 text-white rounded-3xl shadow-xl text-center border-4 border-emerald-500">
            <span className="text-[10px] font-black uppercase opacity-70">The Root</span>
            <h3 className="text-xl font-bold">Your Heritage</h3>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingKey && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold mb-4 uppercase text-slate-400">Recording Lineage</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-2 focus:border-emerald-500 outline-none"
                  value={tempData.name}
                  onChange={e => setTempData({...tempData, name: e.target.value})}
                  placeholder="Enter name..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Original Village</label>
                <select 
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-2 focus:border-emerald-500 outline-none"
                  value={tempData.village}
                  onChange={e => setTempData({...tempData, village: e.target.value})}
                >
                  {ADARA_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button onClick={handleSaveNode} className="flex-1 bg-emerald-700 text-white font-bold py-2 rounded-xl">Save</button>
                <button onClick={() => setEditingKey(null)} className="flex-1 text-slate-400 font-bold py-2">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LineageTracer;
