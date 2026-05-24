# MakinoWorks 現代化重構 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 MakinoWorks 個人網站從 2013 年的 jQuery 靜態 HTML 重構為 Next.js 15 + TypeScript + Tailwind CSS v4 的現代化響應式網站，保留所有有效內容，建立可延伸的架構。

**Architecture:** Next.js 15 App Router (SSG/SSR hybrid)，以 MDX 管理內容資料（Experience、Skills、Tools、Works），React Server Components 為主、Client Components 僅用於互動層（動畫、過濾、導覽）。Framer Motion 處理轉場與滾動動畫。Tailwind CSS v4 統一樣式。

**Tech Stack:** Next.js 15 (App Router) / React 19 / TypeScript / Tailwind CSS v4 / Framer Motion / Lucide React / MDX

---

## File Structure Map

### Files to be created (new site in `src/`)

```
projects/MakinoWorks/
├── package.json                          # Next.js 15 project config
├── tsconfig.json                         # TypeScript config (strict)
├── next.config.ts                        # Next.js config (images, MDX)
├── postcss.config.mjs                    # PostCSS config
├── tailwind.config.ts                    # Tailwind CSS v4 config
├── docs/superpowers/plans/               # This plan
│
├── public/                               # Static assets (images from old site)
│   ├── images/
│   │   ├── hero/                         # main.jpg → hero photo
│   │   ├── works/                        # work-photo-*.jpg, thumb-*.jpg
│   │   ├── logos/                        # client-logo-*.png
│   │   └── legacy/                       # 2012Lumion.jpg etc.
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout (font, metadata, theme provider)
│   │   ├── page.tsx                      # Home page (Hero + sections)
│   │   ├── globals.css                   # Tailwind imports + CSS variables
│   │   └── works/[slug]/
│   │       └── page.tsx                  # Individual work detail page
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                # Fixed top nav + mobile hamburger
│   │   │   ├── Footer.tsx                # Footer with social links
│   │   │   ├── Section.tsx               # Generic section wrapper
│   │   │   └── ThemeToggle.tsx           # Light/dark mode toggle
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx           # Profile intro + photo + social
│   │   │   ├── AboutSection.tsx          # Brief about / intro
│   │   │   ├── ExperienceSection.tsx     # Timeline of experience
│   │   │   ├── SkillsSection.tsx         # Ability/skills visualization
│   │   │   ├── ToolsSection.tsx          # Tools/software grid
│   │   │   ├── WorksSection.tsx          # Portfolio grid + filter + lightbox
│   │   │   ├── TestimonialsSection.tsx   # Client testimonials carousel
│   │   │   └── ClientsSection.tsx        # Client/partner logos
│   │   └── ui/
│   │       ├── Button.tsx                # Reusable button component
│   │       ├── Card.tsx                  # Card wrapper
│   │       ├── TimelineItem.tsx          # Single timeline entry
│   │       ├── SkillBar.tsx              # Skill level indicator
│   │       ├── WorkCard.tsx              # Portfolio item card
│   │       └── Lightbox.tsx              # Image lightbox modal
│   │
│   ├── data/                             # Content as typed data files
│   │   ├── profile.ts                    # Name, title, bio, social links
│   │   ├── experience.ts                 # Array of experience entries
│   │   ├── skills.ts                     # Array of skills with levels
│   │   ├── tools.ts                      # Array of tools with links
│   │   ├── works.ts                      # Array of portfolio items
│   │   ├── testimonials.ts               # Array of testimonials
│   │   └── clients.ts                    # Array of client logos
│   │
│   ├── lib/
│   │   ├── types.ts                      # Shared TypeScript interfaces
│   │   ├── theme.ts                      # Theme config (colors, dark mode)
│   │   └── utils.ts                      # Utility functions (cn, formatDate)
│   │
│   └── styles/
│       └── animations.css                # Framer Motion custom keyframes (if needed)
```

### Files to be modified
- **None** — this is a greenfield rebuild. The old `index.html` and `assets/` stay in the repo root as `legacy/` reference.

### File responsibility summary
| File | Responsibility |
|------|---------------|
| `src/data/*.ts` | All content lives here as typed arrays. Easy to update without touching UI code |
| `src/components/sections/*` | Each maps to one visual section of the page |
| `src/components/ui/*` | Reusable atomic components |
| `src/components/layout/*` | Shell components (nav, footer, theme) |
| `src/app/page.tsx` | Composition root — assembles all sections |
| `src/app/layout.tsx` | Fonts, metadata, providers |

---

## Content Mapping (Old → New)

Extracted from `index.html`:

