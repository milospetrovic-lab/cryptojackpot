import { ChipTier } from "@/components/jackpot/ChipTier";
import { TIERS } from "@/lib/tiers";
import { VaultCounter } from "@/components/jackpot/VaultCounter";

export default function VipCrownPage() {
  return (
    <div className="relative mx-auto max-w-5xl px-8 pt-32 pb-24">
      <header className="mb-12 text-center">
        <div className="eyebrow">The Progression</div>
        <h1 className="display mt-4 text-[clamp(44px,7vw,88px)] text-jp-white tracking-[0.14em]">
          <span className="gold-text">Crown Tiers</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-jp-mute md:text-base">
          Five Chips mark how close you stand to the furnace. Session days and
          total Stake unlock the stack. The Onyx Crown is earned by
          invitation.
        </p>
      </header>

      {/* Descend — small live Vault counter, flanked by rule lines */}
      <div className="mb-16 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-jp-gold-deep/50 md:w-24" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-jp-gold">
            Descend
          </span>
          <span className="h-px w-12 bg-jp-gold-deep/50 md:w-24" />
        </div>
        <VaultCounter variant="sticky" className="mt-5" />
        <span className="mt-4 text-[10px] uppercase tracking-[0.3em] text-jp-dim">
          The Vault · Live · ≈ USD converted at close of day
        </span>
      </div>

      <div className="space-y-14">
        {TIERS.map((tier, i) => (
          <section
            key={tier.id}
            className={
              i % 2 === 0
                ? "grid grid-cols-1 items-center gap-10 md:grid-cols-[240px_1fr]"
                : "grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_240px]"
            }
          >
            {i % 2 === 0 ? (
              <>
                <div className="flex justify-center">
                  <ChipTier tier={tier} size={180} interactive={false} />
                </div>
                <TierContent tier={tier} />
              </>
            ) : (
              <>
                <TierContent tier={tier} />
                <div className="flex justify-center">
                  <ChipTier tier={tier} size={180} interactive={false} />
                </div>
              </>
            )}
          </section>
        ))}
      </div>

      <div className="gold-divider my-14" />

      <div className="lounge-card rounded-2xl p-8 text-center">
        <div className="eyebrow">Your Current Chip</div>
        <div className="display mt-3 text-2xl text-jp-gold tracking-[0.2em]">
          Bronze
        </div>
        <p className="mx-auto mt-3 max-w-md text-sm text-jp-mute">
          Placeholder — sign in to see your real Chip, progress bar, and
          next-tier unlock path.
        </p>
      </div>
    </div>
  );
}

function TierContent({ tier }: { tier: (typeof TIERS)[number] }) {
  return (
    <div>
      <h2 className="display text-[clamp(24px,3vw,36px)] text-jp-white tracking-[0.18em]">
        {tier.name.toUpperCase()}
      </h2>
      <div className="mt-3 text-xs uppercase tracking-[0.3em] text-jp-dim">
        Unlock · {tier.unlock}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-jp-mute md:text-base">
        {tier.benefit}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <span className="rounded-full border border-jp-gold-deep/40 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-gold">
          Retainer {tier.retainer}
        </span>
        <span className="rounded-full border border-jp-smoke bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-jp-mute">
          Priority Concierge
        </span>
      </div>
    </div>
  );
}
