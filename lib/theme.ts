export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_EVENT = "portfolio-theme";

export function isLightTheme() {
  return document.documentElement.classList.contains("light");
}

export function togglePortfolioTheme() {
  const next = !isLightTheme();
  document.documentElement.classList.toggle("light", next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next ? "light" : "dark");
  } catch {
    /* storage blocked */
  }
  window.dispatchEvent(new Event(THEME_EVENT));
  return next;
}
