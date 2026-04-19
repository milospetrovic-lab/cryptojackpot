import { DropsAccordion } from "@/components/jackpot/DropsAccordion";

export default function PromotionsPage() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-16">
      <header className="mb-10 text-center">
        <div className="eyebrow">Active This Week</div>
        <h1 className="font-bebas mt-4 text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
          THE <span className="gold-text">DROPS</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-jp-mute md:text-base">
          Hover a card to open it. Play-through is on every face — no small
          print, no buried terms. That's the House Rule.
        </p>
      </header>

      <DropsAccordion />
    </div>
  );
}
