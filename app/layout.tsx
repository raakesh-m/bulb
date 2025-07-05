import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ErrorBoundary } from "@/components/error-boundary";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";

export const metadata: Metadata = {
  title: "Incandescent Light Switch Puzzle",
  description:
    "An engaging puzzle game where you must figure out which switch controls the light bulb using logic and timing. Features multiple difficulty levels and persistent statistics.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "puzzle",
    "game",
    "logic",
    "switch",
    "light",
    "incandescent",
    "brain teaser",
  ],
  authors: [{ name: "Light Switch Puzzle Team" }],
  creator: "Light Switch Puzzle Team",
  publisher: "Light Switch Puzzle",
  category: "game",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Light Switch Puzzle",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Incandescent Light Switch Puzzle",
    description:
      "An engaging puzzle game where you must figure out which switch controls the light bulb using logic and timing.",
    siteName: "Light Switch Puzzle",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Light Switch Puzzle Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Incandescent Light Switch Puzzle",
    description:
      "An engaging puzzle game where you must figure out which switch controls the light bulb using logic and timing.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1f2937",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
          <ServiceWorkerRegistration />
        </ErrorBoundary>
      </body>
    </html>
  );
}
