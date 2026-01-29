'use client';

import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BiodataPDF } from '@/app/components/BiodataPDF';
import Link from 'next/link';

export default function CVGenerator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'Laki-laki',
    birthDate: '',
    height: '',
    weight: '',
    religion: 'Islam',
    status: 'Lajang',
    education: 'SMA/SMK',
    mandarin: 'Basic (Bisa Perkenalan)',
    skill: '',
    phone: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-blue-900">📄 Buat Biodata Agency</h1>
        <p className="text-gray-500 text-sm mt-2">Jawab pertanyaan ini untuk mendapatkan CV PDF instan.</p>
      </div>

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* --- STEP 1: DATA FISIK (Penting buat Agency) --- */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
            <h2 className="text-xl font-bold text-gray-800">1. Data Fisik & Pribadi</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap (Sesuai Paspor)</label>
              <input name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Contoh: Budi Santoso" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tinggi (cm)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" placeholder="170" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Berat (kg)</label>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" placeholder="60" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Agama</label>
              <select name="religion" value={formData.religion} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50">
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
              </select>
            </div>

            <button onClick={nextStep} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-4">
              Lanjut &rarr;
            </button>
          </div>
        )}

        {/* --- STEP 2: SKILL & PENGALAMAN --- */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right duration-300">
            <h2 className="text-xl font-bold text-gray-800">2. Skill & Kemampuan</h2>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Level Bahasa Mandarin</label>
              <select name="mandarin" value={formData.mandarin} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50">
                <option value="Nol">Nol (Belum Bisa)</option>
                <option value="Basic">Basic (Angka & Perkenalan)</option>
                <option value="Conversation">Bisa Ngobrol Sehari-hari</option>
                <option value="Fluent">Lancar / Eks Taiwan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Keahlian Utama</label>
              <input name="skill" value={formData.skill} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" placeholder="Contoh: Las, Operator Mesin, Merawat Lansia" />
            </div>
            
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Pendidikan Terakhir</label>
               <input name="education" value={formData.education} onChange={handleChange} className="w-full p-3 border rounded-lg bg-gray-50" placeholder="SMK Mesin" />
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={prevStep} className="w-1/3 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold">Kembali</button>
              <button onClick={nextStep} className="w-2/3 bg-blue-600 text-white py-3 rounded-xl font-bold">Lanjut &rarr;</button>
            </div>
          </div>
        )}

        {/* --- STEP 3: FINISH & DOWNLOAD --- */}
        {step === 3 && (
          <div className="text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Biodata Siap!</h2>
            <p className="text-gray-500 mb-8">Data kamu sudah disusun rapi format Agency.</p>

            {/* TOMBOL DOWNLOAD PDF */}
            <PDFDownloadLink 
              document={<BiodataPDF data={formData} />} 
              fileName={`Biodata_${formData.fullName.replace(/\s+/g, '_')}.pdf`}
              className="w-full block bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
            >
              {({ loading }) => (loading ? 'Menyiapkan PDF...' : '⬇️ Download PDF Sekarang')}
            </PDFDownloadLink>
            
            <button 
                onClick={() => setStep(1)}
                className="mt-4 text-sm text-gray-500 hover:text-blue-600 underline"
            >
                Edit Data Lagi
            </button>
            
            <Link href="/dashboard" className="block mt-6 text-sm font-bold text-gray-400 hover:text-gray-600">
                Kembali ke Dashboard
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}