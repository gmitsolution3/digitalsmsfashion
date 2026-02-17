"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const MenuNavbar = ({ categories }: any) => {
  const [activeCategory, setActiveCategory] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  const CATEGORY_SLOTS = 3; // Show 3 categories + Home + All Products = 5 total

  const visibleCategories =
    categories?.slice(0, CATEGORY_SLOTS) || [];
  const moreCategories = categories?.slice(CATEGORY_SLOTS) || [];
  const hasMoreItems = moreCategories.length > 0;

  const handleClick = (id: string) => {
    setActiveCategory(id);
    setIsOpen(false);
    setIsMoreOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMoreDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMoreOpen(!isMoreOpen);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "home";
    setActiveCategory(lastSegment);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation - Hidden on tablet and below */}
      <nav className="hidden xl:flex items-center justify-start gap-1 py-0 px-4">
        {/* Home */}
        <Link href="/">
          <button
            onClick={() => handleClick("home")}
            className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group"
          >
            <span
              className={
                activeCategory === "home" ? "text-primary" : ""
              }
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

        {/* All Products */}
        <Link href="/shop/all">
          <button
            onClick={() => handleClick("all")}
            className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group"
          >
            <span
              className={
                activeCategory === "all" ? "text-primary" : ""
              }
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

        {/* Visible Categories (First 3) */}
        {visibleCategories.map((category: any) => (
          <Link key={category._id} href={`/shop/${category._id}`}>
            <button
              onClick={() => handleClick(category._id)}
              className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group capitalize"
            >
              <span
                className={
                  activeCategory === category._id
                    ? "text-primary"
                    : ""
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
        ))}

        {/* More Categories Dropdown */}
        {hasMoreItems && (
          <div ref={moreDropdownRef} className="relative">
            <button
              onClick={toggleMoreDropdown}
              className="relative px-3 py-2 text-base font-semibold uppercase text-gray-700 hover:text-primary transition-colors duration-200 group"
            >
              <span>...</span>
            </button>

            {/* Dropdown Menu */}
            {isMoreOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-max">
                {moreCategories.map((category: any) => (
                  <Link
                    href={`/shop/${category._id}`}
                    key={category._id}
                  >
                    <button
                      onClick={() => handleClick(category._id)}
                      className={`block w-full text-left px-4 py-2 text-sm font-semibold transition-all duration-200 capitalize ${
                        activeCategory === category._id
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
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
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
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

              {/* All Categories */}
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
