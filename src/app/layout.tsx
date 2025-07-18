"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-fredoka",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <motion.div
          key={pathname}
          initial={{ x: "100%", opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      </body>
    </html>
  );
}
