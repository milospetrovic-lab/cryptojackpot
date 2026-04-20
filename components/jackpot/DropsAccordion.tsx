"use client";

import { useEffect, useRef } from "react";
import {
  Flame,
  Gem,
  CalendarDays,
  Crown,
  Zap,
  Trophy,
} from "lucide-react";

type Drop = {
  title: string;
  body: string;
  code: string;
  playthrough: string;
  img: string;
  Icon: typeof Flame;
};

const DROPS: Drop[] = [
  {
    title: "Opening Hand",
    body:
      "300% match on your first Stake up to 2 BTC. Seeded with 150 House Chips on Molten Gold Deluxe.",
    code: "VULCAN300",
    playthrough: "Play-through 30×",
    img: "/images/cards/molten-gold.png",
    Icon: Gem,
  },
  {
    title: "Weekly Showdown",
    body:
      "Friday 20:00 UTC. 10 BTC guaranteed prize pool. Top 50 placements paid. Leaderboard freezes at drop.",
    code: "SHOWDOWN",
    playthrough: "No Play-through",
    img: "/images/cards/molten-gold.png",
    Icon: CalendarDays,
  },
  {
    title: "Ruby Run",
    body:
      "Sunday reload — 150% up to 0.75 BTC + 75 House Chips on Ruby Run. Stacks with weekly Retainer.",
    code: "RUBYRUN",
    playthrough: "Play-through 25×",
    img: "/images/cards/molten-gold.png",
    Icon: Flame,
  },
  {
    title: "Crown Invitation",
    body:
      "Onyx-only, quarterly. Bespoke Drop sized to your play history with dedicated-host delivery.",
    code: "ONYX",
    playthrough: "No Play-through",
    img: "/images/cards/molten-gold.png",
    Icon: Crown,
  },
  {
    title: "Chamber Jackpot",
    body:
      "Ongoing progressive. Every Spin feeds the Vault. Current pool tracks live in the counter above.",
    code: "AUTO",
    playthrough: "Game rules apply",
    img: "/images/cards/molten-gold.png",
    Icon: Zap,
  },
  {
    title: "High-Roller Retainer",
    body:
      "Weekly cash-back from 5% at Silver to 20% at Onyx. Retainer lands Monday 09:00 UTC, no claim needed.",
    code: "RETAINER",
    playthrough: "Auto-credit",
    img: "/images/cards/molten-gold.png",
    Icon: Trophy,
  },
];

/**
 * DropsAccordion — horizontal expand-on-hover gallery (Jhey "craft of ui"
 * pattern). CSS grid template-columns swap between 10fr (active) and 1fr
 * (collapsed); single pointer-move listener assigns data-active and the
 * active column width. Inactive columns show a vertical rotated title.
 * Mint accent for glow on the active item.
 */
