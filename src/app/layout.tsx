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
  title: "Hemendra Tripathi — Technical Lead & Product Engineer",
  description:
    "Technical Lead architecting AI-powered SaaS end to end — voice AI, multi-LLM orchestration, billing systems, and teams that ship. Answer the call.",
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
