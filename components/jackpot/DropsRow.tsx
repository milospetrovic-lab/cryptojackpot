"use client";

import Link from "next/link";

type Drop = {
  name: string;
  match: string;
  chips: string;
  playthrough: string;
  code: string;
  accent: "gold" | "ruby" | "onyx";
};

const DROPS: Drop[] = [
  {
    name: "Opening Hand",
    match: "300% match",
    chips: "150 House Chips",
    playthrough: "Play-through 30×",
    code: "VULCAN300",
    accent: "gold",
  },
  {
    name: "Weekly Showdown",
    match: "Friday 20:00 UTC",
    chips: "10 BTC prize pool",
    playthrough: "No Play-through",
    code: "SHOWDOWN",
    accent: "ruby",
  },
  {
    name: "Ruby Run",
    match: "Reload 150%",
    chips: "75 House Chips",
    playthrough: "Play-through 25×",
    code: "RUBYRUN",
    accent: "onyx",
  },
];

const ACCENTS = {
  gold: "from-jp-gold via-jp-gold-warm to-jp-gold-deep",
  ruby: "from-jp-ruby via-jp-molten to-jp-crimson",
  onyx: "from-jp-smoke via-jp-charcoal to-black",
};

export function DropsRow() {
  return (
    <section className="relative mx-auto max-w-6xl px-8 py-24">
      <div className="mb-12 text-center">
        <div className="eyebrow">Live This Week</div>
        <h2 className="display mt-3 text-[clamp(32px,5vw,52px)] text-jp-white tracking-[0.16em]">
          The <span className="gold-text">Drops</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Three live Drops. Each one carries its Play-through on its face — no
          small print, no surprises.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {DROPS.map((d) => (
          <div
            key={d.code}
            className="group relative overflow-hidden rounded-2xl border border-jp-gold-deep/25 bg-jp-charcoal p-6 transition-all hover:-translate-y-1 hover:border-jp-gold/60 hover:shadow-gold-glow"
          >
            {/* accent bar */}
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${ACCENTS[d.accent]}`}
            />

            <div className="mb-5 flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-jp-dim">
                Code · {d.code}
              </div>
              <div className="rounded-full border border-jp-gold-deep/50 bg-black/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-gold">
                {d.playthrough}
              </div>
            </div>

            <h3 className="display text-2xl text-jp-white tracking-[0.14em]">
              {d.name}
            </h3>

            <div className="my-4 h-px bg-gradient-to-r from-transparent via-jp-gold-deep/40 to-transparent" />

            <ul className="space-y-2 text-sm text-jp-mute">
              <li>
                <span className="text-jp-gold">→</span> {d.match}
              </li>
              <li>
                <span className="text-jp-gold">→</span> {d.chips}
              </li>
              <li>
                <span className="text-jp-gold">→</span> Auto-redeem at stake
              </li>
            </ul>

            <Link
              href="/promotions"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian transition-shadow group-hover:shadow-gold-glow"
            >
              Claim Drop →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
