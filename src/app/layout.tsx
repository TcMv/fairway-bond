import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ScrollProvider } from "@/components/ScrollProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Fairway Bond | Sunshine Coast Parent-Child Golf Series",
  description:
    "A 4-round parent-child golf series across the Sunshine Coast. Alternate shot Ambrose. Register your interest.",
  openGraph: {
    title: "The Fairway Bond",
    description:
      "Sunshine Coast Parent-Child Golf Series — 4 rounds, 4 courses, one bond.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect to image CDNs */}
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
