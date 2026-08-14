import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { FAQS, LINKS } from "@/lib/content";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jet",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE.title,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: SITE.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE.title,
    description: SITE.shortDescription,
    url: SITE_URL,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE_URL,
  image: `${SITE_URL}/images/hemendra-tripathi-technical-lead.png`,
  jobTitle: SITE.jobTitle,
  description: SITE.description,
  email: `mailto:${SITE.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Udaipur",
    addressCountry: "IN",
  },
  sameAs: [LINKS.github, LINKS.linkedin, LINKS.callin],
  knowsAbout: [
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
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE_URL,
  description: SITE.description,
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    name: SITE.name,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jet.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd, faqJsonLd]),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
