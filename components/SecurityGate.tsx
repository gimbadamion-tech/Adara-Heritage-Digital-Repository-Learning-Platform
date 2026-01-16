
import React, { useState } from 'react';

interface SecurityGateProps {
  onVerify: () => void;
  onCancel: () => void;
  village: string;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ onVerify, onCancel, village }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCode = code.join('');
    // For this prototype, any 6-digit code starting with '1' is valid
    if (finalCode.length === 6 && finalCode.startsWith('1')) {
      onVerify();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transition-all ${error ? 'animate-shake' : ''}`}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Identity Verification</h2>
          <p className="text-slate-500 text-sm mt-2">
            To access the <span className="font-bold text-emerald-700">{village}</span> community, please enter the 6-digit secure code sent to your registered contact.
          </p>
          <p className="text-[10px] text-slate-400 mt-2 italic">(Prototype Hint: Enter any code starting with '1')</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all ${error ? 'border-red-500' : 'border-slate-100'}`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
            >
              Verify & Enter
            </button>
            <button 
              type="button"
              onClick={onCancel}
              className="w-full text-slate-400 hover:text-slate-600 font-medium py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default SecurityGate;
