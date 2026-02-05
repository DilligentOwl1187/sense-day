import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sense Your Day",
  description: "Your emotional companion for a better day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200 selection:bg-indigo-500/30`}
      >
        <Providers>
          <div className="fixed inset-0 z-[-1]" style={{
            background: "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.1) 0%, transparent 50%)"
          }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
