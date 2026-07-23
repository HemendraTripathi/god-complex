import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
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
  title: "Hemendra Tripathi — Technical Lead · AI Voice Systems",
  description:
    "Technical Lead who scaled Callin.io to 1,500+ paying customers. Multi-LLM orchestration, real-time voice AI, usage-based billing, and teams that ship. Case study + live agent demo.",
  openGraph: {
    title: "Hemendra Tripathi — Technical Lead · AI Voice Systems",
    description:
      "From first commit to paying customers. Architecture, billing, teams, revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jet.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
