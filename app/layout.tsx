import type { Metadata } from "next";
import { Cinzel, Manrope, JetBrains_Mono } from "next/font/google";
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
    <html lang="en" className={`${cinzel.variable} ${manrope.variable} ${jetbrains.variable}`}>
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
