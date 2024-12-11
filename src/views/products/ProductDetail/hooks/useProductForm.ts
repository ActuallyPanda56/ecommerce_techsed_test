import { floatingTypes, Product } from "@/components/constants";
import { useFormik } from "formik";
import { parseValues, sanitizeInput } from "@/utils/helpers";
import { useCart } from "@/hooks/useCart";

interface ProductFormValues {
  unitInput: number;
  quantityInput: number;
}

export function useProductForm(product: Product) {
  const { productQuantity, addItem, updateQuantity } = useCart(product);

  const initialValues = {
    unitInput: (product.unitValue ?? 1) * (productQuantity || 1),
    quantityInput: productQuantity || 1,
  };

  const formik = useFormik<ProductFormValues>({
    initialValues,
    onSubmit: submitForm,
  });

  function submitForm() {
    const { quantityInput } = formik.values;
    if (productQuantity !== undefined) {
      updateQuantity(quantityInput);
      return;
    }
    addItem(quantityInput);
  }

  const handleUnitInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeInput(e.target.value, product.salesUnit);
    const { calculatedUnit, calculatedQuantity } = parseValues(
      value,
      product,
      "unit"
    );
    formik.setFieldValue("unitInput", calculatedUnit);
    formik.setFieldValue("quantityInput", calculatedQuantity || 1);
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = sanitizeInput(e.target.value, product.salesUnit);
    const { calculatedUnit, calculatedQuantity } = parseValues(
      value,
      product,
      "quantity"
    );

    formik.setFieldValue("quantityInput", calculatedUnit);
    formik.setFieldValue("unitInput", calculatedQuantity);
  };

  const handleUnitBlur = () => {
    const value = formik.values.quantityInput * (product.unitValue || 1);
    formik.setFieldValue("unitInput", value);
  };

  const handleAddOne = () => {
    const currentQuantity = formik.values.quantityInput || 0;
    const newQuantity = Math.min(currentQuantity + 1, product.stock);
    const newUnitValue = newQuantity * (product.unitValue || 1);

    const isFloating = floatingTypes.includes(product.salesUnit);
    formik.setFieldValue("quantityInput", newQuantity);
    formik.setFieldValue(
      "unitInput",
      isFloating ? parseFloat(newUnitValue.toFixed(2)) : newUnitValue
    );
  };

  const handleRemoveOne = () => {
    const currentQuantity = formik.values.quantityInput || 1;
    const newQuantity = Math.max(currentQuantity - 1, 1);
    const newUnitValue = newQuantity * (product.unitValue || 1);

    const isFloating = floatingTypes.includes(product.salesUnit);
    formik.setFieldValue("quantityInput", newQuantity);
    formik.setFieldValue(
      "unitInput",
      isFloating ? parseFloat(newUnitValue.toFixed(2)) : newUnitValue
    );
  };

  return {
    formik,
    handleUnitInputChange,
    handleQuantityInputChange,
    handleUnitBlur,
    handleAddOne,
    handleRemoveOne,
  };
}
