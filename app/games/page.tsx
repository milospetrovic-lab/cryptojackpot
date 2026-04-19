"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnetoField } from "@/components/three/MagnetoField";
import { VaultCounter } from "@/components/jackpot/VaultCounter";

type Game = {
  name: string;
  rtp: string;
  vol: "Low" | "Med" | "High";
  max: string;
  tag: string;
};

// Re-themed to jackpot-first vocabulary — no forge, no hammer, no ore.
const SLOTS: Game[] = [
  { name: "Molten Gold Deluxe", rtp: "96.4%", vol: "High", max: "10,000×", tag: "Signature" },
  { name: "Vault Keeper", rtp: "96.1%", vol: "High", max: "8,000×", tag: "New" },
  { name: "Onyx Crown", rtp: "96.8%", vol: "Med", max: "5,000×", tag: "VIP" },
  { name: "Ruby Run", rtp: "96.3%", vol: "High", max: "12,000×", tag: "Hot" },
  { name: "Gilded Pharaoh", rtp: "96.0%", vol: "Med", max: "4,500×", tag: "Classic" },
  { name: "The Chamber", rtp: "97.1%", vol: "High", max: "15,000×", tag: "Big Hit" },
];

const JACKPOTS: Game[] = [
  { name: "The Vault", rtp: "95.8%", vol: "High", max: "Progressive", tag: "Live Pool" },
  { name: "Molten Million", rtp: "95.4%", vol: "High", max: "Progressive", tag: "Live Pool" },
  { name: "Ruby Rising", rtp: "95.9%", vol: "Med", max: "Progressive", tag: "Live Pool" },
  { name: "Crown Jackpot", rtp: "95.6%", vol: "High", max: "Progressive", tag: "Live Pool" },
];

const ORIGINALS: Game[] = [
  { name: "Vault Crash", rtp: "99.0%", vol: "High", max: "10,000×", tag: "Crypto Original" },
  { name: "Vulcan Plinko", rtp: "99.0%", vol: "High", max: "1,000×", tag: "Crypto Original" },
  { name: "Gilded Mines", rtp: "99.0%", vol: "High", max: "24×24", tag: "Crypto Original" },
  { name: "Onyx Dice", rtp: "99.0%", vol: "Med", max: "9,900×", tag: "Crypto Original" },
  { name: "Chamber Wheel", rtp: "97.0%", vol: "Med", max: "50×", tag: "Crypto Original" },
  { name: "Limbo Molten", rtp: "99.0%", vol: "High", max: "1,000,000×", tag: "Crypto Original" },
];

export default function GamesPage() {
  const [tab, setTab] = useState<"slots" | "jackpots" | "originals">("slots");
  const list = tab === "slots" ? SLOTS : tab === "jackpots" ? JACKPOTS : ORIGINALS;

  return (
    <>
      {/* HERO — poster-backed, magneto particle field, jackpot copy */}
      <section className="relative flex min-h-[72vh] items-center justify-center overflow-hidden">
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

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-36 pb-20 text-center">
          <div className="eyebrow">The Floor Is Open</div>
          <h1 className="display gold-text mt-4 text-[clamp(2.6rem,8vw,5.6rem)] leading-[0.95] tracking-[0.08em]">
            GAMES
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-jp-mute md:text-base">
            Six reels, four progressive Vaults, six crypto originals. Every
            Spin feeds the chamber. Every Hit rings the bell. Nothing here is
            decorative — every title on the floor is here because it pays.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full border border-jp-gold-deep/50 bg-black/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-jp-gold">
              RTP 95.4 – 99.0%
            </span>
            <span className="rounded-full border border-jp-ruby/50 bg-jp-ruby/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-jp-molten">
              Live Jackpots
            </span>
            <span className="rounded-full border border-jp-gold-deep/30 bg-black/50 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-jp-mute">
              Play-through on every Drop
            </span>
          </div>
        </div>
      </section>

      {/* VAULT STRIP */}
      <section className="relative mx-auto flex max-w-6xl justify-center px-8 py-10">
        <VaultCounter variant="sticky" />
      </section>

      <div className="relative mx-auto max-w-6xl px-6 pb-24">
        {/* TABS */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {(["slots", "jackpots", "originals"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                tab === t
                  ? "rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow"
                  : "rounded-full border border-jp-smoke bg-black/40 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-jp-mute hover:text-jp-gold"
              }
            >
              {t === "slots" ? "Reels" : t === "jackpots" ? "Live Vaults" : "Crypto Originals"}
            </button>
          ))}
        </div>

        {/* GAME CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <article
              key={g.name}
              className="group relative overflow-hidden rounded-xl border border-jp-gold-deep/20 bg-jp-steel transition-all hover:-translate-y-1 hover:border-jp-gold/60 hover:shadow-gold-glow"
            >
              <div
                className="relative h-44 w-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #1A1A1D 0%, #0A0A0C 50%, #8B1A2B 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(400px 150px at 60% 50%, rgba(255,215,0,0.35), transparent 60%)",
                  }}
                />
                <div className="absolute left-4 top-4 rounded-full border border-jp-gold-deep/50 bg-black/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-gold">
                  {g.tag}
                </div>
                <div className="absolute bottom-4 left-4 font-display text-sm tracking-[0.22em] text-jp-gold">
                  {g.name.split(" ")[0].toUpperCase()}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-lg text-jp-white tracking-[0.14em]">
                  {g.name}
                </h3>
                <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.2em]">
                  <div>
                    <dt className="text-jp-dim">RTP</dt>
                    <dd className="tabular text-jp-gold">{g.rtp}</dd>
                  </div>
                  <div>
                    <dt className="text-jp-dim">Volatility</dt>
                    <dd className="text-jp-white">{g.vol}</dd>
                  </div>
                  <div>
                    <dt className="text-jp-dim">Max Hit</dt>
                    <dd className="tabular text-jp-white">{g.max}</dd>
                  </div>
                </dl>
                <button className="mt-5 w-full rounded-full border border-jp-gold-deep/60 bg-transparent py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-gold transition-colors hover:bg-jp-gold hover:text-jp-obsidian">
                  Spin
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* SCROLL COMPARATOR — stage-reveal storytelling */}
      <section className="relative mt-10 border-y border-jp-gold-deep/20 bg-black">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-6 text-center">
          <div className="eyebrow">The House Curated</div>
          <h2 className="display mt-3 text-[clamp(28px,4.5vw,44px)] text-jp-white tracking-[0.14em]">
            <span className="gold-text">Four Stages.</span> One Hit.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-jp-mute">
            Scroll to ride the build-up. The reveal is tied to scroll
            position — no auto-play, you drive the story.
          </p>
        </div>
        <iframe
          src="/demos/comparator.html"
          title="Stage comparator"
          className="block h-[min(260vh,2400px)] w-full"
          style={{ border: 0, background: "transparent" }}
          loading="lazy"
        />
        <div className="mx-auto max-w-3xl px-6 pt-2 pb-14 text-center">
          <Link
            href="/promotions"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-jp-gold hover:underline"
          >
            See this week's Drops →
          </Link>
        </div>
      </section>
    </>
  );
}
