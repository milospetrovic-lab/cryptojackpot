"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COINS = [
  {
    code: "BTC",
    name: "Bitcoin",
    blurb: "Lightning in, on-chain out. Median withdrawal 4m.",
    ring: "#F7931A",
    symbol: "₿",
  },
  {
    code: "ETH",
    name: "Ethereum",
    blurb: "ERC-20 Stake, gas rebated on Ruby+ Chips.",
    ring: "#627EEA",
    symbol: "Ξ",
  },
  {
    code: "LTC",
    name: "Litecoin",
    blurb: "Fast settlement, low fees, auto-convert.",
    ring: "#345D9D",
    symbol: "Ł",
  },
];

export function DepositTrio() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".dp-card").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="deposit"
      className="relative mx-auto max-w-6xl px-6 py-20"
    >
      <div className="mb-10 text-center">
        <div className="eyebrow">Fund The Stack</div>
        <h2 className="font-bebas mt-2 text-[clamp(2rem,5vw,3.8rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
          DEPOSIT <span className="gold-text">IN CRYPTO</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-jp-mute">
          Three rails. No cards. No wire transfers. Your Stake is on the floor
          in under a minute.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {COINS.map((c) => (
          <div
            key={c.code}
            className="dp-card group relative overflow-hidden rounded-2xl border border-jp-gold-deep/25 bg-gradient-to-b from-jp-steel to-jp-charcoal p-7 transition-transform hover:-translate-y-1 hover:shadow-gold-glow"
          >
            <div className="flex items-center gap-4">
              <span
                className="grid h-14 w-14 place-items-center rounded-full border text-2xl font-bold text-jp-obsidian"
                style={{
                  background: `radial-gradient(circle, ${c.ring} 0%, #0a0a0c 110%)`,
                  borderColor: c.ring,
                  boxShadow: `0 0 28px ${c.ring}66`,
                }}
              >
                <span style={{ color: c.ring, textShadow: "0 0 10px rgba(0,0,0,0.8)" }}>{c.symbol}</span>
              </span>
              <div>
                <div className="font-bebas text-2xl leading-none tracking-[0.06em] text-jp-white">
                  {c.name.toUpperCase()}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-jp-gold">
                  {c.code} deposits open
                </div>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-jp-mute">{c.blurb}</p>
            <Link
              href="/support"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-jp-gold-deep/50 bg-black/50 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-jp-gold transition-colors hover:bg-jp-gold hover:text-jp-obsidian"
            >
              Deposit {c.code} →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
