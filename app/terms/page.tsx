import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — cryptojackpot",
  description:
    "Terms of Use for cryptojackpot.com. Eligibility, account conduct, Stakes and Drops, withdrawals, and enforcement.",
};

const SECTIONS = [
  {
    n: "01",
    title: "Who may play",
    body: [
      "You must be 18+ (21+ where required by law) to open an account, place a Stake, or claim a Drop.",
      "The lounge is geofenced. If your jurisdiction is restricted we'll block sign-in and refund any deposit in full within three business days.",
      "One account per Roller. Multi-accounting voids winnings and forfeits the balance.",
    ],
  },
  {
    n: "02",
    title: "Your account",
    body: [
      "You're responsible for keeping your sign-in credentials and wallet keys safe. We cannot recover access on your behalf.",
      "House Rules tools — Stake limits, reality checks, self-exclusion — take effect the moment you set them. Reductions are immediate; increases wait 24 hours.",
      "If at any point your play looks at-risk, the Concierge will quietly suggest House Rules. No pressure, no penalty.",
    ],
  },
  {
    n: "03",
    title: "Stakes, Drops and Play-through",
    body: [
      "Every Drop carries its Play-through requirement on the face of the offer. No buried terms.",
      "Play-through is calculated on the bonus portion of your Stake Stack, not your deposit. Clearing can be paused at any time from your account dashboard.",
      "Cancelling a Drop mid-clear forfeits the bonus. Your original deposit remains yours.",
    ],
  },
  {
    n: "04",
    title: "Withdrawals",
    body: [
      "Median withdrawal is under 10 minutes. Onyx Chips get sub-minute routing.",
      "We may verify identity on large withdrawals per the regulator's KYC thresholds. Verification requests are limited to what the regulator requires, never more.",
      "Deposit rails: BTC (Lightning + on-chain), ETH (ERC-20), SOL, USDC, USDT, LTC. No cards.",
    ],
  },
  {
    n: "05",
    title: "Fair play",
    body: [
      "All outcomes are provably fair — per-game seeds published on request.",
      "Collusion, bot use, API abuse, or exploiting software defects voids the session and may lead to suspension.",
      "Chargebacks or disputed crypto deposits freeze the associated account until resolved.",
    ],
  },
  {
    n: "06",
    title: "Anonymity",
    body: [
      "Handles on the Roll Call and the community feeds are anonymised (e.g. Sha****).",
      "We never publish full names, wallet addresses, or identifying amounts. Press enquiries route through the Concierge.",
    ],
  },
  {
    n: "07",
    title: "Changes to these terms",
    body: [
      "We'll post a 30-day notice in the lounge before any material change that affects Stake mechanics, Drop structure, or withdrawal rails.",
      "Minor clarifications (typos, reorder of sections, renamed helpline numbers) may land without notice.",
    ],
  },
  {
    n: "08",
    title: "Contact",
    body: [
      "The Concierge is live 24/7. For legal and press enquiries: concierge@cryptojackpot.example. For compliance: compliance@cryptojackpot.example.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="relative mx-auto w-full max-w-3xl px-5 pt-24 pb-16 md:px-8 md:pt-32 md:pb-24">
      <header className="mb-10 text-center">
        <div className="eyebrow">The Fine Print</div>
        <h1 className="font-bebas mt-4 text-[clamp(2.4rem,7vw,5rem)] leading-[0.95] tracking-[0.08em] text-jp-white">
          <span className="gold-text">TERMS</span> OF USE
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Last revised 2026-04-19. Shorter on purpose — the lounge reads
          what it writes.
        </p>
      </header>

      <ol className="space-y-6">
        {SECTIONS.map((s) => (
          <li
            key={s.n}
            className="lounge-card min-w-0 rounded-2xl p-5 md:p-7"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-jp-gold">
                {s.n}
              </span>
              <h2 className="font-bebas text-xl tracking-[0.14em] text-jp-white md:text-2xl">
                {s.title.toUpperCase()}
              </h2>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-jp-mute md:text-[15px]">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="gold-divider my-10" />

      <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.25em] text-jp-dim">
        <div>© {new Date().getFullYear()} cryptojackpot · Curaçao licence</div>
        <div className="flex gap-4">
          <Link href="/responsible-play" className="hover:text-jp-gold">
            House Rules
          </Link>
          <Link href="/support" className="hover:text-jp-gold">
            Concierge
          </Link>
          <Link href="/about" className="hover:text-jp-gold">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}
