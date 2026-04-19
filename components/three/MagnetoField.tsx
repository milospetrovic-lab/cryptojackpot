"use client";

import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type Props = { className?: string };

export function MagnetoField({ className }: Props) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

  return (
    <div ref={ref} className={cn("absolute inset-0", className)} aria-hidden>
      {inView && !isMobile ? (
        <iframe
          src="/demos/magneto-field.html"
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          style={{ border: 0, background: "transparent" }}
          title="Magneto field"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 400px at 50% 50%, rgba(255,215,0,0.18), transparent 65%), radial-gradient(900px 500px at 50% 100%, rgba(196,30,58,0.22), transparent 70%)",
          }}
        />
      )}
    </div>
  );
}
