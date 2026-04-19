"use client";

import { cn } from "@/lib/utils";

/**
 * LogoMark — animated brand wordmark. Renders the "Particles Write Text"
 * effect in a compact band (e.g. 220x38) via an iframe.
 */
export function LogoMark({
  width = 220,
  height = 38,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <span
      aria-label="cryptojackpot"
      className={cn("relative inline-block align-middle", className)}
      style={{ width, height }}
    >
      <iframe
        src="/demos/logo-mark.html"
        loading="eager"
        allowTransparency
        className="h-full w-full"
        style={{ border: 0, background: "transparent" }}
        title="cryptojackpot"
      />
    </span>
  );
}
