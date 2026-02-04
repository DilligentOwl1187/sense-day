import DailyCheckIn from "@/components/DailyCheckIn";
import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 bg-slate-950 text-slate-200 selection:bg-indigo-500/30">

      {/* Header / Wallet */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-12">
        <div className="pl-4 border-l-2 border-indigo-500">
          <h1 className="text-xl font-bold tracking-tight text-white">SENSE YOUR DAY</h1>
          <p className="text-xs text-slate-500 uppercase tracking-widest hidden md:block">Emotional Companion</p>
        </div>
        <WalletConnect />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full flex items-center justify-center">
        <DailyCheckIn />
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-slate-600 font-light mt-12 mb-4">
        <p>© 2026 SENSE YOUR DAY. All rights reserved.</p>
        <p className="mt-1 opacity-50">Combined Intelligence of Stars and Logic</p>
      </footer>
    </main>
  );
}
