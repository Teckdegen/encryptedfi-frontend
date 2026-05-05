import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Encrypted Finance",
  description:
    "Privacy on Flare with TEE. Private transfers, private swaps, private DeFi. Hardware-secured by Flare FCC.",
  icons: {
    icon: "https://pbs.twimg.com/profile_images/2047252841190883328/hLjV_tJa_400x400.jpg",
    shortcut: "https://pbs.twimg.com/profile_images/2047252841190883328/hLjV_tJa_400x400.jpg",
    apple: "https://pbs.twimg.com/profile_images/2047252841190883328/hLjV_tJa_400x400.jpg",
  },
  openGraph: {
    title: "EncryptedFi — Privacy on Flare with TEE",
    description: "Privacy on Flare with TEE. Private transfers, private swaps, private DeFi.",
    type: "website",
    images: [{ url: "https://pbs.twimg.com/profile_images/2047252841190883328/hLjV_tJa_400x400.jpg" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
