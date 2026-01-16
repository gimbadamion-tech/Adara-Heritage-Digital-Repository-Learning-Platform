
import React, { useState, useEffect } from 'react';
import { User, HeritageItem, UserRole } from './types';
import { ADARA_VILLAGES } from './constants';
import { authService } from './services/authService';
import Layout from './components/Layout';
import VillageGallery from './components/VillageGallery';
import CommunityChat from './components/CommunityChat';
import AdminDashboard from './components/AdminDashboard';
import WelcomeDashboard from './components/WelcomeDashboard';
import LanguageCenter from './components/LanguageCenter';
import LineageTracer from './components/LineageTracer';
import SecurityGate from './components/SecurityGate';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<string>('All');
  const [heritageItems, setHeritageItems] = useState<HeritageItem[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'gallery' | 'chat' | 'language' | 'lineage'>('dashboard');
  const [editingItem, setEditingItem] = useState<HeritageItem | null>(null);
  
  // Security State
  const [pendingVerification, setPendingVerification] = useState<boolean>(false);
  const [verifiedVillages, setVerifiedVillages] = useState<Set<string>>(new Set());

  // Auth Form State
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [regVillage, setRegVillage] = useState(ADARA_VILLAGES[0]);

  useEffect(() => {
    const loggedUser = authService.getCurrentUser();
    if (loggedUser) setUser(loggedUser);
    
    // Seed data
    const initialData: HeritageItem[] = [
      {
        id: '1',
        title: 'Adara Traditional Dance',
        description: 'The energetic rhythm and flow of the Adara people during the annual harvest festival.',
        type: 'video',
        url: '',
        village: 'Katchia',
        author: 'Chief Archivist',
        timestamp: Date.now() - 5000000
      },
      {
        id: '2',
        title: 'Adunu Hill Artifacts',
        description: 'Pre-colonial pottery discovered at the base of the Adunu hills.',
        type: 'image',
        url: 'https://picsum.photos/seed/adunu/800/600',
        village: 'Adunu',
        author: 'Heritage Team',
        timestamp: Date.now() - 10000000
      },
      {
        id: '3',
        title: 'Oral History: The Migration',
        description: 'An elder from Kateri recounts the migration patterns of the Adara ancestors.',
        type: 'audio',
        url: '',
        village: 'Kateri',
        author: 'Cultural Dept',
        timestamp: Date.now() - 2000000
      }
    ];
    setHeritageItems(initialData);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = authService.login(email, name, regVillage);
    setUser(newUser);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setVerifiedVillages(new Set());
  };

  const handleTabChange = (tab: typeof activeTab) => {
    if ((tab === 'gallery' || tab === 'chat') && selectedVillage !== 'All' && !verifiedVillages.has(selectedVillage)) {
      setPendingVerification(true);
      setActiveTab(tab);
    } else {
      setActiveTab(tab);
    }
  };

  const handleVillageSelect = (v: string) => {
    setSelectedVillage(v);
    if (v !== 'All' && !verifiedVillages.has(v)) {
      setPendingVerification(true);
    }
  };

  const handleVerificationSuccess = () => {
    if (selectedVillage !== 'All') {
      const updated = new Set(verifiedVillages);
      updated.add(selectedVillage);
      setVerifiedVillages(updated);
    }
    setPendingVerification(false);
  };

  const handleAddItem = (item: HeritageItem) => {
    setHeritageItems(prev => [item, ...prev]);
  };

  const handleUpdateItem = (updatedItem: HeritageItem) => {
    setHeritageItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setHeritageItems(prev => prev.filter(item => item.id !== id));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-emerald-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative z-10">
          <div className="bg-emerald-800 p-10 text-white text-center border-b-4 border-amber-500">
            <h1 className="text-3xl font-black mb-3 tracking-tighter leading-tight uppercase">AHDReLP</h1>
            <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest opacity-80 leading-snug px-4">
              Adara Heritage Digital Repository and Learning Platform
            </p>
          </div>
          <form onSubmit={handleLogin} className="p-10 space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
              <p className="text-slate-400 text-sm mt-1">Please authenticate to access the repository.</p>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
              <input 
                required
                type="text" 
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-medium text-slate-800"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
              <input 
                required
                type="email" 
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-medium text-slate-800"
                placeholder="email@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <p className="text-[10px] text-slate-400 mt-2 italic font-bold uppercase tracking-tighter">* Use 'admin' in email for repository management access</p>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5">Ancestral Village Root</label>
              <select 
                className="w-full border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all font-bold text-slate-700 bg-slate-50"
                value={regVillage}
                onChange={e => setRegVillage(e.target.value)}
              >
                {ADARA_VILLAGES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <button 
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95 uppercase tracking-widest text-sm"
            >
              Enter Sanctuary
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <div className="max-w-7xl mx-auto">
        {pendingVerification && (
          <SecurityGate 
            village={selectedVillage} 
            onVerify={handleVerificationSuccess} 
            onCancel={() => setPendingVerification(false)} 
          />
        )}

        {user.role === UserRole.ADMIN && (
          <div className="mb-12">
            <AdminDashboard 
              items={heritageItems}
              user={user} 
              onAdd={handleAddItem} 
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
            />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => handleTabChange('dashboard')}
            className={`px-6 py-4 text-xs font-black border-b-2 transition-all whitespace-nowrap tracking-widest ${
              activeTab === 'dashboard' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400'
            }`}
          >
            OVERVIEW
          </button>
          <button 
            onClick={() => handleTabChange('lineage')}
            className={`px-6 py-4 text-xs font-black border-b-2 transition-all whitespace-nowrap tracking-widest ${
              activeTab === 'lineage' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400'
            }`}
          >
            LINEAGE
          </button>
          <button 
            onClick={() => handleTabChange('language')}
            className={`px-6 py-4 text-xs font-black border-b-2 transition-all whitespace-nowrap tracking-widest ${
              activeTab === 'language' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400'
            }`}
          >
            LANGUAGE
          </button>
          <button 
            onClick={() => handleTabChange('gallery')}
            className={`px-6 py-4 text-xs font-black border-b-2 transition-all whitespace-nowrap tracking-widest flex items-center ${
              activeTab === 'gallery' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400'
            }`}
          >
            REPOSITORY 
            <svg className="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </button>
          <button 
            onClick={() => handleTabChange('chat')}
            className={`px-6 py-4 text-xs font-black border-b-2 transition-all whitespace-nowrap tracking-widest flex items-center ${
              activeTab === 'chat' ? 'border-emerald-700 text-emerald-800' : 'border-transparent text-slate-400'
            }`}
          >
            COMMUNITY
            <svg className="w-3 h-3 ml-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </button>
        </div>

        {/* Conditional Content */}
        {activeTab === 'dashboard' && <WelcomeDashboard />}
        {activeTab === 'language' && <LanguageCenter />}
        {activeTab === 'lineage' && <LineageTracer />}
        
        {(activeTab === 'gallery' || activeTab === 'chat') && (
          <>
            <div className="mb-8 overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex space-x-2 min-w-max">
                {['All', ...ADARA_VILLAGES].map(v => (
                  <button 
                    key={v}
                    onClick={() => handleVillageSelect(v)}
                    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all flex items-center ${
                      selectedVillage === v 
                        ? 'bg-emerald-700 text-white shadow-xl scale-105 border-emerald-500' 
                        : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    {v}
                    {v !== 'All' && !verifiedVillages.has(v) && (
                      <svg className="w-3 h-3 ml-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Display actual content only if verified or it's the "All" view */}
            {(selectedVillage === 'All' || verifiedVillages.has(selectedVillage)) ? (
              activeTab === 'gallery' ? (
                <VillageGallery 
                  village={selectedVillage} 
                  items={heritageItems} 
                  user={user}
                  onEdit={(item) => { setEditingItem(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onDelete={handleDeleteItem}
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <CommunityChat user={user} village={selectedVillage === 'All' ? user.village : selectedVillage} />
                  </div>
                  <div className="bg-white p-10 border border-slate-100 rounded-[2.5rem] space-y-4 shadow-sm">
                    <div className="flex items-center space-x-3 border-b border-slate-50 pb-6">
                      <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-lg shadow-emerald-100"></div>
                      <h4 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">Sancuary Insight</h4>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed italic font-medium pt-2">
                      "By entering the digital gateway of {selectedVillage === 'All' ? user.village : selectedVillage}, you are upholding the sacred duty of kinship. Speak with wisdom and listen with honor."
                    </p>
                  </div>
                </div>
              )
            ) : (
              <div className="py-24 text-center flex flex-col items-center bg-white rounded-[3rem] border border-slate-100 shadow-sm px-6">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Access Restricted</h3>
                <p className="text-slate-500 max-w-sm mt-3 font-medium">Please complete the 2FA identity challenge to enter the {selectedVillage} community sanctuary.</p>
                <button 
                  onClick={() => setPendingVerification(true)}
                  className="mt-10 bg-emerald-800 hover:bg-emerald-900 text-white px-10 py-4 rounded-2xl font-black shadow-2xl shadow-emerald-900/20 active:scale-95 transition-all uppercase tracking-widest text-xs"
                >
                  Verify Kinship
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default App;