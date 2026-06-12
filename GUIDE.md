# ByteLp — Design & Developer Guide

**File:** `nearshore.bytenana.tech`
**Last updated:** 2026-06-12
**Fonts:** IBM Plex Sans (headings) + Inter (body) via Google Fonts
**Mode:** Dark only

---

## Color Palette

| Token | Hex | Role |
|---|---|---|
| `--color-primary` | `#F2B705` | Brand yellow — CTAs, accents, highlights |
| `--color-primary-dark` | `#D4A004` | Hover state for primary buttons |
| `--color-primary-light` | `#F5C84A` | Lighter tint, use sparingly |
| `--color-primary-glow` | `rgba(242,183,5,0.15)` | Glow / focus ring fill |
| `--color-bg` | `#0F1112` | Page base background |
| `--color-surface` | `#161A1C` | Elevated surface (odd sections, nav) |
| `--color-surface-2` | `#1E2325` | Cards, inputs, clutch block |
| `--color-surface-3` | `#252A2D` | Deeper elevation — use if needed |
| `--color-text` | `#FCFCFC` | Primary text |
| `--color-text-muted` | `rgba(252,252,252,0.55)` | Body copy, descriptions |
| `--color-text-dim` | `rgba(252,252,252,0.35)` | Placeholders, legal, labels |
| `--color-border` | `rgba(252,252,252,0.08)` | Card borders, dividers |
| `--color-border-hover` | `rgba(242,183,5,0.35)` | Card border on hover |

### Usage rules
- **Primary yellow** (`#F2B705`) is reserved for: CTAs, the white-label callout band, star ratings, stat numbers, expand buttons, list dash accents, and the `.logo-nana` wordmark.
- Never use yellow as body text on dark backgrounds — contrast passes AA only at large sizes.
- Surface layers go `bg → surface → surface-2 → surface-3` (darkest to lightest). Don't skip levels.

---

## Typography

| Token | Value | Use |
|---|---|---|
| `--font-heading` | `'IBM Plex Sans', sans-serif` | All headings h1–h4 |
| `--font-body` | `'Inter', sans-serif` | Body, labels, buttons, nav |
| `--text-xs` | `0.75rem` / 12px | Eyebrows, labels, legal, case labels |
| `--text-sm` | `0.875rem` / 14px | Card body, nav links, footer links |
| `--text-base` | `1rem` / 16px | Default body, form inputs |
| `--text-lg` | `1.125rem` / 18px | Section intros, pain list, subheads |
| `--text-xl` | `1.25rem` / 20px | h3, step titles, card headings |
| `--text-2xl` | `1.5rem` / 24px | Case studies h3, pain close |
| `--text-3xl` | `1.875rem` / 30px | h2 mobile, white-label h2 |
| `--text-4xl` | `2.25rem` / 36px | h1 mobile, stat numbers, step numbers |
| `--text-5xl` | `3rem` / 48px | h1 tablet, clutch score |
| `--text-6xl` | `3.75rem` / 60px | h1 desktop |

### Font weight scale
- `400` — body text
- `500` — nav links, labels
- `600` — button labels, form labels, bold body
- `700` — h2–h4 (Syne)
- `800` — h1, logo, step numbers, stat numbers (Syne)

---

## Spacing Scale (8pt grid)

| Token | Value | Common use |
|---|---|---|
| `--space-1` | `0.25rem` / 4px | Tight gaps (case-label to p) |
| `--space-2` | `0.5rem` / 8px | Tag gaps, button inner gap |
| `--space-3` | `0.75rem` / 12px | Input padding vertical |
| `--space-4` | `1rem` / 16px | Grid gaps (mobile), nav spacing |
| `--space-5` | `1.25rem` / 20px | Form group gaps |
| `--space-6` | `1.5rem` / 24px | Container padding, card padding sm |
| `--space-8` | `2rem` / 32px | Card padding, step padding |
| `--space-10` | `2.5rem` / 40px | Margin before grids |
| `--space-12` | `3rem` / 48px | Footer padding |
| `--space-16` | `4rem` / 64px | White-label section padding, case studies margin |
| `--space-20` | `5rem` / 80px | Hero top pad offset |
| `--space-24` | `6rem` / 96px | Default section padding |

