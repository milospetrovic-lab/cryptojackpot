"use client";

import { useState } from "react";

const HELPLINES = [
  { region: "US", line: "1-800-GAMBLER", body: "National Council on Problem Gambling" },
  { region: "UK", line: "0808 8020 133", body: "GamCare" },
  { region: "EU", line: "gamblingtherapy.org", body: "Gambling Therapy — 24/7 multilingual chat" },
  { region: "AU/NZ", line: "1800 858 858", body: "Gambling Help Online" },
];

export default function ResponsiblePlayPage() {
  const [daily, setDaily] = useState("500");
  const [weekly, setWeekly] = useState("2500");
  const [monthly, setMonthly] = useState("8000");
  const [realityCheck, setRealityCheck] = useState("30");

  return (
    <div className="relative mx-auto max-w-5xl px-8 pt-32 pb-24">
      <header className="mb-10 text-center">
        <div className="eyebrow">Lounge Conduct</div>
        <h1 className="display mt-4 text-[clamp(42px,7vw,84px)] text-jp-white tracking-[0.14em]">
          <span className="gold-text">House Rules</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-jp-mute md:text-base">
          Our tools for playing with a clear head. These aren't restrictions —
          they're the controls the lounge expects you to use.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Stake limits */}
        <section className="lounge-card rounded-2xl p-7">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Stake Limits
          </h2>
          <p className="mt-2 text-sm text-jp-mute">
            Caps per window. Changes downward take effect now; upward take
            effect after 24 hours.
          </p>
          <div className="mt-5 space-y-3">
            <LimitRow label="Daily (USD)" value={daily} onChange={setDaily} />
            <LimitRow label="Weekly (USD)" value={weekly} onChange={setWeekly} />
            <LimitRow label="Monthly (USD)" value={monthly} onChange={setMonthly} />
          </div>
        </section>

        {/* Reality check */}
        <section className="lounge-card rounded-2xl p-7">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Reality Check
          </h2>
          <p className="mt-2 text-sm text-jp-mute">
            A gentle interruption every N minutes of active Spinning,
            summarizing your session Stake and result.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <input
              type="range"
              min={5}
              max={120}
              step={5}
              value={realityCheck}
              onChange={(e) => setRealityCheck(e.target.value)}
              className="flex-1 accent-jp-gold"
            />
            <span className="tabular w-16 text-right font-mono text-sm text-jp-gold">
              {realityCheck} min
            </span>
          </div>
        </section>

        {/* Self-exclusion */}
        <section className="lounge-card rounded-2xl p-7 md:col-span-2">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Self-Exclusion
          </h2>
          <p className="mt-2 text-sm text-jp-mute">
            Lock the lounge door. Once active, you can't Spin, deposit, or
            claim a Drop until the window ends.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            {["24 hours", "7 days", "6 months", "Permanent"].map((w) => (
              <button
                key={w}
                className="rounded-xl border border-jp-ruby/40 bg-jp-ruby/10 px-4 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-jp-molten transition-colors hover:bg-jp-ruby/20"
              >
                {w}
              </button>
            ))}
          </div>
        </section>

        {/* Loss history */}
        <section className="lounge-card rounded-2xl p-7">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Loss History
          </h2>
          <div className="mt-4 space-y-3 text-sm">
            {[
              { range: "Last 30 days", net: "- $812" },
              { range: "Last 90 days", net: "- $2,140" },
              { range: "Last 365 days", net: "+ $3,510" },
            ].map((r) => (
              <div
                key={r.range}
                className="flex items-center justify-between border-b border-jp-smoke/60 pb-2"
              >
                <span className="text-jp-mute">{r.range}</span>
                <span className="tabular font-mono text-jp-white">{r.net}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Helplines */}
        <section className="lounge-card rounded-2xl p-7">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Helplines
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {HELPLINES.map((h) => (
              <li key={h.region} className="flex items-start justify-between gap-3 border-b border-jp-smoke/50 pb-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-jp-dim">
                    {h.region}
                  </div>
                  <div className="text-jp-white">{h.body}</div>
                </div>
                <span className="tabular font-mono text-jp-gold">{h.line}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="lounge-card rounded-2xl p-7 md:col-span-2">
          <h2 className="display text-xl text-jp-gold tracking-[0.18em]">
            Our Commitment
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-jp-mute">
            House Rules are a feature of the lounge, not a restriction. Every
            Drop carries visible Play-through. Every Spin is auditable. The
            Concierge is trained to respond to at-risk play with quiet options,
            not sales pressure. If any part of the floor ever feels out of
            control, pull the lever above and the lounge will honor it.
          </p>
        </section>
      </div>
    </div>
  );
}

function LimitRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="text-xs uppercase tracking-[0.22em] text-jp-mute">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ""))}
        inputMode="numeric"
        className="tabular w-28 rounded-full border border-jp-smoke bg-black/40 px-4 py-1.5 text-right font-mono text-sm text-jp-gold outline-none focus:border-jp-gold"
      />
    </label>
  );
}
