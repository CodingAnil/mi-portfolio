import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { defaultMetadata } from "@/lib/seo";
import { buildStructuredData } from "@/lib/structured-data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";
import CursorGlow from "@/components/CursorGlow";
import JellyfishCursor from "@/components/JellyfishCursor";
import ScorpionCursor from "@/components/ScorpionCursor";

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
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0a0e1a] text-[#f1f5f9] antialiased selection:bg-brand-blue/30 overflow-x-hidden">
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
        <ScorpionCursor />
        <JellyfishCursor />
        <Navbar />
        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 focus:outline-none"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
