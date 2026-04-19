"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/games", label: "Games" },
  { href: "/promotions", label: "Drops" },
  { href: "/vip-crown", label: "Crown Tiers" },
  { href: "/leaderboard", label: "Roll Call" },
  { href: "/community", label: "Community" },
  { href: "/responsible-play", label: "House Rules" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={
          scrolled
            ? "fixed top-4 left-1/2 z-[150] flex -translate-x-1/2 items-center gap-6 rounded-full border border-jp-gold-deep/40 bg-black/55 px-6 py-3 shadow-gold-glow backdrop-blur-2xl"
            : "fixed top-0 left-0 z-[150] flex w-full items-center justify-between border-b border-jp-smoke/50 bg-black/30 px-8 py-5 backdrop-blur-md"
        }
        style={{ maxWidth: scrolled ? 900 : "100%" }}
      >
        <Link href="/" className="flex items-center gap-3 whitespace-nowrap">
          <div className="grid h-8 w-8 place-items-center rounded-full border border-jp-gold-deep bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep font-display text-[13px] font-bold text-jp-obsidian tracking-[0.12em]">
            CJ
          </div>
          <span className="display text-sm text-jp-gold tracking-[0.35em]">
            CRYPTOJACKPOT
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-jp-mute transition-colors hover:text-jp-gold"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/support"
            className="hidden rounded-full border border-jp-gold-deep/70 bg-gradient-to-b from-jp-gold-pale to-jp-gold px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-jp-obsidian transition-all hover:shadow-gold-glow md:inline-flex"
          >
            Sign In
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-jp-gold"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[72px] z-[140] border-b border-jp-smoke bg-black/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-6">
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
