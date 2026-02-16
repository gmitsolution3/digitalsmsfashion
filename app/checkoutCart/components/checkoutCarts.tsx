"use client";

import React, { useEffect, useState } from "react";
import { getCart } from "@/utils/cartStorage";
import CheckoutCartTable from "@/app/components/checkoutCartTable";
import { ComLogo } from "@/app/shared/components/ComLogo";
import Image from "next/image";
import Link from "next/link";

export const CheckoutCart = ({ brandInfo }: any) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      setCartData(getCart());
    };
    updateCart();
    window.addEventListener("cart_updated", updateCart);
    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="border-b border-gray-200 sticky top-0 z-40 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href={"/"}>
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="p-2">
                <Image
                  src={brandInfo.logo}
                  alt={brandInfo.name}
                  width={90}
                  height={45}
                />
              </div>
            </div>
          </Link>
          <div className="text-right">
            <h1 className="text-sm font-semibold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-xs text-gray-500">Secure Checkout</p>
          </div>
        </div>
      </header>

      {cartData === undefined || cartData.length === 0 ? (
        <div className="min-h-[calc(100vh-100px)] flex justify-center items-center">
          <CheckoutCartTable products={cartData || []} />
        </div>
      ) : (
        <CheckoutCartTable products={cartData} />
      )}
    </div>
  );
};
