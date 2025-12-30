import "@/styles/main.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Workora – Lightweight Job Board",
  description:
    "Browse and post jobs easily with Workora, a simple and modern job board built with Next.js and Tailwind CSS.",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
