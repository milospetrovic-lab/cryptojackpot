"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Flame, Zap } from "lucide-react";

export type GameMeta = {
  name: string;
  rtp: string;
  vol: "Low" | "Med" | "High";
  max: string;
  tag: string;
  /** base hue 0-360 for the generative thumbnail */
  hue: number;
  /** accent: "gold" | "orange" | "mint" | "ruby" */
  accent?: "gold" | "orange" | "mint" | "ruby";
  /** fake live play count starting value — animated in the card */
  live?: number;
  featured?: boolean;
};

const ACCENTS = {
  gold: { color: "#E0FF57", rgba: "224,255,87" },
  orange: { color: "#F68838", rgba: "246,136,56" },
  mint: { color: "#7DD8CD", rgba: "125,216,205" },
  ruby: { color: "#C41E3A", rgba: "196,30,58" },
};

export function GameCard({ g, large = false }: { g: GameMeta; large?: boolean }) {
  const liveRef = useRef<HTMLSpanElement>(null);

  // Live-play counter jitter
  useEffect(() => {
    if (!g.live) return;
    let v = g.live;
    const id = setInterval(() => {
      v += Math.round((Math.random() - 0.45) * 6);
      v = Math.max(12, v);
      if (liveRef.current) liveRef.current.textContent = v.toLocaleString();
    }, 1800);
    return () => clearInterval(id);
  }, [g.live]);

  const acc = ACCENTS[g.accent ?? "gold"];

  return (
    <article
      className={
        "group relative overflow-hidden rounded-2xl border border-jp-gold-deep/25 bg-jp-steel transition-all duration-300 hover:-translate-y-1 hover:border-jp-gold/70 " +
        (large
          ? "md:grid md:grid-cols-[1.1fr_1fr] md:gap-0"
          : "")
      }
      style={{
        boxShadow: `0 18px 60px -30px rgba(${acc.rgba},0.35)`,
      }}
    >
      {/* Animated edge sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* THUMBNAIL */}
      <div
        className={
          "relative w-full overflow-hidden " +
          (large ? "h-56 md:h-full md:min-h-[280px]" : "h-44")
        }
        style={{
          background: `
            radial-gradient(640px 320px at 20% -10%, hsla(${g.hue},80%,52%,0.4), transparent 60%),
            radial-gradient(500px 300px at 90% 110%, hsla(${g.hue + 40},80%,45%,0.5), transparent 60%),
            linear-gradient(135deg, #1A1A1D 0%, #0A0A0C 70%)
          `,
        }}
      >
        {/* Decorative chip rings */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30 mix-blend-screen"
          viewBox="0 0 400 280"
        >
          <defs>
            <radialGradient id={`gc-${g.name.replace(/\s+/g, "")}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={acc.color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={acc.color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="320" cy="90" r="70" fill={`url(#gc-${g.name.replace(/\s+/g, "")})`} />
          <circle cx="320" cy="90" r="40" fill="none" stroke={acc.color} strokeWidth="0.8" opacity="0.6" />
          <circle cx="320" cy="90" r="28" fill="none" stroke={acc.color} strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="80" cy="210" r="48" fill="none" stroke={acc.color} strokeWidth="0.5" opacity="0.45" />
        </svg>

        {/* Tag + live counter row */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
          <span
            className="rounded-full border bg-black/65 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: acc.color, borderColor: `rgba(${acc.rgba},0.55)` }}
          >
            {g.tag}
          </span>
          {g.live !== undefined && (
            <span className="flex items-center gap-1.5 rounded-full border border-jp-ruby/50 bg-black/65 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-molten">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jp-molten opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-jp-molten" />
              </span>
              <span ref={liveRef}>{g.live.toLocaleString()}</span> playing
            </span>
          )}
        </div>

        {/* Genre mini-word */}
        <div
          className="font-bebas absolute bottom-4 left-4 text-[clamp(1.6rem,3.2vw,2.4rem)] leading-none tracking-[0.06em]"
          style={{ color: acc.color, opacity: 0.28 }}
        >
          {g.name.split(" ")[0].toUpperCase()}
        </div>

        {/* Big featured icon flourish */}
        {g.featured && (
          <div
            aria-hidden
            className="absolute bottom-4 right-4 opacity-60 transition-transform duration-700 group-hover:rotate-12"
          >
            <Flame size={28} style={{ color: acc.color }} />
          </div>
        )}
      </div>

      {/* BODY */}
      <div className={"p-5 " + (large ? "md:p-8" : "")}>
        <div className="flex items-start justify-between gap-3">
          <h3
            className={
              "font-bebas tracking-[0.08em] text-jp-white " +
              (large ? "text-2xl md:text-4xl" : "text-xl")
            }
          >
            {g.name.toUpperCase()}
          </h3>
        </div>

        {large && (
          <p className="mt-3 max-w-md text-sm leading-relaxed text-jp-mute md:text-base">
            Signature reel. Molten-gold wild symbols, a VAULT progressive bonus
            round, and a top-end multiplier that writes its own Roll Call
            entry.
          </p>
        )}

        <dl className="mt-4 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.2em]">
          <div>
            <dt className="text-jp-dim">RTP</dt>
            <dd className="tabular mt-1 font-mono font-semibold" style={{ color: acc.color }}>
              {g.rtp}
            </dd>
          </div>
          <div>
            <dt className="text-jp-dim">Volatility</dt>
            <dd className="mt-1 text-jp-white">{g.vol}</dd>
          </div>
          <div>
            <dt className="text-jp-dim">Max Hit</dt>
            <dd className="tabular mt-1 font-mono text-jp-white">{g.max}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-center gap-2">
          <Link
            href="/games"
            className={
              "group/cta relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border-2 py-2.5 text-[11px] font-bold uppercase tracking-[0.24em] transition-all " +
              (large
                ? "bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep border-transparent text-jp-obsidian shadow-gold-glow"
                : "border-jp-gold-deep/60 text-jp-gold hover:bg-jp-gold hover:text-jp-obsidian hover:border-jp-gold")
            }
          >
            <Zap size={13} />
            <span>Spin</span>
          </Link>
          {large && (
            <Link
              href="/games"
              className="rounded-full border border-jp-smoke bg-black/40 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-mute hover:border-jp-gold hover:text-jp-gold"
            >
              Demo
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
