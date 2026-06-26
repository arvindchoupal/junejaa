import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alieya Junejaa | Alchemist Oracle",
  description:
    "Personalised Tarot, Astrology, Numerology, Energy Healing, Vastu and Soul Path guidance with Alieya Junejaa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
