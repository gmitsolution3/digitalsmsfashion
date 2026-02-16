"use client";

import { motion } from "framer-motion";
import { Package, Palette, Ruler, Tag, Hash, Layers } from "lucide-react";

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

interface ProductSpecsProps {
  product: Product;
}

const ProductSpecs = ({ product }: ProductSpecsProps) => {
  // Build specs with icons
  const specs = [
    { icon: Hash, label: "SKU", value: product.sku, color: "from-blue-500 to-cyan-500" },
    { icon: Layers, label: "Category", value: product.category, color: "from-purple-500 to-pink-500" },
    ...(product.subCategory ? [{ icon: Layers, label: "Sub Category", value: product.subCategory, color: "from-indigo-500 to-purple-500" }] : []),
    { 
      icon: Palette, 
      label: "Available Colors", 
      value: [...new Set(product.variants.map((v) => v.attributes.color))].join(", "),
      color: "from-rose-500 to-orange-500"
    },
    { 
      icon: Ruler, 
      label: "Available Sizes", 
      value: [...new Set(product.variants.flatMap((v) => v.attributes.size.split(",")))].map(s => s.trim()).join(", "),
      color: "from-emerald-500 to-teal-500"
    },
    { icon: Package, label: "Total Stock", value: product.stockQuantity + " units", color: "from-amber-500 to-orange-500" },
    { icon: Tag, label: "Tags", value: product.tags.join(", "), color: "from-violet-500 to-purple-500" },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mb-4"
          >
            <span className="text-sm font-bold bg-primary bg-clip-text text-transparent uppercase tracking-wider">
              Specifications
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Product Information
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Specs List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-0 bg-gradient-to-br from-slate-50 to-white rounded-3xl overflow-hidden shadow-xl border border-slate-200"
          >
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className={`group flex items-center gap-4 p-6 ${
                  index !== specs.length - 1 ? "border-b border-slate-200" : ""
                } hover:bg-white transition-all duration-300 cursor-default`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                  <spec.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {spec.label}
                  </div>
                  <div className="font-semibold text-slate-900 text-lg break-words">
                    {spec.value}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Variants Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Available Variants</h3>
            </div>

            <div className="space-y-4">
              {product.variants.map((variant, index) => (
                <motion.div
                  key={variant.sku}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -mr-16 -mt-16" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                          Color
                        </div>
                        <div className="font-bold text-xl text-slate-900">
                          {variant.attributes.color}
                        </div>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${
                          variant.stock > 10
                            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                            : variant.stock > 0
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                            : "bg-gradient-to-r from-slate-400 to-slate-500 text-white"
                        }`}
                      >
                        {variant.stock > 0 ? `${variant.stock} in stock` : "Out of stock"}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Ruler className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Sizes: <span className="text-slate-900 font-semibold">{variant.attributes.size}</span>
                        </span>
                      </div>
                    </div>

                    {variant.price && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm text-slate-500 font-medium">Special Price:</span>
                          <span className="text-2xl font-bold bg-primary bg-clip-text text-transparent">
                            ৳{parseFloat(variant.price).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total variants count */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="p-6 rounded-2xl bg-primary text-white shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold opacity-90 mb-1">Total Variants</div>
                  <div className="text-4xl font-bold">{product.variants.length}</div>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Layers className="w-8 h-8" strokeWidth={2.5} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;