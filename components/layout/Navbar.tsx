"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Dice5,
  Flame,
  Crown,
  Users,
  Shield,
  Wallet,
  LogIn,
  Menu,
  X,
} from "lucide-react";
import { LogoMark } from "@/components/layout/LogoMark";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/games", label: "Games", icon: Dice5 },
  { href: "/promotions", label: "Drops", icon: Flame },
  { href: "/vip-crown", label: "Crown", icon: Crown },
  { href: "/community", label: "Community", icon: Users },
  { href: "/responsible-play", label: "House", icon: Shield },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Top strip — brand + deposit, always visible */}
      <header className="fixed inset-x-0 top-0 z-[150] flex justify-center px-3 pt-3">
        <div className="flex w-full max-w-5xl items-center justify-between rounded-2xl border border-jp-gold-deep/30 bg-black/60 px-4 py-2.5 backdrop-blur-xl md:px-5">
          <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-jp-gold-deep bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep font-display text-[12px] font-bold text-jp-obsidian tracking-[0.08em]">
              CJ
            </span>
            <LogoMark width={170} height={24} className="hidden sm:inline-block" />
            <span className="display text-[12px] text-jp-gold tracking-[0.3em] sm:hidden">
              cryptojackpot
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/support"
              className="hidden rounded-full border border-jp-smoke bg-black/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-jp-mute transition-colors hover:text-jp-gold md:inline-flex items-center gap-1.5"
            >
              <LogIn size={12} /> Sign In
            </Link>
            <Link
              href="/promotions#deposit"
              className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow md:px-5"
            >
              <Wallet size={13} />
              Deposit
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-8 w-8 place-items-center rounded-full border border-jp-smoke bg-black/60 text-jp-mute hover:text-jp-gold md:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Bottom nav — the primary browse surface (desktop + mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-[150] flex justify-center px-3 pb-3">
        <div className="flex w-full max-w-5xl items-center gap-1 rounded-2xl border border-jp-gold-deep/35 bg-black/70 p-1.5 backdrop-blur-2xl shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.9)]">
          {NAV_LINKS.map((l) => {
            const Icon = l.icon;
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors md:flex-row md:justify-center md:gap-2 md:py-2.5 md:text-[10px]",
                  active
                    ? "bg-gradient-to-b from-jp-gold/20 to-jp-gold-deep/5 text-jp-gold shadow-[inset_0_0_0_1px_rgba(255,215,0,0.35)]"
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

      {/* Mobile menu drawer for secondary links */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-3 top-[72px] z-[140] rounded-2xl border border-jp-smoke bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col p-2">
              <Link
                href="/support"
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-jp-mute hover:bg-white/5 hover:text-jp-gold"
              >
                <LogIn size={14} /> Sign In
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-jp-mute hover:bg-white/5 hover:text-jp-gold"
              >
                Roll Call
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-jp-mute hover:bg-white/5 hover:text-jp-gold"
              >
                About
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