### Profile
| Field | Old Value | New |
|-------|-----------|-----|
| Name | Makino Haruka | 待確認 |
| Title | Creative Designer | 待確認 |
| Photo | assets/img/main.jpg | → public/images/hero/hero.jpg |
| Social | Facebook, Twitter, G+, LinkedIn, Behance, Flickr, YouTube, Vimeo | 移除 G+；其他待確認是否仍有效 |

### Experience (10 items)
Data spans 2006–2013. **All entries are 10+ years old.** 建議保留結構但標記「歷史資料」，或提供新版。Plan 中先用舊資料填內容。

### Skills (7 items)
Architecture (6/8), Illustration (4/8), MotionGraphic (4/8), WebsiteDesign (2/8), Programing (1/8), Sleeping (4/8), Eating (8/8)

### Tools (11 items)
Photoshop, Illustrator, AfterEffects, Coda2, Rapidweaver, SketchUp, AutoCAD, Lumion, Artlantis, OpenCanvas, ClipPaintStudio

### Works (12 placeholder items)
All labeled "Work Title" with placeholder images. Plan preserves the grid structure; actual content TBD.

### Testimonials
3 testimonial quotes from old site.

### Clients
3 client logos (client-logo-1.png, client-logo-2.png, client-logo-3.png).

---

## Design Decisions

1. **Single-page vs Multi-page:** 舊站是單頁滾動式設計。新版維持單頁 (SPA feel with anchor navigation)，但 Works 項目有獨立 detail 路由 `/works/[slug]`。
2. **Content in code:** 不使用 CMS/資料庫。所有內容在 `src/data/*.ts` 中作為 typed exports。理由：個人網站內容量小，改一次 code 即可，不需要 CMS overhead。
3. **Dark mode:** 使用 `next-themes`，預設跟随系統，可手動切換。
4. **Images:** 使用 Next.js `<Image>` 元件自動優化。舊站圖片遷移至 `public/images/`。
5. **Animations:** Framer Motion for scroll-triggered reveals, section transitions, navbar shrink on scroll.

---

### Task 1: 專案初始化 — Next.js 15 + TypeScript + Tailwind CSS v4

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.eslintrc.json`
- Create: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/lib/types.ts`, `src/lib/utils.ts`

- [ ] **Step 1: Initialize project with package.json**

Create `package.json` in `projects/MakinoWorks/`:

```json
{
  "name": "makinoworks",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "framer-motion": "^12.6.0",
    "lucide-react": "^0.500.0",
    "next-themes": "^0.4.6"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.3.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.8.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create next.config.ts**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create postcss.config.mjs**

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Create tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Primary palette — cold, minimalist (matches Makino Fuyuki vibe)
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Accent: ice blue
        accent: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default config;
```

- [ ] **Step 6: Create .gitignore**

```
# Next.js
.next/
out/
node_modules/

# Environment
.env
.env*.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

- [ ] **Step 7: Create .eslintrc.json**

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"]
}
```

- [ ] **Step 8: Create src/app/globals.css**

```css
@import "tailwindcss";

@theme {
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;
  --color-primary-600: #0284c7;
  --color-primary-700: #0369a1;
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
  --color-primary-950: #082f49;
}

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
}

.dark {
  --background: #0f172a;
  --foreground: #f1f5f9;
  --muted: #94a3b8;
  --border: #1e293b;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-inter), system-ui, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s ease, color 0.3s ease;
  line-height: 1.6;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--muted);
}
```

- [ ] **Step 9: Create src/lib/types.ts**

```ts
// Profile
export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // lucide icon name
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  socials: SocialLink[];
}

// Experience
export interface Experience {
  id: string;
  period: string;
  title: string;
  organization?: string;
  description: string;
  image?: string;
}

// Skills
export interface Skill {
  name: string;
  level: number; // 1-8
  maxLevel: number; // always 8 for consistency with old site
}

// Tools
export interface Tool {
  name: string;
  url: string;
  category?: string;
}

// Works / Portfolio
export interface Work {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  image: string;
  url?: string;
  year?: number;
}

// Testimonials
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

// Clients
export interface Client {
  name: string;
  logo: string;
  url?: string;
}
```

- [ ] **Step 10: Create src/lib/utils.ts**

```ts
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function getLevelDots(level: number, maxLevel: number): string[] {
  return Array.from({ length: maxLevel }, (_, i) =>
    i < level ? "filled" : "empty"
  );
}
```

Note: Need to install `clsx` and `tailwind-merge` as dependencies.

- [ ] **Step 11: Install dependencies and verify build**

```bash
cd projects/MakinoWorks
npm install
npm run build
```

