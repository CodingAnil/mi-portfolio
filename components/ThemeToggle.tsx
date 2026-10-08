"use client";

import { useEffect, useState } from "react";
import { THEME_EVENT, isLightTheme, togglePortfolioTheme } from "@/lib/theme";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const sync = () => setLight(isLightTheme());
    sync();
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, []);

  return (
    <button
      type="button"
      onClick={() => togglePortfolioTheme()}
      className={`theme-toggle inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/[0.05] hover:text-text-primary ${className}`}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
    >
      {light ? (
        <svg className="theme-icon-glow h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M21 14.5A8.5 8.5 0 1110.5 3a7 7 0 0010.5 11.5z"
          />
        </svg>
      ) : (
        <svg className="theme-icon-glow h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1L6 18M18 6l1.1-1.1M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      )}
    </button>
  );
}
