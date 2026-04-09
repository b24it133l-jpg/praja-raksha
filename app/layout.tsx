import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SOSButton from "@/components/SOSButton";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "Praja Raksha | Telangana Grievance Portal",
    template: "%s | Praja Raksha",
  },
  description: "Advanced AI-powered grievance reporting and service platform for the citizens of Telangana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable}`}>
      <body className="font-outfit antialiased">
        <div className="app-shell">
          <Navbar />
          <main className="main-shell">{children}</main>
        </div>
        <SOSButton />
      </body>
    </html>
  );
}