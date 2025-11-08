import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Symphonia — Digital Media & 3D Interactive Experience",
  description:
    "Symphonia is a creative digital-first media experience built with Next.js, GSAP, and Tailwind. Explore stunning 3D cube animations and smooth scroll transitions.",
  openGraph: {
    title: "Symphonia — Digital Media & 3D Interactive Experience",
    description:
      "An immersive 3D scroll experience powered by Next.js, GSAP, and Tailwind CSS.",
    url: "https://symphonia-landing-page.vercel.app/",
    siteName: "Symphonia",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Symphonia 3D Interactive Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Symphonia — Digital Media & 3D Interactive Experience",
    description:
      "3D scroll experience built with Next.js, GSAP, Lenis, and Tailwind CSS.",
    creator: "@JoyelVarghese95",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Symphonia",
              url: "https://symphonia-landing-page.vercel.app/",
              author: {
                "@type": "Person",
                name: "Joyel Varghese",
              },
              description:
                "A 3D scroll-based media website created with Next.js, GSAP, and Tailwind CSS.",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
