
import React from 'react';

const WelcomeDashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative rounded-[3rem] overflow-hidden bg-emerald-900 text-white p-8 md:p-16 shadow-2xl border border-emerald-800">
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <span className="inline-block px-4 py-1 bg-amber-500 text-emerald-950 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">Est. Centuries Ago</span>
            <span className="inline-block px-4 py-1 bg-emerald-700 text-emerald-200 text-[10px] font-black rounded-full uppercase tracking-[0.2em]">Official Repository</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] tracking-tighter">
            Adara Heritage Digital Repository <br/>
            <span className="text-amber-400">& Learning Platform (AHDReLP)</span>
          </h2>
          <p className="text-lg md:text-xl text-emerald-100/90 leading-relaxed mb-10 font-medium max-w-3xl">
            Welcome to the digital sanctuary of the Adara people. Anchored by a rich tapestry of history, 
            agrarian excellence, and an unbreakable bond of kinship, AHDReLP serves as our collective 
            memory and educational hearth.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
              <div className="bg-amber-400 p-2.5 rounded-xl text-emerald-950 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-black text-emerald-400 tracking-widest mb-1">Central Seat</span>
                <span className="text-sm font-bold tracking-tight">Kachia, Kaduna State</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
              <div className="bg-emerald-400 p-2.5 rounded-xl text-emerald-950 shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.583L9 14.833l-1.048-2.25m1.048 2.25l1.414 1.414M11 18a7 7 0 01-7-7V5a2 2 0 012-2h14a2 2 0 012 2v1m-7 13h4m0 0l-2-2m2 2l-2 2" /></svg>
              </div>
              <div>
                <span className="block text-[9px] uppercase font-black text-emerald-400 tracking-widest mb-1">Dialect</span>
                <span className="text-sm font-bold tracking-tight">Eda (Adara Language)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract Cultural Patterns */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/5 blur-[100px] rounded-full"></div>
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="10" width="20" height="20" />
              <rect x="40" y="10" width="20" height="20" />
              <rect x="70" y="10" width="20" height="20" />
              <rect x="10" y="40" width="20" height="20" />
              <rect x="70" y="40" width="20" height="20" />
              <rect x="10" y="70" width="20" height="20" />
              <rect x="40" y="70" width="20" height="20" />
              <rect x="70" y="70" width="20" height="20" />
           </svg>
        </div>
      </section>

      {/* Rest of the Dashboard content remains unchanged... */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-black text-slate-800 tracking-tighter">Vibrant Festivals</h3>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Celebrating our rhythm and seasons</p>
          </div>
          <div className="h-0.5 flex-1 mx-8 bg-slate-100 rounded-full hidden md:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Otu Festival',
              tag: 'Grand Annual',
              desc: 'The biggest celebration of Adara unity, featuring traditional dances, wrestling matches, and a grand display of our rich cultural attire.',
              color: 'bg-amber-50 border-amber-100 text-amber-950'
            },
            {
              name: 'Harvest Festival',
              tag: 'Seasonal',
              desc: 'A time of thanksgiving to the ancestors for bountiful crops. It marks the first consumption of the new harvest across all villages.',
              color: 'bg-emerald-50 border-emerald-100 text-emerald-950'
            },
            {
              name: 'Traditional Rites',
              tag: 'Community',
              desc: 'Periodic celebrations of manhood and leadership transitions, emphasizing the passage of wisdom from elders to the youth.',
              color: 'bg-slate-50 border-slate-100 text-slate-900'
            }
          ].map((fest, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 duration-300 ${fest.color}`}>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-50">{fest.tag}</span>
              <h4 className="text-2xl font-black mt-3 mb-5 tracking-tight">{fest.name}</h4>
              <p className="text-sm leading-relaxed font-medium opacity-80">{fest.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center relative z-10 tracking-tighter">
              <span className="w-12 h-12 bg-emerald-800 text-white rounded-2xl flex items-center justify-center mr-5 shadow-xl shadow-emerald-900/20">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </span>
              The Adara Way
            </h3>
            <div className="space-y-8 relative z-10">
              <div className="group/item">
                <h4 className="font-black text-emerald-800 text-lg mb-3 tracking-tight">Marriage Rites</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Traditional weddings involve a sacred series of negotiations and symbolic gift exchanges (The Dowry), 
                  honoring both families and ensuring communal blessings for the new couple.
                </p>
              </div>
              <div className="group/item">
                <h4 className="font-black text-emerald-800 text-lg mb-3 tracking-tight">Traditional Cuisine</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Our food is a testament to our farming heritage. Grains like millet and sorghum, alongside 
                  root crops, form the basis of delicious local delicacies often shared during communal gatherings.
                </p>
              </div>
              <div className="group/item">
                <h4 className="font-black text-emerald-800 text-lg mb-3 tracking-tight">Attire & Crafts</h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Hand-woven fabrics with distinct patterns and colors represent our identity. 
                  Pottery and smithing are also ancient crafts preserved in villages like Adunu.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl border border-slate-900">
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-8 tracking-tighter">Historical Significance</h3>
            <div className="text-slate-400 space-y-6 text-sm leading-relaxed font-medium">
              <p>
                The Adara people (historically referred to as Kadara) have occupied the central Nigerian 
                highlands for over a millennium. Our history is a chronicle of defending autonomy and 
                maintaining a unique cultural island amidst shifting regional empires.
              </p>
              <p>
                Central to our political life is the **Agwom Adara**, the First-Class Chief who serves 
                as the custodian of our traditions and the representative of our collective interests.
              </p>
              <div className="p-8 bg-emerald-950/50 rounded-3xl border border-emerald-900/50 italic text-emerald-200 shadow-inner">
                "We do not inherit the land from our ancestors; we borrow it from our children." 
                <span className="block not-italic font-black text-[10px] mt-3 uppercase tracking-widest text-emerald-500">- Traditional Adara Proverb</span>
              </div>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-6">
              <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800/50">
                <span className="block text-3xl font-black text-amber-400 tracking-tighter">1M+</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mt-1 block">Soul Population</span>
              </div>
              <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800/50">
                <span className="block text-3xl font-black text-emerald-400 tracking-tighter">12+</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mt-1 block">Major Districts</span>
              </div>
            </div>
          </div>
          
          {/* Abstract Decorations */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full"></div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="white">
               <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDashboard;