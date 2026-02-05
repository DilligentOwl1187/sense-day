"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletConnect() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === "authenticated");

                return (
                    <div
                        {...(!ready && {
                            "aria-hidden": true,
                            style: {
                                opacity: 0,
                                pointerEvents: "none",
                                userSelect: "none",
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <button onClick={openConnectModal} type="button" className="px-4 py-2 border border-slate-700/50 rounded-full text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors text-sm font-light backdrop-blur-sm bg-slate-900/30">
                                        지갑 연결 (Web3)
                                    </button>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <button onClick={openChainModal} type="button" className="text-red-500">
                                        Wrong network
                                    </button>
                                );
                            }

                            return (
                                <div style={{ display: "flex", gap: 12 }}>
                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        className="px-4 py-2 border border-indigo-500/30 rounded-full text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-all text-sm font-light backdrop-blur-sm"
                                    >
                                        {account.displayName}
                                        {account.displayBalance
                                            ? ` (${account.displayBalance})`
                                            : ""}
                                    </button>
                                </div>
                            );
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}
