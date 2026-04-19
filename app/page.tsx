import Link from "next/link";
import { MagnetoField } from "@/components/three/MagnetoField";
import { VaultCounter } from "@/components/jackpot/VaultCounter";
import { PromoBanner } from "@/components/jackpot/PromoBanner";
import { ChipCascade } from "@/components/three/ChipCascade";
import { DropsRow } from "@/components/jackpot/DropsRow";
import { RollCall } from "@/components/jackpot/RollCall";
import { FAQ } from "@/components/jackpot/FAQ";
import { CommunitySection } from "@/components/jackpot/CommunitySection";
import { ChipTier } from "@/components/jackpot/ChipTier";
import { BannerCard } from "@/components/jackpot/BannerCard";
import { TIERS } from "@/lib/tiers";

export default function Home() {
  return (
    <>
      <PromoBanner />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        {/* layer 1 — magneto attractor field (transparent-bg iframe) */}
        <MagnetoField />

        {/* layer 2 — content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-36 pb-20 text-center">
          <div className="eyebrow mb-4">The Vulcan VIP Casino</div>

          {/* Static brand headline — particle-write effect now lives in the navbar logo */}
          <h1 className="display gold-text select-none text-center leading-[0.95] tracking-[0.08em] text-[clamp(3rem,10vw,7rem)]">
            CRYPTOJACKPOT
          </h1>

          {/* Hero coin — tucked right under h1 */}
          <img
            src="/images/hero/center-coin-hero.png"
            alt="CryptoJackpot coin"
            className="pointer-events-none -mt-6 mb-4 h-[clamp(120px,18vh,220px)] w-auto select-none object-contain drop-shadow-[0_0_60px_rgba(255,215,0,0.45)]"
            draggable={false}
          />

          <p className="max-w-xl text-center text-base leading-relaxed text-jp-mute md:text-lg">
            where the molten meets the jackpot.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/games"
              className="group relative overflow-hidden rounded-full bg-gradient-to-b from-jp-gold-pale via-jp-gold to-jp-gold-deep px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.26em] text-jp-obsidian shadow-gold-glow transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Enter the Vault</span>
              <span
                aria-hidden
                className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
              />
            </Link>
            <Link
              href="/promotions"
              className="rounded-full border border-jp-ruby/70 bg-jp-ruby/5 px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.26em] text-jp-molten transition-all hover:bg-jp-ruby/15 hover:shadow-ruby-glow"
            >
              See the Drops
            </Link>
          </div>

          <div className="mt-14 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-jp-dim">
            <span className="h-px w-8 bg-jp-gold-deep/50" />
            <span>scroll · descend into the chamber</span>
            <span className="h-px w-8 bg-jp-gold-deep/50" />
          </div>
        </div>
      </section>

      {/* VAULT STRIP */}
      <section className="relative border-y border-jp-gold-deep/20 bg-gradient-to-b from-black via-jp-charcoal to-jp-charcoal">
        <div className="mx-auto max-w-6xl px-8 py-20">
          <VaultCounter variant="hero" />
        </div>
      </section>

      {/* BANNER — particles.js + crypto 3D render */}
      <BannerCard />

      {/* DROPS */}
      <DropsRow />

      {/* CHIP CASCADE */}
      <ChipCascade />

      {/* CROWN TIERS PREVIEW */}
      <section className="relative mx-auto max-w-6xl px-8 py-24">
        <div className="mb-14 text-center">
          <div className="eyebrow">The Progression</div>
          <h2 className="display mt-3 text-[clamp(32px,5vw,52px)] text-jp-white tracking-[0.16em]">
            <span className="gold-text">Crown Tiers</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute">
            Five Chips. One Crown. Your status is visible in the lounge and
            stacks as you Roll.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {TIERS.map((t) => (
            <ChipTier key={t.id} tier={t} size={110} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/vip-crown"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-jp-gold hover:underline"
          >
            See all tier benefits →
          </Link>
        </div>
      </section>

      {/* ROLL CALL */}
      <section className="relative mx-auto max-w-5xl px-8 py-16">
        <RollCall />
      </section>

      {/* COMMUNITY */}
      <CommunitySection />

      {/* FAQ */}
      <FAQ />
    </>
  );
}
