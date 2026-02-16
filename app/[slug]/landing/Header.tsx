import { getBrandInfo } from "@/lib/social";
import Image from "next/image";
import { motion } from "framer-motion";

export default async function Header() {
  const res = await getBrandInfo();
  const info = res?.data;

  return (
    <header className="py-6 text-center">
      <div className="relative inline-block">
        {/* Glow effect behind logo */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-2xl scale-110" />
        
        <div className="relative">
          <Image
            src={info.logo}
            height={500}
            width={500}
            alt="Landing logo"
            className="w-56 mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
      </div>
    </header>
  );
}