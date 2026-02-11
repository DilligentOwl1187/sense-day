import DailyCheckIn from "@/components/DailyCheckIn";
import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#FAF8F5] text-[#2A2A2A]">

      {/* Centered Card Container */}
      <div className="w-full max-w-[480px] flex flex-col items-center text-center space-y-12 py-20">

        {/* Header Section */}
        <div className="space-y-6">
          <p className="text-xs text-[#E07A5F] font-sans tracking-[0.2em] uppercase opacity-80">
            Sense Your Day
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[#2A2A2A] leading-tight">
            당신의 우주가 보내는<br />
            가장 사적인 한마디
          </h1>
          <p className="text-sm md:text-base text-[#3C3C3C] font-light leading-relaxed font-sans max-w-xs mx-auto">
            당신의 탄생 정보와 오늘의 감각을 연결하여,<br />
            하루의 위로와 한 조각의 예술을 처방합니다.
          </p>
        </div>

        {/* Interactive Component */}
        <div className="w-full">
          <DailyCheckIn />
        </div>

        {/* Footer */}
        <footer className="w-full text-center space-y-2 pt-12">
          <div className="w-px h-12 bg-[#C8BEB4] mx-auto mb-6 opacity-50"></div>
          <p className="text-[10px] text-[#3C3C3C]/40 font-sans tracking-widest uppercase">
            © 2026 Sense Your Day
          </p>
          <div className="flex justify-center gap-4 text-[10px] text-[#3C3C3C]/30 font-serif">
            <span>Stars</span>
            <span>•</span>
            <span>Logic</span>
            <span>•</span>
            <span>Arts</span>
          </div>
          <div className="pt-4 flex justify-center opacity-0 hover:opacity-100 transition-opacity duration-500">
            <WalletConnect />
          </div>
        </footer>

      </div>
    </main>
  );
}
