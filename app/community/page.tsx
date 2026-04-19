import { CommunitySection } from "@/components/jackpot/CommunitySection";

const HITS = [
  { handle: "Sha****", amount: "₿8.42", game: "Molten Gold Deluxe", time: "3m" },
  { handle: "Myk****", amount: "₿6.18", game: "Ruby Run", time: "7m" },
  { handle: "Dro****", amount: "₿4.93", game: "Vault Crash", time: "14m" },
  { handle: "Lys****", amount: "₿3.71", game: "Vulcan Plinko", time: "22m" },
  { handle: "Kae****", amount: "₿2.86", game: "Gilded Mines", time: "28m" },
];

export default function CommunityPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-8 pt-32 pb-20">
      <header className="mb-6 text-center">
        <div className="eyebrow">The Lounge After Hours</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          <span className="gold-text">Community</span>
        </h1>
      </header>

      <CommunitySection />

      <section className="relative mx-auto max-w-4xl px-2 pb-10">
        <h2 className="display mb-6 text-center text-2xl text-jp-white tracking-[0.18em]">
          Hunter Hall · Monthly Roller Spotlight
        </h2>
        <div className="lounge-card rounded-2xl p-8">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-jp-gold-deep bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep font-display text-xl font-bold text-jp-obsidian">
              RH
            </div>
            <div>
              <div className="font-display text-lg text-jp-gold tracking-[0.18em]">
                Rho**** · Gold Chip
              </div>
              <p className="mt-3 text-sm leading-relaxed text-jp-mute">
                This month: a 7.2 BTC pull on Vault Crash, a second-seed at the
                Friday Showdown, and a quiet rise from Silver to Gold on the
                back of a disciplined bankroll. "I set the Reality Check at 20
                minutes, and that keeps it sharp." — Rho
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-4xl px-2 py-10">
        <h2 className="display mb-6 text-center text-2xl text-jp-white tracking-[0.18em]">
          Recent Hits
        </h2>
        <div className="lounge-card rounded-2xl">
          <ul className="divide-y divide-jp-smoke/50">
            {HITS.map((h, i) => (
              <li key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className="font-semibold text-jp-white">{h.handle}</div>
                  <div className="text-xs text-jp-dim">{h.game}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="tabular font-display text-jp-gold">
                    {h.amount}
                  </div>
                  <div className="w-10 text-right text-xs text-jp-dim">
                    {h.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
