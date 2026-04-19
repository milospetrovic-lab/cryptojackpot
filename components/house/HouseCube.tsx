"use client";

import { useEffect, useRef } from "react";

type Scene = {
  id: string;
  num: string;
  face: "top" | "front" | "right" | "back" | "left" | "bottom";
  title: string;
  tag: string;
  headline: string;
  body: string;
  prev?: string;
  nextLabel?: string;
  nextHref?: string;
};

const SCENES: Scene[] = [
  {
    id: "s0",
    num: "00",
    face: "top",
    title: "DESCEND",
    tag: "House Rules — Conduct",
    headline: "YOUR\nCONTROLS",
    body:
      "House Rules aren't a restriction. They're how you play with a clear head. Stake limits, reality checks, self-exclusion, the helpline, the record — all visible, nothing buried.",
    nextLabel: "Descend",
    nextHref: "#s1",
  },
  {
    id: "s1",
    num: "01",
    face: "front",
    title: "STAKE",
    tag: "01 — Stake Limits",
    headline: "KNOW\nTHE CAP",
    body:
      "Daily, weekly, monthly ceilings. Lower takes effect now. Higher takes effect in 24 hours. Set them before your first Spin, not after a cold run.",
    prev: "#s0",
    nextLabel: "Turn",
    nextHref: "#s2",
  },
  {
    id: "s2",
    num: "02",
    face: "right",
    title: "SPIN",
    tag: "02 — Reality Check",
    headline: "AN\nINTERVAL\nOF QUIET",
    body:
      "Every N minutes of Spinning the lounge pauses and shows you your session summary: Stake in, Stake out, time at the table. Set N between 5 and 120.",
    prev: "#s1",
    nextLabel: "Turn",
    nextHref: "#s3",
  },
  {
    id: "s3",
    num: "03",
    face: "back",
    title: "HIT",
    tag: "03 — Self-Exclusion",
    headline: "LOCK\nTHE DOOR",
    body:
      "24 hours. 7 days. 6 months. Permanent. Once active, no Spin, no deposit, no Drop claim. The Concierge will not ask you to reconsider.",
    prev: "#s2",
    nextLabel: "Turn",
    nextHref: "#s4",
  },
  {
    id: "s4",
    num: "04",
    face: "left",
    title: "RING",
    tag: "04 — Helplines",
    headline: "NOT\nALONE",
    body:
      "US: 1-800-GAMBLER · UK: 0808 8020 133 (GamCare) · EU: gamblingtherapy.org · AU: 1800 858 858. 24/7, multilingual where it counts.",
    prev: "#s3",
    nextLabel: "Turn",
    nextHref: "#s5",
  },
  {
    id: "s5",
    num: "05",
    face: "bottom",
    title: "VAULT",
    tag: "05 — Record",
    headline: "THE\nLEDGER",
    body:
      "30-, 90-, 365-day loss and win ledger, exportable. Your record is your record. The House keeps it; the House shows it on request.",
    prev: "#s4",
    nextLabel: "Begin again",
    nextHref: "#s0",
  },
];

const STOPS = [
  { rx: 90, ry: 0 },
  { rx: 0, ry: 0 },
  { rx: 0, ry: -90 },
  { rx: 0, ry: -180 },
  { rx: 0, ry: -270 },
  { rx: -90, ry: -360 },
];

