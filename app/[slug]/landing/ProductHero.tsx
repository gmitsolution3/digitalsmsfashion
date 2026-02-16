"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Sparkles, Package } from "lucide-react";
import { addToCart, clearCart } from "@/utils/cartStorage";
import { fbEvent } from "@/utils/fbPixel";
import { useRouter } from "next/navigation";

export interface ProductVariant {
  attributes: {
    color: string;
    size: string;
  };
  sku: string;
  stock: number;
  price?: string;
}

export interface ProductDiscount {
  type: "percentage" | "fixed";
  value: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  basePrice: string;
  discount: ProductDiscount;
  sku: string;
  stockQuantity: string;
  stockStatus: "in-stock" | "out-of-stock" | "low-stock";
  categoryId?: string;
  subCategoryId?: string | null;
  category: string;
  subCategory?: string;
  tags: string[];
  thumbnail: string;
  gallery: string[];
  variants: ProductVariant[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  purchase?: string;
}

interface ProductHeroProps {
  product: Product;
}

const ProductHero = ({ product }: ProductHeroProps) => {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(true);

  const router = useRouter();
  const allImages = [product.thumbnail, ...product.gallery];

  // Calculate discounted price
  const basePrice = parseFloat(product.basePrice);
  const discountValue = parseFloat(product.discount.value);
  const discountedPrice =
    product.discount.type === "percentage"
      ? basePrice - (basePrice * discountValue) / 100
      : basePrice - discountValue;

  // Get unique colors from variants
  const colors = [...new Set(product.variants.map((v) => v.attributes.color))];

  // Get sizes for selected color
  const selectedColor = product.variants[selectedVariant]?.attributes.color;
  const sizesForColor = product.variants
    .filter((v) => v.attributes.color === selectedColor)
    .map((v) => v.attributes.size);

  const isInStock = product.stockStatus === "in-stock";

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Select a size first.");
      return;
    }

    clearCart();

    const orderData = {
      selectedProductSize: selectedSize,
      quantity,
      selectedColor: {
        name: selectedColor,
      },
      selectedVariant: product.variants[selectedVariant],
      sku: product.sku,
      productPrice: Number(product.purchase),
      slug: product.slug,
      title: product.title,
      thumbnail: product.thumbnail,
    };

    addToCart(orderData);

    fbEvent("InitiateCheckout", {
      content_ids: [orderData.sku || orderData.slug],
      content_type: "product",
      content_name: orderData.title,
      value: orderData.productPrice,
      currency: "BDT",
    });

    router.push("/checkout");
  };

  return (
    <section className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-amber-400/20 to-rose-400/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:sticky lg:top-8"
          >
            {/* Main Image Container */}
            <div className="relative aspect-square max-w-[600px] mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/50"
                >
                  {imageLoading && (
                    <div className="absolute inset-0 bg-primary animate-pulse" />
                  )}
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoading(false)}
                  />
                  
                  {/* Floating badge with animation */}
                  {parseFloat(product.discount.value) > 0 && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="absolute top-6 right-6 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg"
                    >
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>{product.discount.value}% OFF</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Stock badge */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-6 left-6"
                  >
                    {isInStock ? (
                      <div className="px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        <span className="text-sm">In Stock</span>
                      </div>
                    ) : (
                      <div className="px-4 py-2 bg-slate-800/90 backdrop-blur-sm text-white font-semibold rounded-xl shadow-lg">
                        <span className="text-sm">Out of Stock</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex gap-3 mt-6 justify-center flex-wrap px-4"
            >
              {allImages.slice(0, 5).map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedImage(img);
                    setImageLoading(true);
                  }}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                    selectedImage === img
                      ? "ring-4 ring-primary shadow-lg shadow-blue-500/30"
                      : "ring-2 ring-slate-200 hover:ring-slate-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === img && (
                    <motion.div
                      layoutId="thumbnail-indicator"
                      className="absolute inset-0 bg-blue-500/20"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Category & Tags */}
            <div className="flex flex-wrap gap-2">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-400 text-white rounded-full uppercase tracking-wider shadow-md"
              >
                {product.category}
              </motion.span>
              {product.tags.slice(0, 2).map((tag, idx) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                  className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-3 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent"
              >
                {product.title}
              </motion.h1>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-1.5 w-24 bg-primary rounded-full origin-left"
              />
            </div>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-slate-600 text-lg leading-relaxed whitespace-pre-line"
            >
              {product.shortDescription}
            </motion.p>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200/50"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black bg-primary bg-clip-text text-transparent font-semibold">
                  ৳{discountedPrice.toLocaleString()}
                </span>
                {parseFloat(product.discount.value) > 0 && (
                  <>
                    <span className="text-2xl text-slate-400 line-through">
                      ৳{basePrice.toLocaleString()}
                    </span>
                  </>
                )}
              </div>
              {parseFloat(product.discount.value) > 0 && (
                <div className="ml-auto px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl text-sm shadow-md">
                  Save ৳{(basePrice - discountedPrice).toLocaleString()}
                </div>
              )}
            </motion.div>

            {/* Color Selector */}
            {colors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="space-y-3"
              >
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Color: <span className="text-primary">{selectedColor}</span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color) => {
                    const variantIndex = product.variants.findIndex(
                      (v) => v.attributes.color === color
                    );
                    const isSelected = selectedVariant === variantIndex;
                    return (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedVariant(variantIndex)}
                        className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                          isSelected
                            ? "bg-primary text-white shadow-lg shadow-blue-500/30"
                            : "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        {color}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Size Selector */}
            {sizesForColor.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="space-y-3"
              >
                <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                  Select Size
                </p>
                <div className="flex gap-3 flex-wrap">
                  {sizesForColor[0].split(",").map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size.trim())}
                      className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        selectedSize === size.trim()
                          ? "bg-primary text-white shadow-lg shadow-blue-500/30"
                          : "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md"
                      }`}
                    >
                      {size.trim()}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-3"
            >
              <p className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
                Quantity
              </p>
              <div className="inline-flex items-center bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <motion.button
                  whileHover={{ backgroundColor: "#f1f5f9" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDecrease}
                  className="px-6 py-4 font-bold text-slate-700 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </motion.button>

                <div className="px-8 py-4 border-x-2 border-slate-200 font-bold text-xl text-slate-900 min-w-[80px] text-center">
                  {quantity}
                </div>

                <motion.button
                  whileHover={{ backgroundColor: "#f1f5f9" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleIncrease}
                  className="px-6 py-4 font-bold text-slate-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={!isInStock}
                onClick={handleBuyNow}
                className="w-full p-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>Buy Now</span>
              </motion.button>

              {/* Stock Info */}
              <div className="flex items-center justify-center gap-2 text-sm mt-4">
                {isInStock ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                    />
                    <span className="text-slate-700 font-medium">
                      In Stock - {product.stockQuantity} available
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-rose-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>
            </motion.div>

            {/* Full Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="pt-8 mt-8 border-t-2 border-slate-200"
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                Product Details
              </h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
                {product.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;