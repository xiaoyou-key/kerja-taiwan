'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CalculatorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({ gpa: '', mandarinLevel: '0', savings: '' });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Kalau tidak open, jangan render apa-apa (sembunyi)
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Kirim ID user kalau login, null kalau tamu
    const payload = { ...formData, userId: session?.user?.id || null };
    
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setResult(data.data);
    } catch (error) {
      alert("Error connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay Gelap (Klik untuk tutup) */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Kotak Modal */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Tombol Close X */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">
          ✕
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-black text-blue-900 text-center mb-1">🇹🇼 Cek Peluang</h2>
          <p className="text-center text-gray-500 text-sm mb-6">Hitung probabilitas lolos visamu.</p>

          {!result ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">IPK Terakhir</label>
                <input type="number" step="0.01" onChange={(e) => setFormData({...formData, gpa: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg" placeholder="3.50" required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Mandarin (TOCFL)</label>
                <select onChange={(e) => setFormData({...formData, mandarinLevel: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold">
                  <option value="0">Nol</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3">Level 3</option>
                  <option value="4">Fluent</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase">Tabungan (IDR)</label>
                <input type="number" onChange={(e) => setFormData({...formData, savings: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg" placeholder="30000000" required />
              </div>
              <button disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-200">
                {loading ? 'Menghitung...' : 'Analisa Sekarang'}
              </button>
            </form>
          ) : (
            <div className="text-center animate-in slide-in-from-bottom-5">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">Score Kamu</div>
              <div className="text-7xl font-black text-blue-600 my-2">{result.score}%</div>
              <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold mb-6 ${result.score > 70 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>{result.status}</div>
              
              <div className="bg-gray-50 p-4 rounded-xl text-left text-sm text-gray-600 space-y-2 mb-6">
                {result.tips.map((tip: string, i: number) => <div key={i}>⚠️ {tip}</div>)}
              </div>

              <div className="grid gap-2">
                <button onClick={() => window.location.reload()} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl">Simpan & Tutup</button>
                <button onClick={() => setResult(null)} className="w-full py-3 text-gray-400 font-bold text-sm hover:text-gray-600">Hitung Ulang</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}