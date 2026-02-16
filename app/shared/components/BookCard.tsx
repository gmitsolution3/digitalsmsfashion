"use client";

import { getCart } from "@/utils/cartStorage";
import { ShoppingCart, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export const BookCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateCart = () => {
      setCartItems(getCart());
    };

    updateCart();
    window.addEventListener("cart_updated", updateCart);

    return () => {
      window.removeEventListener("cart_updated", updateCart);
    };
  }, []);

  const cartSubtotal = cartItems.reduce(
    (acc: number, item: any) =>
      acc + item.productPrice * item.quantity,
    0,
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add your search logic here
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Search className="w-4 h-4 lg:w-5 lg:h-5 text-gray-700" />
        </button>

        {/* Cart Button */}
        <Link href="/checkoutCart" className="border-l ps-2">
          <button className="group relative">
            <div className="flex items-center gap-2 px-3 py-2 rounded transition-all duration-200">
              {/* Cart Icon with Badge */}
              <div className="relative">
                <HiOutlineShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-gray-700 group-hover:text-primary transition-colors duration-200" />

                <span className="absolute top-1 -right-1 w-4 h-4 bg-gradient-to-br from-primary to-primary/90 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {cartItems?.length > 9 ? "9+" : cartItems?.length}
                </span>
              </div>

              {/* Cart Info - Desktop */}
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className=" text-gray-700">
                  ৳{cartSubtotal}
                </span>
              </div>
            </div>
          </button>
        </Link>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="flex items-start justify-center pt-20 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300">
              {/* Search Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">
                  Search Products
                </h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="p-2 lg:p-6">
                <div className="flex items-center gap-3 border-2 border-gray-200 rounded-full bg-gray-50 focus-within:border-primary focus-within:bg-white transition-all duration-200">
                  <Search className="w-5 h-5 text-gray-400 ml-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products..."
                    autoFocus
                    className="flex-1 py-4 lg:py-4 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    className="lg:px-6 lg:py-3 p-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors mr-2 text-sm"
                  >
                    Search
                  </button>
                </div>

                {/* Quick Search Suggestions (Optional) */}
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-3">
                    Popular Searches:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Sharee",
                      "Cotton Sharee",
                      "Silk Sharee",
                      "Designer Sharee",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