Expected: Build succeeds with default Next.js page. No TypeScript errors.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "chore: initialize Next.js 15 project with TypeScript + Tailwind CSS v4"
```

---

### Task 2: Content Data Layer — 提取舊站內容為 Typed Data

**Files:**
- Create: `src/data/profile.ts`, `src/data/experience.ts`, `src/data/skills.ts`, `src/data/tools.ts`, `src/data/works.ts`, `src/data/testimonials.ts`, `src/data/clients.ts`

- [ ] **Step 1: Create profile.ts**

```ts
import type { Profile } from "@/lib/types";

export const profile: Profile = {
  name: "Makino Haruka",
  title: "Creative Designer",
  bio: "個人品牌 MakinoWorks 創辦人。涵蓋空間設計、平面設計、動態影像、網站設計等多元創作領域。",
  photo: "/images/hero/main.jpg",
  socials: [
    { platform: "Facebook", url: "https://www.facebook.com/haruka1140", icon: "facebook" },
    { platform: "Twitter / X", url: "https://twitter.com/haruka1140", icon: "twitter" },
    // Google+ removed — service discontinued 2019
    { platform: "LinkedIn", url: "http://tw.linkedin.com/in/harukaxxxx", icon: "linkedin" },
    { platform: "Behance", url: "https://www.behance.net/makinoworks", icon: "behance" },
    { platform: "YouTube", url: "https://www.youtube.com/user/haruka1140", icon: "youtube" },
    { platform: "Vimeo", url: "https://vimeo.com/harukaxxxx", icon: "vimeo" },
    // Flickr link preserved but marked as legacy
    { platform: "Flickr", url: "https://www.flickr.com/photos/harukaxxxx/", icon: "image" },
  ],
};
```

- [ ] **Step 2: Create experience.ts**

```ts
import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "hsmad",
    period: "2013 — 現在",
    title: "團隊成員",
    organization: "HSMAD",
    description: "2013年以參加創作交流祭為契機，於活動後決定加入的團隊，以製作MAD為主要活動。",
  },
  {
    id: "pvamazing",
    period: "2013 — 現在",
    title: "團隊成員",
    organization: "PVAMAZING",
    description: "2013年受邀加入的團隊，以製作PV為主要活動。",
  },
  {
    id: "field-design",
    period: "2012",
    title: "3D繪圖人員",
    organization: "場域設計",
    description: "2012年參與淡海新市政標案3D繪圖人員，主要使用SketchUp以及Lumion兩套軟體作業。",
    image: "/images/legacy/2012Lumion.jpg",
  },
  {
    id: "phalanx",
    period: "2011 — 2012",
    title: "設計助理",
    organization: "Phalanx Creative",
    description: "主要工作內容為空間設計。專案包括：Nathan Sawaya積木夢工場、2011高雄設計節「南方文創花園」、Low Pose 亞洲角色創意與數位應用設計展、POWER MAZINGER-Z 潮流展、2011台北設計世界大會 PRETEC 展場設計、Density 品牌展 in 普橘島。",
  },
  {
    id: "makinoworks",
    period: "2010 — 現在",
    title: "創辦人",
    organization: "MakinoWorks",
    description: "2010成立之個人品牌，活動內容涵括所有自己的專案。",
  },
  {
    id: "yongan-tech",
    period: "2010",
    title: "美編人員",
    organization: "永安科技",
    description: "短期打工，主要工作內容為網路商店商品照片修圖、套版，以及商店橫幅、邊欄以及視覺等設計。",
  },
  {
    id: "futouyang",
    period: "2010 — 2012",
    title: "甫東羊工作室",
    description: "為參加動畫製作比賽與同學成立的小團體。參賽項目：2011 Adobe Design Achievement Awards —「WHAT WILL YOU 'BE'?」、2010 Taiwan International Student Design Competition —「吮．Absorption」。",
  },
  {
    id: "mandy-fashion",
    period: "2009 — 現在",
    title: "行銷顧問",
    organization: "Mandy國際時尚",
    description: "起初為美編人員包辦店面所有大小設計，2013年升職為行銷顧問轉為管理後台與內部作業。",
  },
  {
    id: "ntut",
    period: "2009 — 現在",
    title: "創意設計學士班",
    organization: "國立臺北科技大學",
    description: "2009年獨立招生入學，就讀中。",
  },
  {
    id: "ssvs",
    period: "2006 — 2009",
    title: "室內設計科",
    organization: "臺北市立松山高級商業家事職業學校",
    description: "2006年入學松山商職室內設計科，2009年畢業。",
  },
];
```

- [ ] **Step 3: Create skills.ts**

```ts
import type { Skill } from "@/lib/types";

export const skills: Skill[] = [
  { name: "Architecture", level: 6, maxLevel: 8 },
  { name: "Illustration", level: 4, maxLevel: 8 },
  { name: "Motion Graphic", level: 4, maxLevel: 8 },
  { name: "Website Design", level: 2, maxLevel: 8 },
  { name: "Programing", level: 1, maxLevel: 8 },
  { name: "Sleeping", level: 4, maxLevel: 8 },
  { name: "Eating", level: 8, maxLevel: 8 },
];
```

- [ ] **Step 4: Create tools.ts**

```ts
import type { Tool } from "@/lib/types";

