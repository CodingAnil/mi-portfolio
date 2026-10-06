"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  consumePendingSectionScroll,
  scrollToSectionId,
  sectionIdFromHash,
} from "@/lib/scroll-to-section";

function runScroll(id: string, attempt = 0) {
  if (scrollToSectionId(id)) return;
  if (attempt >= 12) return;
  window.setTimeout(() => runScroll(id, attempt + 1), 50);
}

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const fromStorage = consumePendingSectionScroll();
    const fromHash = sectionIdFromHash(window.location.hash);
    const id = fromStorage ?? fromHash;
    if (!id) return;

    requestAnimationFrame(() => runScroll(id));
  }, [pathname]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.pathname !== "/") return;
      const id = sectionIdFromHash(window.location.hash);
      if (id) runScroll(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
