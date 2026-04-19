"use client";

import Link from "next/link";

const LINKS = [
  { label: "Games", href: "/games" },
  { label: "Drops", href: "/promotions" },
  { label: "Crown Tiers", href: "/vip-crown" },
  { label: "Roll Call", href: "/leaderboard" },
  { label: "House Rules", href: "/responsible-play" },
  { label: "Concierge", href: "/support" },
  { label: "About", href: "/about" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-jp-smoke/60 bg-gradient-to-b from-jp-charcoal via-black to-black">
      {/* subtle animated gold dust — CSS only, opacity cap ≤ 0.20 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ opacity: 0.2 }}
      >
        <div
          className="absolute -top-10 left-0 right-0 h-40"
          style={{
            background:
              "radial-gradient(600px 100px at 20% 30%, rgba(255,215,0,0.25), transparent 70%), radial-gradient(500px 90px at 80% 60%, rgba(212,175,55,0.2), transparent 70%)",
            filter: "blur(18px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-jp-gold-deep bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep font-display text-sm font-bold text-jp-obsidian tracking-[0.12em]">
                CJ
              </div>
              <span className="display text-base text-jp-gold tracking-[0.4em]">
                CRYPTOJACKPOT
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-jp-mute">
              A Vulcan VIP crypto casino. Every Spin feeds the Vault. Every Hit
              rings the chamber. You Roll. The Vault answers.
            </p>
            <div className="mt-6 text-xs uppercase tracking-[0.3em] text-jp-dim">
              Play with a clear head.{" "}
              <Link
                href="/responsible-play"
                className="text-jp-gold underline-offset-4 hover:underline"
              >
                House Rules →
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="eyebrow mb-4">The Lounge</div>
            <ul className="space-y-3">
              {LINKS.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-jp-mute hover:text-jp-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">The Concierge</div>
            <ul className="space-y-3">
              {LINKS.slice(4).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-jp-mute hover:text-jp-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-divider mt-12" />

        <div className="mt-8 flex flex-col items-start justify-between gap-6 text-xs text-jp-dim md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-jp-smoke px-3 py-1 font-semibold tracking-[0.2em] text-jp-mute">
              18+ ONLY
            </span>
            <span className="uppercase tracking-[0.2em]">
              BeGambleAware · GamCare · Gambling Therapy
            </span>
          </div>
          <div className="uppercase tracking-[0.2em]">
            Licensed in Curaçao · © {new Date().getFullYear()} CryptoJackpot
          </div>
        </div>
      </div>
    </footer>
  );
}
