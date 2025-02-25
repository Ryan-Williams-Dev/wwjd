import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fredoka = localFont({
  src: [
    {
      path: "./fonts/Fredoka-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Fredoka-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "What Would Jesus Do?",
  description: "Find out how Jesus would handle your problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fredoka.variable}>{children}</body>
    </html>
  );
}
