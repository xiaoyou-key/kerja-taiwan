'use client';

import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CertificatePDF } from './CertificatePDF';
import { useSession } from 'next-auth/react';

// SOAL UJIAN (Mandarin Pabrik)
const questions = [
  {
    q: "Apa bahasa Mandarin dari 'BOS'?",
    options: ["Lǎobǎn (老闆)", "Xiānshēng (先生)", "Péngyǒu (朋友)", "Gōngrén (工人)"],
    a: 0 // Kunci Jawaban (Index 0 = A)
  },
  {
    q: "Jika mesin rusak/berbahaya, Anda harus teriak apa?",
    options: ["Kuài diǎn (Cepat)", "Wéixiǎn (BAHAYA!)", "Chī fàn (Makan)", "Xièxie (Makasih)"],
    a: 1
  },
  {
    q: "Apa arti 'Jiābān' (加班)?",
    options: ["Libur", "Gaji", "Lembur", "Pulang"],
    a: 2
  },
  {
    q: "Mandor menyuruh pakai 'Shǒutào'. Apa itu?",
    options: ["Topi", "Sepatu", "Masker", "Sarung Tangan"],
    a: 3
  },
  {
    q: "Bahasa Mandarin angka '5' adalah?",
    options: ["Sān (3)", "Wǔ (5)", "Bā (8)", "Shí (10)"],
    a: 1
  }
];

export default function QuizModal({ isOpen, onClose }: any) {
  const { data: session } = useSession();
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isPassed, setIsPassed] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (optionIndex: number) => {
    // Cek Jawaban
    if (optionIndex === questions[qIndex].a) {
      setScore(score + 1);
    }

    // Cek apakah soal terakhir
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
    } else {
      // Selesai, hitung hasil (Skor sekarang + 1 jika jawaban terakhir benar, krn state score belum update di render ini)
      const finalScore = (optionIndex === questions[qIndex].a) ? score + 1 : score;
      const passed = finalScore >= 4; // Minimal benar 4 dari 5
      setIsPassed(passed);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQIndex(0);
    setScore(0);
    setShowResult(false);
    setIsPassed(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95">
        
        {/* --- TAMPILAN HASIL (RESULT) --- */}
        {showResult ? (
          <div className="p-8 text-center">
            {isPassed ? (
              // --- JIKA LULUS (HAPPY PATH) ---
              <div className="space-y-6">
                <div className="text-6xl">🏆</div>
                <h2 className="text-3xl font-black text-blue-900">LULUS! SELAMAT!</h2>
                <p className="text-gray-500">
                  Skor Anda sempurna. Anda sudah siap mental kerja di pabrik Taiwan.
                </p>
                
                {/* PDF DOWNLOAD BUTTON */}
                <div className="py-4">
                    <PDFDownloadLink
                        document={<CertificatePDF name={session?.user?.name || "Member TaiwanInsider"} courseName="Mandarin Pabrik 101" />}
                        fileName="Sertifikat_TaiwanInsider.pdf"
                        className="block w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition"
                    >
                        {({ loading }) => (loading ? 'Mencetak Sertifikat...' : '⬇️ Download Sertifikat Resmi')}
                    </PDFDownloadLink>
                </div>
                
                <p className="text-xs text-gray-400">Tunjukkan sertifikat ini ke Agency sebagai bukti skill.</p>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm font-bold">Tutup</button>
              </div>
            ) : (
              // --- JIKA GAGAL (UPSELL PATH) ---
              <div className="space-y-6">
                <div className="text-6xl">🥀</div>
                <h2 className="text-2xl font-black text-gray-900">Yahh, Belum Lulus...</h2>
                <p className="text-red-500 font-bold bg-red-50 p-2 rounded-lg">
                    Anda hanya benar {score} dari 5 soal.
                </p>
                <p className="text-gray-600 text-sm">
                    Jangan sedih! Ini tandanya kamu butuh persiapan lebih matang sebelum interview asli.
                </p>

                {/* UPSELL BUTTON */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-1">🔥 Unlock ACADEMY PRO</h3>
                    <p className="text-xs text-blue-700 mb-3">Dapatkan kunci jawaban, video materi lengkap, dan bimbingan sampai lulus.</p>
                    <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
                        Buka Materi Lengkap (Rp 199k)
                    </button>
                </div>

                <button onClick={resetQuiz} className="text-gray-400 hover:text-gray-600 text-sm font-bold underline">
                    Coba Ujian Lagi (Gratis)
                </button>
              </div>
            )}
          </div>
        ) : (
          // --- TAMPILAN SOAL (QUIZ) ---
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">SOAL {qIndex + 1}/5</span>
                <button onClick={onClose} className="text-gray-400 hover:text-red-500">✕</button>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-8 h-16">
                {questions[qIndex].q}
            </h2>

            <div className="space-y-3">
                {questions[qIndex].options.map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition font-medium text-gray-700 active:scale-95"
                    >
                        {opt}
                    </button>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}