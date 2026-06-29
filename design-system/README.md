# ByteNana Design System — Starter Kit

A framework-free, drop-in design system extracted from the ByteNana landing page.
Copy these folders into any static site and you get the same dark, yellow-accented look
plus the signature interactions (invert cards, mesh, orbit, carousels, globes, rotating headline).

## Quick start
1. Open `starter.html` in a browser to see the system working end-to-end.
2. To rebrand, edit **`css/tokens.css`** only — colors and fonts cascade from there.
3. Full reference + reuse checklist: **`DESIGN-SYSTEM.md`**.

## Contents
- `css/tokens.css` — design tokens (the re-skin knob)
- `css/base.css` — reset, typography, layout primitives
- `css/components.css` — all components, patterns, animation CSS
- `js/animations.js` — all interactions (nav, carousels, tabs, globe, forms, modal)
- `js/hero-globe.js` — optional bespoke spinning Americas globe (needs `assets/geo/world.geojson`)
- `assets/` — geojson for the globe + the logo mark (replace with your own)

## Notes
- No build step. Icons load from the Iconify CDN; fonts from Google Fonts.
- Forms POST to Netlify Forms by default — repoint in `js/animations.js` (module F).
- Everything respects `prefers-reduced-motion`.
