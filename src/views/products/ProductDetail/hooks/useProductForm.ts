import { Product } from "@/components/constants";
import useCartStore from "@/store/cart";
import { useFormik } from "formik";

interface ProductFormValues {
  unitInput: number;
  quantityInput: number;
}

export function useProductForm(product: Product) {
  const cartStore = useCartStore();
  const productQuantity = cartStore.cart.items.find(
    (item) => item.product.id === product.id
  )?.quantity;

  const initialValues = {
    unitInput: product.unitValue || 1,
    quantityInput: productQuantity || 1,
  };

  const formik = useFormik<ProductFormValues>({
    initialValues,
    onSubmit: submitForm,
  });

  function submitForm() {
    const { quantityInput } = formik.values;
    if (productQuantity !== undefined) {
      cartStore.updateQuantity(product.id, quantityInput);
      return;
    }
    cartStore.addItem(product, quantityInput);
  }

  function isInCart() {
    return productQuantity !== undefined;
  }

  return {
    formik,
    isInCart,
    removeItem: () => cartStore.removeItem(product.id),
  };
}
