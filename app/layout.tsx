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
  title: "Encrypted Fi — The Encrypted Layer for ERC20s",
  description:
    "We bring privacy to ERC20s. Confidential token transfers, private balances, and encrypted allowances — powered by ZK-SNARKs. No trust required.",
  icons: {
    // transparent-bg PNG — sits cleanly on any browser tab colour
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Encrypted Fi",
    description: "The encrypted layer for ERC20s.",
    type: "website",
    images: [{ url: "https://image2url.com/r2/default/images/1771926217635-c1e1a97f-34e6-4723-a7ab-946eb5a5feac.png" }],
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
