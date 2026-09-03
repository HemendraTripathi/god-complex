import { FAQS, LINKS } from "@/lib/content";
import { SITE, SITE_URL } from "@/lib/site";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PROFILE_PATH = "/hemendra-tripathi";
export const PROFILE_URL = `${SITE_URL}${PROFILE_PATH}`;
export const FIRST_NAME_PATH = "/hemendra";
export const FIRST_NAME_URL = `${SITE_URL}${FIRST_NAME_PATH}`;
export const CASE_PATH = "/work/callin-io";
export const CASE_URL = `${SITE_URL}${CASE_PATH}`;
export const HIRE_PATH = "/hire";
export const HIRE_URL = `${SITE_URL}${HIRE_PATH}`;
export const PORTRAIT_PATH = "/images/hemendra-tripathi-technical-lead.webp";
export const PORTRAIT_URL = `${SITE_URL}${PORTRAIT_PATH}`;
export const PORTRAIT_BATMAN_PATH = "/images/hemendra-tripathi-batman.webp";

export const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "Hemendra Tripathi, technical lead and AI Voice Engineer",
} as const;

export const SAME_AS = [
  LINKS.github,
  LINKS.linkedin,
  LINKS.twitter,
  LINKS.reddit,
  LINKS.callin,
] as const;

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    givenName: "Hemendra",
    familyName: "Tripathi",
    alternateName: [
      "Hemendra",
      "Hemendra Tripathi Udaipur",
      "Hemendra Callin.io",
      "Hemendra Tripathi Callin.io",
      "Hemendra Tripathi Appspundit Infotech",
    ],
    url: SITE_URL,
    image: {
      "@type": "ImageObject",
      url: PORTRAIT_URL,
      contentUrl: PORTRAIT_URL,
      caption: "Hemendra Tripathi, technical lead and AI engineer in Udaipur",
    },
    jobTitle: SITE.jobTitle,
    description: SITE.description,
    email: `mailto:${SITE.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Udaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    nationality: {
      "@type": "Country",
      name: "India",
    },
    homeLocation: {
      "@type": "Place",
      name: "Udaipur, Rajasthan, India",
    },
    knowsLanguage: ["en", "hi"],
    sameAs: [...SAME_AS],
    knowsAbout: [
      "AI Voice Engineer",
      "AI Engineer",
      "AI voice systems",
      "voice AI technical lead",
      "Multi-LLM orchestration",
      "Usage-based billing",
      "Full-stack engineering",
      "Technical leadership",
      "Real-time telephony",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Rajasthan Vidyapeeth",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Mohanlal Sukhadia University",
      },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Appspundit Infotech",
      url: LINKS.callin,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Technical Lead",
      alternateName: ["AI Engineer", "AI Voice Engineer", "Voice AI Technical Lead"],
      description:
        "Technical lead and AI engineer: architecture, billing, hiring, and multi-LLM voice agents as an AI Voice Engineer.",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    alternateName: ["me.readwith.io", "Hemendra", "Hemendra Tripathi portfolio"],
    url: SITE_URL,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };
}

export function profilePageJsonLd(url: string, pageId: string) {
  return {
    "@type": "ProfilePage",
    "@id": pageId,
    url,
    name: SITE.name,
    inLanguage: "en",
    about: { "@id": PERSON_ID },
    mainEntity: { "@id": PERSON_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: PORTRAIT_URL,
    },
  };
}

export function webPageJsonLd({
  url,
  pageId,
  name,
  description,
}: {
  url: string;
  pageId: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": pageId,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: PORTRAIT_URL,
    },
  };
}

export function caseStudyJsonLd() {
  return {
    "@type": "Article",
    "@id": `${CASE_URL}#article`,
    headline: SITE.caseTitle,
    description: SITE.caseDescription,
    url: CASE_URL,
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": CASE_URL },
    isPartOf: { "@id": WEBSITE_ID },
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/work-callin.png`,
    },
    keywords:
      "AI Voice Engineer, voice AI case study, multi-LLM orchestration, Callin.io, usage-based billing",
  };
}

export function faqJsonLd(
  items: readonly { question: string; answer: string }[] = FAQS,
) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; item: string }[] = [
    { name: "Home", item: SITE_URL },
    { name: SITE.name, item: PROFILE_URL },
  ],
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

export function writingCollectionJsonLd(postCount: number) {
  return {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/writing#collection`,
    url: `${SITE_URL}/writing`,
    name: "Writing",
    description:
      "Essays on technical leadership, shipping products, and how Hemendra Tripathi thinks about engineering.",
    inLanguage: "en",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    numberOfItems: postCount,
  };
}

export function blogPostingJsonLd({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  imageUrl,
  tags,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  tags?: string[];
}) {
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    inLanguage: "en",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${SITE_URL}/writing#collection` },
    image: {
      "@type": "ImageObject",
      url: imageUrl || `${SITE_URL}${SHARE_IMAGE.url}`,
    },
    ...(tags?.length ? { keywords: tags.join(", ") } : {}),
  };
}

export function jsonLdGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
