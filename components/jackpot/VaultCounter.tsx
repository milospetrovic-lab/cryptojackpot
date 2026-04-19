"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatBTC } from "@/lib/utils";

type Props = {
  variant?: "hero" | "sticky";
  className?: string;
  initial?: number; // starting BTC value
};

/**
 * VaultCounter — signature number. Prototype simulates activity.
 * Production: wire to /api/vault/current WebSocket.
 */
export function VaultCounter({ variant = "hero", className, initial = 142.8473 }: Props) {
  const [value, setValue] = useState(initial);
  const [ringing, setRinging] = useState(false);
  const lastBig = useRef(0);

  useEffect(() => {
    // regular small climb every ~500ms
    const tick = setInterval(() => {
      setValue((v) => v + (Math.random() * 0.0009 + 0.00008));
    }, 500);

    // occasional big Hit draws from the Vault — ruby flash
    const strike = setInterval(() => {
      const now = Date.now();
      if (now - lastBig.current < 9000) return;
      if (Math.random() < 0.35) {
        lastBig.current = now;
        setRinging(true);
        setValue((v) => Math.max(1, v - (Math.random() * 0.9 + 0.3)));
        setTimeout(() => setRinging(false), 1800);
      }
    }, 4200);

    return () => {
      clearInterval(tick);
      clearInterval(strike);
    };
  }, []);

  if (variant === "sticky") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-full border border-jp-gold-deep/30 bg-black/60 px-4 py-2 backdrop-blur-md",
          ringing && "animate-pulseRing",
          className
        )}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-jp-mute">
          The Vault
        </span>
        <span
          className={cn(
            "display tabular text-sm text-jp-gold",
            ringing && "text-jp-ruby"
          )}
        >
          ₿{formatBTC(value)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center text-center",
        className
      )}
    >
      <div className="eyebrow mb-4">The Vault · Live</div>

      {/* ring pulse overlay */}
      {ringing && (
        <div className="absolute inset-0 -m-8 rounded-[40px] animate-pulseRing border border-jp-ruby/40" />
      )}

      <div
        className={cn(
          "display tabular gold-text select-none text-[clamp(56px,10vw,148px)] leading-none",
          ringing && "!text-transparent [background:linear-gradient(180deg,#F0FFA0,#C41E3A)] [-webkit-background-clip:text] [background-clip:text]"
        )}
        style={{ letterSpacing: "0.04em" }}
      >
        ₿{formatBTC(value)}
      </div>
      <div className="mt-3 font-mono text-xs uppercase tracking-[0.4em] text-jp-mute">
        ≈ ${(value * 67800).toLocaleString("en-US", { maximumFractionDigits: 0 })} USD · Molten & Rising
      </div>

      {ringing && (
        <div className="mt-4 text-xs uppercase tracking-[0.3em] text-jp-ruby">
          A Hit just rang the Vault.
        </div>
      )}
    </div>
  );
}
