import { renderHook, act } from "@testing-library/react";
import { useCart } from "@/hooks/useCart";
import { sanitizeInput, parseValues } from "@/utils/helpers";
import { Product } from "@/components/constants";
import { useProductForm } from "@/views/products/ProductDetail/hooks/useProductForm";

jest.mock("@/hooks/useCart");
jest.mock("@/utils/helpers");

const mockProduct: Product = {
  id: "100012",
  title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
  description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
  price: 60588,
  listingPrice: 67320,
  stock: 5,
  salesUnit: "group",
  measurementUnit: "pallet",
  unitValue: 10,
  images: [
    {
      src: "/assets/products/brick.png",
      alt: "Hollow Brick",
    },
  ],
};
const mockUseCart = {
  productQuantity: 2,
  addItem: jest.fn(),
  updateQuantity: jest.fn(),
};

describe("useProductForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue(mockUseCart);
  });

  it("initializes formik with correct initial values", async () => {
    const { result } = renderHook(() => useProductForm(mockProduct));
    expect(result.current.formik.initialValues).toEqual({
      unitInput: 20, // 10 * 2
      quantityInput: 2,
    });
  });

  it("handles unit input change correctly", async () => {
    (sanitizeInput as jest.Mock).mockReturnValue("15");
    (parseValues as jest.Mock).mockReturnValue({
      calculatedUnit: 15,
      calculatedQuantity: 2,
    });

    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.handleUnitInputChange({
        target: { value: "15" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(sanitizeInput).toHaveBeenCalledWith("15", mockProduct.salesUnit);
    expect(parseValues).toHaveBeenCalledWith("15", mockProduct, "unit");
    expect(result.current.formik.values).toEqual({
      unitInput: 15,
      quantityInput: 2,
    });
  });

  it("handles quantity input change correctly", async () => {
    (sanitizeInput as jest.Mock).mockReturnValue("5");
    (parseValues as jest.Mock).mockReturnValue({
      calculatedUnit: 50,
      calculatedQuantity: 5,
    });

    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.handleQuantityInputChange({
        target: { value: "5" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(sanitizeInput).toHaveBeenCalledWith("5", mockProduct.salesUnit);
    expect(parseValues).toHaveBeenCalledWith("5", mockProduct, "quantity");
    expect(result.current.formik.values).toEqual({
      unitInput: 50,
      quantityInput: 5,
    });
  });

  it("handles unit blur correctly", async () => {
    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.formik.setFieldValue("quantityInput", 3);
    });

    await act(async () => {
      await result.current.handleUnitBlur();
    });

    expect(result.current.formik.values.unitInput).toBe(30); // 3 * 10
  });

  it("handles adding one correctly", async () => {
    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.formik.setFieldValue("quantityInput", 5);
    });

    await act(async () => {
      await result.current.handleAddOne();
    });

    expect(result.current.formik.values).toEqual({
      unitInput: 50, // 5 * 10
      quantityInput: 5,
    });
  });

  it("handles removing one correctly", async () => {
    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.formik.setFieldValue("quantityInput", 5);
    });

    await act(async () => {
      await result.current.handleRemoveOne();
    });

    expect(result.current.formik.values).toEqual({
      unitInput: 40, // 4 * 10
      quantityInput: 4,
    });
  });

  it("handles submitting form correctly when product quantity exists", async () => {
    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.formik.setFieldValue("quantityInput", 3);
    });

    await act(async () => {
      result.current.formik.handleSubmit();
    });

    expect(mockUseCart.updateQuantity).toHaveBeenCalledWith(3);
    expect(mockUseCart.addItem).not.toHaveBeenCalled();
  });

  it("handles submitting form correctly when product quantity does not exist", async () => {
    (useCart as jest.Mock).mockReturnValue({
      ...mockUseCart,
      productQuantity: undefined,
    });

    const { result } = renderHook(() => useProductForm(mockProduct));

    await act(async () => {
      await result.current.formik.setFieldValue("quantityInput", 3);
    });

    await act(async () => {
      result.current.formik.handleSubmit();
    });

    expect(mockUseCart.addItem).toHaveBeenCalledWith(3);
    expect(mockUseCart.updateQuantity).not.toHaveBeenCalled();
  });
});
