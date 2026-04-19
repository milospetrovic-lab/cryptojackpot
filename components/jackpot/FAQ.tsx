const FAQS = [
  {
    q: "How do I make my first Stake?",
    a: "Sign in, connect your wallet, deposit in BTC or ETH — your Chip Stack updates in seconds. Every Stake feeds the Vault.",
  },
  {
    q: "What is Play-through?",
    a: "Play-through is how many times you must Spin a Drop before it converts to withdrawable. We show Play-through on every Drop up-front.",
  },
  {
    q: "How do Crown Tiers work?",
    a: "Session days and total Stake unlock each Chip. Ruby and Onyx add a dedicated host and bespoke Drops. Your Chip rotates live in your account area.",
  },
  {
    q: "Are my winnings anonymous?",
    a: "Yes. The Roll Call anonymizes handles. We never publish full names, wallet addresses, or amounts tied to identity.",
  },
  {
    q: "What cryptos do you accept?",
    a: "BTC, ETH, SOL, USDC, USDT, and LTC. Lightning Network for BTC deposits and withdrawals. No card deposits.",
  },
  {
    q: "How fast are withdrawals?",
    a: "Most withdrawals clear in under 10 minutes. Onyx Rollers get priority routing and a 1-minute median.",
  },
  {
    q: "Is CryptoJackpot licensed?",
    a: "Yes — licensed in Curaçao. We geofence jurisdictions where crypto gaming is restricted. Players in restricted regions are blocked at sign-in.",
  },
  {
    q: "What are House Rules?",
    a: "Your controls: Stake limits, reality-check timers, loss history, self-exclusion. Visible in the nav and footer — never buried.",
  },
  {
    q: "Can I play on mobile?",
    a: "Yes. The full lounge is mobile-ready. Live particle effects fall back to posters on screens under 768px to keep it smooth.",
  },
  {
    q: "How do I contact the Concierge?",
    a: "Live chat 24/7 from the Concierge page. Gold and Onyx Chips get a dedicated host with a direct line.",
  },
];

export function FAQ() {
  return (
    <section className="relative mx-auto max-w-5xl px-8 py-24">
      <div className="mb-12 text-center">
        <div className="eyebrow">Ask the Concierge</div>
        <h2 className="display mt-3 text-[clamp(32px,5vw,52px)] text-jp-white tracking-[0.16em]">
          <span className="gold-text">Frequently</span> Answered
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {FAQS.map((f) => (
          <div
            key={f.q}
            className="lounge-card rounded-xl p-6 transition-colors hover:border-jp-gold/40"
          >
            <div className="flex items-start gap-3">
              <span className="mt-1 font-display text-sm text-jp-gold">·</span>
              <div>
                <h3 className="font-display text-base text-jp-white tracking-[0.12em]">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-jp-mute">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
