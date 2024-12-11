import { Product } from "@/components/constants";
import { formatPrice } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/router";
import { BiArrowBack, BiCheckCircle } from "react-icons/bi";
import { VscError } from "react-icons/vsc";
import { useProductForm } from "./hooks/useProductForm";
import { FormikProvider } from "formik";
import { FiShoppingCart } from "react-icons/fi";
import ProductUnitForm from "./components/ProductUnitForm";
import ProductAreaForm from "./components/ProductAreaForm";
import ProductGroupForm from "./components/ProductGroupForm";
import { useCart } from "@/hooks/useCart";

export default function ProductDetailView({ product }: { product: Product }) {
  const router = useRouter();
  const { removeItem, isInCart, productQuantity } = useCart(product);
  const {
    formik,
    handleAddOne,
    handleRemoveOne,
    handleQuantityInputChange,
    handleUnitInputChange,
    handleUnitBlur,
  } = useProductForm(product);
  const { submitForm, values } = formik;

  const formattedPrice = formatPrice(product.price);
  const formattedUnitValue =
    product.unitValue &&
    formatPrice(
      product.listingPrice
        ? product.listingPrice / product.unitValue
        : product.price / product.unitValue
    );

  const imageSrc =
    product.images && product.images.length > 0
      ? product.images[0].src
      : "/assets/products/not_found.png";
  const imageAlt =
    product.images && product.images.length > 0
      ? product.images[0].alt
      : "Product Image";

  function addToCart() {
    submitForm();
    router.push("/cart");
  }

  const productForm = {
    unit: (
      <ProductUnitForm
        product={product}
        handleAddOne={handleAddOne}
        handleRemoveOne={handleRemoveOne}
        handleQuantityInputChange={handleQuantityInputChange}
      />
    ),
    group: (
      <ProductGroupForm
        product={product}
        handleAddOne={handleAddOne}
        handleRemoveOne={handleRemoveOne}
        handleQuantityInputChange={handleQuantityInputChange}
        handleUnitInputChange={handleUnitInputChange}
        handleUnitBlur={handleUnitBlur}
      />
    ),
    area: (
      <ProductAreaForm
        product={product}
        handleAddOne={handleAddOne}
        handleRemoveOne={handleRemoveOne}
        handleQuantityInputChange={handleQuantityInputChange}
        handleUnitInputChange={handleUnitInputChange}
        handleUnitBlur={handleUnitBlur}
      />
    ),
  };

  return (
    <FormikProvider value={formik}>
      <div className="my-20 shadow-xl p-6 sm:p-8 md:p-10 max-w-full sm:max-w-lg lg:max-w-3xl mx-auto">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-primary cursor-pointer"
        >
          <BiArrowBack />
          <span>Atrás</span>
        </div>
        <div className="flex flex-col md:flex-row gap-5 mt-4 items-center">
          <div className="bg-muted rounded-xl w-full md:w-1/2 aspect-square">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={256}
              height={256}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs text-gray-400">SKU: {product.id}</p>
            <h1 className="text-lg font-bold tracking-wider">
              {product.title}
            </h1>
            {product.stock > 0 ? (
              <div className="flex items-center gap-1">
                <BiCheckCircle className="text-green-500" />
                <span className="text-sm">Stock disponible</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <VscError className="text-red-500" />
                <span className="text-sm">Fuera de Stock</span>
              </div>
            )}
            <div className="flex items-center mt-5 gap-3">
              <p className="text-xl font-bold ">${formattedPrice}</p>
              {product.listingPrice && (
                <span className="px-2 py-0.5 rounded-lg bg-info text-background text-sm">
                  {Math.floor(
                    100 - (product.price / product.listingPrice) * 100
                  )}
                  % OFF
                </span>
              )}
            </div>
            {formattedUnitValue && (
              <p className="text-xs text-gray-800 font-semibold">
                PU: ${formattedUnitValue}
              </p>
            )}
            {product.listingPrice && (
              <p className="text-gray-400 line-through">
                ${formatPrice(product.listingPrice)}
              </p>
            )}

            {/* Carga dinámicamente el formulario dependiendo de la unidad de venta */}
            {productForm[product.salesUnit]}

            <p className="mt-5 text-gray-400">{product.description}</p>
            <button
              type="submit"
              onClick={addToCart}
              className="mt-4 w-full py-3 bg-primary text-background rounded-full hover:bg-primaryDark transition-colors"
            >
              Comprar ahora
            </button>
            {!isInCart() ? (
              <button
                type="button"
                onClick={submitForm}
                className="mt-4 w-full py-3 bg-background border border-primary rounded-full flex justify-center items-center gap-2 hover:bg-primaryDark hover:text-background transition-colors"
              >
                Agregar al carrito
                <FiShoppingCart size={20} />
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  type="button"
                  onClick={
                    productQuantity === values.quantityInput
                      ? () => {}
                      : submitForm
                  }
                  className={`flex-1 py-3 bg-background border border-primary hover:text-background rounded-full transition-colors text-center ${
                    productQuantity === values.quantityInput
                      ? "cursor-not-allowed hover:bg-gray-300 hover:text-foreground hover:border-gray-600"
                      : "hover:bg-primaryDark"
                  }`}
                >
                  Cambiar cantidad
                </button>
                <button
                  type="button"
                  onClick={removeItem}
                  className="flex-1 py-3 bg-error text-background rounded-full hover:bg-errorDark transition-colors text-center"
                >
                  Eliminar del carrito
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormikProvider>
  );
}
