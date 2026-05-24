# Experience Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the current single Experience timeline into separate Education and Work Experience sections with a dashed divider, while removing unused entries.

**Architecture:** Extract a reusable `TimelineSection` component from the current `ExperienceSection`, create separate data files for education and work, refactor the page component to use them.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion

---

## File Structure

**New files:**
- `src/data/education.ts` — Education data array (2 items)
- `src/data/work.ts` — Work experience data array (5 items)
- `src/components/sections/TimelineSection.tsx` — Reusable timeline component

**Modified files:**
- `src/components/sections/ExperienceSection.tsx` — Refactor into wrapper
- `src/app/experience/page.tsx` — Verify imports still work

**Deleted files:**
- `src/data/experience.ts` — Replaced by education.ts + work.ts

---

### Task 1: Create Education Data File

**Files:**
- Create: `src/data/education.ts`

- [ ] **Step 1: Create education.ts with 2 entries**

```typescript
import type { Experience } from "@/lib/types";

export const education: Experience[] = [
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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/data/education.ts
git commit -m "feat: add education data file"
```

---

### Task 2: Create Work Experience Data File

**Files:**
- Create: `src/data/work.ts`
- Delete: `src/data/experience.ts`

- [ ] **Step 1: Create work.ts with 5 entries (most recent first)**

```typescript
import type { Experience } from "@/lib/types";

export const work: Experience[] = [
  {
    id: "makinoworks",
    period: "2010 — 現在",
    title: "創辦人",
    organization: "MakinoWorks",
    description: "2010成立之個人品牌，活動內容涵括所有自己的專案。",
  },
  {
    id: "mandy-fashion",
    period: "2009 — 現在",
    title: "行銷顧問",
    organization: "Mandy國際時尚",
    description: "起初為美編人員包辦店面所有大小設計，2013年升職為行銷顧問轉為管理後台與內部作業。",
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
    id: "yongan-tech",
    period: "2010",
    title: "美編人員",
    organization: "永安科技",
    description: "短期打工，主要工作內容為網路商店商品照片修圖、套版，以及商店橫幅、邊欄以及視覺等設計。",
  },
];
```

- [ ] **Step 2: Delete old experience.ts**

```bash
rm src/data/experience.ts
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors (TimelineSection hasn't been created yet, so this will error — skip for now)

- [ ] **Step 4: Commit**

```bash
git add src/data/work.ts
git rm src/data/experience.ts
git commit -m "feat: add work data and remove old experience.ts"
```

---

### Task 3: Create TimelineSection Component

**Files:**
- Create: `src/components/sections/TimelineSection.tsx`

- [ ] **Step 1: Create TimelineSection with full implementation**

```tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Experience } from "@/lib/types";

interface TimelineSectionProps {
  label: string;
  title: string;
  data: Experience[];
  accentFirst?: boolean;
}

