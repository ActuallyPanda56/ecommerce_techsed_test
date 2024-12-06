import { Field, useFormikContext, FormikValues } from "formik";
import { Product } from "@/components/constants";
import { BiMinus, BiPlus } from "react-icons/bi";

/* 
  Sales Unit Configuration
  - conversion: boolean - Whether the unit input should be converted to quantity input. Adds a quantity input if true.
  - label1: string - Label for the unit input
  - label2: string - Label for the quantity input
*/
const salesUnit = {
  unit: {
    conversion: false,
    label1: "cantidad",
    label2: "unidades",
  },
  group: {
    conversion: true,
    label1: "cantidad de unidades",
    label2: "cantidad de",
  },
  area: {
    conversion: true,
    label1: "superficie",
    label2: "cantidad de cajas",
  },
};

export const sanitizeInput = (value: string, type: string) => {
  value =
    type === "area"
      ? value.replace(/[^0-9.]/g, "")
      : value.replace(/[^0-9]/g, "");

  // Remove leading zeros (Currently not working)
  if (value.startsWith("0") && value.length > 2 && !value.startsWith("0.")) {
    value = value.replace(/^0+/, ""); // Strip out all leading zeros
  }

  // Remove leading decimal point
  if (value.startsWith(".")) {
    value = "0" + value;
  }

  // Limit to 2 decimal places for area
  if (type === "area") {
    value = parseFloat(value).toFixed(2);
  }
  return value;
};

export default function ProductForm({ product }: { product: Product }) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: never }
  >();
  const { setFieldValue, values } = formikContext;

  const handleUnitInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeInput(e.target.value, product.salesUnit);
    const maxValue = product.stock * (product.unitValue || 1);
    const parsedValue =
      value === "" ? "" : Math.min(parseFloat(value) || 0, maxValue);
    setFieldValue("unitInput", parsedValue);
    const calculatedQuantity =
      value === ""
        ? 1
        : Math.ceil((parsedValue as number) / (product.unitValue || 1));
    setFieldValue("quantityInput", calculatedQuantity || 1);
  };

  const handleQuantityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = sanitizeInput(e.target.value, product.salesUnit);
    const parsedValue =
      value === "" ? 1 : Math.min(parseInt(value) || 1, product.stock);

    setFieldValue("quantityInput", parsedValue);
    setFieldValue("unitInput", parsedValue * (product.unitValue || 1));
  };

  const handleUnitBlur = () => {
    setFieldValue("unitInput", values.quantityInput * (product.unitValue || 1));
  };

  const handleAddOne = () => {
    const currentQuantity = formikContext.values.quantityInput || 0;
    const newQuantity = Math.min(currentQuantity + 1, product.stock);
    setFieldValue("quantityInput", newQuantity);
    const newUnitValue = newQuantity * (product.unitValue || 1);
    setFieldValue(
      "unitInput",
      product.salesUnit === "area"
        ? parseFloat(newUnitValue.toFixed(2))
        : newUnitValue
    );
  };

  const handleRemoveOne = () => {
    const currentQuantity = formikContext.values.quantityInput || 1;
    const newQuantity = Math.max(currentQuantity - 1, 1);
    setFieldValue("quantityInput", newQuantity);
    const newUnitValue = newQuantity * (product.unitValue || 1);
    setFieldValue(
      "unitInput",
      product.salesUnit === "area"
        ? parseFloat(newUnitValue.toFixed(2))
        : newUnitValue
    );
  };

  return (
    <>
      <div className="flex gap-10 mt-5">
        {product.salesUnit in salesUnit &&
          salesUnit[product.salesUnit].conversion && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold">
                {salesUnit[product.salesUnit].label1}
              </label>
              <div className=" h-full">
                <Field
                  type="number"
                  name="unitInput"
                  aria-label="unitInput"
                  value={values.unitInput}
                  placeholder={product.unitValue?.toString() || "1"}
                  min={product.salesUnit === "area" ? "0.01" : "1"}
                  step={product.salesUnit === "area" ? "0.01" : "1"}
                  className="outline-none h-full ml-4 appearance-none no-spinner w-12"
                  onChange={(e: never) => handleUnitInputChange(e)}
                  onBlur={handleUnitBlur}
                />
                <span className="ml-2 text-sm text-gray-400 font-semibold">
                  {product.salesUnit === "group"
                    ? "unidades"
                    : product.measurementUnit}
                </span>
              </div>
            </div>
          )}
        <div className="flex flex-col gap-2">
          {product.salesUnit === "group" ? (
            <label className="text-xs font-semibold">
              {salesUnit[product.salesUnit].label2 +
                " " +
                product.measurementUnit}
            </label>
          ) : (
            <label className="text-xs font-semibold">
              {salesUnit[product.salesUnit].label2}
            </label>
          )}
          <div className="flex items-center">
            <button
              onClick={handleRemoveOne}
              className={`p-1 m-1 text-xl outline outline-1 outline-muted rounded ${
                values.quantityInput === 1
                  ? "cursor-not-allowed hover:bg-gray-200"
                  : ""
              }`}
              aria-label="decrement quantity"
            >
              <BiMinus />
            </button>
            <Field
              type="number"
              name="quantityInput"
              aria-label="quantityInput"
              min="1"
              max={product.stock}
              step="1"
              className="outline-none h-full px-2 appearance-none no-spinner"
              onChange={(e: never) => handleQuantityInputChange(e)}
            />
            <button
              onClick={handleAddOne}
              className={`p-1 m-1 text-xl outline outline-1 outline-muted rounded ${
                values.quantityInput === product.stock
                  ? "cursor-not-allowed hover:bg-gray-200"
                  : ""
              }`}
              aria-label="increment quantity"
            >
              <BiPlus />
            </button>
            {product.salesUnit === "unit" && (
              <span className="ml-2 text-sm text-gray-400 font-semibold">
                unidades
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
