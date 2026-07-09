# ByteNana Design System

A portable, framework-free design system extracted from the ByteNana landing page
(`nearshore.bytenana.tech`). Drop the `css/`, `js/`, and `assets/` folders into any
static site and you get the same look, feel, and signature interactions.

> This file supersedes the original `GUIDE.md`, which had drifted out of sync with the
> code (it referenced a "Syne" font and a `.pain-list` that no longer exist). Everything
> below matches the shipped CSS/JS.

---

## 0. Identity at a glance

| Trait | Value |
|---|---|
| **Mode** | Dark-first, with alternating off-white (`#FCFCFC`) and one full-yellow "interrupt" band |
| **Accent** | A single brand yellow `#F2B705` — used surgically, never as body text |
| **Fonts** | IBM Plex Sans (headings) · Inter (body), via Google Fonts |
| **Grid** | 8-pt spacing scale, `rem`-based type scale |
| **Shape** | 8px radius on controls, 16px on cards/nav/modals |
| **Signature ease** | `cubic-bezier(0.22, 1, 0.36, 1)` (a spring-like ease-out) — used on nav, carousels, dials |
| **Motifs** | invert-on-hover cards · drifting dot mesh · orbiting labels · canvas "molecular globe" · rotating headline · redacted client marquee |
| **Stack** | Pure HTML/CSS/JS. No build step. Icons via Iconify CDN. Forms via Netlify. |

---

## 1. File layout

```
css/
  tokens.css       ← all design tokens (CSS custom properties). The re-skin knob.
  base.css         ← reset, element typography, layout primitives, utilities
  components.css   ← every reusable component + section pattern + animation CSS
js/
  animations.js    ← all interactions (nav, carousels, tabs, globe, forms, modal)
  hero-globe.js    ← the bespoke spinning Americas globe (optional; needs geojson)
assets/
  geo/world.geojson  ← country outlines for hero-globe.js
  images/logo-Bn.svg ← the ByteNana logo mark (replace with your own)
```