export function TimelineSection({ label, title, data, accentFirst = false }: TimelineSectionProps) {
  return (
    <div style={{ marginBottom: "var(--sp-16)" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: "var(--sp-16)" }}
      >
        <div
          className="label"
          style={{ color: "var(--accent)", marginBottom: "var(--sp-4)" }}
        >
          {label}
        </div>
        <h2 className="heading-1">
          {title}<span style={{ color: "var(--accent)" }}>.</span>
        </h2>
      </motion.div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div
          style={{
            position: "absolute",
            left: "var(--sp-5)",
            top: 0,
            bottom: 0,
            width: "1px",
            background: "var(--border)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--sp-12)",
          }}
        >
          {data.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "relative",
                paddingLeft: "var(--sp-12)",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "calc(var(--sp-5) - 4px)",
                  top: "0.35rem",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background:
                    accentFirst && index === 0
                      ? "var(--accent)"
                      : "var(--border-strong)",
                  border:
                    accentFirst && index === 0
                      ? "2px solid var(--accent)"
                      : "2px solid var(--bg)",
                  boxShadow:
                    accentFirst && index === 0
                      ? "0 0 0 4px rgba(196,162,101,0.2)"
                      : "none",
                }}
              />

              {/* Period */}
              <div
                className="label"
                style={{
                  color: "var(--accent)",
                  marginBottom: "var(--sp-1)",
                }}
              >
                {exp.period}
              </div>

              {/* Title & Org */}
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.375rem",
                  fontWeight: 400,
                  lineHeight: 1.3,
                  color: "var(--fg)",
                }}
              >
                {exp.title}
                {exp.organization && (
                  <span
                    style={{
                      color: "var(--muted)",
                      fontWeight: 300,
                      marginLeft: "0.5rem",
                    }}
                  >
                    / {exp.organization}
                  </span>
                )}
              </h3>

              {/* Description */}
              <p
                className="body-lg"
                style={{
                  marginTop: "var(--sp-2)",
                  maxWidth: "60ch",
                }}
              >
                {exp.description}
              </p>

              {/* Image */}
              {exp.image && (
                <div
                  style={{
                    marginTop: "var(--sp-4)",
                    maxWidth: "320px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    width={320}
                    height={160}
                    style={{
                      objectFit: "cover",
                      filter: "saturate(0.8) contrast(1.05)",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TimelineSection.tsx
git commit -m "feat: add reusable TimelineSection component"
```

---

### Task 4: Refactor ExperienceSection

**Files:**
- Modify: `src/components/sections/ExperienceSection.tsx`

- [ ] **Step 1: Replace full content with wrapper using TimelineSection**

```tsx
"use client";

import { education } from "@/data/education";
import { work } from "@/data/work";
import { TimelineSection } from "./TimelineSection";

export function ExperienceSection() {
  return (
    <section
      style={{
        padding: "var(--sp-32) var(--content-padding)",
        maxWidth: "var(--content-max)",
        margin: "0 auto",
      }}
    >
      {/* Education */}
      <TimelineSection
        label="Education"
        title="學歷"
        data={education}
      />

      {/* Dashed divider with spacing */}
      <div
        style={{
          borderTop: "1px dashed var(--border)",
          margin: "var(--sp-24) 0",
          paddingTop: "var(--sp-24)",
        }}
      />

      {/* Work Experience */}
      <TimelineSection
        label="Work Experience"
        title="工作經歷"
        data={work}
        accentFirst
      />
    </section>
  );
}
```

- [ ] **Step 2: Verify no other files import from old experience.ts**

Run: `grep -r "experience" src/ --include="*.tsx" --include="*.ts" | grep -v "node_modules" | grep -v "\.d\.ts"`
Expected: Only references to `experiences` in TimelineSection (via props) or `Experience` type

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Test the page**

Open: `http://localhost:3456/experience`
Verify:
- [ ] Two sections visible: "學歷" and "工作經歷"
- [ ] Dashed line between them
- [ ] Education has 2 entries (北科大, 松山商職)
- [ ] Work has 5 entries (MakinoWorks, Mandy, 場域設計, Phalanx, 永安)
- [ ] Work first dot is accent gold
- [ ] Education dots are gray
- [ ] No HSMAD, PVAMAZING, or 甫東羊 entries

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ExperienceSection.tsx
git commit -m "feat: refactor ExperienceSection with TimelineSection and dashed divider"
```

---

### Task 5: Update Navbar Link Text (Optional Polish)

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Change nav link from "Experience" to "經歷"** (if desired)

```tsx
// In navLinks array:
{ label: "經歷", href: "/experience" },
```

- [ ] **Step 2: Commit if changed**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "style: update experience nav link to Chinese"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Split into education + work data — Task 1 & 2
- ✅ TimelineSection component — Task 3
- ✅ Refactor ExperienceSection — Task 4
- ✅ Dashed divider with spacing — Task 4
- ✅ Education dots gray, Work first dot gold — TimelineSection `accentFirst` prop
- ✅ Remove HSMAD/PVAMAZING/甫東羊 — Task 2
- ✅ Sort by most recent first — Task 2 array order

**Placeholder scan:**
- ✅ No TBD, TODO, or vague steps
- ✅ All code blocks are complete and copy-paste ready

**Type consistency:**
- ✅ `Experience` type from `@/lib/types` used everywhere
- ✅ `education` and `work` arrays are `Experience[]`
- ✅ `TimelineSectionProps` matches usage
