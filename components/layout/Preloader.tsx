"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // warp intro
      gsap.from(chipRef.current, {
        scale: 0.2,
        rotation: -240,
        filter: "blur(18px)",
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      });

      gsap.to(chipRef.current, {
        rotation: "+=360",
        duration: 3.2,
        ease: "none",
        repeat: -1,
      });

      gsap.from(brandRef.current, {
        opacity: 0,
        y: 16,
        delay: 0.8,
        duration: 0.9,
        ease: "power2.out",
      });

      // progress bar — fakes asset-loading window; resolves on window.load or timeout
      const tween = gsap.to(barRef.current, {
        width: "92%",
        duration: 1.8,
        ease: "power2.out",
      });

      const finish = () => {
        tween.progress(1);
        gsap.to(barRef.current, { width: "100%", duration: 0.25 });
        gsap.to(chipRef.current, {
          filter: "drop-shadow(0 0 28px rgba(230,57,70,0.9))",
          scale: 1.08,
          duration: 0.25,
          yoyo: true,
          repeat: 1,
        });
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.35,
          ease: "power2.out",
          onComplete: () => setGone(true),
        });
      };

      const min = gsap.delayedCall(1.6, () => {});
      const onReady = () => {
        if (min.progress() < 1) {
          min.eventCallback("onComplete", finish);
        } else {
          finish();
        }
      };

      if (document.readyState === "complete") {
        gsap.delayedCall(1.6, finish);
      } else {
        window.addEventListener("load", onReady, { once: true });
        gsap.delayedCall(3.5, finish); // safety
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-jp-obsidian"
    >
      {/* SVG chip with turbulence warp filter */}
      <svg
        ref={chipRef}
        width="140"
        height="140"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "url(#warp) drop-shadow(0 0 24px rgba(255,215,0,0.55))" }}
      >
        <defs>
          <filter id="warp" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.02"
              numOctaves="2"
              seed="3"
            >
              <animate
                attributeName="baseFrequency"
                dur="6s"
                values="0.012 0.02;0.02 0.012;0.012 0.02"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="4" />
          </filter>
          <radialGradient id="chipFace" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FFE88A" />
            <stop offset="55%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#8B6B00" />
          </radialGradient>
          <linearGradient id="chipEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C41E3A" />
            <stop offset="100%" stopColor="#5A0E1A" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="92" fill="url(#chipEdge)" />
        <circle cx="100" cy="100" r="78" fill="url(#chipFace)" />
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
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontFamily="Cinzel, serif"
          fontWeight="700"
          fontSize="26"
          fill="#1A1A1D"
          letterSpacing="3"
        >
          CJ
        </text>
      </svg>

      <div ref={brandRef} className="mt-10 text-center">
        <div className="display text-[22px] text-jp-gold tracking-[0.45em]">
          CRYPTOJACKPOT
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.32em] text-jp-mute">
          Entering the Vault
        </div>
      </div>

      <div className="mt-10 h-[2px] w-64 overflow-hidden bg-jp-smoke">
        <div
          ref={barRef}
          className="h-full w-0"
          style={{
            background:
              "linear-gradient(90deg, #FFD700 0%, #F0C948 55%, #C41E3A 100%)",
          }}
        />
      </div>
    </div>
  );
}
