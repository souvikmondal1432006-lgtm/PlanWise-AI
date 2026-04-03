import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({ 
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "PlanWise AI",
  description: "Intelligent guidance for emergencies, studies, fitness, and goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased text-curator-on-surface`}>
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
