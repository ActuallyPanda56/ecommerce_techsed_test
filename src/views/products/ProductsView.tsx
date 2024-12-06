import { useRouter } from "next/router";
import React from "react";
import Aside from "./components/Aside";
import { fakeProducts } from "@/components/constants";
import ProductCard from "./components/ProductCard";
import useCartStore from "@/store/cart";

export default function ProductsView() {
  const router = useRouter();
  const { search } = router.query;

  const cartStore = useCartStore();

  return (
    <div className="flex flex-col md:flex-row justify-center gap-5 mt-10 container mx-auto">
      <Aside />
      <div className="flex flex-col gap-3 w-full">
        <h2 className="text-lg font-bold">
          {search ? `Productos para: ${search}` : "Todos los productos"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
          {fakeProducts.map((product, index) => (
            <ProductCard key={index} product={product} cartStore={cartStore} />
          ))}
        </div>
      </div>
    </div>
  );
}
