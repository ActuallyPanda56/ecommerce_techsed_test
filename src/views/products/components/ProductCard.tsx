import { Product } from "@/components/constants";
import { CartState } from "@/store/cart";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

interface ProductCardProps {
  product: Product;
  cartStore: CartState;
}

// Link Element Loads On Client Side because it causes Hydration Failures due to Image Load
export default function ProductCard({ product, cartStore }: ProductCardProps) {
  const [isClient, setIsClient] = useState(false);
  const formattedPrice = formatPrice(product.price);
  const formattedDiscount =
    product.listingPrice && formatPrice(product.listingPrice);
  const isInCart = cartStore.cart.items.some(
    (item) => item.product.id === product.id
  );

  const handleAddToCart = () => {
    cartStore.addItem(product, 1);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0].src
      : "/assets/products/not_found.png";
  const imageAlt =
    product.images && product.images.length > 0
      ? product.images[0].alt
      : "Product Image";

  const linkContent = (
    <div className="flex max-w-xs cursor-pointer flex-col justify-around gap-2 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-transform transform shadow-sm hover:shadow-lg w-48 h-96 relative">
      <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-100">
        <Image
          src={imageSrc}
          alt={imageAlt}
          className="object-cover object-center transition-all duration-300 hover:scale-110 w-full h-full"
          width={256}
          height={256}
        />
      </div>
      <div className="flex flex-col justify-between py-2">
        <div className="mt-3 flex flex-col ">
          <div>
            <span className="text-lg font-black mt-2">${formattedPrice}</span>
            {formattedDiscount && (
              <span className="text-sm text-gray-500 line-through ml-1">
                ${formattedDiscount}
              </span>
            )}
          </div>
          <h3 className="text-xxs font-semibold text-gray-800 line-clamp-2 h-8">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 h-8">
            {product.description}
          </p>
        </div>

        {isInCart ? (
          <button className="mt-4 w-full rounded-full border-2 border-primary py-2 text-center text-xs font-medium transition-colors hover:bg-primary hover:text-background">
            Ya en tu carrito
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            className="mt-4 w-full rounded-full border-2 border-primary py-2 text-center text-xs font-medium transition-colors hover:bg-primary hover:text-background flex justify-center items-center gap-2"
          >
            Añadir al carrito
            <FiShoppingCart />
          </button>
        )}

        {product.listingPrice && (
          <span className=" px-2 py-0.5 rounded-lg bg-info text-background text-nowrap absolute top-4 right-2">
            {Math.floor(100 - (product.price / product.listingPrice) * 100)}%
            OFF
          </span>
        )}
      </div>
    </div>
  );

  return isClient ? (
    <Link href={`/products/${product.id}`}>{linkContent}</Link>
  ) : (
    <div>{linkContent}</div>
  );
}