export const tools: Tool[] = [
  { name: "Photoshop", url: "https://creative.adobe.com/zh-tw/products/photoshop", category: "Design" },
  { name: "Illustrator", url: "https://creative.adobe.com/zh-tw/products/illustrator", category: "Design" },
  { name: "After Effects", url: "https://creative.adobe.com/zh-tw/products/aftereffects", category: "Motion" },
  { name: "SketchUp", url: "https://www.sketchup.com", category: "3D" },
  { name: "AutoCAD", url: "https://www.autodesk.com/products/autocad/overview", category: "3D" },
  { name: "Lumion", url: "https://lumion3d.com", category: "3D" },
  { name: "Artlantis", url: "https://www.artlantis.com", category: "3D" },
  { name: "Clip Studio Paint", url: "https://www.clipstudio.net", category: "Drawing" },
  { name: "openCanvas", url: "https://www.portalgraphics.net", category: "Drawing" },
  { name: "Coda 2", url: "https://panic.com/coda/", category: "Code" },
  { name: "RapidWeaver", url: "https://www.realmacsoftware.com/rapidweaver/", category: "Code" },
];
```

- [ ] **Step 5: Create works.ts**

```ts
import type { Work } from "@/lib/types";

export const works: Work[] = [
  {
    id: "work-1",
    slug: "work-1",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb.jpg",
    image: "/images/works/work-photo.jpg",
  },
  {
    id: "work-2",
    slug: "work-2",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-2.jpg",
    image: "/images/works/work-photo-2.jpg",
  },
  {
    id: "work-3",
    slug: "work-3",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-3.jpg",
    image: "/images/works/work-photo-3.jpg",
  },
  {
    id: "work-4",
    slug: "work-4",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-4.jpg",
    image: "/images/works/work-photo-4.jpg",
  },
  {
    id: "work-5",
    slug: "work-5",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-5.jpg",
    image: "/images/works/work-photo-5.jpg",
  },
  {
    id: "work-6",
    slug: "work-6",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-6.jpg",
    image: "/images/works/work-photo-6.jpg",
  },
  {
    id: "work-7",
    slug: "work-7",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-7.jpg",
    image: "/images/works/work-photo-7.jpg",
  },
  {
    id: "work-8",
    slug: "work-8",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-8.jpg",
    image: "/images/works/work-photo-8.jpg",
  },
  {
    id: "work-9",
    slug: "work-9",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-9.jpg",
    image: "/images/works/work-photo-9.jpg",
  },
  {
    id: "work-10",
    slug: "work-10",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-10.jpg",
    image: "/images/works/work-photo-10.jpg",
  },
  {
    id: "work-11",
    slug: "work-11",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-11.jpg",
    image: "/images/works/work-photo-11.jpg",
  },
  {
    id: "work-12",
    slug: "work-12",
    title: "Work Title",
    description: "Placeholder — 待更新為實際作品",
    category: "design",
    thumbnail: "/images/works/thumb-12.jpg",
    image: "/images/works/work-photo-12.jpg",
  },
];
```

- [ ] **Step 6: Create testimonials.ts**

Extract from old site's Testimonials section:

```ts
import type { Testimonial } from "@/lib/types";

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "（舊站 Testimonial 1 內容 — 需從 index.html 確認實際文字）",
    author: "待確認",
    role: "待確認",
  },
  {
    id: "t2",
    quote: "（舊站 Testimonial 2 內容 — 需從 index.html 確認實際文字）",
    author: "待確認",
    role: "待確認",
  },
  {
    id: "t3",
    quote: "（舊站 Testimonial 3 內容 — 需從 index.html 確認實際文字）",
    author: "待確認",
    role: "待確認",
  },
];
```

Note: The full testimonial text was truncated in the HTML read. Need to read the complete section or ask 悠 for content.

- [ ] **Step 7: Create clients.ts**

```ts
import type { Client } from "@/lib/types";

export const clients: Client[] = [
  { name: "Client 1", logo: "/images/logos/client-logo-1.png" },
  { name: "Client 2", logo: "/images/logos/client-logo-2.png" },
  { name: "Client 3", logo: "/images/logos/client-logo-3.png" },
];
```

- [ ] **Step 8: Migrate static assets to public/**

```bash
# Create organized image directories
mkdir -p public/images/{hero,works,logos,legacy}

# Copy hero photo
cp assets/img/main.jpg public/images/hero/main.jpg

