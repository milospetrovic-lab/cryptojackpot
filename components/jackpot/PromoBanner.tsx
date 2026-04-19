"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "cj_promo_dismissed_v1";
const DROP = {
  code: "VULCAN300",
  title: "This Week's Drop",
  body: "300% Opening Hand + 150 House Chips",
  playthrough: "Play-through 30×",
};

export function PromoBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(typeof window !== "undefined" && localStorage.getItem(KEY) !== "1");
  }, []);

  if (!show) return null;

  const dismiss = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };

  return (
    <div className="fixed left-1/2 top-[86px] z-[120] w-[min(92vw,880px)] -translate-x-1/2 md:top-[92px]">
      <div
        className="relative overflow-hidden rounded-full border border-jp-gold-deep/70 px-6 py-3 shadow-[0_0_42px_-8px_rgba(255,215,0,0.55)]"
        style={{
          background:
            "linear-gradient(90deg, rgba(26,26,29,0.92), rgba(26,26,29,0.78) 50%, rgba(26,26,29,0.92))",
        }}
      >
        {/* shimmer sweep */}
        <div
          className="pointer-events-none absolute inset-0 animate-shimmer"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,232,138,0.35) 50%, transparent 65%, transparent 100%)",
            backgroundSize: "220% 100%",
          }}
        />
        {/* molten edge glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(196,30,58,0.25), inset 0 0 28px -12px rgba(230,57,70,0.5)",
          }}
        />

        <div className="relative flex items-center gap-4 text-[12px] md:text-sm">
          <span className="hidden rounded-full bg-jp-ruby/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-molten md:inline-flex">
            Live
          </span>
          <span className="font-display text-jp-gold tracking-[0.18em] uppercase whitespace-nowrap">
            {DROP.title}
          </span>
          <span className="hidden text-jp-mute md:inline">·</span>
          <span className="text-jp-white truncate">{DROP.body}</span>
          <span className="hidden text-jp-mute md:inline">·</span>
          <span className="hidden rounded border border-jp-gold-deep/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-gold md:inline-flex">
            Code {DROP.code}
          </span>
          <span className="hidden text-jp-mute md:inline">·</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-jp-mute md:inline">
            {DROP.playthrough}
          </span>
          <button
            aria-label="Dismiss promotion"
            onClick={dismiss}
            className="ml-auto grid h-6 w-6 place-items-center rounded-full text-jp-mute hover:bg-jp-smoke hover:text-jp-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
