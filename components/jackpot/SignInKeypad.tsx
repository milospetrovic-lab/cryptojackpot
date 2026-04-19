"use client";

import { useState, FormEvent } from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SignInKeypad — simplified homage to Jhey's codepen keypad, rebuilt in SVG
 * so we don't depend on external PNG assets. Three gold buttons. Submitting
 * the form "detonates" the pad — GSAP lifts each button up and fades it
 * before bouncing them back.
 */
export function SignInKeypad() {
  const [email, setEmail] = useState("");
  const [exploded, setExploded] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const padRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sk-copy > *", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(padRef.current, {
        opacity: 0,
        x: 80,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setExploded(true);
    if (padRef.current) {
      gsap.to(padRef.current.querySelectorAll(".sk-key"), {
        y: (i) => [-40, -60, -30][i],
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(padRef.current!.querySelectorAll(".sk-key"), {
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)",
          });
        },
      });
    }
    setTimeout(() => setExploded(false), 1800);
  }

  return (
    <section
      ref={rootRef}
      className="relative mx-auto max-w-6xl px-6 py-24"
      aria-labelledby="signin-headline"
    >
      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="sk-copy">
          <div className="eyebrow">The Door</div>
          <h2
            id="signin-headline"
            className="font-bebas mt-2 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.9] tracking-[0.03em] text-jp-white"
          >
            ONE STAKE. <span className="gold-text">YOU'RE IN.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-jp-mute md:text-base">
            Drop an email. We'll send you a direct line to the Concierge and
            your first Opening Hand code. No passwords until you want one. No
            KYC until you stake above 1 BTC.
          </p>

          <form onSubmit={submit} className="mt-8 flex max-w-md flex-wrap gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="roller@cryptojackpot.example"
              className="min-w-[220px] flex-1 rounded-full border border-jp-smoke bg-black/55 px-5 py-3 text-sm text-jp-white outline-none focus:border-jp-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-gradient-to-b from-jp-gold-pale to-jp-gold px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-obsidian shadow-gold-glow"
            >
              {exploded ? "Sent" : "Sign Up"}
            </button>
          </form>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-jp-dim">
            Age 18+ only · jurisdictions apply · House Rules in-nav
          </p>
        </div>

        {/* Keypad */}
        <div
          ref={padRef}
          className="relative mx-auto aspect-[400/310] w-full max-w-[380px]"
        >
          {/* Base — stylised casino console */}
          <svg
            viewBox="0 0 400 310"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="sk-base" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A1A1D" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
              <radialGradient id="sk-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,215,0,0.35)" />
                <stop offset="100%" stopColor="rgba(255,215,0,0)" />
              </radialGradient>
            </defs>
            <path
              d="M20 250 Q 20 200 60 200 L 340 200 Q 380 200 380 250 L 380 290 Q 380 310 360 310 L 40 310 Q 20 310 20 290 Z"
              fill="url(#sk-base)"
              stroke="#D4AF37"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <rect x="60" y="215" width="280" height="20" rx="4" fill="#0A0A0C" />
            <ellipse cx="200" cy="150" rx="180" ry="60" fill="url(#sk-glow)" />
          </svg>

          {/* Three keys */}
          <KeyBtn
            className="sk-key absolute left-[14%] top-[8%] h-[34%] w-[36%]"
            label="OK"
          />
          <KeyBtn
            className="sk-key absolute right-[10%] top-[22%] h-[34%] w-[36%]"
            label="GO"
          />
          <KeyBtn
            className="sk-key absolute left-[20%] top-[48%] h-[34%] w-[60%]"
            label="ENTER"
            wide
          />
        </div>
      </div>
    </section>
  );
}

function KeyBtn({
  className,
  label,
  wide,
}: {
  className?: string;
  label: string;
  wide?: boolean;
}) {
  return (
    <button className={className} type="button" aria-label={label}>
      <svg
        viewBox={wide ? "0 0 200 100" : "0 0 100 100"}
        className="h-full w-full"
      >
        <defs>
          <linearGradient
            id={`sk-key-${label}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFE88A" />
            <stop offset="55%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#8B6B00" />
          </linearGradient>
        </defs>
        {wide ? (
          <>
            <path
              d="M30 15 L 170 15 Q 190 15 190 35 L 190 75 Q 190 95 170 95 L 30 95 Q 10 95 10 75 L 10 35 Q 10 15 30 15 Z"
              fill={`url(#sk-key-${label})`}
              stroke="#8B6B00"
              strokeWidth="1.5"
            />
            <text
              x="100"
              y="62"
              textAnchor="middle"
              fontFamily="Bebas Neue, sans-serif"
              fontSize="28"
              letterSpacing="4"
              fill="#1A1A1D"
            >
              {label}
            </text>
          </>
        ) : (
          <>
            <path
              d="M20 10 L 80 10 Q 95 10 95 25 L 95 75 Q 95 90 80 90 L 20 90 Q 5 90 5 75 L 5 25 Q 5 10 20 10 Z"
              fill={`url(#sk-key-${label})`}
              stroke="#8B6B00"
              strokeWidth="1.5"
            />
            <text
              x="50"
              y="58"
              textAnchor="middle"
              fontFamily="Bebas Neue, sans-serif"
              fontSize="28"
              letterSpacing="3"
              fill="#1A1A1D"
            >
              {label}
            </text>
          </>
        )}
      </svg>
    </button>
  );
}
