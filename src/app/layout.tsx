import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Projeto Integrador - Sistema de Sobreaviso",
  description: "Sistema para cálculo de horas de sobreaviso",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-100 text-slate-800`}>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-5 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
