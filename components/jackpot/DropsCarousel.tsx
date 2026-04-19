"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  name: string;
  place: string;
  desc: string;
  img: string;
  code: string;
  playthrough: string;
};

const SLIDES: Slide[] = [
  {
    name: "Opening Hand",
    place: "300% match · new Rollers",
    desc: "Drop your first Stake and take 3× back. 150 House Chips seeded on Molten Gold Deluxe.",
    img: "https://images.unsplash.com/photo-1518544801976-3e188ea7fe41?auto=format&fit=crop&w=1200&q=80",
    code: "VULCAN300",
    playthrough: "Play-through 30×",
  },
  {
    name: "Weekly Showdown",
    place: "Friday 20:00 UTC",
    desc: "10 BTC guaranteed prize pool. Top 50 placements paid. Leaderboard freezes at drop.",
    img: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&w=1200&q=80",
    code: "SHOWDOWN",
    playthrough: "No Play-through",
  },
  {
    name: "Ruby Run",
    place: "Every Sunday · reload",
    desc: "150% match up to 0.75 BTC with 75 House Chips on Ruby Run. Stacks with weekly Retainer.",
    img: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&w=1200&q=80",
    code: "RUBYRUN",
    playthrough: "Play-through 25×",
  },
];

/**
 * DropsCarousel — 3D rotating showcase, GSAP-driven. Adapted from the
 * DevLoop codepen: three cards (prev / current / next) swap position on
 * button press, background image cross-fades, copy block slides up and
 * back in. Hover the active card to tilt it. Replaces the old DropsRow.
 */
export function DropsCarousel() {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const N = SLIDES.length;
  const prev = (index - 1 + N) % N;
  const next = (index + 1) % N;

  function go(dir: 1 | -1) {
    if (animating) return;
    setAnimating(true);
    const textEls = infoRef.current?.querySelectorAll(".dc-text") ?? [];
    gsap
      .timeline()
      .to(textEls, {
        duration: 0.28,
        stagger: 0.06,
        y: -60,
        opacity: 0,
      })
      .call(() => {
        setIndex((i) => (i + dir + N) % N);
      })
      .fromTo(
        ".dc-text-incoming",
        { y: 40, opacity: 0 },
        {
          duration: 0.34,
          stagger: 0.08,
          y: 0,
          opacity: 1,
          onComplete: () => setAnimating(false),
        }
      );
  }

  // subtle tilt on mouse-move over the active card
  useEffect(() => {
    const el = cardsRef.current?.querySelector<HTMLDivElement>(".dc-current");
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const angle = ((e.clientX - (r.left + r.width / 2)) / r.width) * 30;
      gsap.to(el, { rotationY: angle, duration: 0.3 });
    };
    const onOut = () => gsap.to(el, { rotationY: 0, duration: 0.4 });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerout", onOut);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerout", onOut);
    };
  }, [index]);

  const current = SLIDES[index];
  const prevSlide = SLIDES[prev];
  const nextSlide = SLIDES[next];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 text-center">
        <div className="eyebrow">Live This Week</div>
        <h2 className="font-bebas mt-2 text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
          THE <span className="gold-text">DROPS</span>
        </h2>
      </div>

      <div className="relative mx-auto w-full max-w-[900px]">
        {/* blurred background reflecting the current slide */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 -bottom-10 -z-10 overflow-hidden rounded-3xl"
        >
          <img
            key={current.img}
            src={current.img}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "blur(28px) saturate(1.1)", opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div
          className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{ perspective: 1200 }}
        >
          {/* Card stack */}
          <div
            ref={cardsRef}
            className="relative mx-auto h-[380px] w-full max-w-[560px] md:h-[440px]"
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
                  "dc-card absolute left-1/2 top-1/2 h-[260px] w-[180px] overflow-hidden rounded-xl border border-jp-gold-deep/40 md:h-[320px] md:w-[220px] " +
                  (pos === "current" ? "dc-current" : "")
                }
                style={{
                  transform:
                    pos === "current"
                      ? "translate(-50%, -50%) translateX(0) rotateY(0) scale(1.18)"
                      : pos === "prev"
                      ? "translate(-50%, -50%) translateX(calc(-100% - 20px)) rotateY(28deg) scale(0.88)"
                      : "translate(-50%, -50%) translateX(calc(100% + 20px)) rotateY(-28deg) scale(0.88)",
                  transition: "transform 0.8s ease",
                  zIndex: pos === "current" ? 3 : 1,
                  opacity: pos === "current" ? 1 : 0.55,
                }}
              >
                <img
                  src={slide.img}
                  alt={slide.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-jp-gold-deep/50 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-jp-gold">
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
          <div ref={infoRef} className="relative min-h-[320px]">
            <div
              key={current.code}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="dc-text dc-text-incoming font-mono text-[10px] uppercase tracking-[0.3em] text-jp-gold">
                {current.place}
              </div>
              <h3 className="dc-text dc-text-incoming font-bebas mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-[0.95] tracking-[0.04em] text-jp-white">
                {current.name.toUpperCase()}
              </h3>
              <p className="dc-text dc-text-incoming mt-4 max-w-md text-sm leading-relaxed text-jp-mute md:text-base">
                {current.desc}
              </p>
              <div className="dc-text dc-text-incoming mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-jp-ruby/50 bg-jp-ruby/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-molten">
                  {current.playthrough}
                </span>
                <span className="rounded-full border border-jp-gold-deep/40 bg-black/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-gold">
                  Code · {current.code}
                </span>
              </div>
              <a
                href="/promotions"
                className="dc-text dc-text-incoming mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow"
              >
                Claim Drop →
              </a>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous Drop"
          onClick={() => go(-1)}
          className="absolute left-0 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-jp-gold-deep/50 bg-black/60 text-jp-gold backdrop-blur hover:bg-black/80 md:left-[-16px]"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next Drop"
          onClick={() => go(1)}
          className="absolute left-[calc(50%-28px)] top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-jp-gold-deep/50 bg-black/60 text-jp-gold backdrop-blur hover:bg-black/80 md:left-auto md:right-[-16px]"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to Drop ${i + 1}`}
              onClick={() => {
                if (animating || i === index) return;
                go(i > index ? 1 : -1);
              }}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === index ? "w-8 bg-jp-gold" : "w-3 bg-jp-gold/30")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
