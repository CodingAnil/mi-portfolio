import { EDUCATION, EXPERIENCE, PERSONAL, SKILLS } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";

/**
 * Person + WebSite JSON-LD for the site root.
 * Every value is derived from lib/constants.ts so the markup can never drift
 * from what the page actually says.
 */
export function buildStructuredData() {
  const personId = `${SITE_URL}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: PERSONAL.name,
        jobTitle: PERSONAL.title,
        description: PERSONAL.tagline,
        url: SITE_URL,
        image: `${SITE_URL}/images/profile.jpg`,
        email: `mailto:${PERSONAL.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mohali",
          addressRegion: "Punjab",
          addressCountry: "IN",
        },
        sameAs: [PERSONAL.github, PERSONAL.linkedin],
        worksFor: {
          "@type": "Organization",
          name: EXPERIENCE[0].company,
        },
        alumniOf: EDUCATION.map((item) => ({
          "@type": "EducationalOrganization",
          name: item.institution,
        })),
        // Technologies only — the "Coding & AI Tools" category lists editors,
        // which are tools used rather than areas of expertise.
        knowsAbout: SKILLS.filter(
          (category) => category.category !== "Coding & AI Tools",
        ).flatMap((category) => category.items),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${PERSONAL.name} – Portfolio`,
        description: PERSONAL.tagline,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    ],
  };
}
