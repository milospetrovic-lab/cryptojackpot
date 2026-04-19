"use client";

/**
 * Atmosphere — three CSS/SVG ambient layers. No WebGL.
 * Opacity caps from Master Brief §12: fog ≤ 0.15, chip-pattern ≤ 0.06, vignette max-alpha 0.55.
 */
export function Atmosphere() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Layer A — molten radial fog pools in bottom corners */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.15,
          background:
            "radial-gradient(800px 500px at 8% 100%, rgba(196,30,58,0.55), transparent 60%), radial-gradient(900px 600px at 100% 92%, rgba(230,57,70,0.45), transparent 65%), radial-gradient(1100px 700px at 50% 120%, rgba(139,26,43,0.7), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Layer B — subtle SVG chip pattern, fixed, very faint */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0.06 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="chipPattern"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="80"
              cy="80"
              r="28"
              fill="none"
              stroke="#FFD700"
              strokeWidth="0.6"
            />
            <circle
              cx="80"
              cy="80"
              r="22"
              fill="none"
              stroke="#FFD700"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            />
            <circle cx="80" cy="80" r="3" fill="#FFD700" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#chipPattern)" />
      </svg>

      {/* Layer C — edge vignette, max alpha 0.55 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
