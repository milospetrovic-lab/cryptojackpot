"use client";

import { useState } from "react";
import { RollCall } from "@/components/jackpot/RollCall";

const WINDOWS = ["24h", "7d", "30d", "All-time"] as const;
const GAMES = ["All Games", "Slots", "Live Jackpots", "Crypto Originals"];
const STAKES = ["No minimum", "≥ 0.01 BTC", "≥ 0.1 BTC", "≥ 1 BTC"];

export default function LeaderboardPage() {
  const [win, setWin] = useState<typeof WINDOWS[number]>("7d");
  const [game, setGame] = useState(GAMES[0]);
  const [stake, setStake] = useState(STAKES[0]);

  return (
    <div className="relative mx-auto max-w-5xl px-8 pt-32 pb-24">
      <header className="mb-10 text-center">
        <div className="eyebrow">Live</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          The <span className="gold-text">Roll Call</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
          Who's ringing the Vault right now. Anonymized handles, real Hits.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <Filter label="Window" value={win} options={WINDOWS as any} onChange={(v) => setWin(v as any)} />
        <Filter label="Game" value={game} options={GAMES} onChange={setGame} />
        <Filter label="Min Stake" value={stake} options={STAKES} onChange={setStake} />
      </div>

      <RollCall />

      <p className="mt-6 text-center text-xs uppercase tracking-[0.3em] text-jp-dim">
        Updates in real time · anonymized for House Rules compliance
      </p>
    </div>
  );
}

function Filter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-jp-smoke bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-jp-mute">
      <span className="text-jp-dim">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-jp-gold outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-jp-charcoal text-jp-white">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
