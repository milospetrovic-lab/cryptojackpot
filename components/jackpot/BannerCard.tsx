"use client";

import Link from "next/link";
import { useInView } from "react-intersection-observer";

/**
 * BannerCard — full-width landing banner.
 * Layer 1: user-supplied banner PNG (3D crypto sign render).
 * Layer 2: particles.js (Vincent Garreau) iframe, transparent, gold + ruby.
 *          Count auto-scales by viewport in the HTML.
 * Layer 3: copy + CTA.
 */
export function BannerCard() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "120px" });

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-3xl border border-jp-gold-deep/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
        style={{
          aspectRatio: "16 / 9",
          minHeight: 340,
        }}
      >
        {/* Layer 1 — banner image */}
        <img
          src="/images/banner/crypto-banner.png"
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Layer 1.5 — gradient wash for contrast */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.55) 40%, rgba(10,10,12,0.2) 100%)",
          }}
        />

        {/* Layer 2 — particles.js iframe (transparent) */}
        {inView && (
          <iframe
            src="/demos/particles-banner.html"
            loading="lazy"
            allowTransparency
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, background: "transparent" }}
            title="Banner particles"
          />
        )}

        {/* Layer 3 — copy */}
        <div className="relative z-10 flex h-full flex-col justify-center px-5 py-8 md:px-14 md:py-10">
          <div className="eyebrow">The Vault Is Open</div>
          <h2 className="display mt-3 max-w-xl text-jp-white tracking-[0.1em] leading-[0.95] text-[clamp(1.4rem,4.2vw,3.2rem)]">
            Every Spin <span className="gold-text">Feeds the Fire</span>
          </h2>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-jp-mute md:mt-4 md:text-base">
            Stake in BTC, ETH, SOL, USDC. Drops auto-redeem. Play-through on
            the face. The Concierge is at the door.
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3 md:mt-7">
            <Link
              href="/games"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow sm:px-7 sm:tracking-[0.24em]"
            >
              Enter the Vault
            </Link>
            <Link
              href="/promotions"
              className="inline-flex items-center justify-center rounded-full border border-jp-gold-deep/50 bg-black/40 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-gold backdrop-blur hover:bg-black/60 sm:px-7 sm:tracking-[0.24em]"
            >
              This Week's Drops
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
