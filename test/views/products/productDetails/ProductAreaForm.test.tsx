import React from "react";
import { render, fireEvent, act, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Formik } from "formik";
import { Product } from "@/components/constants";
import "@testing-library/jest-dom";
import ProductAreaForm from "@/views/products/ProductDetail/components/ProductAreaForm";

const mockProduct: Product = {
  id: "2060",
  title: "Ceramico Azabache 20Und 36X36 1ra 2,68 m2 por Caja",
  description:
    "Ceramica esmaltada 36x36, terminacion brillante, transito medio, liso, Colores disponibles: Negro",
  price: 13031,
  stock: 5,
  salesUnit: "area",
  measurementUnit: "m2",
  unitValue: 2.68,
};

const mockHandlers = {
  handleAddOne: jest.fn(),
  handleRemoveOne: jest.fn(),
  handleQuantityInputChange: jest.fn(),
  handleUnitInputChange: jest.fn(),
  handleUnitBlur: jest.fn(),
};

const renderAreaForm = async (product: Product) =>
  await act(async () => {
    return render(
      <Formik
        initialValues={{
          unitInput: 2 * (mockProduct.unitValue ?? 1),
          quantityInput: "2",
        }}
        onSubmit={() => {}}
      >
        <ProductAreaForm product={product} {...mockHandlers} />
      </Formik>
    );
  });

describe("ProductAreaForm", () => {
  it("renders correctly", async () => {
    const { getByLabelText } = await renderAreaForm(mockProduct);
    expect(getByLabelText("unitInput")).toBeInTheDocument();
    expect(getByLabelText("quantityInput")).toBeInTheDocument();
  });

  it("calls handleUnitInputChange on unit input change", async () => {
    const { getByLabelText } = await renderAreaForm(mockProduct);
    const unitInput = getByLabelText("unitInput");

    await act(async () => {
      await userEvent.type(unitInput, "6");
    });

    await waitFor(() => {
      expect(mockHandlers.handleUnitInputChange).toHaveBeenCalled();
    });
  });

  it("calls handleQuantityInputChange on quantity input change", async () => {
    const { getByLabelText } = await renderAreaForm(mockProduct);
    const quantityInput = getByLabelText("quantityInput");

    await act(async () => {
      await userEvent.type(quantityInput, "3");
    });

    expect(mockHandlers.handleQuantityInputChange).toHaveBeenCalled();
  });

  it("calls handleAddOne on add button click", async () => {
    const { getByLabelText } = await renderAreaForm(mockProduct);
    const addButton = getByLabelText("increment quantity");
    await act(async () => {
      fireEvent.click(addButton);
    });
    expect(mockHandlers.handleAddOne).toHaveBeenCalled();
  });

  it("calls handleRemoveOne on remove button click", async () => {
    const { getByLabelText } = await renderAreaForm(mockProduct);
    const removeButton = getByLabelText("decrement quantity");
    await act(async () => {
      fireEvent.click(removeButton);
    });
    expect(mockHandlers.handleRemoveOne).toHaveBeenCalled();
  });
});
