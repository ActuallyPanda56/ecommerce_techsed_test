import { useFormikContext, FormikValues, Field } from "formik";
import React from "react";
import { Product } from "@/components/constants";
import { BiMinus, BiPlus } from "react-icons/bi";

interface ProductFormProps {
  product: Product;
  handleRemoveOne: () => void;
  handleQuantityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddOne: () => void;
  handleUnitInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUnitBlur: () => void;
}

export default function ProductAreaForm({
  product,
  handleAddOne,
  handleQuantityInputChange,
  handleRemoveOne,
  handleUnitInputChange,
  handleUnitBlur,
}: ProductFormProps) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: never }
  >();
  const { values } = formikContext;

  return (
    <>
      <div className="flex gap-10 mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="unitInput" className="text-xs font-semibold">
            superficie
          </label>
          <div className=" h-full">
            <Field
              type="number"
              name="unitInput"
              aria-label="unitInput"
              value={values.unitInput}
              placeholder={product.unitValue?.toString() || "1"}
              min="0.01"
              step="0.01"
              className="outline-none h-full ml-4 appearance-none no-spinner w-12"
              onChange={(e: never) => handleUnitInputChange(e)}
              onBlur={handleUnitBlur}
            />
            <span className="ml-2 text-sm text-gray-400 font-semibold">
              {product.measurementUnit}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="quantityInput" className="text-xs font-semibold">
            cantidad de cajas
          </label>
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
          </div>
        </div>
      </div>
    </>
  );
}
