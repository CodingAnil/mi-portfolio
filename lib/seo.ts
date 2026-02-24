import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anilkumar.dev";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anil Kumar – Senior MERN Stack Developer",
    template: "%s | Anil Kumar",
  },
  description:
    "Senior MERN Stack Developer with 4+ years of experience building scalable SaaS platforms, AI-powered systems, and high-performance web applications. Delivered 18+ production projects and 400+ APIs.",
  keywords: [
    "MERN Stack Developer",
    "Senior Developer",
    "Node.js",
    "NestJS",
    "React",
    "Next.js",
    "MongoDB",
    "TypeScript",
    "SaaS",
    "AI",
    "Backend Developer",
    "Full Stack Developer",
    "Anil Kumar",
    "Mohali",
    "India",
  ],
  authors: [{ name: "Anil Kumar", url: baseUrl }],
  creator: "Anil Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Anil Kumar – Portfolio",
    title: "Anil Kumar – Senior MERN Stack Developer",
    description:
      "Senior MERN Stack Developer with 4+ years experience in SaaS, AI, and multi-tenant platforms. Delivered 18+ production systems and 400+ APIs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anil Kumar – Senior MERN Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anil Kumar – Senior MERN Stack Developer",
    description:
      "Senior MERN Stack Developer with 4+ years experience in SaaS, AI, and multi-tenant platforms.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