# Copy work thumbnails and photos
cp assets/img/thumb*.jpg public/images/works/
cp assets/img/work-photo*.jpg public/images/works/

# Copy client logos
cp assets/img/client-logo-*.png public/images/logos/

# Copy legacy images
cp assets/img/2012Lumion.jpg public/images/legacy/

# Copy favicon if exists (check old site root)
```

- [ ] **Step 9: Commit**

```bash
git add src/data/ public/images/
git commit -m "feat: extract content from old site into typed data files + migrate assets"
```

---

### Task 3: Layout Shell — Navbar + Footer + Theme Provider

**Files:**
- Create: `src/app/layout.tsx`, `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/ThemeToggle.tsx`
- Modify: `src/app/page.tsx` (replace default content)

- [ ] **Step 1: Create src/app/layout.tsx with Inter font + ThemeProvider**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MakinoWorks — Creative Designer Portfolio",
  description: "Makino Haruka 的個人作品集。涵蓋空間設計、平面設計、動態影像、網站設計等多元創作。",
  keywords: ["MakinoWorks", "Creative Designer", "Portfolio", "Makino Haruka"],
  authors: [{ name: "Makino Haruka" }],
  openGraph: {
    title: "MakinoWorks",
    description: "Creative Designer Portfolio",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Create src/components/layout/ThemeProvider.tsx**

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider(props: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props} />;
}
```

- [ ] **Step 3: Create src/components/layout/Navbar.tsx**

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Profile", href: "#profile" },
  { label: "Resume", href: "#resume" },
  { label: "Works", href: "#works" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (v) => `rgba(var(--background-rgb), ${v})`
        ),
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            Makino<span className="text-primary-500">Works</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
```

- [ ] **Step 4: Create src/components/layout/ThemeToggle.tsx**

```tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
```

- [ ] **Step 5: Create src/components/layout/Footer.tsx**

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} MakinoWorks. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/works" className="text-sm text-muted hover:text-foreground transition-colors">
              Works
            </Link>
            <Link href="/#contact" className="text-sm text-muted hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Create src/app/page.tsx (shell)**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        {/* More sections will be added in subsequent tasks */}
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 7: Install clsx dependency (needed by utils.ts)**

```bash
npm install clsx tailwind-merge
npm install -D @types/clsx
```

Wait — `clsx` already ships its own types. Just:

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 8: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Navbar renders with responsive behavior. Theme toggle works.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout/ src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add layout shell with responsive navbar, footer, and theme toggle"
```

---

### Task 4: Hero Section — Profile + Social Links

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/ui/Button.tsx`
- Modify: `src/app/page.tsx` (already imports HeroSection from Task 3)

- [ ] **Step 1: Create src/components/ui/Button.tsx**

```tsx
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600":
              variant === "primary",
            "bg-muted/10 text-foreground hover:bg-muted/20":
              variant === "secondary",
            "text-muted hover:text-foreground": variant === "ghost",
            "h-9 px-4 text-sm": size === "sm",
            "h-11 px-6 text-base": size === "md",
            "h-14 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
```

- [ ] **Step 2: Create src/components/sections/HeroSection.tsx**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Image as ImageIcon,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  image: ImageIcon,
  // Add more as needed: behance, vimeo, etc.
};

export function HeroSection() {
  return (
    <section
      id="profile"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[16/9] lg:aspect-square rounded-2xl overflow-hidden"
          >
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-4 text-xl text-primary-500 font-medium">
              {profile.title}
            </p>
            <p className="mt-6 text-muted max-w-lg mx-auto lg:mx-0">
              {profile.bio}
            </p>

            {/* Social Links */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
              {profile.socials.map((social) => {
                const Icon = iconMap[social.icon] || ImageIcon;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-muted/10 hover:bg-muted/20 text-muted hover:text-foreground transition-all"
                    aria-label={social.platform}
                    title={social.platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <a href="#works">View Works</a>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="#resume">Resume</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

Note: Need to add `asChild` prop support to Button. Update Button.tsx:

```tsx
// Add to Button imports:
import { Slot } from "@radix-ui/react-slot";

// In Button component, before return:
const Comp = props.asChild ? Slot : "button";

