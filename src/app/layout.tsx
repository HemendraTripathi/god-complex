import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

const mono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono-sp",
});

export const metadata: Metadata = {
  title: "Hemendra Tripathi — Technical Lead, AI Voice Systems",
  description:
    "Hemendra Tripathi builds AI voice agents for a living. His portfolio is one: answer the call and get qualified as a hiring lead.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
