"use client";

import { useState } from "react";
import { VaultCounter } from "@/components/jackpot/VaultCounter";

type Game = {
  name: string;
  rtp: string;
  vol: "Low" | "Med" | "High";
  max: string;
};

const SLOTS: Game[] = [
  { name: "Molten Gold Deluxe", rtp: "96.4%", vol: "High", max: "10,000×" },
  { name: "Vulcan Forge", rtp: "96.1%", vol: "High", max: "8,000×" },
  { name: "Onyx Crown", rtp: "96.8%", vol: "Med", max: "5,000×" },
  { name: "Ruby Run", rtp: "96.3%", vol: "High", max: "12,000×" },
  { name: "Gilded Pharaoh", rtp: "96.0%", vol: "Med", max: "4,500×" },
  { name: "The Chamber", rtp: "97.1%", vol: "High", max: "15,000×" },
];

const JACKPOTS: Game[] = [
  { name: "The Vault", rtp: "95.8%", vol: "High", max: "Progressive" },
  { name: "Molten Million", rtp: "95.4%", vol: "High", max: "Progressive" },
  { name: "Ruby Rising", rtp: "95.9%", vol: "Med", max: "Progressive" },
  { name: "Crown Jackpot", rtp: "95.6%", vol: "High", max: "Progressive" },
];

const ORIGINALS: Game[] = [
  { name: "Vault Crash", rtp: "99.0%", vol: "High", max: "10,000×" },
  { name: "Vulcan Plinko", rtp: "99.0%", vol: "High", max: "1,000×" },
  { name: "Gilded Mines", rtp: "99.0%", vol: "High", max: "24×24" },
  { name: "Onyx Dice", rtp: "99.0%", vol: "Med", max: "9,900×" },
  { name: "Chamber Wheel", rtp: "97.0%", vol: "Med", max: "50×" },
  { name: "Limbo Molten", rtp: "99.0%", vol: "High", max: "1,000,000×" },
];

export default function GamesPage() {
  const [tab, setTab] = useState<"slots" | "jackpots" | "originals">("slots");
  const list = tab === "slots" ? SLOTS : tab === "jackpots" ? JACKPOTS : ORIGINALS;

  return (
    <div className="relative mx-auto max-w-6xl px-8 pt-32 pb-20">
      <header className="mb-12 text-center">
        <div className="eyebrow">The Floor</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          <span className="gold-text">Games</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Slots, live jackpots, and crypto originals. No sports. No cards. Just
          the reel, the wheel, and the Vault.
        </p>
      </header>

      <div className="mb-8 flex justify-center">
        <VaultCounter variant="sticky" />
      </div>

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
            {t === "slots" ? "Slots" : t === "jackpots" ? "Live Jackpots" : "Crypto Originals"}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((g) => (
          <article
            key={g.name}
            className="group relative overflow-hidden rounded-xl border border-jp-gold-deep/20 bg-jp-steel transition-all hover:-translate-y-1 hover:border-jp-gold/60 hover:shadow-gold-glow"
          >
            <div
              className="relative h-40 w-full overflow-hidden"
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
              <div className="absolute bottom-4 left-4 font-display text-sm tracking-[0.2em] text-jp-gold">
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
                  <dt className="text-jp-dim">Vol</dt>
                  <dd className="text-jp-white">{g.vol}</dd>
                </div>
                <div>
                  <dt className="text-jp-dim">Max</dt>
                  <dd className="tabular text-jp-white">{g.max}</dd>
                </div>
              </dl>
              <button className="mt-5 w-full rounded-full border border-jp-gold-deep/60 bg-transparent py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-gold transition-colors hover:bg-jp-gold hover:text-jp-obsidian">
                Play
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
