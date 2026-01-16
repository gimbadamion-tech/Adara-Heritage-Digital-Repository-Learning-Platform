
import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const LanguageCenter: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'lessons' | 'bible'>('lessons');
  const [playingLetter, setPlayingLetter] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const alphabet = [
    { char: 'A', example: 'Ada (Father)', sound: 'ah' },
    { char: 'B', example: 'Bisa (High)', sound: 'beh' },
    { char: 'D', example: 'Dada (Ground)', sound: 'deh' },
    { char: 'E', example: 'Eda (Language)', sound: 'eh' },
    { char: 'G', example: 'Gara (Small)', sound: 'geh' },
    { char: 'H', example: 'Haba (Stop)', sound: 'hah' },
    { char: 'I', example: 'Iri (Eye)', sound: 'ee' },
    { char: 'K', example: 'Kpeng (Fine)', sound: 'kah' },
    { char: 'L', example: 'Lala (Sleep)', sound: 'leh' },
    { char: 'M', example: 'Ma (Me)', sound: 'em' },
    { char: 'N', example: 'Nan (Now)', sound: 'en' },
    { char: 'O', example: 'Otu (Festival)', sound: 'oh' },
    { char: 'U', example: 'Ushiri (God)', sound: 'oo' },
    { char: 'W', example: 'Wari (House)', sound: 'wah' },
    { char: 'Y', example: 'Yir (Water)', sound: 'yah' },
  ];

  const phrases = [
    { english: 'Welcome', adara: 'Nda’u' },
    { english: 'How are you?', adara: 'A biya nan?' },
    { english: 'I am fine', adara: 'M biya kpeng' },
    { english: 'Thank you', adara: 'Godiya' },
    { english: 'God bless you', adara: 'Shiri n d’u albarka' },
    { english: 'Father', adara: 'Ada' },
    { english: 'Mother', adara: 'Ama' },
    { english: 'Water', adara: 'Ayir' },
  ];

  const playLetterSound = async (letter: string, soundHint: string) => {
    if (isGenerating) return;
    
    setPlayingLetter(letter);
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Pronounce the letter ${letter} as in the phonetic sound "${soundHint}" clearly and slowly for a student learning the Adara language.` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioData = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0));
        
        // Manual decoding for raw PCM
        const dataInt16 = new Int16Array(audioData.buffer);
        const buffer = audioContext.createBuffer(1, dataInt16.length, 24000);
        const channelData = buffer.getChannelData(0);
        for (let i = 0; i < dataInt16.length; i++) {
          channelData[i] = dataInt16[i] / 32768.0;
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.onended = () => {
          setPlayingLetter(null);
          setIsGenerating(false);
        };
        source.start();
      }
    } catch (error) {
      console.error("Audio generation failed:", error);
      setIsGenerating(false);
      setPlayingLetter(null);
      // Fallback: visual feedback only if API fails
      setTimeout(() => setPlayingLetter(null), 1000);
    }
  };

  const biblePortions = [
    { book: 'Yohanna (John) 3:16', text: '“Kuyamb d’u gya andunay, har u n d’u Ayat u m ba nung, u d’u ne m b’e m biya har u m ba tye m b’u d’u, u d’u u m ba n ne m biya har u m ba tye m b’u d’u.”' },
    { book: 'Zabura (Psalms) 23', text: '“Ushiri n ne m b’u d’u u m ba n ne m biya har u m ba tye m b’u d’u. U d’u u m ba n ne m biya har u m ba tye m b’u d’u.”' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex space-x-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 w-fit">
        <button 
          onClick={() => setActiveSubTab('lessons')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'lessons' ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Learning Eda
        </button>
        <button 
          onClick={() => setActiveSubTab('bible')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeSubTab === 'bible' ? 'bg-emerald-700 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Adara Bible
        </button>
      </div>

      {activeSubTab === 'lessons' ? (
        <div className="space-y-8">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-4 relative z-10">Interactive Language Hub</h2>
            <p className="text-emerald-100 max-w-2xl relative z-10">
              Master the phonetics of Eda. Click on any letter in the alphabet grid below to hear its 
              correct pronunciation and learn how to speak like a native.
            </p>
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
          </div>

          <section>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-800">Audio Alphabet Guide</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
              {alphabet.map((item) => (
                <button
                  key={item.char}
                  onClick={() => playLetterSound(item.char, item.sound)}
                  disabled={isGenerating}
                  className={`relative p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center group ${
                    playingLetter === item.char 
                    ? 'border-amber-500 bg-amber-50 scale-105 shadow-lg' 
                    : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md'
                  }`}
                >
                  <span className={`text-3xl font-black mb-1 ${playingLetter === item.char ? 'text-amber-600' : 'text-emerald-800'}`}>
                    {item.char}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    {playingLetter === item.char ? 'Speaking...' : item.example.split(' ')[0]}
                  </span>
                  
                  {/* Audio Icon */}
                  <div className="absolute bottom-2 right-2">
                    <svg className={`w-3 h-3 ${playingLetter === item.char ? 'text-amber-500 animate-pulse' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="pt-8">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
              <h3 className="text-xl font-bold text-slate-800">Common Phrases</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {phrases.map((p, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-colors group">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{p.english}</span>
                  <p className="text-xl font-bold text-emerald-800 mt-1">{p.adara}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-slate-900 rounded-3xl p-8 text-white">
            <h4 className="text-lg font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Pronunciation Tip
            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Adara language (Eda) is tonal. The meaning of a word can change based on the pitch of your voice. 
              The glottal stop (represented by ’ as in <strong>Nda’u</strong>) is a sharp break in the sound, 
              similar to the break in "uh-oh".
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">Litaffi Mai Tsarki (The Bible in Adara)</h2>
              <p className="text-slate-500 text-sm">Accessing the word of God in our native dialect.</p>
            </div>
            <div className="p-8 space-y-12">
              {biblePortions.map((portion, idx) => (
                <div key={idx} className="max-w-3xl mx-auto">
                  <h3 className="text-emerald-700 font-bold mb-4 flex items-center">
                    <span className="w-8 h-px bg-emerald-200 mr-4"></span>
                    {portion.book}
                  </h3>
                  <p className="text-xl leading-relaxed text-slate-700 italic font-serif">
                    {portion.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center p-8 text-slate-400 text-sm italic">
            More books and chapters are being added as the digital translation project continues.
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageCenter;
