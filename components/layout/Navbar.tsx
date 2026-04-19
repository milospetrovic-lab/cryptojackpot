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
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* TOP — logo centered, burger floated right on mobile */}
      <header className="fixed inset-x-0 top-0 z-[150] flex items-center justify-center px-5 pt-4 md:px-8 md:pt-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline"
          aria-label="cryptojackpot home"
        >
          <img
            src="/images/hero/center-coin-hero.png"
            alt=""
            aria-hidden
            className="h-9 w-9 select-none object-contain drop-shadow-[0_0_16px_rgba(224,255,87,0.38)] md:h-10 md:w-10"
            draggable={false}
          />
          <span
            className="font-bebas text-[15px] tracking-[0.3em] text-jp-gold md:text-[17px]"
            style={{
              textShadow: "0 0 16px rgba(224,255,87,0.35)",
            }}
          >
            cryptojackpot
          </span>
        </Link>

        {/* Burger — mobile only, absolute-positioned so the logo stays
            optically centered */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="absolute right-5 top-4 grid h-10 w-10 place-items-center rounded-full border border-jp-gold-deep/40 bg-black/50 text-jp-gold backdrop-blur-md transition hover:border-jp-gold hover:bg-black/70 md:hidden"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* BOTTOM NAV — primary browse surface on desktop (kept on mobile too
          so the Deposit CTA stays a single tap from any page) */}
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

      {/* SIDE DRAWER — mobile */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              key="cj-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[180] bg-black/70 backdrop-blur-sm md:hidden"
              aria-hidden
            />
            {/* panel */}
            <motion.aside
              key="cj-nav-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed right-0 top-0 z-[190] flex h-full w-[82vw] max-w-sm flex-col border-l border-jp-gold-deep/40 bg-[#0A0A0C] px-6 pb-8 pt-6 shadow-[0_0_80px_-10px_rgba(0,0,0,0.95)] md:hidden"
              role="dialog"
              aria-label="Site navigation"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <img
                    src="/images/hero/center-coin-hero.png"
                    alt=""
                    aria-hidden
                    className="h-8 w-8 object-contain"
                    draggable={false}
                  />
                  <span className="font-bebas text-[15px] tracking-[0.28em] text-jp-gold">
                    cryptojackpot
                  </span>
                </Link>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-jp-smoke text-jp-mute hover:border-jp-gold hover:text-jp-gold"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((l) => {
                  const Icon = l.icon;
                  const active =
                    l.href === "/#deposit" ? false : pathname === l.href;
                  const isDeposit = l.label === "Deposit";
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] transition-colors",
                        isDeposit
                          ? "bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep text-jp-obsidian shadow-gold-glow"
                          : active
                          ? "bg-white/5 text-jp-gold ring-1 ring-inset ring-jp-gold/35"
                          : "text-jp-mute hover:bg-white/5 hover:text-jp-gold"
                      )}
                    >
                      <Icon size={16} />
                      <span>{l.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-jp-smoke pt-6">
                <Link
                  href="/support"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-jp-gold-deep/50 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-gold hover:bg-jp-gold hover:text-jp-obsidian"
                >
                  <LogIn size={14} /> Sign In
                </Link>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-jp-dim">
                  18+ · House Rules in the nav
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
