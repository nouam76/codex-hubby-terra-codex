import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Codex Hub by TerraCodex",
  description:
    "Applications SaaS • IA • Automatisation • Digitalisation métier — Codex Hub by TerraCodex",
  keywords: [
    "SaaS",
    "TerraCodex",
    "Codex Hub",
    "IA",
    "Automatisation",
    "Digitalisation",
  ],
  authors: [{ name: "TerraCodex" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Codex Hub by TerraCodex",
    description:
      "Applications SaaS • IA • Automatisation • Digitalisation métier",
    siteName: "Codex Hub",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
