"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function ParticleBrand({ className }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });

  return (
    <div ref={ref} className={cn("relative h-full w-full", className)}>
      {inView ? (
        <iframe
          src="/demos/particle-text.html"
          loading="lazy"
          allowTransparency
          className="absolute inset-0 h-full w-full"
          style={{ border: 0, background: "transparent" }}
          title="CryptoJackpot brand particles"
        />
      ) : (
        <h1 className="display gold-text select-none text-center leading-[0.95] tracking-[0.08em] text-[clamp(3rem,10vw,7rem)]">
          CRYPTOJACKPOT
        </h1>
      )}
    </div>
  );
}
