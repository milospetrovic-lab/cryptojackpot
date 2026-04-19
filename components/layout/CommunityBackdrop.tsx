"use client";

/**
 * CommunityBackdrop — full-viewport iframe of the "ALIEN" particle pen,
 * recolored to gold + molten red. Sits behind the community page content.
 */
export function CommunityBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <iframe
        src="/demos/alien-particles.html"
        loading="lazy"
        allowTransparency
        className="absolute inset-0 h-full w-full"
        style={{ border: 0, background: "transparent" }}
        title="Community particle backdrop"
      />
      {/* Vignette to keep content legible on top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
