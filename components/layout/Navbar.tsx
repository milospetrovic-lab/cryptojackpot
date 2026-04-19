"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dice5,
  Flame,
  Crown,
  Users,
  Shield,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/games", label: "Games", icon: Dice5 },
  { href: "/promotions", label: "Drops", icon: Flame },
  { href: "/vip-crown", label: "Crown", icon: Crown },
  { href: "/community", label: "Community", icon: Users },
  { href: "/responsible-play", label: "House", icon: Shield },
  { href: "/#deposit", label: "Deposit", icon: Wallet },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Top strip — centered coin logo + wordmark */}
      <header className="fixed inset-x-0 top-0 z-[150] flex justify-center px-3 pt-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl border border-jp-gold-deep/30 bg-black/65 px-5 py-2 backdrop-blur-xl"
        >
          <img
            src="/images/hero/center-coin-hero.png"
            alt="CryptoJackpot"
            className="h-9 w-9 select-none object-contain drop-shadow-[0_0_18px_rgba(224,255,87,0.35)] md:h-10 md:w-10"
            draggable={false}
          />
          <span className="font-bebas text-[15px] tracking-[0.32em] text-jp-gold md:text-[16px]">
            cryptojackpot
          </span>
        </Link>
      </header>

      {/* Bottom nav — primary browse surface, Deposit as a tab */}
      <nav className="fixed inset-x-0 bottom-0 z-[150] flex justify-center px-3 pb-3">
        <div className="flex w-full max-w-5xl items-center gap-1 rounded-2xl border border-jp-gold-deep/35 bg-black/75 p-1.5 backdrop-blur-2xl shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)]">
          {NAV_LINKS.map((l) => {
            const Icon = l.icon;
            const active =
              l.href === "/#deposit" ? false : pathname === l.href;
            const isDeposit = l.label === "Deposit";
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-1.5 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors md:flex-row md:justify-center md:gap-2 md:py-2.5 md:text-[10px]",
                  isDeposit
                    ? "bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep text-jp-obsidian shadow-gold-glow"
                    : active
                    ? "bg-gradient-to-b from-jp-gold/20 to-jp-gold-deep/5 text-jp-gold shadow-[inset_0_0_0_1px_rgba(224,255,87,0.35)]"
                    : "text-jp-mute hover:bg-white/5 hover:text-jp-gold"
                )}
              >
                <Icon size={15} />
                <span>{l.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
