"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Phase = {
  tag: string;
  title: string;
  body: string;
  deliverables: string[];
  accent: string; // css var or hex
  status: "Live" | "Next" | "Soon";
};

const PHASES: Phase[] = [
  {
    tag: "Phase 01",
    title: "Teasing Phase",
    body:
      "Soft-launch the lounge. Private-beta Rollers, closed Discord, the first Opening Hand Drop. No advertising. The door opens if you know where it is.",
    deliverables: [
      "Private beta access",
      "Opening Hand 300% Drop",
      "Discord seeding (under 3k members)",
      "Vault counter simulation live",
    ],
    accent: "var(--jp-gold)",
    status: "Live",
  },
  {
    tag: "Phase 02",
    title: "First Minting",
    body:
      "Crown Tiers open. Bronze is free with your first Stake. The Roll Call goes public, the weekly Showdown begins. Gold Chip unlocks the Concierge.",
    deliverables: [
      "Crown Tiers 01–04 public",
      "Weekly Showdown live",
      "The Concierge 24/7",
      "Play-through disclosures audited",
    ],
    accent: "#E63946",
    status: "Next",
  },
  {
    tag: "Phase 03",
    title: "Reveal Phase",
    body:
      "The Vault opens fully. Onyx Crown goes live by invitation. Crypto originals ship. Real-time Hit ticker and site-wide ringing event. The lounge stops whispering.",
    deliverables: [
      "Onyx Crown invitations",
      "Crypto originals suite",
      "Live Hit ticker + site-wide ringing",
      "Cross-chain deposits (BTC · ETH · LTC · SOL)",
    ],
    accent: "#F0FFA0",
    status: "Soon",
  },
];

export function Roadmap() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rm-phase").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: i % 2 === 0 ? -80 : 80,
          y: 40,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".rm-heading", {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rm-heading",
          start: "top 85%",
        },
      });

      gsap.from(".rm-spine", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
          end: "bottom 50%",
          scrub: 0.6,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="rm-heading mb-14 text-center">
        <div className="eyebrow">The Build</div>
        <h2 className="font-bebas mt-3 text-[clamp(2.6rem,6vw,5rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
          ROAD <span className="gold-text">MAP</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Three phases. No vaporware dates. Each phase ships when the lounge
          says it's ready.
        </p>
      </div>

      <div className="relative">
        {/* vertical spine */}
        <div
          className="rm-spine absolute left-6 top-0 hidden h-full w-px md:left-1/2 md:block"
          style={{
            background:
              "linear-gradient(180deg, rgba(184,220,74,0.7), rgba(196,30,58,0.5) 50%, rgba(240,255,160,0.7))",
          }}
        />

        <div className="space-y-16">
          {PHASES.map((p, i) => {
            const right = i % 2 === 1;
            return (
              <div
                key={p.tag}
                className={
                  "rm-phase relative grid items-start gap-6 md:grid-cols-2 md:gap-16 " +
                  (right ? "md:[&>*:first-child]:order-2" : "")
                }
              >
                <div
                  className={
                    "relative rounded-2xl border border-jp-gold-deep/25 bg-black/55 p-7 backdrop-blur-md " +
                    (right ? "md:text-right" : "")
                  }
                  style={{
                    boxShadow: `inset 0 0 0 1px ${p.accent}33, 0 24px 60px -30px ${p.accent}66`,
                  }}
                >
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: p.accent }}
                  >
                    {p.tag} · {p.status}
                  </div>
                  <h3 className="font-bebas mt-2 text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
                    {p.title.toUpperCase()}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-jp-mute md:text-base">
                    {p.body}
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-jp-white">
                    {p.deliverables.map((d) => (
                      <li
                        key={d}
                        className={
                          "flex items-center gap-2 " +
                          (right ? "md:justify-end md:flex-row-reverse" : "")
                        }
                      >
                        <span
                          className="inline-block h-1 w-3"
                          style={{ background: p.accent }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* spine marker */}
                <div className="hidden md:flex md:items-center md:justify-center md:self-stretch">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-full border text-jp-obsidian"
                    style={{
                      background: `radial-gradient(circle, ${p.accent} 0%, rgba(0,0,0,0.9) 75%)`,
                      borderColor: p.accent,
                      boxShadow: `0 0 24px ${p.accent}88`,
                    }}
                  >
                    <span
                      className="font-bebas text-xl"
                      style={{ color: p.accent }}
                    >
                      0{i + 1}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
