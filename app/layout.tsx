import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { defaultMetadata } from "@/lib/seo";
import { buildStructuredData } from "@/lib/structured-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";
import CursorGlow from "@/components/CursorGlow";
import HashScrollHandler from "@/components/HashScrollHandler";
import OpenToWorkBadge from "@/components/OpenToWorkBadge";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth light`} suppressHydrationWarning>
      <body className="font-sans bg-bg-primary text-text-primary antialiased selection:bg-accent-cyan/25 overflow-x-hidden">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("portfolio-theme")==="dark"){document.documentElement.classList.remove("light");}}catch(e){}`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData()),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:border focus:border-accent-cyan/40 focus:bg-bg-card focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-accent-cyan"
        >
          Skip to content
        </a>
        <ParticleCanvas />
        <CursorGlow />
        <HashScrollHandler />
        <Navbar />
        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 focus:outline-none"
        >
          {children}
        </main>
        <Footer />
        <OpenToWorkBadge />
      </body>
    </html>
  );
}
