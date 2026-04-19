"use client";

/**
 * Atmosphere — two CSS ambient layers. No WebGL.
 * Brief §12 restraint: fog ≤ 0.15, vignette ≤ 0.35.
 * Chip-pattern layer (Layer B) is OFF per "kill it first if the page feels busy".
 */
export function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer A — molten radial fog, bottom corners */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.12,
          background:
            "radial-gradient(800px 500px at 8% 100%, rgba(196,30,58,0.55), transparent 60%), radial-gradient(900px 600px at 100% 92%, rgba(230,57,70,0.45), transparent 65%), radial-gradient(1100px 700px at 50% 120%, rgba(139,26,43,0.7), transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      {/* Layer C — edge vignette, kept subtle so sections stay legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 65%, rgba(0,0,0,0.32) 100%)",
        }}
      />
    </div>
  );
}
