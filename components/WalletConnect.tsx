"use client";

import { useState } from 'react';

export default function WalletConnect() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const handleConnect = () => {
        // Mock connection
        setWalletAddress("0x71C...9A23");
    };

    return (
        <div className="absolute top-4 right-4 z-50">
            <button
                onClick={handleConnect}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${walletAddress
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/20'
                    }`}
            >
                {walletAddress ? walletAddress : "Connect Wallet"}
            </button>
        </div>
    );
}
