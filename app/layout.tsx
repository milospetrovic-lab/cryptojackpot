import type { Metadata, Viewport } from "next";
import { Cinzel, Manrope, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Atmosphere } from "@/components/layout/Atmosphere";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Prevent horizontal pan / unintentional pinch-zoom beyond 1× that was
  // exposing overflow on mobile. The user can still double-tap to zoom.
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "cryptojackpot — where the molten meets the jackpot.",
  description:
    "The Vulcan VIP crypto casino. Every Spin rings the Vault — gold, black, molten red. Built for the high-roller lounge at 2am.",
  metadataBase: new URL("https://site-v1-five.vercel.app"),
  openGraph: {
    title: "cryptojackpot",
    description: "Where the molten meets the jackpot.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${manrope.variable} ${jetbrains.variable} ${bebas.variable}`}>
      <body>
        <Atmosphere />
        <ScrollProgress />
        <Preloader />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
