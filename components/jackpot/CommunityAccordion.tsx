"use client";

import { useEffect, useRef } from "react";
import {
  MessageSquare,
  Send,
  Twitter,
  Trophy,
  Activity,
  Sparkles,
} from "lucide-react";

type Channel = {
  title: string;
  tag: string;
  body: string;
  cta: string;
  href: string;
  Icon: typeof MessageSquare;
  /** decorative css gradient used as the panel backdrop */
  background: string;
};

const CHANNELS: Channel[] = [
  {
    title: "Discord",
    tag: "2,400+ Rollers online",
    body:
      "Live Hit feed, Drop drops, Vulcan lore threads, and direct lines to the Concierge. The lounge after hours.",
    cta: "Join Discord",
    href: "#",
    Icon: MessageSquare,
    background:
      "radial-gradient(640px 380px at 80% 20%, rgba(224,255,87,0.22), transparent 65%), radial-gradient(700px 420px at 20% 80%, rgba(125,216,205,0.18), transparent 65%), #0A0A0C",
  },
  {
    title: "Telegram",
    tag: "3,900+ subscribers",
    body:
      "Drop alerts, the weekly Roll Call digest, Showdown countdowns. Quiet, signal-only — no noise.",
    cta: "Join Telegram",
    href: "#",
    Icon: Send,
    background:
      "radial-gradient(640px 380px at 20% 20%, rgba(196,30,58,0.28), transparent 60%), radial-gradient(680px 420px at 80% 80%, rgba(246,136,56,0.18), transparent 65%), #0A0A0C",
  },
  {
    title: "X / Twitter",
    tag: "@cryptojackpot",
    body:
      "Drops announced in 140 characters. Follow for real-time Showdown seeding and Onyx invitation cycles.",
    cta: "Follow",
    href: "#",
    Icon: Twitter,
    background:
      "radial-gradient(640px 420px at 50% 20%, rgba(240,255,160,0.2), transparent 65%), radial-gradient(700px 480px at 50% 100%, rgba(125,216,205,0.15), transparent 70%), #0A0A0C",
  },
  {
    title: "Roller Spotlight",
    tag: "Hunter Hall — monthly",
    body:
      "This month: Rho**** · Gold Chip · 7.2 BTC on Vault Crash, second-seed at the Friday Showdown, Silver to Gold on a disciplined bankroll.",
    cta: "Read the profile",
    href: "#",
    Icon: Trophy,
    background:
      "radial-gradient(620px 380px at 30% 20%, rgba(246,136,56,0.3), transparent 60%), radial-gradient(680px 420px at 70% 90%, rgba(224,255,87,0.18), transparent 65%), #0A0A0C",
  },
  {
    title: "Recent Hits",
    tag: "Live · anonymised",
    body:
      "Sha**** · ₿8.42 on Molten Gold Deluxe · 3m ago. Myk**** · ₿6.18 on Ruby Run · 7m. Live ticker runs 24/7.",
    cta: "Open the feed",
    href: "/leaderboard",
    Icon: Activity,
    background:
      "radial-gradient(640px 380px at 80% 20%, rgba(196,30,58,0.28), transparent 60%), radial-gradient(680px 440px at 20% 100%, rgba(224,255,87,0.22), transparent 65%), #0A0A0C",
  },
  {
    title: "Friday Showdown",
    tag: "20:00 UTC · weekly",
    body:
      "10 BTC guaranteed prize pool. 0.1 BTC Spin to qualify. Top 50 placements paid. Leaderboard freezes at close.",
    cta: "Add to calendar",
    href: "/promotions",
    Icon: Sparkles,
    background:
      "radial-gradient(640px 420px at 20% 30%, rgba(125,216,205,0.28), transparent 60%), radial-gradient(700px 460px at 80% 90%, rgba(246,136,56,0.2), transparent 65%), #0A0A0C",
  },
];

/**
 * CommunityAccordion — same "craft of ui" expand-on-hover grid as
 * DropsAccordion, with community channels and mint-glow active state.
 */
