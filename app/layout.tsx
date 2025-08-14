import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const orbitron = localFont({
  src: [
    {
      path: "../public/fonts/Orbitron-Black.ttf",
      weight: '900',
      style: 'normal'
    },
    {
      path: "../public/fonts/Orbitron-Bold.ttf",
      weight: '700',
      style: 'normal'
    },
    {
      path: "../public/fonts/Orbitron-Medium.ttf",
      weight: '500',
      style: 'normal'
    },
    {
      path: "../public/fonts/Orbitron-Regular.ttf",
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-orbitron'
});

export const metadata: Metadata = {
  title: "ArcFlow",
  description: "your super habit tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
