import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CursorGlow } from "@/components/layout/cursor-glow";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://athletix.app"),
  title: {
    default: "ATHLETIX — Play Beyond Limits · Sports Booking Across the GTA",
    template: "%s · ATHLETIX",
  },
  description:
    "Discover, reserve and play across every premium sports venue in the Greater Toronto Area. Cricket, badminton, soccer, pickleball, hockey & more — booked in seconds.",
  keywords: [
    "sports booking",
    "GTA",
    "Toronto",
    "Brampton",
    "Mississauga",
    "Vaughan",
    "Markham",
    "cricket booking",
    "badminton",
    "pickleball",
    "soccer turf",
    "ice hockey",
  ],
  openGraph: {
    type: "website",
    url: "https://athletix.app",
    title: "ATHLETIX — Play Beyond Limits",
    description:
      "Premium sports venues across the GTA. Discover. Book. Play.",
    siteName: "ATHLETIX",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATHLETIX — Play Beyond Limits",
    description: "Premium sports venues across the GTA.",
  },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-ink-950 text-ink-50 antialiased">
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
