import Image from "next/image";
import { getProductDetails } from "@/lib/products";
import ProductHero from "./ProductHero";
import ProductFeature from "./ProductFeature";
import ProductSpecs from "./ProductSpecs";
import Header from "./Header";

export default async function ProductLanding({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: product } = await getProductDetails(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="text-center p-8 space-y-6 relative z-10">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-2xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
            Product Not Found
          </h1>
          <p className="text-xl text-slate-600 max-w-md mx-auto leading-relaxed">
            The product you're looking for doesn't exist or has been removed from our catalog.
          </p>
          <button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />
      </div>
      <ProductHero product={product} />
      <ProductFeature />
      <ProductSpecs product={product} />
      
      {/* Footer CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90  to-primary/70 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Make It Yours?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for quality products and exceptional service.
          </p>
          <button
            className="px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Order Now
          </button>
        </div>
      </section>
    </main>
  );
}