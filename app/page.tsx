'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import CalculatorModal from './components/CalculatorModal'; // Import Popup tadi

export default function Home() {
  const { data: session } = useSession();
  const [showCalculator, setShowCalculator] = useState(false); // State buat Popup

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white relative">
      
      {/* --- POPUP KALKULATOR --- */}
      <CalculatorModal isOpen={showCalculator} onClose={() => setShowCalculator(false)} />

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-2xl tracking-tighter">
            TAIWAN<span className="text-blue-500">INSIDER</span>.
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-white transition">Academy</Link>
            <Link href="#" className="hover:text-white transition">Jalur Tikus</Link>
            <Link href="#" className="hover:text-white transition">Testimoni</Link>
          </div>
          
          {session ? (
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 hidden md:block">Hi, {session.user?.name}</span>
              <Link href="/dashboard" className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-500 transition">
                DASHBOARD &rarr;
              </Link>
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition">
              MEMBER LOGIN
            </Link>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-900/10 backdrop-blur-md">
            <span className="text-blue-400 text-xs font-bold tracking-wide">⚠️ JANGAN ASAL BERANGKAT</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-8">
            Bypass Jalur Resmi.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Hack Karirmu di Taiwan.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Academy strategi menembus beasiswa MoE, Visa Gold Card, dan Pabrik High-End.
          </p>
          
          {/* TOMBOL UTAMA */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            
            {/* 1. Kalkulator (Sekarang Popup) */}
            <button 
              onClick={() => setShowCalculator(true)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-lg transition shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] w-full md:w-auto"
            >
              Cek Peluang (Gratis)
            </button>
            
            {/* 2. Tombol Insider (Link ke Dashboard) */}
            <Link 
               href={session ? "/dashboard" : "/login"}
               className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold text-lg transition w-full md:w-auto flex justify-center"
            >
              Lihat Bocoran Insider
            </Link>
          </div>

          {/* 3. TOMBOL CV GENERATOR (REQUEST KAMU) */}
          <div className="mt-6 animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <Link 
              href="/tools/cv-generator" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition group"
            >
              <span className="w-8 h-8 rounded-full bg-purple-900/50 flex items-center justify-center border border-purple-500/30 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition">📄</span>
              <span>Butuh Biodata Agency? <span className="underline decoration-purple-500 underline-offset-4 decoration-2">Buat CV PDF Instan di sini &rarr;</span></span>
            </Link>
          </div>

        </div>
      </section>

      {/* BENTO GRID (Contoh Preview Fitur) */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:border-white/10 transition">
                    <h3 className="text-xl font-bold mb-2">🎓 Beasiswa Jalur Khusus</h3>
                    <p className="text-gray-400">Database kampus yang butuh mahasiswa Indo (bahkan IPK 2.5).</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/20 to-zinc-900 border border-white/5 rounded-3xl p-8 hover:border-blue-500/30 transition">
                    <h3 className="text-xl font-bold mb-2 text-blue-400">💰 Gaji 2x Lipat</h3>
                    <p className="text-gray-400">List pabrik semi-conductor yang terima TKI.</p>
                </div>
             </div>
        </div>
      </section>

    </main>
  );
}