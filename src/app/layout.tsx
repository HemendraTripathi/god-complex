import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import JsonLd from "@/components/JsonLd";
import { LINKS } from "@/lib/content";
import { jsonLdGraph, personJsonLd, websiteJsonLd } from "@/lib/seo";
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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  other: {
    me: [LINKS.github, LINKS.linkedin, `mailto:${SITE.email}`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jet.variable} antialiased`}>
        <JsonLd data={jsonLdGraph([personJsonLd(), websiteJsonLd()])} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
