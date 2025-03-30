import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LeftSideBar from "./components/LeftSideBar";
import RightSideBar from "./components/RightSideBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Curch",
  description: "AI search focused on research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-neutral-900`}>
        <div className="flex min-h-screen">
          <LeftSideBar />
          {children}
          <RightSideBar />
        </div>
      </body>
    </html>
  );
}
