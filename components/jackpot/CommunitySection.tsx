import Link from "next/link";

type Card = {
  name: string;
  members: string;
  blurb: string;
  samples: string[];
  cta: string;
  href: string;
  accent: string;
};

const CARDS: Card[] = [
  {
    name: "Discord",
    members: "2,400+ Rollers online",
    blurb:
      "Live Hit feed, Drop drops, Vulcan lore threads, and direct lines to the Concierge.",
    samples: [
      "Dro**** · +4.9 BTC on Vault Crash",
      "Myk**** · silver → gold Chip",
      "Concierge · Friday Showdown seeding now",
    ],
    cta: "Join Discord",
    href: "#",
    accent: "from-jp-gold via-jp-gold-warm to-jp-gold-deep",
  },
  {
    name: "Telegram",
    members: "3,900+ Rollers subscribed",
    blurb:
      "Drop alerts, the weekly Roll Call digest, and the Showdown countdown at Friday 20:00 UTC.",
    samples: [
      "Drop · VULCAN300 code live",
      "Showdown · 10 BTC pool confirmed",
      "Rare Drop window opens Sunday 18:00",
    ],
    cta: "Join Telegram",
    href: "#",
    accent: "from-jp-ruby via-jp-molten to-jp-crimson",
  },
];

export function CommunitySection() {
  return (
    <section className="relative mx-auto max-w-6xl px-8 py-24">
      <div className="mb-12 text-center">
        <div className="eyebrow">The Lounge After Hours</div>
        <h2 className="display mt-3 text-[clamp(32px,5vw,52px)] text-jp-white tracking-[0.16em]">
          <span className="gold-text">Community</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Two rooms. Slots, jackpots, crypto chat. No sports. No cards. Just
          Rollers.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {CARDS.map((c) => (
          <div
            key={c.name}
            className="relative overflow-hidden rounded-2xl border border-jp-gold-deep/25 bg-jp-charcoal p-7"
          >
            <div
              className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${c.accent}`}
            />
            <div className="flex items-center justify-between">
              <h3 className="display text-2xl text-jp-white tracking-[0.16em]">
                {c.name}
              </h3>
              <span className="rounded-full border border-jp-gold-deep/40 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-gold">
                {c.members}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-jp-mute">
              {c.blurb}
            </p>

            <ul className="mt-5 space-y-2 font-mono text-[12px] text-jp-dim">
              {c.samples.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="text-jp-gold">›</span>
                  <span className="truncate">{s}</span>
                </li>
              ))}
            </ul>

            <Link
              href={c.href}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian hover:shadow-gold-glow"
            >
              {c.cta} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
