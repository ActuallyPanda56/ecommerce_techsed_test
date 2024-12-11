import useCartStore from "@/store/cart";
import { Product } from "@/components/constants";

export function useCart(product: Product) {
  const cartStore = useCartStore();
  const productQuantity = cartStore.cart.items.find(
    (item) => item.product.id === product.id
  )?.quantity;

  function addItem(quantity: number) {
    cartStore.addItem(product, quantity);
  }

  function updateQuantity(quantity: number) {
    cartStore.updateQuantity(product.id, quantity);
  }

  function removeItem() {
    cartStore.removeItem(product.id);
  }

  function isInCart() {
    return productQuantity !== undefined;
  }

  return {
    productQuantity,
    addItem,
    updateQuantity,
    removeItem,
    isInCart,
  };
}
