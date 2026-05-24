---
name: MakinoWorks
colors:
  accent: "#c4a265"
  accent-hover: "#a8853a"
  accent-dark: "#d4a832"
  accent-hover-dark: "#e5c25c"
  bg: "#faf6ef"
  bg-secondary: "#f0ebe0"
  bg-tertiary: "#e8e4dd"
  bg-dark: "#0c0b09"
  bg-secondary-dark: "#1a1816"
  bg-tertiary-dark: "#2a2622"
  fg: "#1a1816"
  fg-secondary: "#544c42"
  fg-dark: "#f0ece4"
  fg-secondary-dark: "#c4b99e"
  muted: "#877b60"
  border: "#ddd5c4"
  border-strong: "#c4b99e"
  border-dark: "#3d3832"
  border-strong-dark: "#544c42"
  grain-opacity-light: 0.03
  grain-opacity-dark: 0.04
typography:
  display:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(3.5rem, 12vw, 10rem)"
    fontWeight: 300
    lineHeight: 0.9
    letterSpacing: "-0.04em"
    textTransform: "uppercase"
  heading-1:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  heading-2:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  heading-3:
    fontFamily: "Cormorant Garamond"
    fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.2
  body-lg:
    fontFamily: "Outfit"
    fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Outfit"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Mono"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "0.12em"
    textTransform: "uppercase"
spacing:
  base: "8px"
  nav-height: "4rem"
  content-max: "1400px"
  content-padding: "clamp(1.5rem, 4vw, 3rem)"
  scale:
    - "0.25rem"
    - "0.5rem"
    - "0.75rem"
    - "1rem"
    - "1.25rem"
    - "1.5rem"
    - "2rem"
    - "2.5rem"
    - "3rem"
    - "4rem"
    - "5rem"
    - "6rem"
    - "8rem"
    - "10rem"
    - "12rem"
    - "14rem"
    - "16rem"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
shadows:
  sm: "0 1px 3px rgba(12, 11, 9, 0.06)"
  md: "0 4px 12px rgba(12, 11, 9, 0.08)"
  lg: "0 8px 30px rgba(12, 11, 9, 0.12)"
  xl: "0 16px 50px rgba(12, 11, 9, 0.16)"
  sm-dark: "0 1px 3px rgba(0, 0, 0, 0.3)"
  md-dark: "0 4px 12px rgba(0, 0, 0, 0.4)"
  lg-dark: "0 8px 30px rgba(0, 0, 0, 0.5)"
  xl-dark: "0 16px 50px rgba(0, 0, 0, 0.6)"
easing:
  out-expo: "cubic-bezier(0.16, 1, 0.3, 1)"
  out-quart: "cubic-bezier(0.25, 1, 0.5, 1)"
  in-out: "cubic-bezier(0.65, 0, 0.35, 1)"
---

# MakinoWorks Design System

## Overview

MakinoWorks is a personal portfolio website for 牧野悠 (Makino Haruka), a creative designer. The design philosophy centers on **「間 (Ma)」** — the Japanese aesthetic of negative space, pause, and interval.

The visual language combines **editorial typography** with **warm Japanese minimalism**. Think Kinfolk magazine meets traditional Japanese craft: generous whitespace, sharp edges, a single accent color (Kintsugi gold), and a subtle grain texture that evokes handmade paper.

The site supports both **light** and **dark** modes, with the dark theme drawing from ink-wash painting — deep blacks, warm off-whites, and the same gold accent glowing like a lantern in the dark.

## Colors

### Accent — Kintsugi Gold
- **Light mode** (`#c4a265`): The primary accent color, inspired by Kintsugi (金繕い) gold repair. Used sparingly for the most important actions, links on hover, and decorative punctuation.
- **Dark mode** (`#d4a832`): Warmer and brighter in dark mode to maintain visibility against deep black backgrounds.
- **Hover** (`#a8853a` light / `#e5c25c` dark): Interactive elements on hover.

### Backgrounds
- **Primary bg** (`#faf6ef` light / `#0c0b09` dark): Page backgrounds. Light mode is a warm cream; dark mode is near-black with a hint of warmth.
- **Secondary bg** (`#f0ebe0` light / `#1a1816` dark): Card backgrounds, section alternates.
- **Tertiary bg** (`#e8e4dd` light / `#2a2622` dark): Subtle differentiation within cards or nested elements.

### Text
- **Primary text** (`#1a1816` light / `#f0ece4` dark): Headlines, body text.
- **Secondary text** (`#544c42` light / `#c4b99e` dark): Descriptions, captions, supporting copy.
- **Muted** (`#877b60`): Labels, metadata, timestamps. Remains the same in both modes.

