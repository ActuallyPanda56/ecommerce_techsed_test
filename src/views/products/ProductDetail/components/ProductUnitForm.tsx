import { Field, useFormikContext, FormikValues } from "formik";
import { Product } from "@/components/constants";
import { BiMinus, BiPlus } from "react-icons/bi";

interface ProductFormProps {
  product: Product;
  handleRemoveOne: () => void;
  handleQuantityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddOne: () => void;
}

export default function ProductForm({
  product,
  handleRemoveOne,
  handleQuantityInputChange,
  handleAddOne,
}: ProductFormProps) {
  const formikContext = useFormikContext<
    FormikValues & { [key: string]: never }
  >();
  const { values } = formikContext;

  return (
    <>
      <div className="flex gap-10 mt-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="quantityInput">unidades</label>
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
              value={values.quantityInput}
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
            <span className="ml-2 text-sm text-gray-400 font-semibold">
              unidades
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