export function CommunityAccordion() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>("li"));

    const setIndex = (target: EventTarget | null) => {
      const closest = (target as HTMLElement | null)?.closest("li");
      if (!closest) return;
      const active = items.indexOf(closest);
      const cols = items
        .map((it, i) => {
          it.dataset.active = i === active ? "true" : "false";
          return i === active ? "10fr" : "1fr";
        })
        .join(" ");
      list.style.setProperty("grid-template-columns", cols);
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
    <section className="relative mx-auto max-w-[1200px] px-4 py-10 md:px-6 md:py-14">
      <ul
        ref={listRef}
        className="comm-grid"
        style={{ "--items": CHANNELS.length } as React.CSSProperties}
      >
        {CHANNELS.map((c, i) => {
          const Icon = c.Icon;
          return (
            <li
              key={c.title}
              data-active={i === 0 ? "true" : "false"}
              className="comm-item"
              style={{ background: c.background }}
            >
              <article>
                <h3>{c.title}</h3>
                <Icon className="comm-icon" size={20} />
                <div className="comm-meta">
                  <span className="rounded-full border border-jp-gold-deep/40 bg-black/55 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-jp-gold">
                    {c.tag}
                  </span>
                </div>
                <p>{c.body}</p>
                <a href={c.href} className="comm-cta">
                  <span>{c.cta} →</span>
                </a>
              </article>
            </li>
          );
        })}
      </ul>

      <style>{`
        .comm-grid {
          --gap: 10px;
          --base: clamp(2.2rem, 8cqi, 76px);
          --speed: 0.6s;
          --easing: linear(
            0 0%, 0.1538 4.09%, 0.2926 8.29%, 0.4173 12.63%,
            0.5282 17.12%, 0.6255 21.77%, 0.7099 26.61%, 0.782 31.67%,
            0.8425 37%, 0.8887 42.23%, 0.9257 47.79%, 0.9543 53.78%,
            0.9752 60.32%, 0.9883 67.11%, 0.9961 75%, 1 100%
          );
          container-type: inline-size;
          display: grid;
          grid-template-columns: 10fr 1fr 1fr 1fr 1fr 1fr;
          gap: var(--gap);
          list-style: none;
          padding: 0;
          margin: 0 auto;
          width: 100%;
          /* enlarged vs the promotions grid */
          height: clamp(380px, 62dvh, 620px);
          transition: grid-template-columns var(--speed) var(--easing);
        }
        .comm-item {
          position: relative;
          overflow: hidden;
          min-width: var(--base);
          border-radius: 16px;
          border: 1px solid rgba(184, 220, 74, 0.25);
          transition: box-shadow calc(var(--speed) * 1.2) var(--easing),
            border-color calc(var(--speed) * 1.2) var(--easing);
        }
        .comm-item[data-active="true"] {
          border-color: rgba(125, 216, 205, 0.55);
          box-shadow:
            0 0 0 1px rgba(125, 216, 205, 0.35) inset,
            0 0 38px rgba(125, 216, 205, 0.28),
            0 28px 70px -30px rgba(0, 0, 0, 0.95);
        }
        .comm-item article {
          width: calc(var(--article-width, 820) * 1px);
          height: 100%;
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.9rem;
          padding-inline: calc(var(--base) * 0.5 - 9px);
          padding-bottom: 1.2rem;
          overflow: hidden;
        }
        .comm-item article h3 {
          position: absolute;
          top: 1.15rem;
          left: calc(var(--base) * 0.5);
          transform-origin: 0 50%;
          rotate: 90deg;
          margin: 0;
          font-family: var(--font-bebas), sans-serif;
          font-size: 1.15rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #F0FFA0;
          white-space: nowrap;
          opacity: 0.7;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .comm-item .comm-icon {
          width: 22px;
          height: 22px;
          color: #7DD8CD;
          opacity: 0.78;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .comm-item article p {
          font-family: var(--font-jetbrains), monospace;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(250, 250, 250, 0.86);
          text-wrap: balance;
          margin: 0;
          max-width: 52ch;
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .comm-item .comm-meta {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .comm-item .comm-cta {
          position: absolute;
          bottom: 1rem;
          height: 22px;
          line-height: 1;
          color: #E0FF57;
          font-family: var(--font-jetbrains), monospace;
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          opacity: 0;
          transition: opacity calc(var(--speed) * 1.2) var(--easing);
        }
        .comm-item .comm-cta:is(:hover, :focus-visible) span {
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .comm-item .comm-cta span {
          display: inline-block;
          line-height: 18px;
          translate: calc(var(--base) * 0.5) 0;
          font-weight: 500;
        }
        .comm-item[data-active="true"] h3,
        .comm-item[data-active="true"] .comm-icon {
          opacity: 1;
        }
        .comm-item[data-active="true"] :is(p, .comm-meta, .comm-cta) {
          opacity: 1;
          transition-delay: calc(var(--speed) * 0.25);
        }
      `}</style>
    </section>
  );
}
