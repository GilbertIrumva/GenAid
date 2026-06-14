# UI Review — Generation Aid

_A heuristic review of the current React client against modern web criteria: visual design, interaction, accessibility (WCAG 2.2 AA), performance, content design, conversion, and brand consistency._

---

## 1. Scorecard

| Area | Score | Notes |
|---|---|---|
| Visual design system | 7 / 10 | Clean tokens, good type pairing, weak imagery. |
| Layout & rhythm | 5 / 10 | Same pill-heading-grid pattern repeats across every section. |
| Typography | 7 / 10 | Plus Jakarta + Fraunces reads premium; needs tighter scale on mobile. |
| Color & contrast | 6 / 10 | Brand palette is strong; muted text fails AA at small sizes. |
| Interaction & motion | 4 / 10 | Framer Motion is installed but unused. No micro-interactions. |
| Accessibility | 5 / 10 | Skip link + ARIA added; focus styles, labels, contrast still gaps. |
| Performance | 4 / 10 | Hot-linked images, JPG logo, no lazy routes, no `srcset`. |
| Mobile UX | 6 / 10 | Layouts respond, but no sticky donate, no menu animation. |
| Conversion (donate / contact) | 5 / 10 | Donate bounces off-site; no urgency, no proof per cause. |
| Content design | 6 / 10 | Strong messaging, but every section sounds the same. |
| **Overall** | **5.5 / 10** | Solid skeleton; needs an art-direction + polish pass. |

---

## 2. What is working

- **Design tokens are well-chosen.** [client/src/index.css](../client/src/index.css) defines a coherent blue ramp (`primary-50…900`), a warm amber accent reserved for donate CTAs, and semantic neutrals (`ink`, `muted`, `surface`, `bg`, `line`). This is the right foundation.
- **Type pairing** — Plus Jakarta Sans (UI) + Fraunces (display) reads modern and premium.
- **Hero pattern** — pill → H1 with accent span → subhead → dual CTA + stat overlay is a proven NGO conversion shape.
- **Card system** — `rounded-2xl border border-line bg-surface shadow-sm` with hover lift on `border-primary-300` is consistent across causes, team, stories, videos. Good visual language.
- **CTA semantics are correct** — primary blue for navigation actions, amber **only** for donate. Don’t break this rule.
- **Sticky navbar with backdrop blur** feels current and works at all breakpoints.
- **Skip-to-content link, real-route navigation, `aria-expanded`** are now in place ([Navbar.tsx](../client/src/components/Navbar.tsx)).

---

## 3. Critical issues (fix first)