---

## Layout Variables

| Token | Value | Use |
|---|---|---|
| `--container-max` | `1200px` | Max page width |
| `--container-narrow` | `760px` | Narrow content (available, unused) |
| `--navbar-height` | `72px` | Fixed nav height; used in hero padding & scroll-padding-top |
| `--radius-sm` | `4px` | Stack tags |
| `--radius` | `8px` | Buttons, inputs, step expand panels |
| `--radius-lg` | `16px` | Cards, testimonials, case cards, fit cards |
| `--radius-xl` | `24px` | Available for hero callout or modal if needed |

---

## Shadows

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.4)` | Subtle card lift |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.5)` | Floating panels |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.6)` | Modals, drawers |
| `--shadow-primary` | `0 4px 24px rgba(242,183,5,0.25)` | Primary button hover glow |

---

## Breakpoints

| Name | Min-width | Grid changes |
|---|---|---|
| Mobile (base) | `0px` | 1 column everywhere |
| Tablet | `768px` | 2-col model, stats 4-col, 2-col testimonials, cases, why, stack, fit. Hamburger → desktop nav. |
| Desktop | `1024px` | 3-col cases, why, stack. h1/h2 scale up. |
| Wide | `1280px` | 4-col fit grid |

---

## Section Guide

The page follows this narrative arc: **who it's for → their pain → our model → proof → why us → how we work → convert.**

### 1. `#hero` — `.section-hero`
**Background:** `--color-bg`
**Purpose:** First impression. Establish the value prop instantly.
**Key elements:** eyebrow label · h1 (max 780px wide) · subhead · two CTAs · trust strip
**Customization:** Swap the h1 if copy is refined. Trust strip should update whenever Clutch numbers change.

### 2. `#pain` — `.section-pain`
**Background:** `--color-surface`
**Purpose:** Mirror the reader's situation to build empathy before the pitch.
**Key elements:** h2 · intro with `<em>` yellow highlight · `.pain-list` (dashes in primary color) · `.pain-close` (Syne font, large)
**Customization:** Pain items can be reordered by priority. The `pain-close` line is the hook — keep it punchy.

### 3. `#model` — `.section-model`
**Background:** `--color-bg`
**Purpose:** Explain the delivery model with four concrete pillars.
**Key elements:** h2 · intro · 2×2 card grid (`.model-card`)
**Customization:** Card icons are Unicode symbols — replace with SVG icons when the icon set is decided.

### 4. `#white-label` — `.section-whitelabel`
**Background:** `--color-primary` (`#F2B705`) — the only fully yellow section
**Purpose:** Address the "why no logos?" objection proactively, turning it into a brand differentiator.
**Key elements:** h2 in `--color-bg` · two body paragraphs · bold close line
**Customization:** This section should stay short. If it grows, split into two paragraphs max.

### 5. `#proof` — `.section-proof`
**Background:** `--color-surface`
**Purpose:** Build trust without client names or logos. Uses Clutch data, stats, quotes, and case studies.
**Key elements:** Clutch block (replace `href="#"` with live Clutch URL) · 4-stat row · 4 testimonial cards · 3 case study cards
**Customization:**
- **Clutch link:** Update `href` on the "Read the reviews on Clutch" button to the live Clutch profile URL.
- **Stats:** Update whenever Clutch numbers change (reviews, states).
- **Case studies:** Add a hard metric to Result copy when a real number is available (the brief flags these).

### 6. `#why-us` — `.section-whyus`
**Background:** `--color-bg`
**Purpose:** Differentiate from body shops and staffing agencies. Six reasons, card grid.
**Key elements:** h2 · 6-card grid (`.why-card`)
**Customization:** The "AI-capable" card should stay updated as the AI toolset evolves.

### 7. `#tech-stack` — `.section-techstack`
**Background:** `--color-surface`
**Purpose:** Prove stack coverage at a glance. Pill tags by category.
**Key elements:** h2 · intro · 6-category grid (`.stack-category`) · close line CTA
**Customization:** Add/remove tags inside `.stack-tags`. Do not overload any category — keep each under 6 tags.

