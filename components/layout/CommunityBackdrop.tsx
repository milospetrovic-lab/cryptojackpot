"use client";

/**
 * CommunityBackdrop — dimmed electric field behind the community page.
 * Opacity held low + a heavy vignette so the particle strikes read as
 * subtle ambient pulses rather than a full-intensity backdrop (fixes the
 * perf/visual noise on /community).
 */
export function CommunityBackdrop() {
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
        style={{ border: 0, background: "transparent", opacity: 0.28 }}
        title="Community electric backdrop"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 18%, rgba(0,0,0,0.78) 100%)",
        }}
      />
    </div>
  );
}
