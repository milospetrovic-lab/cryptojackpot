"use client";

import { usePathname } from "next/navigation";

/**
 * ElectricGlobal — fixed ambient electric backdrop behind every page
 * EXCEPT /responsible-play (the House Rules cube stages its own art and
 * asked not to have the field behind it).
 */
export function ElectricGlobal() {
  const pathname = usePathname();
  if (pathname?.startsWith("/responsible-play")) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <iframe
        src="/demos/electric-field.html"
        loading="lazy"
        allowTransparency
        className="absolute inset-0 h-full w-full"
        style={{ border: 0, background: "transparent" }}
        title="Ambient electric field"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
