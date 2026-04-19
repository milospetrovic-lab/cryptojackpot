"use client";

import { useState } from "react";
import { MagnetoField } from "@/components/three/MagnetoField";
import { GameCard, type GameMeta } from "@/components/jackpot/GameCard";

const SLOTS: GameMeta[] = [
  { name: "Molten Gold Deluxe", rtp: "96.4%", vol: "High", max: "10,000×", tag: "Signature", hue: 48, accent: "gold", live: 342, featured: true },
  { name: "Vault Keeper", rtp: "96.1%", vol: "High", max: "8,000×", tag: "New", hue: 22, accent: "orange", live: 128 },
  { name: "Onyx Crown", rtp: "96.8%", vol: "Med", max: "5,000×", tag: "VIP", hue: 280, accent: "mint", live: 84 },
  { name: "Ruby Run", rtp: "96.3%", vol: "High", max: "12,000×", tag: "Hot", hue: 350, accent: "ruby", live: 276 },
  { name: "Gilded Pharaoh", rtp: "96.0%", vol: "Med", max: "4,500×", tag: "Classic", hue: 44, accent: "gold", live: 61 },
  { name: "The Chamber", rtp: "97.1%", vol: "High", max: "15,000×", tag: "Big Hit", hue: 200, accent: "mint", live: 156 },
];

const JACKPOTS: GameMeta[] = [
  { name: "The Vault", rtp: "95.8%", vol: "High", max: "Progressive", tag: "Live Pool", hue: 48, accent: "gold", live: 512, featured: true },
  { name: "Molten Million", rtp: "95.4%", vol: "High", max: "Progressive", tag: "Live Pool", hue: 22, accent: "orange", live: 289 },
  { name: "Ruby Rising", rtp: "95.9%", vol: "Med", max: "Progressive", tag: "Live Pool", hue: 350, accent: "ruby", live: 198 },
  { name: "Crown Jackpot", rtp: "95.6%", vol: "High", max: "Progressive", tag: "Live Pool", hue: 280, accent: "mint", live: 144 },
];

const ORIGINALS: GameMeta[] = [
  { name: "Vault Crash", rtp: "99.0%", vol: "High", max: "10,000×", tag: "Crash", hue: 350, accent: "ruby", live: 424, featured: true },
  { name: "Vulcan Plinko", rtp: "99.0%", vol: "High", max: "1,000×", tag: "Plinko", hue: 48, accent: "gold", live: 231 },
  { name: "Gilded Mines", rtp: "99.0%", vol: "High", max: "24×24", tag: "Mines", hue: 22, accent: "orange", live: 167 },
  { name: "Onyx Dice", rtp: "99.0%", vol: "Med", max: "9,900×", tag: "Dice", hue: 200, accent: "mint", live: 98 },
  { name: "Chamber Wheel", rtp: "97.0%", vol: "Med", max: "50×", tag: "Wheel", hue: 44, accent: "gold", live: 74 },
  { name: "Limbo Molten", rtp: "99.0%", vol: "High", max: "1,000,000×", tag: "Limbo", hue: 350, accent: "ruby", live: 312 },
];

export default function GamesPage() {
  const [tab, setTab] = useState<"slots" | "jackpots" | "originals">("slots");
  const list = tab === "slots" ? SLOTS : tab === "jackpots" ? JACKPOTS : ORIGINALS;
  const [hero, ...rest] = list;

  return (
    <>
      {/* HERO — poster-backed, magneto particle field */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden md:min-h-[64vh]">
        <img
          src="/images/games/games-hero.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,12,0.55) 0%, rgba(10,10,12,0.35) 40%, rgba(10,10,12,0.9) 100%), radial-gradient(800px 500px at 50% 40%, rgba(196,30,58,0.18), transparent 65%)",
          }}
        />
        <MagnetoField />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 text-center md:pt-32 md:pb-24">
          <div className="eyebrow">The Floor Is Open</div>
          <h1 className="font-bebas gold-text mt-4 text-[clamp(2.6rem,8vw,5.6rem)] leading-[0.95] tracking-[0.08em]">
            GAMES
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-jp-mute md:text-base">
            Six reels, four progressive Vaults, six crypto originals. Every
            Spin feeds the chamber. Every Hit rings the bell.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full border border-jp-gold-deep/50 bg-black/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-jp-gold">
              RTP 95.4 – 99.0%
            </span>
            <span className="rounded-full border border-jp-ruby/50 bg-jp-ruby/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-jp-molten">
              Live Jackpots
            </span>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div className="relative mx-auto max-w-6xl px-4 pt-10 md:px-6">
        <div className="flex flex-wrap justify-center gap-2">
          {(["slots", "jackpots", "originals"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow"
                  : "rounded-full border border-jp-smoke bg-black/40 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-jp-mute hover:text-jp-gold"
              }
            >
              {t === "slots" ? "Reels" : t === "jackpots" ? "Live Vaults" : "Crypto Originals"}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED card + GRID */}
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-8 md:px-6">
        {/* Featured hero card */}
        <div className="mb-6">
          <GameCard g={{ ...hero, featured: true }} large />
        </div>

        {/* Rest of the deck */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((g) => (
            <GameCard key={g.name} g={g} />
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-full border border-jp-gold-deep/60 bg-black/40 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-gold hover:bg-jp-gold hover:text-jp-obsidian">
            Load more games
          </button>
        </div>
      </div>
    </>
  );
}