### Borders
- **Default border** (`#ddd5c4` light / `#3d3832` dark): Dividers, card outlines, input borders.
- **Strong border** (`#c4b99e` light / `#544c42` dark): Emphasized borders, active states.

### Special
- **Selection**: `background: var(--accent)`, `color: var(--bg)` — accent gold with inverse text.
- **Grain overlay**: SVG noise texture at `opacity: 0.03` (light) / `0.04` (dark), animated with an 8-second displacement loop.

## Typography

### Font Families
- **Serif / Display**: Cormorant Garamond — Used for all headings and display text. Light weight (300) for hero, regular (400) for section titles. Evokes editorial elegance.
- **Sans / Body**: Outfit — Used for body text, descriptions, and UI labels. Clean, geometric, highly legible.
- **Mono / Labels**: Space Mono — Used exclusively for `.label` class: navigation links, tags, section overlines. Uppercase, wide letter-spacing (`0.12em`), small size (`0.7rem`).

### Type Scale

| Token | Font | Size | Weight | Line Height | Usage |
|-------|------|------|--------|-------------|-------|
| `display` | Cormorant | `clamp(3.5rem, 12vw, 10rem)` | 300 | 0.9 | Hero name, massive statements |
| `heading-1` | Cormorant | `clamp(2.5rem, 6vw, 5rem)` | 400 | 1.05 | Section titles |
| `heading-2` | Cormorant | `clamp(2rem, 4vw, 3.5rem)` | 400 | 1.1 | Sub-section titles |
| `heading-3` | Cormorant | `clamp(1.25rem, 2.5vw, 1.75rem)` | 400 | 1.2 | Card titles, small headers |
| `body-lg` | Outfit | `clamp(1.1rem, 1.5vw, 1.25rem)` | 400 | 1.7 | Hero bio, introductions |
| `body` | Outfit | `1rem` | 400 | 1.6 | General body text |
| `label` | Space Mono | `0.7rem` | 400 | 1.35 | Nav links, overlines, tags |

### Typographic Patterns
- **Headlines** often end with an accent-colored period: `Title<span style="color: var(--accent)">.</span>`
- **Hero text** uses `text-transform: uppercase` for the display heading.
- **Chinese text** (牧野悠) appears in the hero at display size, mixing Japanese/Chinese characters with Latin typography.

## Spacing

The spacing system is based on an **8px grid**:

```
--sp-1: 0.25rem (4px)     --sp-8: 2rem (32px)
--sp-2: 0.5rem (8px)      --sp-10: 2.5rem (40px)
--sp-4: 1rem (16px)       --sp-16: 4rem (64px)
--sp-6: 1.5rem (24px)     --sp-24: 6rem (96px)
--sp-12: 3rem (48px)      --sp-64: 16rem (256px)
```

### Layout Constants
- **Navbar height**: `4rem`
- **Content max-width**: `1400px`
- **Content padding**: `clamp(1.5rem, 4vw, 3rem)` — responsive side padding.

## Components

### Navbar
- **Position**: Fixed top, full width, `z-index: 50`.
- **Default state**: Transparent background, no border.
- **Scrolled state** (> 20px): `backdrop-filter: blur(20px) saturate(180%)` + `rgba(var(--bg-rgb), 0.85)` background + `1px solid var(--border)` bottom border. Transition: `0.4s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Desktop**: Horizontal nav links (Experience / Skills / Works / Contact) + ThemeToggle.
- **Mobile**: Hamburger menu button. Full-screen overlay menu with centered vertical links.
- **Links**: Space Mono label style. Hover color changes to `var(--accent)`.

### Footer
- **Layout**: Two-column grid on desktop (brand + navigation / connect + socials), single column on mobile.
- **Content**: Brand statement, navigation links, social links (7 platforms), copyright line.
- **Tagline**: 「間 — The Art of Space」at the bottom.

### Button
- Managed by **class-variance-authority** (CVA) with 6 variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`.
- Supports `asChild` via Radix UI Slot.
- **Note**: In practice, CTAs on the site are often implemented as inline `<Link>` or `<a>` elements rather than using this Button component.

### WorkCard
- **Shape**: Square (`aspect-ratio: 1/1`), zero border-radius.
- **Image**: Cover fill, `filter: saturate(0.85) contrast(1.05)` on all images site-wide.
- **Hover**: Image scales to `1.05`. Bottom gradient overlay (`linear-gradient(transparent, rgba(0,0,0,0.7))`) reveals category badge (top-left) and title with arrow icon.
- **Click**: Opens Lightbox.

### Lightbox
- **Layout**: Full-screen modal, dark overlay with blur.
- **Image**: Centered, `object-fit: contain`, max-height ~85vh.
- **Navigation**: Left/right arrow buttons (circular, hover to `var(--accent)`), loops infinitely. Keyboard: Left/Right arrows + Escape to close.
- **Info bar**: Title + category + counter (e.g., "3 / 12") at bottom.
- **Body scroll**: Locked when open.

