"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Roller = {
  handle: string;
  btc: number;
  game: string;
  mins: number;
};

const SEED: Roller[] = [
  { handle: "Sha****", btc: 8.42, game: "Molten Gold Deluxe", mins: 3 },
  { handle: "Myk****", btc: 6.18, game: "Ruby Run", mins: 7 },
  { handle: "Dro****", btc: 4.93, game: "Vault Crash", mins: 14 },
  { handle: "Lys****", btc: 3.71, game: "Vulcan Plinko", mins: 22 },
  { handle: "Kae****", btc: 2.86, game: "Gilded Mines", mins: 28 },
  { handle: "Rho****", btc: 2.14, game: "The Showdown", mins: 36 },
  { handle: "Ven****", btc: 1.77, game: "Onyx Dice", mins: 41 },
];

export function RollCall() {
  const [rows, setRows] = useState<Roller[]>(SEED);

  useEffect(() => {
    const id = setInterval(() => {
      setRows((prev) => {
        const next = prev.slice();
        const i = Math.floor(Math.random() * next.length);
        next[i] = { ...next[i], btc: +(next[i].btc + Math.random() * 0.12).toFixed(2), mins: Math.max(1, next[i].mins - 1) };
        return next.sort((a, b) => b.btc - a.btc);
      });
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="lounge-card rounded-2xl p-2">
      <div className="flex items-center justify-between border-b border-jp-smoke/60 px-5 py-4">
        <div>
          <div className="eyebrow">The Roll Call · Live</div>
          <div className="display mt-1 text-xl text-jp-white tracking-[0.18em]">
            Top Rollers · This Week
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-jp-ruby/40 bg-jp-ruby/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-jp-molten md:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-jp-molten" />
          Live Feed
        </div>
      </div>

      <ol className="divide-y divide-jp-smoke/50">
        {rows.slice(0, 7).map((r, i) => (
          <li
            key={r.handle + i}
            className={cn(
              "flex items-center justify-between gap-4 px-5 py-4 transition-colors",
              i < 3 && "bg-gradient-to-r from-jp-gold/5 to-transparent"
            )}
            style={{
              borderLeft: `3px solid ${i < 3 ? "rgba(255,215,0,0.75)" : "rgba(212,175,55,0.22)"}`,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="w-6 font-mono text-xs text-jp-mute">
                {String(i + 1).padStart(2, "0")}
              </span>
              {i === 0 && (
                <svg width="18" height="18" viewBox="0 0 20 20" className="text-jp-ruby">
                  <circle cx="10" cy="10" r="8" fill="#C41E3A" />
                  <circle cx="10" cy="10" r="5" fill="#8B1A2B" />
                </svg>
              )}
              <div>
                <div className="font-semibold text-jp-white">{r.handle}</div>
                <div className="text-xs text-jp-dim">{r.game}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="tabular font-display text-jp-gold">
                ₿{r.btc.toFixed(2)}
              </div>
              <div className="text-xs text-jp-dim">{r.mins}m ago</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
