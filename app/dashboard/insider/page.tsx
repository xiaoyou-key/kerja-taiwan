import Link from "next/link";

export default function InsiderPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Tombol Balik */}
        <Link href="/dashboard" className="text-gray-400 hover:text-white mb-8 inline-block">
          &larr; Kembali ke Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <span className="bg-red-600 text-xs font-bold px-2 py-1 rounded">PREMIUM ONLY</span>
          <h1 className="text-3xl font-bold tracking-tight">Strategi "Jalur Tikus" Taiwan 🇹🇼</h1>
        </div>

        {/* Video Player Dummy */}
        <div className="aspect-video bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center relative group cursor-pointer overflow-hidden mb-10">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
          
          {/* Tombol Play */}
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition z-10">
             <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </div>
          <p className="absolute bottom-6 left-6 font-bold text-lg text-gray-200 z-10">
            Episode 1: Cara Hack Visa Gold Card (Tanpa Gaji 50 Juta)
          </p>
        </div>

        {/* List Materi */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 transition cursor-pointer">
            <h3 className="font-bold text-lg mb-2 text-blue-400">📂 Database Agency Nakal</h3>
            <p className="text-gray-400 text-sm">List hitam agency yang sering nipu TKI. Wajib baca sebelum sign kontrak.</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-gray-600 transition cursor-pointer">
            <h3 className="font-bold text-lg mb-2 text-green-400">💬 Script Interview Pabrik</h3>
            <p className="text-gray-400 text-sm">Jawaban template bahasa Mandarin biar dikira sudah jago ngomong.</p>
          </div>
        </div>

      </div>
    </div>
  );
}