'use client';

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// Import komponen Popup Kalkulator
import CalculatorModal from '../components/CalculatorModal';

export default function Dashboard() {
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  
  // STATE 1: Untuk Popup Membership (Upgrade)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // STATE 2: Untuk Popup Kalkulator (BARU)
  const [showCalcModal, setShowCalcModal] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/calculator?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setHistory(data.data);
        });
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 relative">
      
      {/* --- PASANG POPUP KALKULATOR DISINI --- */}
      <CalculatorModal isOpen={showCalcModal} onClose={() => setShowCalcModal(false)} />

      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          
          {/* Logo Bisa Diklik Balik ke Landing Page */}
          <Link href="/" className="font-black text-xl tracking-tight text-blue-900 hover:opacity-80 transition">
            TAIWAN<span className="text-blue-500">INSIDER</span>.
          </Link>
          
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              <Image 
                src={session.user.image} alt="Profile" width={36} height={36} className="rounded-full border border-gray-300"
              />
            )}
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-xs font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition">Sign Out</button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {session?.user?.name}! 👋</h1>
          <p className="text-gray-500 mt-2">Pusat kendali strategi karirmu.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* CARD ACADEMY (NEW HERO FEATURE) */}
<div className="md:col-span-3 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
  
  {/* Konten Kiri */}
  <div className="relative z-10 max-w-lg">
    <div className="inline-block bg-blue-500/20 text-blue-200 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-blue-500/30">
      NEW FEATURE
    </div>
    <h2 className="text-3xl font-black mb-2">Taiwan Academy Pro</h2>
    <p className="text-blue-100 opacity-90">
      Ikuti ujian sertifikasi bahasa, budaya kerja, dan aturan hukum. Dapatkan sertifikat digital resmi untuk melamar kerja.
    </p>
  </div>

  {/* Tombol Kanan */}
  <div className="relative z-10 shrink-0">
    <Link 
      href="/dashboard/academy"
      className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg inline-flex items-center gap-2"
    >
      <span>Masuk Kelas</span>
      <span>&rarr;</span>
    </Link>
  </div>

  {/* Dekorasi Background */}
  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
  <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
</div>
          {/* CARD 1: MEMBERSHIP (Tombolnya memicu Modal Upgrade) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Membership</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">FREE</span>
                <span className="text-sm text-gray-500">Plan</span>
              </div>
            </div>
            <button 
              onClick={() => setShowUpgradeModal(true)} 
              className="mt-6 w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition text-sm flex justify-center items-center gap-2"
            >
              UPGRADE PRO ⚡️
            </button>
          </div>
          {/* CARD 2: TOOLS KALKULATOR (DIUBAH JADI TRIGGER POPUP) */}
          <div 
            className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200 text-white flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            onClick={() => setShowCalcModal(true)} // <--- KLIK KARTU INI MUNCUL POPUP
          >
            <div className="relative z-10">
              <h3 className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-2">Tools</h3>
              <h2 className="text-2xl font-bold">Cek Peluang AI</h2>
              <p className="text-sm text-blue-100 mt-2 opacity-90">Analisa data terbaru untuk Visa & Beasiswa.</p>
            </div>
            <div className="absolute -right-4 -bottom-4 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:bg-white/20 transition"></div>
            
            {/* Tombol diganti jadi div biasa karena cardnya sudah clickable */}
            <div className="mt-6 w-full py-3 bg-white text-blue-700 font-bold rounded-xl text-center hover:bg-blue-50 transition relative z-10 text-sm">
              + Buka Popup Kalkulator
            </div>
          </div>
            
          {/* CARD 3: INSIDER (Tetap Pindah Halaman) */}
          <Link href="/dashboard/insider" className="bg-gray-900 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between hover:scale-[1.02] transition group cursor-pointer relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-red-600 text-[10px] font-bold px-3 py-1 rounded-bl-lg z-20">HOT</div>
             <div className="relative z-10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Premium</h3>
                <h2 className="text-2xl font-bold group-hover:text-red-400 transition">Bocoran Insider</h2>
                <p className="text-sm text-gray-400 mt-2">Akses video strategi & database agency nakal.</p>
             </div>
             <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-200 group-hover:text-white">
                <span>Buka Akses</span><span>&rarr;</span>
             </div>
             <div className="absolute -right-10 -top-10 bg-red-600/20 w-32 h-32 rounded-full blur-3xl group-hover:bg-red-600/30 transition"></div>
          </Link>
        </div>

        {/* HISTORY LIST */}
        {history.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="font-bold text-gray-800 text-lg mb-4">📝 Riwayat Tes Terakhir</h3>
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
              {history.map((item: any) => (
                <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 transition">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">{new Date(item.createdAt).toLocaleDateString()}</div>
                    <div className="font-bold text-sm text-gray-900">IPK {item.gpa} • Mandarin Lv {item.mandarin}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.result > 70 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                      {item.result}% Chance
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- MODAL POPUP MEMBERSHIP --- */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay Gelap */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowUpgradeModal(false)}
          ></div>

          {/* Modal Box */}
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            
            {/* Kolom Kiri: Benefit */}
            <div className="p-8 md:w-3/5">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Upgrade to <span className="text-blue-600">INSIDER</span></h2>
              <p className="text-gray-500 text-sm mb-6">Buka semua rahasia yang disembunyikan agen TKI.</p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Akses Database 'Blacklist' Agency",
                  "Template Chat/Email ke Profesor Taiwan",
                  "Video Panduan Visa Gold Card",
                  "Grup WhatsApp Komunitas Elite"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Beli Akses Seumur Hidup
              </button>
              <button onClick={() => setShowUpgradeModal(false)} className="w-full mt-3 py-2 text-gray-400 text-sm font-bold hover:text-gray-600">
                Nanti Dulu
              </button>
            </div>

            {/* Kolom Kanan: Harga */}
            <div className="bg-gray-50 p-8 md:w-2/5 flex flex-col justify-center items-center border-l border-gray-100">
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Hanya Sekali Bayar</div>
              <div className="text-4xl font-black text-gray-900 mb-1">Rp 199k</div>
              <div className="text-gray-400 text-xs line-through mb-6">Rp 999.000</div>
              
              <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                DISKON 80%
              </div>
              <p className="text-xs text-center text-gray-400">
                Garansi uang kembali jika tidak puas dalam 7 hari.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}