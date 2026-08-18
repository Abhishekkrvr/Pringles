import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "POP. STACK. CRUNCH. — A Pringles Flavor Ride",
  description:
    "A scroll-powered 3D flavor showcase built with Next.js, GSAP, Framer Motion, and Lenis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
