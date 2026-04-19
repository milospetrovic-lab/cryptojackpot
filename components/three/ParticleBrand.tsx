"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function ParticleBrand({ className }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  return (
    <div ref={ref} className={cn("relative h-full w-full", className)}>
      {inView && !isMobile ? (
        <iframe
          src="/demos/particle-text.html"
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0, background: "transparent" }}
          title="CryptoJackpot brand particles"
        />
      ) : (
        <h1 className="display gold-text select-none text-center text-[clamp(40px,9vw,104px)] leading-none tracking-[0.14em]">
          CRYPTOJACKPOT
        </h1>
      )}
    </div>
  );
}
