type Drop = {
  name: string;
  subtitle: string;
  bullets: string[];
  playthrough: string;
  code: string;
  accent: "gold" | "ruby" | "onyx";
};

const DROPS: Drop[] = [
  {
    name: "Opening Hand",
    subtitle: "The introduction package for new Rollers",
    bullets: ["300% match on first Stake up to 2 BTC", "150 House Chips on Molten Gold Deluxe", "Auto-redeemed at stake confirmation"],
    playthrough: "Play-through 30× (bonus only)",
    code: "VULCAN300",
    accent: "gold",
  },
  {
    name: "Weekly Showdown",
    subtitle: "Friday 20:00 UTC · all Rollers qualify with 0.1 BTC Spin",
    bullets: ["10 BTC guaranteed prize pool", "Top 50 placements paid", "Leaderboard freezes at Showdown"],
    playthrough: "No Play-through on prize payouts",
    code: "SHOWDOWN",
    accent: "ruby",
  },
  {
    name: "Ruby Run",
    subtitle: "Reload bonus available every Sunday",
    bullets: ["150% match up to 0.75 BTC", "75 House Chips on Ruby Run slot", "Stacks with weekly Retainer"],
    playthrough: "Play-through 25×",
    code: "RUBYRUN",
    accent: "onyx",
  },
  {
    name: "The Crown Invitation",
    subtitle: "Onyx-only — quarterly",
    bullets: ["Bespoke Drop sized to your play history", "Dedicated-host delivery", "Bundled with private experience invite"],
    playthrough: "No Play-through",
    code: "ONYX",
    accent: "gold",
  },
  {
    name: "Chamber Jackpot",
    subtitle: "Ongoing — every Spin feeds the Vault",
    bullets: ["Progressive pool tracking in real time", "Automatic entry on every qualifying Spin", "Current pool visible in Vault Counter"],
    playthrough: "Standard game rules apply",
    code: "AUTO",
    accent: "ruby",
  },
];

const ACCENTS = {
  gold: "from-jp-gold via-jp-gold-warm to-jp-gold-deep",
  ruby: "from-jp-ruby via-jp-molten to-jp-crimson",
  onyx: "from-jp-smoke via-jp-charcoal to-black",
};

export default function PromotionsPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-8 pt-32 pb-24">
      <header className="mb-14 text-center">
        <div className="eyebrow">Active This Week</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          The <span className="gold-text">Drops</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Every Drop shows Play-through on its face. No small print. No buried
          terms. That's the House Rule.
        </p>
      </header>

      <div className="space-y-6">
        {DROPS.map((d) => (
          <article
            key={d.code}
            className="relative overflow-hidden rounded-2xl border border-jp-gold-deep/25 bg-jp-charcoal p-7"
          >
            <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${ACCENTS[d.accent]}`} />
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="display text-2xl text-jp-white tracking-[0.18em]">
                  {d.name}
                </h2>
                <p className="mt-1 text-sm text-jp-mute">{d.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-jp-gold-deep/50 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-gold">
                  Code · {d.code}
                </span>
                <span className="rounded-full border border-jp-ruby/50 bg-jp-ruby/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-molten">
                  {d.playthrough}
                </span>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-jp-mute">
              {d.bullets.map((b) => (
                <li key={b}>
                  <span className="text-jp-gold">→</span> {b}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <button className="rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian hover:shadow-gold-glow">
                Claim Drop →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
