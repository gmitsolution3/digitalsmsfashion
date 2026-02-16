import Image from "next/image";
import { getProductDetails } from "@/lib/products";
import ProductHero from "./ProductThumbnail";
import ProductFeatures from "./ProductFeature";
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-slate-50">
        <div className="text-center p-8 space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
            Product Not Found
          </h1>
          <p className="text-lg text-slate-600">
            The product you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
      </div>
      <ProductHero product={product} />
      <ProductFeatures />
      <ProductSpecs product={product} />
    </main>
  );
}
