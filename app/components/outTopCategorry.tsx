import { getCategories } from "@/lib/categories";
import React from "react";
import { TopCategories } from "./topCategory";

export const OurTopCategory = async () => {
  const res = await getCategories();

  return (
    <div className="container mx-auto min-h-[30vh] md:-mt-40">
      <TopCategories categories={res.data}/>
    </div>
  );
};
