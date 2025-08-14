import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { orbitron } from "@/lib/font";

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