const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export function HouseCube() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const hudPctRef = useRef<HTMLDivElement>(null);
  const hudLabelRef = useRef<HTMLDivElement>(null);
  const progFillRef = useRef<HTMLDivElement>(null);
  const capNumRef = useRef<HTMLDivElement>(null);
  const capNameRef = useRef<HTMLDivElement>(null);

  // Scroll-driven cube rotation + HUD
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const sections = Array.from(
      root.querySelectorAll<HTMLElement>(".hc-section")
    );
    const N = SCENES.length;

    let maxScroll = 1;
    let sectionTops: number[] = [];
    let tgt = 0;
    let smooth = 0;
    let lastFace = -1;
    let raf = 0;

    function resize() {
      maxScroll = Math.max(
        1,
        root!.scrollHeight - window.innerHeight + root!.offsetTop
      );
      sectionTops = sections.map(
        (s) => s.getBoundingClientRect().top + window.scrollY
      );
    }
    resize();

    function onScroll() {
      const startY = root!.offsetTop;
      const endY = startY + root!.scrollHeight - window.innerHeight;
      const raw = (window.scrollY - startY) / Math.max(1, endY - startY);
      tgt = Math.max(0, Math.min(1, raw));
    }
    onScroll();

    function sectionIndex() {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < sectionTops.length; i++) {
        if (mid >= sectionTops[i]) idx = i;
      }
      return Math.min(idx, N - 1);
    }

    function setCubeRotation(s: number) {
      if (!cubeRef.current) return;
      const t = s * (N - 1);
      const i = Math.min(Math.floor(t), N - 2);
      const f = easeIO(t - i);
      const a = STOPS[i];
      const b = STOPS[i + 1];
      const rx = a.rx + (b.rx - a.rx) * f;
      const ry = a.ry + (b.ry - a.ry) * f;
      cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }

    function updateHUD(s: number) {
      const pct = Math.round(s * 100);
      if (hudPctRef.current)
        hudPctRef.current.textContent = String(pct).padStart(3, "0") + "%";
      if (progFillRef.current)
        progFillRef.current.style.width = `${pct}%`;
      const si = sectionIndex();
      if (si !== lastFace) {
        lastFace = si;
        const name = SCENES[si].title;
        if (hudLabelRef.current) hudLabelRef.current.textContent = name;
        if (capNumRef.current)
          capNumRef.current.textContent = String(si + 1).padStart(2, "0");
        if (capNameRef.current) capNameRef.current.textContent = name;
      }
    }

    let lastNow = performance.now();
    function tick(now: number) {
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;
      smooth += (tgt - smooth) * (1 - Math.exp(-dt * 10));
      smooth = Math.max(0, Math.min(1, smooth));
      setCubeRotation(smooth);
      updateHUD(smooth);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={rootRef} className="hc-root relative">
      {/* 3D scene + cube (no electric canvas behind) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2] flex items-center justify-center"
        style={{ perspective: "1100px" }}
      >
        <div
          ref={cubeRef}
          className="relative"
          style={{
            width: "min(62vw, 62vh, 520px)",
            height: "min(62vw, 62vh, 520px)",
            transformStyle: "preserve-3d",
            transform: "rotateX(90deg) rotateY(0deg)",
            willChange: "transform",
          }}
        >
          {SCENES.map((s) => (
            <CubeFace key={s.face} face={s.face} num={s.num} title={s.title} />
          ))}

          {/* Hero coin floating at the cube's center, slow continuous spin.
              Sits at translateZ(0) so it's the geometric middle of the cube;
              the translucent faces show it through from every angle. */}
          <img
            src="/images/hero/center-coin-hero.png"
            alt=""
            aria-hidden
            draggable={false}
            className="hc-coin pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none object-contain"
            style={{
              width: "40%",
              height: "40%",
              filter:
                "drop-shadow(0 0 24px rgba(224,255,87,0.45)) drop-shadow(0 0 48px rgba(246,136,56,0.22))",
              transform: "translate(-50%, -50%) translateZ(0)",
            }}
          />
        </div>
      </div>

      {/* HUD */}
      <div className="pointer-events-none fixed right-4 top-4 z-[10] text-right text-[10px] uppercase tracking-[0.25em] text-jp-mute md:right-6 md:top-6">
        <div ref={hudPctRef} className="font-mono">
          000%
        </div>
        <div className="mt-2 h-px w-28 overflow-hidden bg-jp-mute/40">
          <div
            ref={progFillRef}
            className="h-full w-0 bg-jp-gold transition-[width] duration-100"
          />
        </div>
        <div
          ref={hudLabelRef}
          className="mt-2 text-[9px] tracking-[0.3em] text-jp-gold"
        >
          DESCEND
        </div>
      </div>

      {/* Face caption */}
      <div className="pointer-events-none fixed bottom-[calc(76px+3rem)] left-1/2 z-[10] -translate-x-1/2 text-center">
        <div
          ref={capNumRef}
          className="font-mono text-[10px] tracking-[0.3em] text-jp-gold"
        >
          01
        </div>
        <div
          ref={capNameRef}
          className="font-bebas mt-1 text-[clamp(1.8rem,5vw,3.5rem)] leading-none tracking-[0.08em] text-jp-mute/50"
        >
          DESCEND
        </div>
      </div>

      {/* Sections (drive scroll) */}
      <div className="relative z-[3]">
        {SCENES.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={
              "hc-section flex items-center " +
              (i === 0 ? "min-h-[50vh]" : "min-h-[26vh]")
            }
            style={{
              padding: "1.5rem 1.25rem",
            }}
          >
            <div
              className={
                "relative max-w-[28rem] overflow-hidden border-jp-gold-deep/25 bg-black/70 p-6 backdrop-blur-md backdrop-saturate-150 " +
                (i % 2 === 1
                  ? "ml-auto border-r text-right md:mr-12"
                  : "border-l md:ml-12")
              }
              style={{ borderLeftWidth: i % 2 === 1 ? 0 : "1px", borderRightWidth: i % 2 === 1 ? "1px" : 0 }}
            >
              {i > 0 && (
                <div
                  className={
                    "mb-4 h-px w-12 bg-jp-gold " +
                    (i % 2 === 1 ? "ml-auto" : "")
                  }
                />
              )}
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-jp-gold">
                {s.tag}
              </div>
              <h2 className="font-bebas mt-4 whitespace-pre-line text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
                {s.headline}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-jp-mute md:text-[15px]">
                {s.body}
              </p>
              <div
                className={
                  "mt-6 flex flex-wrap gap-2 " +
                  (i % 2 === 1 ? "justify-end" : "")
                }
              >
                {s.prev && (
                  <a
                    href={s.prev}
                    className="rounded-full border border-jp-smoke bg-black/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-mute hover:text-jp-white"
                  >
                    ← Back
                  </a>
                )}
                {s.nextLabel && (
                  <a
                    href={s.nextHref}
                    className="rounded-full border border-jp-gold px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-gold hover:bg-jp-gold hover:text-jp-obsidian"
                  >
                    {s.nextLabel} →
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>

      <style>{`
        .hc-coin {
          animation: hc-coin-spin 14s linear infinite;
          transform-origin: center;
        }
        @keyframes hc-coin-spin {
          from { transform: translate(-50%, -50%) translateZ(0) rotateY(0deg); }
          to   { transform: translate(-50%, -50%) translateZ(0) rotateY(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hc-coin { animation: none; }
        }
      `}</style>
    </div>
  );
}

function CubeFace({
  face,
  num,
  title,
}: {
  face: Scene["face"];
  num: string;
  title: string;
}) {
  const transforms: Record<Scene["face"], string> = {
    front: "translateZ(calc(min(62vw, 62vh, 520px) / 2))",
    back: "rotateY(180deg) translateZ(calc(min(62vw, 62vh, 520px) / 2))",
    right: "rotateY(90deg) translateZ(calc(min(62vw, 62vh, 520px) / 2))",
    left: "rotateY(-90deg) translateZ(calc(min(62vw, 62vh, 520px) / 2))",
    top: "rotateX(-90deg) translateZ(calc(min(62vw, 62vh, 520px) / 2))",
    bottom: "rotateX(90deg) translateZ(calc(min(62vw, 62vh, 520px) / 2))",
  };
  return (
    <div
      className="absolute inset-0 overflow-hidden border border-jp-gold-deep/45"
      style={{
        backfaceVisibility: "visible",
        transform: transforms[face],
        // Translucent face — the electric field behind shows through, so the
        // field reads as lightning trapped inside the cube.
        background:
          "radial-gradient(800px 420px at 50% -20%, rgba(196, 30, 58, 0.28), transparent 55%), radial-gradient(600px 380px at 50% 120%, rgba(224, 255, 87, 0.18), transparent 55%), repeating-linear-gradient(0deg, rgba(184, 220, 74, 0.05) 0, rgba(184, 220, 74, 0.05) 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(184, 220, 74, 0.05) 0, rgba(184, 220, 74, 0.05) 1px, transparent 1px, transparent 48px), rgba(20, 16, 13, 0.32)",
        backdropFilter: "blur(3px) saturate(1.05)",
        WebkitBackdropFilter: "blur(3px) saturate(1.05)",
        boxShadow:
          "inset 0 0 60px rgba(224, 255, 87, 0.12), inset 0 0 120px rgba(196, 30, 58, 0.12)",
      }}
    >
      <span
        className="absolute right-5 top-4 font-mono text-[11px] tracking-[0.3em]"
        style={{ color: "rgba(224, 255, 87, 0.55)" }}
      >
        {num}
      </span>
      <span
        className="font-bebas absolute bottom-4 left-5 select-none leading-none tracking-[0.06em]"
        style={{
          fontSize: "clamp(2rem, 8vw, 5rem)",
          color: "rgba(224, 255, 87, 0.24)",
        }}
      >
        {title}
      </span>
    </div>
  );
}
