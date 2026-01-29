import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // <--- 1. IMPORT INI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taiwan Insider Academy",
  description: "Platform strategi kuliah dan kerja ke Taiwan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 2. BUNGKUS CHILDREN DENGAN PROVIDERS */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}