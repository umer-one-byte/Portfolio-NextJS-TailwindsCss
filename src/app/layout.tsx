import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Umer Alam — Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in Laravel, Next.js & Nuxt.js. Secure, high-performance APIs and production CRMs / SaaS platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
