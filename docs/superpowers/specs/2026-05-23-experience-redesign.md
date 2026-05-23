---
name: MakinoWorks Experience Page Redesign
date: 2026-05-23
type: refactor
scope: experience page data structure + component architecture
---

# 經歷頁面重構設計

## 概述

將目前的 Experience 單一時間軸拆分成「學歷」與「工作經歷」兩個獨立區塊，中間以虛線分隔，上下連續文字留白區隔。

## 資料層變更

### 檔案拆分

- **移除** `src/data/experience.ts`
- **新增** `src/data/education.ts`
- **新增** `src/data/work.ts`

### education.ts（2 筆）

由近到遠排序：

1. **國立臺北科技大學** — 創意設計學士班（2009—現在）
2. **松山商職** — 室內設計科（2006—2009）

### work.ts（5 筆）

由近到遠排序：

1. **MakinoWorks** — 創辦人（2010—現在）
2. **Mandy國際時尚** — 行銷顧問（2009—現在）
3. **場域設計** — 3D繪圖人員（2012）
4. **Phalanx Creative** — 設計助理（2011—2012）
5. **永安科技** — 美編人員（2010）

### 移除項目

- HSMAD
- PVAMAZING
- 甫東羊工作室

## 組件層變更

### 新增 TimelineSection 子組件

**檔案**：`src/components/sections/TimelineSection.tsx`

**Props** 介面：

```typescript
interface TimelineSectionProps {
  label: string;         // 英文標籤
  title: string;         // 中文標題
  data: Experience[];
  accentFirst?: boolean; // 第一個點是否用金色 accent
}
```

**視覺設計**：
- 標題區：label（Space Mono, accent color）+ heading-1（Cormorant Garamond）
- 垂直時間軸：左側灰線 + 圓點
- 資料項目：period（金色 label）+ title / organization + description + optional image
- 進場動畫：`whileInView`，交錯延遲 `index * 0.08`

### 重構 ExperienceSection

**檔案**：`src/components/sections/ExperienceSection.tsx`

變為 wrapper：

```tsx
export function ExperienceSection() {
  return (
    <section>
      <TimelineSection
        label="Education"
        title="學歷"
        data={education}
      />
      
      {/* 虛線分隔 + 留白 */}
      <DashedDivider />
      
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

## 視覺設計細節

### Education 區塊

- 時間軸圓點：統一使用 `var(--border-strong)`（暖灰色，不用 accent gold）
- 避免搶走工作區塊的視覺焦點

### Work Experience 區塊

- 時間軸第一個圓點：accent gold（`#c4a265`）+ glow shadow
- 表示「最新/目前進行中」
- 其餘圓點：`var(--border-strong)`

### 虛線分隔

兩個 TimelineSection 之間插入分隔元素：

```tsx
<div
  style={{
    borderTop: "1px dashed var(--border)",
    margin: "var(--sp-24) 0",
    paddingTop: "var(--sp-24)",
  }}
/>
```

- 樣式：`1px dashed var(--border)`
- 上下留白：`var(--sp-24)`（6rem / 96px）

## 動畫設計

- 每個 TimelineSection 獨立觸發 `whileInView`
- 進場方向：`x: -20 → 0`，`opacity: 0 → 1`
- 交錯延遲：`index * 0.08`
- 第一個點的 glow shadow 在進場後延遲 0.3s 淡入

## 排序邏輯

- **由近到遠**：最新的經歷在最上方
- Education 和 Work 各自獨立排序，不需要跨類別對齊時間線

## Do's and Don'ts

- **Do** 保持虛線分隔的簡潔，不要加入額外文字或圖示
- **Do** 確保兩區塊的留白一致（`var(--sp-24)`）
- **Don't** 在 Education 區塊使用 accent gold 作為第一個點（留給 Work）
- **Don't** 把甫東羊工作室等已移除項目保留在註解或備份中，乾淨刪除

## 實作順序

1. 建立 `education.ts` 與 `work.ts`
2. 刪除 `experience.ts`
3. 建立 `TimelineSection.tsx`（從現有 ExperienceSection 提取）
4. 重構 `ExperienceSection.tsx` 為 wrapper
5. 加入虛線分隔
6. 測試動畫與響應式
7. Commit