### 8. `#how-we-work` — `.section-howwework`
**Background:** `--color-bg`
**Purpose:** Reduce friction by making the process concrete. Expandable detail panels.
**Key elements:** 3 numbered steps (`.step`) · expand/collapse buttons (JS-driven) · inline detail panels
**Customization:** The expand copy is the right place to add specifics (onboarding SLA, tools used, etc.) once commitments are confirmed.

### 9. `#fit` — `.section-fit`
**Background:** `--color-surface`
**Purpose:** Objection handling. Address security, process fit, scale, and visibility concerns.
**Key elements:** h2 · 4-card grid (`.fit-card`)
**Customization:** This section can double as an FAQ expansion point. Cards can stack vertically on mobile without losing clarity.

### 10. `#cta` — `.section-cta`
**Background:** `--color-bg`
**Purpose:** Conversion. The only form on the page.
**Key elements:** h2 · intro · 3-field form · submit button · microcopy
**Customization:**
- Wire the form to a real endpoint (Formspree, HubSpot, Pipedrive, etc.) in `js/main.js` — replace the `setTimeout` stub in `handleFormSubmit()`.
- To embed a Cal.com booking widget instead, replace `<form>` with the Cal embed snippet and remove the form JS.

### 11. `#footer`
**Background:** `--color-surface`
**Key elements:** logo · one-liner · nav links · social links · legal
**Customization:** The Portfolio link in footer nav points to `href="#"` — update when the portfolio page is live.

---

## Component Reference

### Buttons

```html
<!-- Primary (yellow, dark text) -->
<a href="#cta" class="btn btn-primary">Book a discovery call</a>

<!-- Secondary (transparent, bordered) -->
<a href="#how-we-work" class="btn btn-secondary">See how we work ↓</a>

<!-- Small modifier -->
<a href="#" class="btn btn-primary btn-sm">Book a call</a>

<!-- Full-width (forms) -->
<button class="btn btn-primary btn-full">Submit</button>
```

### Cards

All cards share: `background-color: var(--color-surface-2)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-lg)`, and a `border-color` hover transition. Use these classes:
- `.model-card` — model pillars (with icon)
- `.testimonial-card` — quotes (left yellow border accent)
- `.case-card` — case studies (challenge/solution/result)
- `.why-card` — differentiators
- `.fit-card` — objection handling

### Eyebrow label

```html
<p class="eyebrow">Section label here</p>
```

Renders as: uppercase, `0.75rem`, `0.14em` letter-spacing, `--color-primary`.

### Stack tags

```html
<div class="stack-tags">
  <span>React</span>
  <span>Next.js</span>
</div>
```

---

## Animation Hooks (to add later)

The following classes and IDs are good targets for scroll-triggered animations. No animation CSS has been added — all values are static and ready for enhancement:

| Element | Suggested animation |
|---|---|
| `.section-hero h1` | Fade + slide up on load |
| `.trust-strip` | Fade in with slight delay |
| `.model-card` | Stagger fade-up on scroll |
| `.stat-number` | Count-up on scroll into view |
| `.testimonial-card` | Fade in staggered |
| `.case-card` | Fade + slide up staggered |
| `.why-card` | Stagger fade-up |
| `.stack-tags span` | Stagger pop-in |
| `.step` | Slide in from left |
| `.section-whitelabel` | No animation — it's an interrupt, keep it static |

---

## Pre-launch Checklist

- [ ] Replace `[ ... ]` placeholders in copy with real, confirmed figures
- [ ] Update Clutch button `href` to live Clutch profile URL
- [ ] Wire contact form to real endpoint in `handleFormSubmit()` (js/main.js)
- [ ] Add GTM container ID to `<head>` (before the CSS link)
- [ ] Confirm stat row numbers match live Clutch data
- [ ] Verify `scroll_padding_top` works correctly with fixed navbar at all breakpoints
- [ ] Test mobile menu open/close and all anchor-scroll links on iOS Safari
- [ ] Add `<link rel="icon">` favicon
- [ ] Add Open Graph meta tags (`og:title`, `og:description`, `og:image`)
- [ ] Any longevity claim must be consistent with "founded 2023"
- [ ] Portfolio page link in footer — update when live