// Replace <button> with <Comp>
```

Install radix slot:
```bash
npm install @radix-ui/react-slot
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Hero section displays profile photo, name, title, bio, social links, and CTA buttons.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/components/ui/Button.tsx
git commit -m "feat: add HeroSection with profile, social links, and CTA"
```

---

### Task 5: Resume Section — Experience Timeline

**Files:**
- Create: `src/components/sections/ExperienceSection.tsx`
- Create: `src/components/ui/TimelineItem.tsx`
- Modify: `src/app/page.tsx` (add ExperienceSection import)

- [ ] **Step 1: Create src/components/ui/TimelineItem.tsx**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Experience } from "@/lib/types";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export function TimelineItem({ experience, index }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex gap-6 pb-12 last:pb-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-3 h-3 rounded-full bg-primary-500 ring-4 ring-background z-10" />

      {/* Content */}
      <div className={`ml-10 md:ml-0 md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          {experience.period}
        </span>
        <h3 className="mt-3 text-lg font-semibold">
          {experience.title}
          {experience.organization && (
            <span className="text-primary-500 font-normal"> / {experience.organization}</span>
          )}
        </h3>
        <p className="mt-2 text-sm text-muted whitespace-pre-line">
          {experience.description}
        </p>
        {experience.image && (
          <div className="mt-4 relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}
```

- [ ] **Step 2: Create src/components/sections/ExperienceSection.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/experience";
import { TimelineItem } from "@/components/ui/TimelineItem";

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <Briefcase size={24} />
          </div>
          <h2 className="text-3xl font-bold">Experience</h2>
          <p className="mt-2 text-muted">我的經歷與背景</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />

          {/* Timeline items */}
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update src/app/page.tsx to include ExperienceSection**

```tsx
// Add import:
import { ExperienceSection } from "@/components/sections/ExperienceSection";

// Add inside <main> after HeroSection:
<ExperienceSection />
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. Experience timeline renders with alternating left/right layout on desktop, single column on mobile. Scroll animations trigger on each item.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ExperienceSection.tsx src/components/ui/TimelineItem.tsx src/app/page.tsx
git commit -m "feat: add ExperienceSection with animated timeline layout"
```

---

### Task 6: Skills + Tools Sections

**Files:**
- Create: `src/components/sections/SkillsSection.tsx`
- Create: `src/components/sections/ToolsSection.tsx`
- Create: `src/components/ui/SkillBar.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/ui/SkillBar.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/lib/types";

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export function SkillBar({ skill, index }: SkillBarProps) {
  const percentage = (skill.level / skill.maxLevel) * 100;

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{skill.name}</span>
        <span className="text-xs text-muted">
          {skill.level}/{skill.maxLevel}
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted/20 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create src/components/sections/SkillsSection.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy } from "lucide-react";
import { skills } from "@/data/skills";
import { SkillBar } from "@/components/ui/SkillBar";

export function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/5 dark:bg-muted/10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <Trophy size={24} />
          </div>
          <h2 className="text-3xl font-bold">Ability</h2>
          <p className="mt-2 text-muted">技能等級</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create src/components/sections/ToolsSection.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wrench, ExternalLink } from "lucide-react";
import { tools } from "@/data/tools";

export function ToolsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <Wrench size={24} />
          </div>
          <h2 className="text-3xl font-bold">Tools</h2>
          <p className="mt-2 text-muted">使用的軟體與工具</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tools.map((tool, index) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-background hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all"
            >
              <span className="text-sm font-medium text-center group-hover:text-primary-500 transition-colors">
                {tool.name}
              </span>
              <span className="mt-1 text-xs text-muted">{tool.category}</span>
              <ExternalLink
                size={14}
                className="mt-2 text-muted opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Update src/app/page.tsx**

```tsx
// Add imports:
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";

// Add inside <main> after ExperienceSection:
<SkillsSection />
<ToolsSection />
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
```

Expected: Skills show animated progress bars. Tools display as interactive grid cards with hover effects.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/SkillsSection.tsx src/components/sections/ToolsSection.tsx src/components/ui/SkillBar.tsx src/app/page.tsx
git commit -m "feat: add SkillsSection with animated bars and ToolsSection with interactive grid"
```

---

### Task 7: Works / Portfolio Section — Grid + Filter + Lightbox

**Files:**
- Create: `src/components/sections/WorksSection.tsx`
- Create: `src/components/ui/WorkCard.tsx`
- Create: `src/components/ui/Lightbox.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/works/[slug]/page.tsx`

- [ ] **Step 1: Create src/components/ui/WorkCard.tsx**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zoom, ExternalLink } from "lucide-react";
import type { Work } from "@/lib/types";

interface WorkCardProps {
  work: Work;
  index: number;
  onZoom: (work: Work) => void;
}

export function WorkCard({ work, index, onZoom }: WorkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative aspect-square rounded-xl overflow-hidden bg-muted/10"
    >
      <Image
        src={work.thumbnail}
        alt={work.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-center text-white p-4">
          <h3 className="text-lg font-semibold">{work.title}</h3>
          <p className="text-sm text-white/70 mt-1">{work.description}</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => onZoom(work)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Zoom"
            >
              <Zoom size={18} />
            </button>
            <a
              href={`/works/${work.slug}`}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="View details"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Create src/components/ui/Lightbox.tsx**

```tsx
"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Work } from "@/lib/types";

interface LightboxProps {
  work: Work | null;
  works: Work[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({ work, works, onClose, onPrev, onNext }: LightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 p-2 text-white/70 hover:text-white z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 p-2 text-white/70 hover:text-white z-10"
            aria-label="Next"
          >
            <ChevronRight size={32} />
          </button>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-[90vw] h-[80vh] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Caption */}
          <div className="absolute bottom-8 left-0 right-0 text-center text-white">
            <h3 className="text-xl font-semibold">{work.title}</h3>
            <p className="text-sm text-white/60 mt-1">{work.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create src/components/sections/WorksSection.tsx**

```tsx
"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Palette } from "lucide-react";
import { works } from "@/data/works";
import { WorkCard } from "@/components/ui/WorkCard";
import { Lightbox } from "@/components/ui/Lightbox";
import type { Work } from "@/lib/types";

const categories = [
  { label: "All", value: "all" },
  { label: "Design", value: "design" },
  { label: "Web", value: "web" },
  { label: "Motion", value: "motion" },
  { label: "3D", value: "3d" },
];

export function WorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxWork, setLightboxWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(
    () =>
      activeCategory === "all"
        ? works
        : works.filter((w) => w.category === activeCategory),
    [activeCategory]
  );

  const currentIndex = works.findIndex((w) => w.id === lightboxWork?.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + works.length) % works.length;
    setLightboxWork(works[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % works.length;
    setLightboxWork(works[nextIndex]);
  };

  return (
    <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/5 dark:bg-muted/10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <Palette size={24} />
          </div>
          <h2 className="text-3xl font-bold">Works</h2>
          <p className="mt-2 text-muted">作品集</p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-primary-600 text-white"
                  : "bg-muted/10 text-muted hover:bg-muted/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          {filteredWorks.map((work, index) => (
            <WorkCard
              key={work.id}
              work={work}
              index={index}
              onZoom={setLightboxWork}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        work={lightboxWork}
        works={works}
        onClose={() => setLightboxWork(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
```

- [ ] **Step 4: Create src/app/works/[slug]/page.tsx**

```tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { works } from "@/data/works";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);

  if (!work) notFound();

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold">{work.title}</h1>
        <p className="mt-4 text-muted">{work.description}</p>
        {work.year && (
          <p className="mt-2 text-sm text-muted">Year: {work.year}</p>
        )}
        <div className="mt-8">
          <a href="/#works" className="text-primary-500 hover:text-primary-600">
            ← Back to Works
          </a>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Update src/app/page.tsx**

```tsx
// Add import:
import { WorksSection } from "@/components/sections/WorksSection";

// Add inside <main> after ToolsSection:
<WorksSection />
```

- [ ] **Step 6: Build and verify**

```bash
npm run build
```

Expected: Portfolio grid renders with filter buttons. Hover shows overlay with zoom/view. Lightbox opens on click with keyboard navigation.

- [ ] **Step 7: Commit**

```bash
git add src/components/sections/WorksSection.tsx src/components/ui/WorkCard.tsx src/components/ui/Lightbox.tsx src/app/works/ src/app/page.tsx
git commit -m "feat: add WorksSection with filter grid, lightbox, and detail pages"
```

---

### Task 8: Testimonials + Clients Sections

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`
- Create: `src/components/sections/ClientsSection.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create src/components/sections/TestimonialsSection.tsx**

```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <MessageCircle size={24} />
          </div>
          <h2 className="text-3xl font-bold">Testimonials</h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <blockquote className="text-xl md:text-2xl font-light italic text-foreground/80 leading-relaxed">
                "{testimonials[activeIndex].quote}"
              </blockquote>
              <div className="mt-6">
                <p className="font-semibold">{testimonials[activeIndex].author}</p>
                <p className="text-sm text-muted">{testimonials[activeIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full hover:bg-muted/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === activeIndex ? "bg-primary-500" : "bg-muted/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full hover:bg-muted/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create src/components/sections/ClientsSection.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Handshake } from "lucide-react";
import { clients } from "@/data/clients";

export function ClientsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/5 dark:bg-muted/10">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-3">
            <Handshake size={20} />
          </div>
          <h2 className="text-2xl font-bold">Clients</h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update src/app/page.tsx**

```tsx
// Add imports:
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";

// Add inside <main> after WorksSection:
<TestimonialsSection />
<ClientsSection />
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Testimonials carousel with prev/next navigation. Clients logos in grayscale grid.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx src/components/sections/ClientsSection.tsx src/app/page.tsx
git commit -m "feat: add TestimonialsSection carousel and ClientsSection logo grid"
```

---

### Task 9: Final Polish — About Section, Contact Section, Performance, SEO, Deploy

**Files:**
- Create: `src/components/sections/AboutSection.tsx`
- Create: `src/components/sections/ContactSection.tsx`
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`, `next.config.ts`
- Create: `public/robots.txt`, `public/sitemap.xml`

- [ ] **Step 1: Create src/components/sections/AboutSection.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Info } from "lucide-react";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-4">
            <Info size={24} />
          </div>
          <h2 className="text-3xl font-bold">About</h2>
          <div className="mt-6 text-muted max-w-2xl mx-auto space-y-4">
            <p>
              MakinoWorks 是 2010 年成立的個人品牌，活動內容涵蓋空間設計、平面設計、動態影像、網站設計等多元創作領域。
            </p>
            <p>
              本網站經歷全面重構，從 2013 年的 jQuery 架構升級為 Next.js 15 + TypeScript 現代化技術棧。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create src/components/sections/ContactSection.tsx**

```tsx
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/5 dark:bg-muted/10">
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="mt-2 text-muted">聯繫方式</p>

          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-xl bg-background border border-border">
              <Mail className="text-primary-500 mb-3" size={24} />
              <h3 className="font-medium">Email</h3>
              <p className="text-sm text-muted mt-1">待設定</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-background border border-border">
              <MapPin className="text-primary-500 mb-3" size={24} />
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted mt-1">Taiwan</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-background border border-border">
              <Send className="text-primary-500 mb-3" size={24} />
              <h3 className="font-medium">Social</h3>
              <p className="text-sm text-muted mt-1">@harukaxxxx</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update src/app/page.tsx with all remaining sections**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { WorksSection } from "@/components/sections/WorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ClientsSection } from "@/components/sections/ClientsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ToolsSection />
        <WorksSection />
        <TestimonialsSection />
        <ClientsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 4: Create public/robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://makinoworks.com/sitemap.xml
```

- [ ] **Step 5: Update next.config.ts for production**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 6: Run full build and Lighthouse check**

```bash
npm run build
npm start
# Then run Lighthouse on http://localhost:3000
# Target scores: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90
```

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "feat: complete MakinoWorks v2 — all sections, SEO, performance optimized"
```

---

## Self-Review Checklist

### 1. Spec Coverage
- [x] jQuery 1.10.2 → Next.js 15 + React 19
- [x] Static HTML → TypeScript components
- [x] IE6 conditional comments → modern browser support
- [x] Font Awesome 4 → Lucide React
- [x] Google+ link → removed
- [x] HTTP Google Fonts → next/font (Inter, self-hosted)
- [x] Profile section → HeroSection.tsx
- [x] Experience timeline → ExperienceSection.tsx with TimelineItem.tsx
- [x] Skills (Ability) → SkillsSection.tsx with SkillBar.tsx
- [x] Tools grid → ToolsSection.tsx
- [x] Works portfolio → WorksSection.tsx with filter + Lightbox + detail pages
- [x] Testimonials → TestimonialsSection.tsx carousel
- [x] Clients → ClientsSection.tsx logo grid
- [x] Dark mode → next-themes + ThemeToggle
- [x] Responsive design → Tailwind responsive classes throughout
- [x] Animations → Framer Motion (scroll reveals, transitions)
- [x] SEO → Metadata API in layout.tsx, robots.txt, sitemap.xml
- [x] Image optimization → Next.js Image component

### 2. Placeholder Scan
- [ ] Testimonials content: Marked as "待確認" — old site text was truncated. Need 悠 to provide or re-read full HTML section.
- [ ] Works content: All 12 items are placeholders. Structure is ready; actual content TBD.
- [ ] Contact info: Email marked as "待設定".
- [ ] Profile name/title: Using old values. May need updating.

### 3. Type Consistency
- All interfaces defined in `src/lib/types.ts` are used consistently across data files and components.
- `Work.slug` used in both WorksSection (list) and work detail page (dynamic route).
- `Skill.level`/`maxLevel` types match across skills.ts and SkillBar.tsx.
- Social icon strings map to Lucide icon names in iconMap — may need `behance` and `vimeo` icon imports (Lucide may not have all social icons; fallback to generic icons acceptable).

### Notes on Icon Coverage
Lucide React does not include Behance or Vimeo icons. Update iconMap to use closest alternatives:
- Behance → use `PenTool` or custom SVG
- Vimeo → use `Video` or custom SVG
- Twitter → use `Twitter` (Lucide has it)

This is a known limitation; the plan handles it with `ImageIcon` fallback in the map.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-14-makinoworks-modernization.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task (9 tasks total), review between tasks, fast iteration. Best for a project of this scope.

**2. Inline Execution** — I execute tasks sequentially in this session using executing-plans, with checkpoints for review.

Which approach?