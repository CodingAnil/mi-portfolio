/** Navbar / footer href: route path or home section hash. */
export function resolveNavHref(href: string): string {
  if (href.startsWith("/")) return href;
  const id = href.replace(/^#/, "");
  return `/#${id}`;
}

export function isSectionNavHref(href: string): boolean {
  return href.startsWith("#");
}
