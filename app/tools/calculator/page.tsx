'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react'; // <--- Biar kenal siapa yang login
import Link from 'next/link'; // <--- Biar bisa balik ke dashboard

export default function TaiwanCalculator() {
  const { data: session } = useSession(); // <--- Ambil data user
  
  const [formData, setFormData] = useState({
    gpa: '',
    mandarinLevel: '0',
    savings: ''
  });
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // --- DISINI KUNCINYA: KIRIM ID USER ---
    const payload = {
      ...formData,
      userId: session?.user?.id || null // Kalau login, kirim ID. Kalau nggak, null.
    };
    
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await res.json();
      setResult(data.data);
    } catch (error) {
      alert("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Tombol Back Kecil di Pojok Kiri Atas (Buat jaga-jaga) */}
      <div className="absolute top-6 left-6">
        <Link href="/dashboard" className="text-gray-500 hover:text-blue-600 font-bold text-sm flex items-center gap-2">
          &larr; Kembali ke Dashboard
        </Link>
      </div>

      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 text-center">🇹🇼 Taiwan AI Check</h1>
        <p className="text-sm text-gray-500 mb-8 text-center">Cek peluang lolos Visa & Kampus.</p>

        {/* --- FORM INPUT --- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">IPK Terakhir</label>
            <input 
              type="number" step="0.01" max="4.0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: 3.45"
              onChange={(e) => setFormData({...formData, gpa: e.target.value})}
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Level Mandarin (TOCFL)</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, mandarinLevel: e.target.value})}
            >
              <option value="0">Nol (Belum Ada)</option>
              <option value="1">Level 1 (Basic)</option>
              <option value="2">Level 2 (A2)</option>
              <option value="3">Level 3 (B1)</option>
              <option value="4">Level 4+ (Fluent)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Estimasi Tabungan (IDR)</label>
            <input 
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Contoh: 30000000"
              onChange={(e) => setFormData({...formData, savings: e.target.value})}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-4 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            {loading ? 'Sedang Menganalisis...' : 'Hitung Peluang Saya'}
          </button>
        </form>

        {/* --- HASIL ANALISIS (RESULT) --- */}
        {result && (
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center">
              <span className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Score Anda</span>
              <div className="text-6xl font-black text-blue-700 my-2">{result.score}%</div>
              
              <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${result.score > 70 ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                {result.status}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
               <ul className="space-y-2 text-sm text-gray-700 mb-6">
                {result.tips.map((tip: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span>⚠️</span> {tip}
                  </li>
                ))}
               </ul>
               
               {/* --- INI TOMBOL NAVIGASI YANG KAMU MINTA --- */}
               <div className="grid gap-3">
                 <Link 
                   href="/dashboard"
                   className="block w-full text-center bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition"
                 >
                   &larr; Simpan & Kembali ke Dashboard
                 </Link>
                 
                 <button 
                   onClick={() => window.location.reload()} 
                   className="block w-full text-center bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
                 >
                   Hitung Ulang
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}