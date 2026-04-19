"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/promotions", label: "Drops" },
  { href: "/vip-crown", label: "Crown" },
  { href: "/leaderboard", label: "Roll Call" },
  { href: "/community", label: "Community" },
  { href: "/responsible-play", label: "House" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[150] flex justify-center px-4 pt-4"
        initial={false}
      >
        <motion.nav
          layout
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className={
            scrolled
              ? "flex w-auto items-center gap-4 rounded-full border border-jp-gold-deep/40 bg-black/65 px-5 py-2.5 shadow-[0_12px_40px_-10px_rgba(255,215,0,0.35)] backdrop-blur-2xl"
              : "flex w-full items-center justify-between rounded-2xl border border-jp-smoke/60 bg-black/55 px-6 py-3.5 backdrop-blur-xl"
          }
          style={{ maxWidth: scrolled ? 880 : 1280 }}
        >
          <Link href="/" className="flex items-center gap-2.5 whitespace-nowrap">
            <span className="grid h-8 w-8 place-items-center rounded-full border border-jp-gold-deep bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep font-display text-[12px] font-bold text-jp-obsidian tracking-[0.08em]">
              CJ
            </span>
            <span className="display text-[13px] text-jp-gold tracking-[0.32em]">
              cryptojackpot
            </span>
          </Link>

          <div className="mx-6 hidden flex-1 items-center justify-center gap-5 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-jp-mute transition-colors hover:text-jp-gold"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/support"
              className="hidden rounded-full border border-jp-gold-deep/70 bg-gradient-to-b from-jp-gold-pale to-jp-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-jp-obsidian transition-all hover:shadow-gold-glow md:inline-flex"
            >
              Sign In
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="text-jp-gold lg:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed inset-x-0 top-[88px] z-[140] border-y border-jp-smoke bg-black/95 px-4 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-jp-smoke py-4 text-sm font-semibold uppercase tracking-[0.2em] text-jp-mute hover:text-jp-gold"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/support"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.2em] text-jp-obsidian"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
