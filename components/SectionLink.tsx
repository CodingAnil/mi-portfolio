"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  homeSectionHref,
  scrollToSectionId,
  setPendingSectionScroll,
} from "@/lib/scroll-to-section";

type Props = {
  sectionId: string;
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
};

export default function SectionLink({
  sectionId,
  className,
  children,
  onNavigate,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const id = sectionId.replace(/^#/, "");
  const href = homeSectionHref(id);

  const handleClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname === "/") {
      ev.preventDefault();
      scrollToSectionId(id);
      window.history.replaceState(null, "", href);
      return;
    }

    ev.preventDefault();
    setPendingSectionScroll(id);
    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
