import type { Metadata } from "next";
import { Geist, Geist_Mono, Nanum_Myeongjo } from "next/font/google"; // Import Nanum Myeongjo
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

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-myeongjo",
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
    <html lang="km">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nanumMyeongjo.variable} antialiased bg-[#FAF8F5] text-[#2A2A2A] selection:bg-[#E07A5F]/20`}
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
