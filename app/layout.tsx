import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neural Illumination Challenge",
  description:
    "Master the quantum light bulb puzzle using advanced deduction techniques. A modern, immersive puzzle game with multiple difficulty levels and scoring.",
  generator: "Next.js",
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
