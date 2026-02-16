"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const MenuNavbar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (id: string) => {
    setActiveCategory(id);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "home";
    setActiveCategory(lastSegment);
  }, []);

  return (
    <>
      {/* Desktop Navigation - Hidden on tablet and below */}
      <nav className="hidden xl:block">
        <ul className="flex items-center justify-center gap-1 py-0">
          {/* Home */}
          <li>
            <Link href="/">
              <button
                onClick={() => handleClick("home")}
                className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group"
              >
                <span
                  className={activeCategory === "home" ? "text-primary" : ""}
                >
                  Home
                </span>
                <span
                  className={`absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    activeCategory === "home"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            </Link>
          </li>

          {/* All Products */}
          <li>
            <Link href="/shop/all">
              <button
                onClick={() => handleClick("all")}
                className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group"
              >
                <span
                  className={activeCategory === "all" ? "text-primary" : ""}
                >
                  All Products
                </span>
                <span
                  className={`absolute bottom-0 left-0 right-0 mx-auto w-[80%] h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    activeCategory === "all"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
            </Link>
          </li>

          {/* Dynamic Categories */}
          {categories && categories.length > 0 ? (
            categories.map((category: any) => (
              <li key={category._id}>
                <Link href={`/shop/${category._id}`}>
                  <button
                    onClick={() => handleClick(category._id)}
                    className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group capitalize"
                  >
                    <span
                      className={
                        activeCategory === category._id ? "text-primary" : ""
                      }
                    >
                      {category.name}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                        activeCategory === category._id
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </button>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-6 py-4 text-sm text-gray-400">
              No categories available
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Menu Button and Dropdown */}
      <div className="xl:hidden relative">
        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 rounded-lg hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
          <span className="text-sm font-semibold hidden sm:inline">
            {isOpen ? "Close" : "Menu"}
          </span>
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            <nav className="space-y-1">
              {/* Home */}
              <Link href="/">
                <button
                  onClick={() => handleClick("home")}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    activeCategory === "home"
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Home
                </button>
              </Link>

              {/* All Products */}
              <Link href="/shop/all">
                <button
                  onClick={() => handleClick("all")}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    activeCategory === "all"
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  All Products
                </button>
              </Link>

              {/* Dynamic Categories */}
              {categories && categories.length > 0 ? (
                categories.map((category: any) => (
                  <Link
                    href={`/shop/${category._id}`}
                    key={category._id}
                  >
                    <button
                      onClick={() => handleClick(category._id)}
                      className={`w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-200 capitalize ${
                        activeCategory === category._id
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-400">
                  No categories available
                </p>
              )}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};