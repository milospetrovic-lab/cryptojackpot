"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stage = { src: string; label: string; title: string; sub: string };

const STAGES: Stage[] = [
  {
    src: "https://assets.codepen.io/573855/lr-scroll-img-01-1024x768.webp",
    label: "Stage 1",
    title: "Quiet Stake",
    sub: "— The first chip lands",
  },
  {
    src: "https://assets.codepen.io/573855/lr-scroll-img-02-1024x768.webp",
    label: "Stage 2",
    title: "Reels Climb",
    sub: "— Pressure in the chamber",
  },
  {
    src: "https://assets.codepen.io/573855/lr-scroll-img-03-1024x768.webp",
    label: "Stage 3",
    title: "Near Miss",
    sub: "— One symbol short",
  },
  {
    src: "https://assets.codepen.io/573855/lr-scroll-img-04-1024x768.webp",
    label: "Stage 4",
    title: "Vault Rings",
    sub: "— The Hit lands",
  },
];

/**
 * ScrollStages — native React implementation of the 4-stage scroll comparator.
 * Uses GSAP ScrollTrigger + clip-path to reveal each layer left-to-right as
 * the parent page scrolls. Replaces the previous iframe version (whose CSS
 * scroll-timeline could not see the parent-page scroll position).
 */
export function ScrollStages() {
  const rootRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const root = rootRef.current!;
      const layers = root.querySelectorAll<HTMLElement>(".ss-layer");
      const indicators = root.querySelectorAll<HTMLElement>(".ss-dot");
      const N = layers.length;

      // Each non-last layer clips from 0 to 100% over its slice of the scroll.
      layers.forEach((layer, i) => {
        if (i === N - 1) return;
        const start = i / (N - 1);
        const end = (i + 1) / (N - 1);
        gsap.fromTo(
          layer,
          { clipPath: "inset(0 0 0 0)" },
          {
            clipPath: "inset(0 100% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: `top+=${start * 100}% top`,
              end: `top+=${end * 100}% top`,
              scrub: true,
            },
          }
        );
      });

      // 3D pivot as the whole scene enters + leaves.
      gsap.fromTo(
        wrapRef.current,
        {
          rotateX: 10,
          rotateY: -10,
          rotateZ: -3,
          scale: 0.88,
          opacity: 0.7,
        },
        {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "top 25%",
            scrub: true,
          },
        }
      );
      gsap.to(wrapRef.current, {
        rotateX: -10,
        rotateY: 10,
        rotateZ: 3,
        scale: 0.88,
        opacity: 0.7,
        ease: "power2.in",
        scrollTrigger: {
          trigger: root,
          start: "bottom 75%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      // Progress % + moving divider + active dot.
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const pct = Math.max(0, Math.min(1, self.progress));
          if (pctRef.current) {
            pctRef.current.textContent =
              String(Math.round(pct * 100)).padStart(2, "0") + "%";
          }
          if (dividerRef.current) {
            dividerRef.current.style.left = `${(1 - pct) * 100}%`;
            dividerRef.current.style.opacity =
              pct > 0.01 && pct < 0.99 ? "1" : "0";
          }
          const active = Math.min(
            N - 1,
            Math.round(pct * (N - 1))
          );
          indicators.forEach((d, i) =>
            d.classList.toggle("ss-dot-active", i === active)
          );
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-y border-jp-gold-deep/20 bg-black"
      style={{ minHeight: "200vh" }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-14 text-center">
        <div className="eyebrow">The House Curated</div>
        <h2 className="font-bebas mt-3 text-[clamp(2rem,5vw,3.6rem)] leading-[0.92] tracking-[0.05em] text-jp-white">
          <span className="gold-text">FOUR STAGES.</span> ONE HIT.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-jp-mute">
          Scroll to drive the reveal. The divider moves with your scroll, the
          stage count ticks in the corner, the card pivots as it enters and
          leaves the viewport.
        </p>
      </div>

      <div className="sticky top-0 flex h-[100vh] items-center justify-center px-4">
        <div
          ref={wrapRef}
          className="relative w-full max-w-[56rem] overflow-hidden rounded-2xl border border-jp-gold-deep/30 bg-jp-steel shadow-lounge"
          style={{
            aspectRatio: "4/3",
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* stacked layers — first one on top at start; each clips to reveal the next */}
          {STAGES.map((s, i) => (
            <div
              key={i}
              className="ss-layer absolute inset-0"
              style={{ zIndex: STAGES.length - i }}
            >
              <img
                src={s.src}
                alt={s.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-jp-gold-deep/50 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-jp-gold">
                {s.label}
              </span>
              <div className="absolute bottom-6 left-6 max-w-[80%]">
                <h3 className="font-bebas text-[clamp(1.5rem,3.5vw,2.6rem)] leading-[0.95] tracking-[0.06em] gold-text">
                  {s.title}
                </h3>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.22em] text-jp-mute">
                  {s.sub}
                </div>
              </div>
            </div>
          ))}

          {/* traveling divider */}
          <div
            ref={dividerRef}
            className="pointer-events-none absolute bottom-0 top-0 w-px opacity-0 transition-opacity"
            style={{
              left: "100%",
              background: "#E0FF57",
              boxShadow: "0 0 16px rgba(224,255,87,0.7)",
              zIndex: 30,
            }}
          />

          {/* percent */}
          <div
            ref={pctRef}
            className="tabular absolute bottom-4 right-4 z-[31] font-mono text-sm font-semibold tracking-[0.2em] text-jp-gold"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
          >
            00%
          </div>

          {/* stage dots */}
          <div className="absolute right-4 top-1/2 z-[32] flex -translate-y-1/2 flex-col gap-2">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={
                  "ss-dot block h-2 w-2 rounded-sm bg-jp-gold/30" +
                  (i === 0 ? " ss-dot-active" : "")
                }
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ss-dot-active {
          background: #E0FF57;
          height: 16px;
        }
      `}</style>
    </section>
  );
}
