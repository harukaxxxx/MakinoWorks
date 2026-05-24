"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{
        background: "none",
        border: "1px solid var(--border)",
        cursor: "pointer",
        color: "var(--fg)",
        padding: "0.375rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.color = "var(--accent)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--fg)";
      }}
    >
      <Sun
        style={{
          width: "1rem",
          height: "1rem",
          transition: "all 0.3s ease",
        }}
        className="rotate-0 scale-100 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        style={{
          width: "1rem",
          height: "1rem",
          position: "absolute" as const,
          transition: "all 0.3s ease",
        }}
        className="rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      />
    </button>
  );
}