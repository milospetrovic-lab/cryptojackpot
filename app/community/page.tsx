import { CommunityAccordion } from "@/components/jackpot/CommunityAccordion";
import { CommunityBackdrop } from "@/components/layout/CommunityBackdrop";

export default function CommunityPage() {
  return (
    <div className="relative mx-auto max-w-[1200px] px-4 pt-28 pb-16 md:px-6">
      <CommunityBackdrop />
      <header className="relative z-10 mb-8 text-center">
        <div className="eyebrow">The Lounge After Hours</div>
        <h1 className="font-bebas mt-4 text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.92] tracking-[0.04em] text-jp-white">
          <span className="gold-text">COMMUNITY</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-jp-mute md:text-base">
          Hover a card to open it. Six channels, one lounge. No sports. No
          cards. Just slots, jackpots, crypto chat.
        </p>
      </header>

      <CommunityAccordion />
    </div>
  );
}
