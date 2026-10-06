const PENDING_SECTION_KEY = "portfolio:scroll-section";

export function sectionIdFromHash(hash: string): string | null {
  const id = hash.replace(/^#/, "").trim();
  return id.length > 0 ? id : null;
}

export function scrollToSectionId(
  id: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function setPendingSectionScroll(id: string) {
  try {
    sessionStorage.setItem(PENDING_SECTION_KEY, id);
  } catch {
    /* private mode / storage blocked */
  }
}

export function consumePendingSectionScroll(): string | null {
  try {
    const id = sessionStorage.getItem(PENDING_SECTION_KEY);
    if (id) sessionStorage.removeItem(PENDING_SECTION_KEY);
    return id;
  } catch {
    return null;
  }
}

/** Home URL with hash — avoids `/${"#projects"}` style hrefs that routers can mis-parse. */
export function homeSectionHref(sectionId: string): string {
  const id = sectionId.replace(/^#/, "");
  return `/#${id}`;
}
