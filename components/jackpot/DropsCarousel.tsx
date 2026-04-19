"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Slide = {
  name: string;
  place: string;
  desc: string;
  code: string;
  playthrough: string;
  /** CSS filter applied to the shared Vulcan molten-gold card art */
  filter: string;
};

const CARD = "/images/cards/molten-gold.png";

const SLIDES: Slide[] = [
  {
    name: "Opening Hand",
    place: "300% match · new Rollers",
    desc:
      "Drop your first Stake and take 3× back. 150 House Chips seeded on Molten Gold Deluxe.",
    code: "VULCAN300",
    playthrough: "Play-through 30×",
    filter: "saturate(1) brightness(1)",
  },
  {
    name: "Weekly Showdown",
    place: "Friday 20:00 UTC",
    desc:
      "10 BTC guaranteed prize pool. Top 50 placements paid. Leaderboard freezes at drop.",
    code: "SHOWDOWN",
    playthrough: "No Play-through",
    filter: "hue-rotate(-15deg) saturate(1.25) brightness(1.02)",
  },
  {
    name: "Ruby Run",
    place: "Every Sunday · reload",
    desc:
      "150% match up to 0.75 BTC with 75 House Chips on Ruby Run. Stacks with weekly Retainer.",
    code: "RUBYRUN",
    playthrough: "Play-through 25×",
    filter: "hue-rotate(-40deg) saturate(1.4) brightness(0.92)",
  },
];

/**
 * DropsCarousel — scroll-driven 3D carousel using the Vulcan molten-gold
 * card art. ScrollTrigger pins the section and snaps between slides as
 * the user scrolls; arrows + dots still work for mouse/touch nudges.
 */
