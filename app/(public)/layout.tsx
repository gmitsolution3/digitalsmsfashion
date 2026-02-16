import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../shared/navbar/page";
import { ToastContainer } from "react-toastify";
import { MenuNavbar } from "../shared/components/Menu";
import ShowFooter from "../shared/components/showFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital SMS Fashion",
  description: "Handcrafted Elegance, Woven with Tradition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen">
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
      <div>
        <ShowFooter />
      </div>
    </div>
  );
}
