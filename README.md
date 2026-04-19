# CryptoJackpot — site-v1

Vulcan VIP crypto casino. Next.js 14 (App Router) + Tailwind + GSAP + Framer Motion.

## Local

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Stack

- Next.js 14 App Router · TypeScript · Tailwind
- GSAP + ScrollTrigger (primary animation engine)
- Framer Motion (UI micro-interactions only)
- React Three Fiber (reserved for the iframed particle demos)
- Zustand, react-hook-form, zod, lucide-react

## Brand boundaries

See [../CRYPTOJACKPOT_MASTER_BRIEF.md](../CRYPTOJACKPOT_MASTER_BRIEF.md) for the full rules. Short version:

- **Do not touch** `spiderspins/` or `cryptoforge/` source.
- Skills are copied from `spiderspins/skills/` into `../skills/` read-only.
- No mountain, spider, forge, or hammer vocabulary. No blues/greens/purples.

## Restraint caps (Section 12)

- Fog opacity ≤ 0.15
- Gold dust opacity ≤ 0.20
- Chip pattern opacity ≤ 0.06
- Mobile < 768px: zero live particles, posters only
