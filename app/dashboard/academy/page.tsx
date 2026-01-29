'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <--- Import ini buat pindah halaman
import QuizModal from "@/app/components/QuizModal";

export default function AcademyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'student' | 'worker'>('worker');
  const [showQuiz, setShowQuiz] = useState(false);

  // DATA KURSUS
  const courses = [
    {
      id: 1, // ID 1 KHUSUS MANDARIN (UJIAN)
      category: 'worker',
      title: "Mandarin Pabrik 101",
      desc: "Kosakata wajib agar tidak dimarahi mandor.",
      level: "Beginner",
      progress: 0,
      image: "🏭",
      action: "quiz" // Penanda tipe aksi
    },
    {
      id: 2,
      category: 'worker',
      title: "Safety & Hak Hukum TKI",
      desc: "Cara lapor jika gaji dipotong ilegal.",
      level: "Intermediate",
      progress: 30,
      image: "⚖️",
      action: "learn" // Penanda tipe aksi
    },
    {
      id: 3,
      category: 'student',
      title: "Part-time Survival Guide",
      desc: "Aturan kerja paruh waktu legal untuk mahasiswa.",
      level: "Easy",
      progress: 0,
      image: "🎒",
      action: "learn"
    },
    {
      id: 4,
      category: 'student',
      title: "Beasiswa MoE Hack",
      desc: "Strategi wawancara beasiswa pemerintah.",
      level: "Hard",
      progress: 0,
      image: "🎓",
      action: "learn"
    }
  ];

  const filteredCourses = courses.filter(c => c.category === activeTab);

  // FUNGSI PENGATUR TOMBOL
  const handleCourseClick = (course: any) => {
    if (course.id === 1) {
      // KHUSUS MANDARIN: Buka Popup Ujian
      setShowQuiz(true);
    } else {
      // SELAIN MANDARIN: Buka Halaman Video Belajar
      // Mengarah ke /dashboard/academy/[id]
      router.push(`/dashboard/academy/course-${course.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20">
      
      {/* POPUP UJIAN (Hanya Muncul kalau dipanggil) */}
      <QuizModal isOpen={showQuiz} onClose={() => setShowQuiz(false)} />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard" className="text-gray-400 text-sm hover:text-blue-600 mb-4 inline-block">&larr; Kembali ke Dashboard</Link>
          <h1 className="text-4xl font-black text-blue-900">ACADEMY <span className="text-blue-500">PRO</span>.</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Selesaikan modul, lulus ujian, dan dapatkan sertifikat resmi.
          </p>

          <div className="mt-8 flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
            <button 
              onClick={() => setActiveTab('worker')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'worker' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              👷 Jalur Pekerja
            </button>
            <button 
              onClick={() => setActiveTab('student')}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'student' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
            >
              🎓 Jalur Mahasiswa
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 mt-10">
        
        {/* TRACKER (Roadmap Visual) */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-12">
           {/* ... (Kode Tracker/Roadmap biarkan sama kayak sebelumnya) ... */}
           <h3 className="font-bold text-lg mb-6">🚀 Roadmap Status</h3>
           <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-green-500 w-1/4 h-full"></div>
           </div>
           <div className="flex justify-between text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest">
              <span>Persiapan</span>
              <span>Training</span>
              <span>Ujian</span>
              <span>Sertifikasi</span>
           </div>
        </div>

        {/* GRID KURSUS */}
        <h3 className="font-bold text-xl mb-6 text-gray-800">Kurikulum Tersedia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {filteredCourses.map((course) => (
            <div key={course.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
              
              <div>
                <div className="h-40 bg-gray-100 flex items-center justify-center text-6xl relative">
                  {course.image}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                    {course.level}
                  </div>
                </div>

                <div className="p-6 pb-0">
                  <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">{course.title}</h4>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {course.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="w-full bg-gray-100 h-1.5 rounded-full mb-4">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">
                    {course.progress > 0 ? `${course.progress}% Selesai` : 'Belum Mulai'}
                  </span>
                  
                  {/* --- TOMBOL PINTAR (SMART BUTTON) --- */}
                  <button 
                    onClick={() => handleCourseClick(course)} 
                    className={`text-sm font-bold px-5 py-2 rounded-lg transition shadow-lg ${
                      course.id === 1 
                        ? "bg-red-600 text-white hover:bg-red-700 shadow-red-200" // Merah buat Ujian
                        : "bg-gray-900 text-white hover:bg-black"                 // Hitam buat Belajar
                    }`}
                  >
                    {course.id === 1 ? "🔥 Ujian Dulu" : "Mulai Belajar"}
                  </button>
                  {/* ------------------------------------- */}
                </div>
              </div>

            </div>
          ))}

          {/* Kotak Coming Soon */}
          <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center opacity-60">
            <div className="text-4xl mb-2">🚧</div>
            <h4 className="font-bold text-gray-400">Modul Ujian SIM Taiwan</h4>
            <p className="text-xs text-gray-400 mt-1">Segera hadir</p>
          </div>

        </div>

      </div>
    </div>
  );
}