"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Preloader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLImageElement>(null);
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

      // Hard cap — preloader never holds the page more than 1.6s.
      // Whichever fires first (window.load, gsap timer) wins; finish is idempotent.
      let done = false;
      const once = () => {
        if (done) return;
        done = true;
        finish();
      };

      window.addEventListener("load", once, { once: true });
      gsap.delayedCall(1.6, once);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-jp-obsidian"
    >
      {/* Hero coin — same image used on the landing page */}
      <img
        ref={chipRef}
        src="/images/hero/center-coin-hero.png"
        alt="CryptoJackpot"
        width={180}
        height={180}
        style={{
          objectFit: "contain",
          filter: "drop-shadow(0 0 40px rgba(224,255,87,0.55))",
        }}
        draggable={false}
      />

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
              "linear-gradient(90deg, #E0FF57 0%, #F68838 55%, #C41E3A 100%)",
          }}
        />
      </div>
    </div>
  );
}