### SkillBar
- **Layout**: Skill name on left, level label on right (`level / maxLevel`).
- **Bar**: 3px height, full width. Animated from 0 to target width on scroll-into-view.
- **Color**: `var(--accent)` fill.

### Tools Tag
- **Shape**: Small inline buttons, minimal border, zero or near-zero border-radius.
- **Categories** with distinct colors:
  - **Design**: Gold border/text (`var(--accent)`)
  - **Motion**: Purple border/text
  - **3D**: Teal border/text
  - **Drawing**: Rose border/text
  - **Code**: Blue border/text
- **Hover**: Translates up `-2px`.

## Pages

### Home (`/`)
- **HeroSection**: Full viewport height. Left side: overline label + display heading "牧野悠" + bio paragraph + social icons + dual CTAs ("View Works", "Experience"). Right side: hero photo with decorative offset border (8px shift) and gradient overlay. Bottom: scroll indicator.
- **Entrance animation**: Framer Motion stagger (`0.12s` delay between elements), `y: 30 → 0`, `opacity: 0 → 1`.

### Experience (`/experience`)
- **ExperienceSection**: Vertical timeline on the left (gray line + dots, first dot is accent gold with glow). Each item: period label (gold), title / organization, description, optional image. Alternating or consistent left-aligned layout.
- **Animation**: `whileInView`, staggered by index (`delay: index * 0.08`).

### Skills (`/skills`)
- **SkillsSection**: Title + list of SkillBars.
- **ToolsSection**: Title + flex-wrap grid of tool tags with category colors.

### Works (`/works`)
- **WorksSection**: Title + category filter tabs (all / design / motion / architecture) + responsive grid (`minmax(280px, 1fr)`) + Lightbox integration.
- **Category filtering**: JavaScript state-based filtering, no page reload.

### Contact (`/contact`)
- **AboutSection**: Tagline "Design is Problem Solving" + 4 stat counters (10+ Years, 50+ Projects, 7 Disciplines, ∞ Passion).
- **ContactSection**: Left CTA "Let's Create Together" + description. Right: Email, Location, full social links list.

## Animation & Motion

### Easing
- **Primary**: `cubic-bezier(0.16, 1, 0.3, 1)` — out-expo, used site-wide for entrances and transitions.
- **Secondary**: `cubic-bezier(0.25, 1, 0.5, 1)` — out-quart, for background color transitions.

### Patterns
- **Scroll-triggered entrances**: Almost all sections use `whileInView` + `viewport={{ once: true }}`. Elements enter from `y: 30` or `x: -20` to final position.
- **Stagger**: Hero uses `staggerChildren: 0.12`. Experience uses `delay: index * 0.08`.
- **Navbar scroll**: Smooth transition between transparent and glass-morphism states.
- **Image hover**: `scale(1.05)` on WorkCard images, `0.4s ease`.
- **Grain**: 8-second looping noise displacement animation (`grainShift`).

## Responsive Strategy

- **Desktop**: Full layout as designed. Two-column grids, side-by-side hero.
- **Tablet (< 1024px)**: Grids may collapse. Hero photo shrinks.
- **Mobile (< 768px)**:
  - Hero: Photo moves above text (`order: -1`).
  - Grids: Single column.
  - Navbar: Hamburger menu replaces horizontal nav.
  - Footer: Single column stack.

## Do's and Don'ts

### Do
- **Do** use Cormorant Garamond for all headings and display text. The serif is the soul of the editorial feel.
- **Do** use the gold accent (`#c4a265`) sparingly. It is the Kintsugi repair line — meaningful only because it is rare.
- **Do** maintain generous whitespace. The "間 (Ma)" is not emptiness; it is active space that gives meaning to what surrounds it.
- **Do** apply `filter: saturate(0.85) contrast(1.05)` to all photographs. This creates the muted, editorial tone.
- **Do** use sharp corners (`border-radius: 0`) for cards, images, and containers. The design is architectural, not playful.
- **Do** ensure the grain overlay is visible but subtle (`opacity: 0.03–0.04`). It should be felt, not seen.

### Don't
- **Don't** use border-radius on major containers or images. Rounded corners break the editorial/architectural aesthetic.
- **Don't** introduce additional accent colors beyond the Kintsugi gold. The tools category tags are the only exception.
- **Don't** crowd elements. If a section feels tight, increase the padding or margin rather than shrinking elements.
- **Don't** use bold font weights for Cormorant. The design relies on Light (300) and Regular (400) weights for elegance.
- **Don't** mix rounded and sharp corners in the same view.
- **Don't** forget to test both light and dark modes. The dark mode is not an afterthought; it is an ink-wash painting.