### 3.1 Hero image is a third-party hotlink
[Home.tsx](../client/src/pages/Home.tsx#L155) loads the hero from `generationaid.org/wp-content/uploads/…` and other sections pull from `images.unsplash.com`. Risks:
- Slow first paint (no CDN, no responsive sizes).
- Licensing exposure on Unsplash photos used commercially.
- Breaks if the WordPress site changes paths.

**Fix:** self-host 3-5 hero photos as AVIF/WebP, with `srcset` for 480 / 768 / 1280 / 1920 widths. Preload the LCP image in `index.html`.

### 3.2 `logo.jpg` instead of SVG
[client/public/logo.jpg](../client/public/logo.jpg) is rasterized — fuzzy on retina, 5-50× the byte cost of an SVG export. Replace with `logo.svg` and update the navbar + favicon link.

### 3.3 No keyboard focus styles
Nothing in `index.css` sets `:focus-visible`. Keyboard users currently lose their place every time they Tab.

```css
*:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### 3.4 Color contrast at small sizes
`--color-muted: #5b6776` on `--color-bg: #f7fbff` is 4.95:1 — passes WCAG AA for normal text but **fails** for text smaller than 14 px. Audit all `text-xs text-muted` usages (placeholder labels, footer fine print, video upload helper text) and either raise to `text-sm` or darken to `#475260`.

### 3.5 No loading skeletons, no toast system
Every async action just toggles button text. Install `sonner` (3 kB), wire it into [main.tsx](../client/src/main.tsx), and replace inline `setContactState("sent")` UI in [Home.tsx](../client/src/pages/Home.tsx) with toast notifications. Add skeleton cards for the video grid and blog grid while they load.

### 3.6 No donate CTA on mobile after scroll
On a 360 px viewport, once the user scrolls past the hero, the donate button is gone until they reach the footer. For an NGO this is the single most valuable always-visible element. Add a slim bottom bar:

```tsx
<div className="fixed bottom-0 inset-x-0 z-30 border-t border-line bg-surface/95 backdrop-blur p-3 lg:hidden">
  <a href={SITE.donateUrl} className="block w-full rounded-md bg-accent-500 px-4 py-3 text-center font-semibold text-ink">
    Donate now
  </a>
</div>
```

---

## 4. High-impact polish

### 4.1 Section rhythm is monotone
Every section on Home uses the same `pill → centered H2 → centered subhead → 3-up grid`. After three repetitions, the page reads as one long template. Break the pattern:
- One section as **image-left, text-right** (already in hero — repeat below).
- One section as a **full-bleed quote** (large Fraunces text on a primary-900 background).
- One section as a **horizontal KPI strip** with no cards, just numbers on the background.
- One section as a **timeline** for the "Since 2019…" story.

### 4.2 Add real micro-interactions
Framer Motion is already in the bundle but unused. Cheap wins:
- Cards: `whileHover={{ y: -4 }}` instead of pure CSS hover.
- Buttons: `whileTap={{ scale: 0.97 }}`.
- Stats: count-up animation when scrolled into view (`useInView`).
- Mobile menu: slide-down with `AnimatePresence`.

### 4.3 Testimonials need trust signals
The current testimonial cards ([Home.tsx](../client/src/pages/Home.tsx) `testimonials` section) are quote + name + role. Donors trust faces and affiliations. Add:
- Circular avatar (with `SmartImage` fallback).
- Organisation logo to the right of the name.
- Optional star rating or "Verified graduate" badge.

### 4.4 Causes need urgency
Cause cards show `$raised / $goal` with a static bar. Add:
- **Days remaining** ("Closes in 12 days").
- **Recent donor count** ("47 donors this month").
- **Smallest-impact line** ("$25 funds one student for a week").

### 4.5 Typography scale on mobile
`text-4xl sm:text-5xl lg:text-6xl` is correct for the hero, but body copy across the site stays at `text-lg` on mobile — too large for narrow screens. Use `text-base sm:text-lg` for body, `text-sm sm:text-base` for card descriptions.

---

## 5. Accessibility punch-list (WCAG 2.2 AA)

| Item | Where | Action |
|---|---|---|
| Visible focus ring | global | Add `:focus-visible` rules in [index.css](../client/src/index.css). |
| Form labels not associated | [Home.tsx](../client/src/pages/Home.tsx) contact + newsletter, [Login.tsx](../client/src/pages/Login.tsx) | Use `htmlFor` + `id`, or wrap input directly. |
| Progress bars | [Home.tsx](../client/src/pages/Home.tsx) cause cards | Add `role="progressbar"` + `aria-valuenow/min/max/label`. |
| Decorative SVGs missing `aria-hidden` | navbar, quotes | Add `aria-hidden="true"` so screen readers skip them. |
| Alt text quality | Unsplash images use generic alt | Rewrite alts to describe content & context. |
| Heading order | check each page | Make sure each page has exactly one `<h1>`. |
| Color-only cues | active nav link, validation errors | Pair color with icon or weight change. |
| Mobile menu trap | mobile nav | Focus first link when opened, return focus to toggle on close, close on Escape. |
| Reduced motion | global | Wrap all Framer Motion variants behind `prefers-reduced-motion`. |
| Language switching | when i18n lands | Update `<html lang>` on locale change. |

---

## 6. Performance punch-list (Lighthouse > 90 target)

| Item | Estimated win | How |
|---|---|---|
| Self-host + optimize hero images | LCP −1.5 s | AVIF / WebP, `srcset`, `loading="eager"` only on the hero. |
| Convert logo to SVG | Bytes −30 kB | Already discussed. |
| Lazy-load routes | TBT −200 ms | `React.lazy` for `AdminVideos`, `BlogPost`, `StoryDetail`, etc. |
| Preconnect to API origin | TTFB −80 ms | `<link rel="preconnect" href="https://api.generationaid.org">`. |
| Preload hero image | LCP −300 ms | `<link rel="preload" as="image" imagesrcset="…">`. |
| Inline critical CSS | FCP −150 ms | Vite + `vite-plugin-html` (only if Lighthouse demands it). |
| Cache uploads aggressively | repeat-view TTFB ~0 | Already `maxAge: "7d"` — bump to `30d` once filenames are content-hashed. |
| Avoid `preload` of all fonts | FCP −100 ms | Drop the variable-axis Fraunces if only one weight is used. |

---

## 7. Conversion punch-list

- **Donate flow currently bounces off-site to GlobalGiving.** This is the biggest leak. Embed Donorbox / Stripe Checkout in a modal so users never leave.
- **No urgency or progress momentum.** Show "$X raised this month" near every donate button.
- **No suggested amounts.** Pre-select $25 / $50 / $100 / Custom — proven to lift average gift by 20–40 %.
- **Newsletter signup is fake** ([Home.tsx](../client/src/pages/Home.tsx) — submits as a contact message). Wire to Resend Audiences / Mailchimp.
- **Contact form has no anti-spam.** Add Cloudflare Turnstile.
- **No exit-intent / scroll-depth donate prompt.** Add a one-shot modal at 70 % scroll on Home.
- **Press / partner logos missing.** Logos of UNHCR, RefugePoint, Salesforce.org etc. dramatically raise donor trust. Add a row above the footer.

---

## 8. Brand consistency check

- **Donate = amber.** Verify no other amber buttons exist site-wide. (Currently safe.)
- **Primary = blue.** Currently obeyed. Don’t use blue for negative actions.
- **Cards = `rounded-2xl border-line shadow-sm`.** Currently consistent — keep enforcing.
- **Icons.** Mixed sources (raw SVG paths in [Navbar.tsx](../client/src/components/Navbar.tsx), social-link SVGs in [SocialLinks.tsx](../client/src/components/SocialLinks.tsx)). Standardise on **lucide-react** for a single visual family.
- **Imagery.** Currently mixes Unsplash stock (corporate, generic) with on-the-ground photos. Drop all stock photography — use only Kakuma photos. Stock undermines authenticity for a refugee-led brand.

---

## 9. Suggested execution order

1. Replace hero / logo / Unsplash imagery (biggest perceived quality jump). _0.5 day_
2. Add `:focus-visible`, fix small-text contrast, run axe-core. _0.5 day_
3. Install `sonner` + skeleton states + sticky mobile donate bar. _0.5 day_
4. Lazy-route the admin and detail pages. _0.5 day_
5. Wire Framer Motion micro-interactions (cards, stats count-up, mobile menu). _1 day_
6. Break section monotony on Home (full-bleed quote + horizontal KPI strip + timeline). _1 day_
7. Add testimonial avatars + org logos + partner logo strip. _0.5 day_
8. Replace external donate with embedded Donorbox / Stripe + suggested amounts. _1 day_
9. Real newsletter integration + Turnstile on contact. _0.5 day_

Total: ~6 dev days for a complete UI uplift, no framework rewrite needed.

---

## 10. Out of scope (intentional)

- Dark mode — tokens are ready, but defer until launch traffic data shows demand.
- PWA / offline — defer until content stabilises.
- Full i18n — defer until English copy is finalised.
- SSR migration — only revisit if SEO results disappoint after the per-page meta work just landed.
