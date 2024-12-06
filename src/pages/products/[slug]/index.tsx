import Head from "@/components/common/Head";
import { fakeProducts } from "@/components/constants";
import ProductDetailView from "@/views/products/ProductDetail/ProductDetailView";
import ProductNotFound from "@/views/products/ProductDetail/ProductNotFound";
import { useRouter } from "next/router";
import React from "react";

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const product = fakeProducts.filter((product) => product.id === slug)[0];

  return (
    <>
      <Head title="Product Detail" />
      {product ? <ProductDetailView product={product} /> : <ProductNotFound />}
    </>
  );
}