**Load order** (in `<head>` then before `</body>`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/tokens.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/components.css">
...
<script src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"></script>
<script src="js/hero-globe.js" defer></script>   <!-- only if you use the hero globe -->
<script src="js/animations.js"></script>
```

---

## 2. Color tokens

| Token | Hex / value | Role |
|---|---|---|
| `--color-primary` | `#F2B705` | Brand yellow — CTAs, accents, highlights |
| `--color-primary-dark` | `#D4A004` | Primary button hover |
| `--color-primary-light` | `#F5C84A` | Light tint, sparing |
| `--color-primary-glow` | `rgba(242,183,5,.15)` | Focus ring fill |
| `--color-bg` | `#0F1112` | Page base |
| `--color-surface` | `#161A1C` | Elevated surface, navbar |
| `--color-surface-2` | `#1E2325` | Cards, inputs |
| `--color-surface-3` | `#252A2D` | Deeper elevation |
| `--color-light` | `#FCFCFC` | Off-white inverted-section background |
| `--color-text` | `#FCFCFC` | Primary text |
| `--color-text-muted` | `rgba(252,252,252,.55)` | Body copy |
| `--color-text-dim` | `rgba(252,252,252,.35)` | Placeholders, legal, labels |
| `--color-border` | `rgba(252,252,252,.08)` | Card borders, dividers |
| `--color-border-hover` | `rgba(242,183,5,.35)` | Card border on hover |
| `--on-light-*` | — | Dark-on-light equivalents for `.section--light` |

**Usage rules**
- Yellow is reserved for: CTAs, the full-yellow band, star ratings, stat numbers, the
  `.logo-nana` wordmark half, accents, and hover-invert fills. **Never** yellow body text
  on dark — it only passes AA at large sizes.
- Surface layers go `bg → surface → surface-2 → surface-3` (darkest → lightest). Don't skip.

---

## 3. Typography

- **Headings:** `--font-heading` = IBM Plex Sans. Weights 700 (h2–h4), 800 (h1, logo, big numbers).
- **Body:** `--font-body` = Inter. 400 body, 500 nav/labels, 600 buttons/bold.
- `<em>` is repurposed as an **inline yellow highlight** (not italic).

Type scale (`rem`): `--text-xs` 12 · `sm` 14 · `base` 16 · `lg` 18 · `xl` 20 · `2xl` 24 ·
`3xl` 30 · `4xl` 36 · `5xl` 48 · `6xl` 60.

Headings scale up responsively (set in `base.css`): h1 36→48→60, h2 30→36 across the
768 / 1024 breakpoints.

---

## 4. Spacing, radius, shadow, motion

- **Spacing** — 8-pt grid: `--space-1`..`--space-32` (4px → 128px). Default section padding `--space-24` (96px).
- **Radius** — `--radius-sm` 4 · `--radius` 8 (controls) · `--radius-lg` 16 (cards/nav/modal) · `--radius-xl` 24.
- **Shadow** — `--shadow-sm/md/lg` (dark elevation) · `--shadow-primary` (yellow button glow).
- **Motion** — `--ease-out` (signature), `--t-fast` .2s · `--t-base` .25s · `--t-slow` .6s. All animations gate on `prefers-reduced-motion`.

---

## 5. Layout primitives

| Class | Purpose |
|---|---|
| `.container` | Max-width `1200px`, centered, `--space-6` side padding |
| `section` | `--space-24` vertical padding by default |
| `.eyebrow` | Yellow uppercase kicker above a heading |
| `.section-label` | Dim, quiet uppercase section index |
| `.section-intro` | 18px muted lead paragraph, max 660px |

**Breakpoints:** Mobile (base, 1-col) · 768px tablet (hamburger→nav, 2-col grids) ·
1024px desktop (3–4-col grids, type scales up) · 1280px wide (4-col).

---

## 6. The light / brand section modifier (most important reuse pattern)

The page alternates dark ↔ off-white ↔ yellow. Rather than per-section overrides, this kit
**generalizes that into two modifier classes** you can drop on any `<section>`:

```html
<section class="section--light"> ... </section>   <!-- off-white bg, dark text, light cards -->
<section class="section--brand"> ... </section>    <!-- full-yellow interrupt band -->
```

`.section--light` automatically flips `.section-label`, headings, `.section-intro`, `p`,
`.card`, and `.btn-secondary` to their dark-on-light variants.

---

## 7. Components (in `components.css`)

| Component | Classes | Notes |
|---|---|---|
| **Buttons** | `.btn` + `.btn-primary` / `.btn-secondary`, mods `.btn-sm` `.btn-full` | Yellow fill / bordered ghost |
| **Floating navbar** | `#navbar`, `.navbar-inner`, `.nav-links`, `.logo` | Centered pill that, on scroll, slides off-screen left into a ~56px edge tab; click toggle to re-expand |
| **Mobile menu** | `.menu-toggle`, `.mobile-menu` | Detached dropdown under the pill |
| **Card (base)** | `.card`, `.card-grid` (+ `--2-4` / `--3`) | `#161A1C` (`--color-surface` — all dark cards share this), border, radius-lg, border-on-hover |
| **Invert-on-hover card** | `.card.card--invert` | Flips to solid yellow w/ dark content + lift. *Signature.* |
| **Lift card** | `.card--lift` | Border + translateY on hover |
| **Quote card** | `.card--quote` | Left yellow border, italic |
| **Flip card** | `.flip-card` > `.flip-inner` > `.flip-face.flip-front` / `.flip-back` | 3D rotateY; logo whitened on the back |
| **Mesh background** | `.section-mesh` | Drifting dot grid behind content |
| **Trust bar** | `.trust-bar` (+ `--dark`) with `.trust-stat` / `.trust-rating` | Yellow stat strip w/ dividers |
| **Redacted marquee** | `.trust-marquee` > `.trust-track` > `.trust-chip` | Blurred client names → "Top Secret" on hover; infinite scroll |
| **Tabbed orbit** | `.stack-tablist`/`.stack-tab` + `.stack-orbit`/`.orbit__ring`/`.orbit__slot`(`--a`)/`.orbit__label` | Labels orbit a center icon, counter-spun to stay upright |
| **Step carousel** | `.steps-carousel` (+ `--slide`) w/ `.steps-track`/`.step`/`.steps-dots`/`.steps-dot` | One card at a time; 3D-flip or horizontal-slide; auto-advance + swipe |
| **Dial** | `.pain-dial` (+ `--horizontal`) w/ `.dial-track`/`.dial-step`/`.dial-thumb`/`.dial-card` | Clickable index reveals one card; sliding thumb |
| **Pricing** | `.pricing-grid`/`.pricing-card` (+ `--featured`) | Featured middle card in yellow |
| **Value / cost comparison** | `.section-value` > `.value-prices` (`.value-price` + `.value-price--win`) then `.value-strip` (`.value-item` w/ `__head`/`__sub` + `.value-strip__btn`) | Priced cards (one white card w/ drifting dot mesh as the winner) above a dark strip of benefit items + a yellow CTA. See §7.1 for markup. *Signature.* |
| **Numbered steps** | `.steps`/`.step`/`.step-number` | Static big-number process list |
| **Forms** | `.contact-form`/`.form-group`/`.form-microcopy` | Surface inputs, yellow focus ring |
| **Molecular globe** | `.cta-hub[data-globe]` > `canvas.cta-hub__links` + `.hub-node[data-lon][data-lat]` | Icon nodes on an invisible spinning sphere, canvas bond lines |
| **Tech-stack molecule** | `.steps-carousel--stack` slides, each w/ `.stack-card__text` (`.stack-cat` + `.stack-desc` + `.tech-list`) and `.tech-hub.cta-hub[data-tech-hub]` > `canvas.cta-hub__links` + `.hub-node`(`--center`) | Per-category slide: floating "molecule" of tech-logo nodes auto-laid-out (category icon left, tools fanned right), canvas bonds. No coordinates needed. See §7.2. *Signature.* |
| **Hero globe** | `.hero-globe` > `canvas.hero-map` | See §8 |
| **Booking modal** | `.booking-modal` + `.booking-form`; triggers use `.js-book` | Name/email gate → external calendar |
| **Footer** | `#footer`/`.footer-inner`/`.footer-brand` | Light footer |

### 7.1 Value / cost comparison section (copy-paste)
Three priced cards (dark / white-highlight / dark) above a dark strip of benefit
head+sub items and a yellow CTA. Icons via Iconify. The `--win` card is white with a
drifting dot mesh; the other cards are `#161A1C`. Fully responsive (3-up ≥768px, stacked
below; strip inline on desktop, stacked+centered on mobile) and honors reduced-motion.

```html
<section id="value" class="section-value">
  <div class="container">
    <h2 style="text-align:center;max-width:18ch;margin-inline:auto">Senior US calibre. Half the cost.</h2>
    <p class="section-intro" style="text-align:center;max-width:56ch;margin-inline:auto">Same seniority, full US-hours overlap. You just stop paying for the overhead.</p>

    <div class="value-prices">
      <div class="card value-price">
        <span class="card-icon" aria-hidden="true"><iconify-icon icon="mdi:office-building-outline"></iconify-icon></span>
        <h3 class="value-price__title">US senior hire</h3>
        <p class="value-price__amount">~$195k<span>/yr</span></p>
        <p class="value-price__note">salary + benefits + tax + recruiter</p>
      </div>
      <div class="card value-price value-price--win">
        <span class="card-icon" aria-hidden="true"><iconify-icon icon="mdi:rocket-launch-outline"></iconify-icon></span>
        <h3 class="value-price__title">ByteNana senior</h3>
        <p class="value-price__amount">~$100k<span>/yr</span></p>
        <p class="value-price__note">$50–60/hr · architect-reviewed</p>
      </div>
      <div class="card value-price">
        <span class="card-icon" aria-hidden="true"><iconify-icon icon="mdi:cash-multiple"></iconify-icon></span>
        <h3 class="value-price__title">Same team. Half the cost.</h3>
        <p class="value-price__amount">~$90k<span> saved</span></p>
        <p class="value-price__note">per engineer, per year.</p>
      </div>
    </div>

    <div class="value-strip">
      <div class="value-item">
        <p class="value-item__head">No US overhead</p>
        <p class="value-item__sub">Pay for engineering, not benefits and a recruiter's cut.</p>
      </div>
      <div class="value-item">
        <p class="value-item__head">Cheaper, not cheap</p>
        <p class="value-item__sub">Same vetting bar. The savings are geography, not a lower standard.</p>
      </div>
      <a href="#book" class="btn value-strip__btn js-book">Book a call →</a>
    </div>
  </div>
</section>
```

### 7.2 Tech-stack molecular hub (recipe)
A carousel where each slide is a tech category: on the left a title + short blurb +
pill chips, on the right a floating **"molecule"** — the category icon fixed at left with
the tool logos fanned out to the right, gently drifting, joined by canvas bond lines.

**How it works**
- `[data-tech-hub]` (module in `animations.js`) reads a hub's `.hub-node` children and
  **auto-positions** them — `.hub-node--center` is the category icon (pinned left); the rest
  fan right in a zig-zag. **No `data-lon`/`data-lat` needed** (that's only the sphere globe).
- Wrap the whole thing in `.section--light`: the stack cards stay dark (`#161A1C`), and the
  `.section--light .steps-carousel--stack` overrides restore the yellow bonds + dark node chips.
- The base `.steps-carousel` JS handles slide/swipe/auto-advance/dots (one dot per slide).
- Optional per hub: `style="--bond: 242,183,5"` sets the bond-line RGB.
- Requires the Iconify script. Uses `simple-icons:*` for brand logos, `mdi:*` for generic.

**To add a category:** copy one `.step`, change the title/blurb/chips, swap the center icon,
and list one `.hub-node` per tool. Add a matching `.steps-dot`.

```html
<section id="tech-stack" class="section-techstack section--light">
  <div class="container">
    <h2>Our tech stack</h2>
    <div class="steps steps-carousel steps-carousel--slide steps-carousel--stack" id="stack-carousel">
      <div class="steps-viewport"><div class="steps-track">

        <div class="step is-active" role="group" aria-roledescription="slide" aria-label="AI">
          <div class="stack-card__text">
            <h3 class="stack-cat"><iconify-icon icon="mdi:brain" style="color:var(--color-primary)"></iconify-icon>AI</h3>
            <p class="stack-desc">Production-grade AI — RAG pipelines, LLM agents, and automation.</p>
            <ul class="tech-list"><li>OpenAI / GPT-4</li><li>LangChain</li><li>RAG</li><li>n8n</li></ul>
          </div>
          <div class="tech-hub cta-hub" data-tech-hub>
            <canvas class="cta-hub__links" aria-hidden="true"></canvas>
            <span class="hub-node hub-node--center"><span class="hub-node__depth"><span class="hub-node__hover"><span class="hub-node__dot"><iconify-icon icon="mdi:brain"></iconify-icon></span></span></span></span>
            <span class="hub-node"><span class="hub-node__depth"><span class="hub-node__hover"><span class="hub-node__dot"><iconify-icon icon="simple-icons:openai"></iconify-icon></span></span></span></span>
            <span class="hub-node"><span class="hub-node__depth"><span class="hub-node__hover"><span class="hub-node__dot"><iconify-icon icon="simple-icons:langchain"></iconify-icon></span></span></span></span>
            <span class="hub-node"><span class="hub-node__depth"><span class="hub-node__hover"><span class="hub-node__dot"><iconify-icon icon="simple-icons:n8n"></iconify-icon></span></span></span></span>
          </div>
        </div>

        <!-- duplicate .step (without is-active) per category: Frontend, Backend, Data, Cloud, Mobile … -->

      </div></div>
      <div class="steps-nav"><div class="steps-dots" role="tablist" aria-label="Tech categories">
        <button class="steps-dot is-active" type="button" data-step="0" aria-label="AI"></button>
        <!-- one .steps-dot per slide -->
      </div></div>
    </div>
  </div>
</section>
```

### Line-icon helper
`.case-icon` paints any inline-SVG via CSS mask. Set `--icon` to a `url("data:image/svg+xml,...")`:
```html
<span class="case-icon" style="--icon:url('data:image/svg+xml,...')"></span>
```

---

## 8. JavaScript interactions (in `animations.js`)

All modules are self-contained IIFEs that no-op when their markup is absent — safe to load
on every page. Hooks:

| Module | Trigger / markup | Behavior |
|---|---|---|
| **A. Navbar** | `#navbar` (+ optional `[data-nav-collapse-anchor]`) | Scroll state, collapse-to-tab, mobile menu, click-outside close |
| **B. Rotating headline** | `.rotator > .rotator__list > .rotator__item`×N (+ a clone of item 1) | Vertical slide between phrases every ~2.8s; heights auto-locked |
| **C. Tabbed orbit** | `.stack-tab` + `.stack-panel` | Tab select, arrow-key nav, fade-in |
| **D. Step carousel** | `.steps-carousel` | Dots, swipe, auto-advance (4.5s), pause on hover/focus |
| **E. Molecular globe** | `[data-globe]` | Projects nodes onto a spinning sphere; draws bonds. Per-hub `data-radius`, `data-spin`, `data-edges`, `--bond` |
| **F. Forms + modal** | `#contact-form`, `.js-book`, `#booking-modal` | Validation, Netlify POST, modal gate. Set calendar URL via `data-booking-url` on the modal |

**hero-globe.js** is separate and bespoke: a rotating orthographic Americas globe with a
dot-sphere, country outlines (Brazil highlighted), and animated "data arrows" from Brazil to
US cities. Drag to spin. Needs `.hero-map` canvas + `assets/geo/world.geojson`. Tunable
constants sit at the top of the file. It's the most brand-specific module — keep it for a
ByteNana-adjacent site, or drop it for an unrelated one.

---

## 9. Re-skinning for a new site (checklist)

1. **Copy** `css/`, `js/`, `assets/` into the new project.
2. **Edit `tokens.css` only** to rebrand: change `--color-primary`, the surface ramp, and the
   two font tokens. Everything cascades.
3. Swap `assets/images/logo-Bn.svg` and update the `.logo` markup wordmark.
4. Build sections from the patterns in §6–7. Use `.section--light` / `.section--brand` to set
   the dark↔light↔yellow rhythm.
5. Wire forms: point the Netlify POST in `animations.js` module F at your endpoint, and set the
   booking modal's `data-booking-url`.
6. Decide on the globes (§8) — keep, or delete `hero-globe.js` + the `data-globe` hub.
7. Update the Google Fonts `<link>` if you changed the font tokens.

See `starter.html` for a minimal page that wires the whole system together.

---

## 10. Accessibility & performance notes carried over

- Every animation respects `prefers-reduced-motion: reduce`.
- Focus-visible outlines on buttons, tabs, expanders.
- `scroll-padding-top` keeps anchor targets clear of the fixed nav.
- Canvas elements are `aria-hidden`; tab orbit uses `role="tab"`/`tabpanel`.
- `overflow-x: hidden` on `body` guards the off-screen-sliding navbar.
- Heavy bits to watch: two `requestAnimationFrame` globes and the 248KB geojson. Drop the hero
  globe if the new site doesn't need it.
```