export function DropsCarousel() {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);
  const lastIndexRef = useRef(0);

  const N = SLIDES.length;
  const prev = (index - 1 + N) % N;
  const next = (index + 1) % N;

  const transitionText = useCallback(() => {
    const incoming = rootRef.current?.querySelectorAll(".dc-text-new");
    if (!incoming) return;
    gsap.fromTo(
      incoming,
      { y: 36, opacity: 0 },
      { duration: 0.38, stagger: 0.08, y: 0, opacity: 1, ease: "power3.out" }
    );
  }, []);

  const goTo = useCallback(
    (target: number) => {
      if (animatingRef.current) return;
      const clamped = ((target % N) + N) % N;
      if (clamped === lastIndexRef.current) return;
      animatingRef.current = true;
      const oldEls = rootRef.current?.querySelectorAll(".dc-text-live");
      gsap
        .timeline({
          onComplete: () => {
            animatingRef.current = false;
            transitionText();
          },
        })
        .to(oldEls || [], {
          duration: 0.26,
          y: -48,
          opacity: 0,
          stagger: 0.05,
        })
        .call(() => {
          lastIndexRef.current = clamped;
          setIndex(clamped);
        });
    },
    [N, transitionText]
  );

  // Scroll-driven auto-advance — DESKTOP ONLY. On mobile the pin+snap
  // interacts badly with the URL bar / bouncy scroll, so the carousel
  // is plain scrolls-past + manual arrow/dot navigation.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: () => `+=${(N - 1) * 100}%`,
        pin: pinRef.current,
        scrub: false,
        anticipatePin: 1,
        snap: {
          snapTo: (progress) => Math.round(progress * (N - 1)) / (N - 1),
          duration: 0.3,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const target = Math.round(self.progress * (N - 1));
          if (target !== lastIndexRef.current) goTo(target);
        },
      });
      return () => {
        st.kill();
      };
    }, rootRef);
    return () => ctx.revert();
  }, [N, goTo]);

  const current = SLIDES[index];
  const prevSlide = SLIDES[prev];
  const nextSlide = SLIDES[next];

  return (
    <section
      ref={rootRef}
      className="relative py-16 md:py-0 md:[min-height:var(--dc-h)]"
      style={
        {
          // Desktop: N viewport-heights of scroll so each slide pins for one
          // viewport. Mobile: render as a normal static section (single
          // viewport-height), no pin, no snap.
          "--dc-h": `${N * 100}vh`,
        } as React.CSSProperties
      }
    >
      <div
        ref={pinRef}
        className="flex min-h-[560px] w-full items-center justify-center px-6 md:h-[100svh]"
      >
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mb-8 text-center">
            <div className="eyebrow">Live This Week</div>
            <h2 className="font-bebas mt-2 text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
              THE <span className="gold-text">DROPS</span>
            </h2>
            <p className="mx-auto mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-jp-dim">
              Scroll · the deck cycles · or tap an arrow
            </p>
          </div>

          <div
            className="relative mx-auto grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
            style={{ perspective: 1400 }}
          >
            {/* Card stack */}
            <div
              className="relative mx-auto h-[300px] w-full max-w-[560px] md:h-[380px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {[
                { slide: prevSlide, pos: "prev" },
                { slide: nextSlide, pos: "next" },
                { slide: current, pos: "current" },
              ].map(({ slide, pos }) => (
                <div
                  key={`${pos}-${slide.code}`}
                  className={
                    "absolute left-1/2 top-1/2 h-[220px] w-[160px] overflow-hidden rounded-xl border border-jp-gold-deep/50 md:h-[300px] md:w-[210px] " +
                    (pos === "current" ? "dc-current shadow-gold-glow" : "")
                  }
                  style={{
                    transform:
                      pos === "current"
                        ? "translate(-50%, -50%) translateX(0) rotateY(0) scale(1.22)"
                        : pos === "prev"
                        ? "translate(-50%, -50%) translateX(calc(-100% - 24px)) rotateY(32deg) scale(0.86)"
                        : "translate(-50%, -50%) translateX(calc(100% + 24px)) rotateY(-32deg) scale(0.86)",
                    transition: "transform 0.7s cubic-bezier(.22,.9,.2,1)",
                    zIndex: pos === "current" ? 3 : 1,
                    opacity: pos === "current" ? 1 : 0.4,
                    background: "#0A0A0C",
                  }}
                >
                  <img
                    src={CARD}
                    alt={slide.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ filter: slide.filter }}
                    draggable={false}
                  />
                  {/* Edge vignette + sheen */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(10,10,12,0) 40%, rgba(10,10,12,0.85) 100%)",
                    }}
                  />
                  <span className="absolute left-3 top-3 rounded-full border border-jp-gold-deep/60 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-jp-gold">
                    {slide.code}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="font-bebas text-xl leading-[0.95] tracking-[0.04em] text-jp-gold">
                      {slide.name.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info column */}
            <div className="relative min-h-[260px]">
              <div
                key={current.code}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <div className="dc-text-live dc-text-new font-mono text-[10px] uppercase tracking-[0.3em] text-jp-gold">
                  {current.place}
                </div>
                <h3 className="dc-text-live dc-text-new font-bebas mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] tracking-[0.04em] text-jp-white">
                  {current.name.toUpperCase()}
                </h3>
                <p className="dc-text-live dc-text-new mt-4 max-w-md text-sm leading-relaxed text-jp-mute md:text-base">
                  {current.desc}
                </p>
                <div className="dc-text-live dc-text-new mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-jp-ruby/50 bg-jp-ruby/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-molten">
                    {current.playthrough}
                  </span>
                  <span className="rounded-full border border-jp-gold-deep/40 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-gold">
                    Code · {current.code}
                  </span>
                </div>
                <a
                  href="/promotions"
                  className="dc-text-live dc-text-new mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow"
                >
                  Claim Drop →
                </a>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <button
            aria-label="Previous Drop"
            onClick={() => goTo(index - 1)}
            className="absolute left-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-jp-gold-deep/50 bg-black/60 text-jp-gold backdrop-blur hover:bg-black/80"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next Drop"
            onClick={() => goTo(index + 1)}
            className="absolute right-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-jp-gold-deep/50 bg-black/60 text-jp-gold backdrop-blur hover:bg-black/80"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to Drop ${i + 1}`}
                onClick={() => goTo(i)}
                className={
                  "h-1.5 rounded-full transition-all " +
                  (i === index ? "w-8 bg-jp-gold" : "w-3 bg-jp-gold/30")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
