import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const handler = NextAuth({
  // TAMBAHKAN BAGIAN INI:
  pages: {
    signIn: '/login', // Arahkan user ke halaman Login Sultan kita
    error: '/login',  // Kalau error juga balik ke sini
  },
  debug: true, // Biarkan true dulu buat ngecek error
  adapter: PrismaAdapter(prisma),
  
  // --- INI KUNCINYA BIAR GAK LOGOUT SENDIRI ---
  session: {
    strategy: "jwt", // Kita simpan sesi di browser, bukan di database
    maxAge: 30 * 24 * 60 * 60, // Login tahan 30 hari
  },
  // --------------------------------------------

  secret: process.env.NEXTAUTH_SECRET, // Pastikan ini terbaca

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    // Kustomisasi isi token biar ID User terbawa
    async session({ session, token }: any) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // Masukkan ID user dari token ke session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // Simpan ID user ke dalam token saat login pertama
      }
      return token;
    }
  },

  // Paksa Cookie jadi tidak 'Secure' khusus di localhost (biar browser mau simpan)
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production', // Kalau Production baru True, kalau Local False
      },
    },
  },
})

export { handler as GET, handler as POST }