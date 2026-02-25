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
  title: "Encrypted Fi — Privacy for Your Tokens",
  description:
    "We bring privacy to the tokens you already use. Confidential transfers, private balances, and encrypted allowances — powered by ZK-SNARKs. No trust required.",
  icons: {
    icon: "https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png",
    shortcut: "https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png",
    apple: "https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png",
  },
  openGraph: {
    title: "Encrypted Fi",
    description: "Privacy for the tokens you already use.",
    type: "website",
    images: [{ url: "https://image2url.com/r2/default/images/1771982865555-91a426af-ecd8-4ca9-8e6b-11372ff845bf.png" }],
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
