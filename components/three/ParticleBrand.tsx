"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function ParticleBrand({ className }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "100px" });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div ref={ref} className={cn("relative h-full w-full", className)}>
      {inView && !mobile ? (
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
