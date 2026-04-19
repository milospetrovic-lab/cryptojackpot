"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** A gold casino chip rendered as an inline SVG path (crisp at any size). */
function Chip({
  size = 64,
  ruby = false,
  idx,
}: {
  size?: number;
  ruby?: boolean;
  idx: number;
}) {
  const id = `chip-${idx}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      <defs>
        <radialGradient id={`${id}-face`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFE88A" />
          <stop offset="55%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#8B6B00" />
        </radialGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={ruby ? "#C41E3A" : "#1A1A1D"} />
          <stop offset="100%" stopColor={ruby ? "#5A0E1A" : "#000000"} />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill={`url(#${id}-edge)`} />
      <circle cx="100" cy="100" r="78" fill={`url(#${id}-face)`} />
      <g stroke="#8B6B00" strokeWidth="2" fill="none">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          const x = 100 + Math.cos(a) * 78;
          const y = 100 + Math.sin(a) * 78;
          const x2 = 100 + Math.cos(a) * 92;
          const y2 = 100 + Math.sin(a) * 92;
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
        })}
      </g>
      <circle cx="100" cy="100" r="48" fill="none" stroke="#8B6B00" strokeWidth="1.5" />
    </svg>
  );
}

export function ChipCascade() {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1 = useRef<HTMLDivElement>(null);
  const layer2 = useRef<HTMLDivElement>(null);
  const layer3 = useRef<HTMLDivElement>(null);
  const molten = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(layer1.current, { yPercent: -15, ease: "none", scrollTrigger: trigger });
      gsap.to(layer2.current, { yPercent: -45, rotate: 40, ease: "none", scrollTrigger: trigger });
      gsap.to(layer3.current, { yPercent: -85, rotate: -30, ease: "none", scrollTrigger: trigger });

      gsap.to(molten.current, {
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          ...trigger,
          onUpdate: (self) => {
            if (molten.current) {
              molten.current.style.opacity = String(0.1 + self.progress * 0.65);
            }
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const farChips = [
    { x: 8, y: 20, size: 56, ruby: false },
    { x: 22, y: 72, size: 44, ruby: true },
    { x: 78, y: 30, size: 52, ruby: false },
    { x: 90, y: 68, size: 60, ruby: false },
    { x: 46, y: 12, size: 40, ruby: false },
    { x: 62, y: 84, size: 48, ruby: true },
  ];
  const midChips = [
    { x: 14, y: 50, size: 88, ruby: false },
    { x: 72, y: 18, size: 76, ruby: false },
    { x: 84, y: 80, size: 92, ruby: true },
    { x: 34, y: 88, size: 72, ruby: false },
  ];
  const nearChips = [
    { x: 8, y: 82, size: 150, ruby: false },
    { x: 82, y: 10, size: 140, ruby: false },
    { x: 44, y: 60, size: 120, ruby: true },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] overflow-hidden bg-jp-charcoal"
      style={{
        maskImage:
          "linear-gradient(180deg, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(180deg, transparent 0, #000 80px, #000 calc(100% - 80px), transparent 100%)",
      }}
    >
      {/* molten gold pool intensifying with scroll */}
      <div
        ref={molten}
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.1,
          background:
            "radial-gradient(900px 600px at 50% 110%, rgba(255,215,0,0.28), transparent 60%), radial-gradient(1200px 700px at 50% 130%, rgba(196,30,58,0.4), transparent 65%)",
          filter: "blur(30px)",
        }}
      />

      {/* ruby felt base */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,26,43,0.3) 0%, transparent 60%)",
        }}
      />

      {/* header */}
      <div className="relative z-10 mx-auto max-w-6xl px-8 pt-28 text-center md:pt-36">
        <div className="eyebrow">Descend</div>
        <h2 className="display mt-4 text-[clamp(36px,6vw,72px)] text-jp-white tracking-[0.14em]">
          <span className="gold-text">The Cascade</span> to the Vault
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-jp-mute md:text-base">
          Scroll. The stacks fall. The chamber opens. The molten rises. Every
          Spin feeds the fire below.
        </p>
      </div>

      {/* parallax layers */}
      <div ref={layer1} className="pointer-events-none absolute inset-0 z-[5]">
        {farChips.map((c, i) => (
          <div
            key={i}
            className="absolute opacity-60"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <Chip size={c.size} ruby={c.ruby} idx={100 + i} />
          </div>
        ))}
      </div>

      <div ref={layer2} className="pointer-events-none absolute inset-0 z-[6]">
        {midChips.map((c, i) => (
          <div
            key={i}
            className="absolute opacity-80"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <Chip size={c.size} ruby={c.ruby} idx={200 + i} />
          </div>
        ))}
      </div>

      <div ref={layer3} className="pointer-events-none absolute inset-0 z-[7]">
        {nearChips.map((c, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
            }}
          >
            <Chip size={c.size} ruby={c.ruby} idx={300 + i} />
          </div>
        ))}
      </div>
    </section>
  );
}
