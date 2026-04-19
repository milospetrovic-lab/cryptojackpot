"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TierSpec } from "@/lib/tiers";

type Props = {
  tier: TierSpec;
  size?: number;
  className?: string;
  interactive?: boolean;
};

export function ChipTier({ tier, size = 128, className, interactive = true }: Props) {
  const [open, setOpen] = useState(false);
  const id = `tier-${tier.id}`;

  return (
    <div
      className={cn("flex flex-col items-center text-center", className)}
      onClick={() => interactive && setOpen((v) => !v)}
      role={interactive ? "button" : undefined}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        whileHover={interactive ? { scale: 1.06 } : undefined}
        className="cursor-pointer"
        style={{ transformOrigin: "center" }}
      >
        <svg width={size} height={size} viewBox="0 0 200 200">
          <defs>
            <radialGradient id={`${id}-face`} cx="50%" cy="45%" r="60%">
              <stop
                offset="0%"
                stopColor={lighten(tier.chip, tier.id === "onyx" ? 0.15 : 0.25)}
              />
              <stop offset="55%" stopColor={tier.chip} />
              <stop offset="100%" stopColor={tier.edge} />
            </radialGradient>
            <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={tier.edge} />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" fill={`url(#${id}-edge)`} />
          <circle cx="100" cy="100" r="78" fill={`url(#${id}-face)`} />
          <g stroke={tier.edge} strokeWidth="2" fill="none">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              const x = 100 + Math.cos(a) * 78;
              const y = 100 + Math.sin(a) * 78;
              const x2 = 100 + Math.cos(a) * 92;
              const y2 = 100 + Math.sin(a) * 92;
              return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
            })}
          </g>
          <circle cx="100" cy="100" r="48" fill="none" stroke={tier.edge} strokeWidth="1.5" />
          <text
            x="100"
            y="108"
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontWeight="700"
            fontSize="22"
            fill={tier.id === "onyx" ? "#FFD700" : "#1A1A1D"}
            letterSpacing="3"
          >
            {tier.retainer}
          </text>
        </svg>
      </motion.div>

      <div className="mt-5">
        <div className="display text-sm text-jp-gold tracking-[0.28em]">
          {tier.name.toUpperCase()}
        </div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-jp-dim">
          {tier.unlock}
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 max-w-[220px] text-sm text-jp-mute"
        >
          {tier.benefit}
        </motion.div>
      )}
    </div>
  );
}

function lighten(hex: string, amt: number) {
  const n = parseInt(hex.replace("#", ""), 16);
  let r = (n >> 16) & 255;
  let g = (n >> 8) & 255;
  let b = n & 255;
  r = Math.min(255, Math.round(r + (255 - r) * amt));
  g = Math.min(255, Math.round(g + (255 - g) * amt));
  b = Math.min(255, Math.round(b + (255 - b) * amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
