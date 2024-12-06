import Head from "@/components/common/Head";
import ProductsView from "@/views/products/ProductsView";
import React from "react";

export default function Products() {
  return (
    <>
      <Head title="Products" />
      <ProductsView />
    </>
  );
}
