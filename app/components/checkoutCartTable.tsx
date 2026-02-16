import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { updateCartItems } from "@/utils/cartStorage";
import Link from "next/link";

interface CheckoutProduct {
  productPrice: number;
  quantity: number;
  selectedColor: { name: string };
  selectedProductSize: string;
  selectedVariant: {
    attributes: { color: string; size: string };
    sku: string;
    stock: number;
  };
  sku: string;
  slug: string;
  thumbnail: string;
  title: string;
}

export default function CheckoutCartTableCompact({
  products,
}: {
  products: CheckoutProduct[];
}) {
  const [cartItems, setCartItems] =
    useState<CheckoutProduct[]>(products);
  const router = useRouter();

  const handleQuantityChange = (
    index: number,
    newQuantity: number,
  ) => {
    if (newQuantity < 1) return;

    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;

    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    updateCartItems(updatedItems);
  };

  const getTotalPrice = (item: any) => {
    return (item.productPrice * item.quantity).toLocaleString(
      "en-BD",
    );
  };

  const handleGoCheckout = () => {
    const normalizedCart = cartItems.map((item) => ({
      ...item,
      quantity: Number(item.quantity),
    }));

    updateCartItems(normalizedCart);
    router.push("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-2">
                Step 1 of 3
              </p>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900">
                Your Cart
              </h1>
            </div>
            <div className="text-right">
              <p className="text-3xl lg:text-4xl font-black text-gray-900">
                {cartItems.length}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                {cartItems.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-24">
            <div className="mb-6 flex justify-center">
              <ShoppingBag className="w-20 h-20 text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Cart is Empty
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Let's add some items to get started
            </p>
            <Link href="/">
              <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Desktop */}
            <div className="lg:col-span-2">
              {/* Desktop View */}
              <div className="hidden md:block space-y-2">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all bg-white"
                  >
                    {/* Product */}
                    <div className="col-span-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="min-w-0">
                          <Link href={`/shop/${item.slug}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-black transition-colors cursor-pointer mb-1 line-clamp-2 text-sm">
                              {item.title}
                            </h3>
                          </Link>
                          <div className="flex gap-2 text-xs text-gray-500">
                            <span className="font-medium">
                              {item.selectedColor.name}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="font-medium">
                              {item.selectedProductSize}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      <span className="font-semibold text-gray-900 text-sm">
                        ৳{item.productPrice.toLocaleString("en-BD")}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              item.quantity - 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => {
                            const value =
                              parseInt(e.target.value) || 1;
                            if (value >= 1)
                              handleQuantityChange(index, value);
                          }}
                          className="w-10 h-8 text-center border-x border-gray-300 font-semibold bg-transparent text-sm outline-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              item.quantity + 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 text-center">
                      <span className="font-bold text-gray-900 text-sm">
                        ৳{getTotalPrice(item)}
                      </span>
                    </div>

                    {/* Remove */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-3 mb-4">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <div className="flex gap-2 text-xs text-gray-500 mb-2">
                          <span className="font-medium">
                            {item.selectedColor.name}
                          </span>
                          <span>•</span>
                          <span className="font-medium">
                            {item.selectedProductSize}
                          </span>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          ৳{item.productPrice.toLocaleString("en-BD")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="inline-flex items-center border border-gray-300 rounded-lg bg-gray-50">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              item.quantity - 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value =
                              parseInt(e.target.value) || 1;
                            if (value >= 1)
                              handleQuantityChange(index, value);
                          }}
                          className="w-10 h-8 text-center border-x border-gray-300 font-semibold bg-transparent text-sm outline-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              index,
                              item.quantity + 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Total
                          </p>
                          <span className="text-lg font-bold text-gray-900">
                            ৳{getTotalPrice(item)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 space-y-6">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">
                    Order Summary
                  </p>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Total
                  </h2>
                </div>

                <div className="space-y-3 py-6 border-y border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ৳{subtotal.toLocaleString("en-BD")}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-green-600">
                      Free
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-600">
                        Total Amount
                      </span>
                      <span className="text-2xl font-semibold font-black text-gray-900">
                        ৳{subtotal.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4">
                    <Link className="block" href="/checkout">
                      <button
                        onClick={handleGoCheckout}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-gray-800 transition-all hover:gap-3"
                      >
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link className="block" href="/">
                      <button className="w-full px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="text-center text-xs text-gray-500 pt-2">
                  <p>✓ Secure checkout with encrypted payment</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