export function DropsAccordion() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>("li"));

    const setIndex = (target: EventTarget | null) => {
      const closest = (target as HTMLElement | null)?.closest("li");
      if (!closest) return;
      const active = items.indexOf(closest);
      const tracks = items
        .map((it, i) => {
          it.dataset.active = i === active ? "true" : "false";
          return i === active ? "3.5fr" : "1fr";
        })
        .join(" ");
      // On mobile the grid stacks vertically (rows expand). On desktop the
      // grid is horizontal (columns expand). Set both; only the active
      // layout's template is used per the media query.
      list.style.setProperty("grid-template-columns", tracks);
      list.style.setProperty("grid-template-rows", tracks);
    };

    const onPointer = (e: PointerEvent) => setIndex(e.target);
    const onClick = (e: MouseEvent) => setIndex(e.target);
    const onFocus = (e: FocusEvent) => setIndex(e.target);

    list.addEventListener("pointermove", onPointer);
    list.addEventListener("click", onClick);
    list.addEventListener("focus", onFocus, true);

    return () => {
      list.removeEventListener("pointermove", onPointer);
      list.removeEventListener("click", onClick);
      list.removeEventListener("focus", onFocus, true);
    };
  }, []);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-14">
      <ul
        ref={listRef}
        className="drops-grid"
        style={
          { "--items": DROPS.length } as React.CSSProperties
        }
      >
        {DROPS.map((d, i) => {
          const Icon = d.Icon;
          return (
            <li
              key={d.code}
              data-active={i === 0 ? "true" : "false"}
              className="drops-item"
            >
              <article>
                <img src={d.img} alt="" aria-hidden />
                <h3>{d.title}</h3>
                <Icon className="drops-icon" size={18} />
                <div className="drops-meta">
                  <span className="rounded-full border border-jp-gold-deep/40 bg-black/55 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-jp-gold">
                    {d.code}
                  </span>
                  <span className="rounded-full border border-jp-ruby/50 bg-jp-ruby/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-jp-molten">
                    {d.playthrough}
                  </span>
                </div>
                <p>{d.body}</p>
                <a href="/support" className="drops-cta">
                  <span>Claim Drop →</span>
                </a>
              </article>
            </li>
          );
        })}
      </ul>

      <style>{`
        .drops-grid {
          --gap: 10px;
          --base: clamp(2rem, 8cqi, 72px);
          --speed: 0.6s;
          --easing: linear(
            0 0%, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%,
            0.5282 17.12%, 0.6255 21.77%, 0.7099 26.61%, 0.782 31.67%,
            0.8425 37%, 0.8887 42.23%, 0.9257 47.79%, 0.9543 53.78%,
            0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 100%
          );
          container-type: inline-size;
          display: grid;
          /* Desktop: horizontal — active column expands */
          grid-template-columns: 3.5fr 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr;
          gap: var(--gap);
          list-style: none;
          padding: 0;
          margin: 0 auto;
          width: 100%;
          max-width: 1080px;
          height: clamp(320px, 52dvh, 500px);
          transition: grid-template-columns var(--speed) var(--easing),
            grid-template-rows var(--speed) var(--easing);
        }
        @media (max-width: 48em) {
          .drops-grid {
            /* Mobile: vertical stack — active row expands. Fits the narrow
               viewport without horizontal overflow. */
            --base: 52px;
            grid-template-columns: 1fr;
            grid-template-rows: 3fr 1fr 1fr 1fr 1fr 1fr;
            height: auto;
            min-height: clamp(440px, 64dvh, 620px);
            max-width: 100%;
          }
        }
        .drops-item {
          position: relative;
          overflow: hidden;
          min-width: var(--base);
          min-height: var(--base);
          border-radius: 14px;
          border: 1px solid rgba(184, 220, 74, 0.25);
          background: #0A0A0C;
          transition: box-shadow calc(var(--speed) * 1.2) var(--easing),
            border-color calc(var(--speed) * 1.2) var(--easing);
        }
        .drops-item[data-active="true"] {
          border-color: rgba(125, 216, 205, 0.55);
          /* mint glow on the active tile */
          box-shadow:
            0 0 0 1px rgba(125, 216, 205, 0.35) inset,
            0 0 32px rgba(125, 216, 205, 0.25),
            0 24px 60px -30px rgba(0, 0, 0, 0.9);
        }
        .drops-item article {
          height: 100%;
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.7rem;
          /* Leave a gutter on the LEFT for the rotated title column so the
             body copy on the active card never overlaps the h3. */
          padding: 1rem 1.25rem 1rem calc(var(--base) + 0.25rem);
          overflow: hidden;
        }
        .drops-item article h3 {
          position: absolute;
          top: 1rem;
          left: calc(var(--base) * 0.5);
          transform-origin: 0 50%;
          rotate: 90deg;
          margin: 0;
          font-family: var(--font-bebas), sans-serif;
          font-size: 1.05rem;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F0FFA0;
          white-space: nowrap;
          opacity: 0.72;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .drops-item .drops-icon {
          position: absolute;
          left: calc(var(--base) * 0.5);
          bottom: 1rem;
          translate: -50% 0;
          width: 18px;
          height: 18px;
          color: #7DD8CD;
          opacity: 0.75;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .drops-item article p {
          font-family: var(--font-jetbrains), monospace;
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(250, 250, 250, 0.82);
          text-wrap: balance;
          margin: 0;
          max-width: 50ch;
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .drops-item .drops-meta {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .drops-item .drops-cta {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          color: #E0FF57;
          font-family: var(--font-jetbrains), monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(224, 255, 87, 0.5);
          background: rgba(224, 255, 87, 0.08);
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing),
            background 0.25s ease, border-color 0.25s ease;
        }
        .drops-item .drops-cta:is(:hover, :focus-visible) {
          background: rgba(224, 255, 87, 0.18);
          border-color: #E0FF57;
        }
        .drops-item .drops-cta span {
          font-weight: 500;
        }
        .drops-item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          filter: grayscale(0.6) brightness(0.85) saturate(0.9);
          scale: 1.1;
          transition-property: filter, scale;
          transition-duration: calc(var(--speed) * 1.2);
          transition-timing-function: var(--easing);
          -webkit-mask: radial-gradient(100% 100% at 100% 0, #fff 40%, #0000 95%);
          mask: radial-gradient(100% 100% at 100% 0, #fff 40%, #0000 95%);
        }
        .drops-item[data-active="true"] h3,
        .drops-item[data-active="true"] .drops-icon {
          opacity: 1;
        }
        .drops-item[data-active="true"] :is(p, .drops-meta, .drops-cta) {
          opacity: 1;
          transition-delay: calc(var(--speed) * 0.25);
        }
        .drops-item[data-active="true"] img {
          filter: grayscale(0) brightness(1) saturate(1.1);
          scale: 1;
          transition-delay: calc(var(--speed) * 0.25);
        }

        /* Mobile — mirror the /community vertical accordion exactly.
           Horizontal title + icon on each row, active row expands. */
        @media (max-width: 48em) {
          .drops-item article {
            width: 100%;
            padding: 0.9rem 1.1rem 1rem 1.1rem;
            justify-content: flex-end;
            gap: 0.7rem;
          }
          .drops-item article h3 {
            position: absolute;
            top: 50%;
            left: 1.1rem;
            translate: 0 -50%;
            rotate: 0deg;
            transform-origin: center;
            font-size: 0.95rem;
            letter-spacing: 0.2em;
            transition: top calc(var(--speed) * 1.2) var(--easing),
              translate calc(var(--speed) * 1.2) var(--easing),
              opacity calc(var(--speed) * 1.2) var(--easing);
          }
          .drops-item .drops-icon {
            position: absolute;
            top: 50%;
            right: 1.1rem;
            bottom: auto;
            left: auto;
            translate: 0 -50%;
            transition: top calc(var(--speed) * 1.2) var(--easing),
              translate calc(var(--speed) * 1.2) var(--easing),
              opacity calc(var(--speed) * 1.2) var(--easing);
          }
          .drops-item article p {
            font-size: 12px;
            max-width: none;
            line-height: 1.5;
          }
          .drops-item[data-active="true"] article {
            padding-top: 2.6rem;
            padding-bottom: 1rem;
          }
          .drops-item[data-active="true"] article h3 {
            top: 1rem;
            translate: 0 0;
          }
          .drops-item[data-active="true"] .drops-icon {
            top: 1rem;
            translate: 0 0;
          }
          .drops-item img {
            -webkit-mask: radial-gradient(130% 100% at 100% 100%, #fff 45%, #0000 95%);
            mask: radial-gradient(130% 100% at 100% 100%, #fff 45%, #0000 95%);
          }
        }
      `}</style>
    </section>
  );
}
