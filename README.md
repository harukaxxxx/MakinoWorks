# MakinoWorks

個人品牌作品集網站。

## 技術

- **Framework**: Next.js 15 (App Router, Turbopack)
- **語言**: TypeScript
- **樣式**: Tailwind CSS 4 + CSS Variables
- **動畫**: Framer Motion
- **圖示**: Lucide React

## 專案結構

```
src/
  app/            # 頁面路由
    page.tsx      # 首頁
    about/        # 關於
    experience/   # 經歷
    works/        # 作品
  components/
    sections/     # 頁面區塊（Hero, About, Experience, Works...）
    layout/       # Navbar, Footer, ThemeToggle
    ui/           # 可複用 UI 組件
  data/           # 內容資料（profile, works, experience...）
  lib/
    types.ts      # TypeScript 型別
    utils.ts      # 工具函式
```

## 啟動

```bash
npm install
npm run dev        # http://localhost:3000
```

## 建置

```bash
npm run build      # 輸出至 dist/
```

## 設計系統

詳見 `DESIGN.md`。
