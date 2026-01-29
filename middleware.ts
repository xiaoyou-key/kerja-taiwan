import { withAuth } from "next-auth/middleware";

// Export default dengan konfigurasi explicit
export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // Kalau belum login, lempar ke sini
  },
});

// Tentukan halaman mana yang mau dikunci
export const config = {
  matcher: ["/dashboard/:path*"],
};