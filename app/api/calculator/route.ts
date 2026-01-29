import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gpa, mandarinLevel, savings, userId } = body;
    
    // --- LOGIC RAHASIA AGENCY (ALGORITMA) ---
    let score = 0;
    let tips = [];

    // 1. Analisa IPK
    // Konversi string ke float agar bisa dihitung
    const gpaFloat = parseFloat(gpa);
    
    if (gpaFloat >= 3.5) {
      score += 40;
    } else if (gpaFloat >= 3.0) {
      score += 25;
      tips.push("IPK kamu aman untuk swasta, tapi berat untuk Negeri Top 5.");
    } else {
      score += 10;
      tips.push("IPK kritis! Kamu WAJIB ambil jalur 2+i atau magang dulu.");
    }

    // 2. Analisa Bahasa (TOCFL)
    const mandarinInt = parseInt(mandarinLevel);
    
    if (mandarinInt >= 3) {
      score += 35;
    } else if (mandarinInt >= 2) {
      score += 20;
    } else {
      score -= 10; // Penalty
      tips.push("Tanpa sertifikat TOCFL, peluang visa ditolak TETO = 80%.");
    }

    // 3. Analisa Tabungan
    const savingsInt = parseFloat(savings); // Gunakan Float biar muat triliunan
    
    if (savingsInt >= 40000000) {
      score += 25;
    } else {
      tips.push("Tabungan riskan. Perlu 'dana talangan' atau sponsor orang tua.");
    }

    // Batasi skor 0-100
    if (score > 100) score = 100;
    if (score < 0) score = 0;

    // Tentukan Status
    let status = "LOW CHANCE";
    if (score > 75) status = "ELITE CANDIDATE";
    else if (score > 50) status = "POSSIBLE";

    // --- SIMPAN JEJAK KE DATABASE ---
    await prisma.calculatorHistory.create({
      data: {
        userId: userId || null, 
        gpa: gpaFloat,
        mandarin: mandarinInt,
        savings: savingsInt,
        result: score
      }
    });

    return NextResponse.json({ 
      success: true, 
      data: { score, status, tips } 
    });

  } catch (error) {
    console.error(error); // Biar kelihatan errornya di terminal
    return NextResponse.json({ success: false, error: 'Gagal menghitung' }, { status: 500 });
  }
  
}
// ... kode POST yang lama biarkan di atas ...

// TAMBAHKAN INI DI BAWAHNYA:
export async function GET(request: Request) {
  try {
    // Ambil userId dari URL (misal: ?userId=123)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID wajib ada' }, { status: 400 });
    }

    // Ambil data dari Database Prisma
    const history = await prisma.calculatorHistory.findMany({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' }, // Urutkan dari yang terbaru
      take: 5 // Ambil 5 terakhir saja biar gak kepenuhan
    });

    return NextResponse.json({ success: true, data: history });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Gagal ambil data' }, { status: 500 });
  }
}