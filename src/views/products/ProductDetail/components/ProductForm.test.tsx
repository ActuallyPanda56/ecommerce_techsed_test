/* eslint-disable @typescript-eslint/no-require-imports */
import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Formik } from "formik";
import ProductForm, { sanitizeInput } from "./ProductForm";
import { Product } from "@/components/constants";
import "@testing-library/jest-dom";

const mockProduct: Product = {
  id: "100012",
  title: "Ladrillo hueco 8cm x 18cm x 33cm (Pallet de 198u)",
  description: "Ladrillo hueco 8cm x 18cm x 33cm - Pallet: 198 unidades",
  price: 60588,
  listingPrice: 67320,
  stock: 5,
  salesUnit: "group",
  measurementUnit: "pallet",
  unitValue: 198,
  images: [
    {
      src: "/assets/products/brick.png",
      alt: "Hollow Brick",
    },
  ],
};

/* 
  This testing file is divided into three parts:
  - SanitizeInput: Tests for the sanitizeInput function to ensure appropiate input sanitization
  - ProductForm: Tests for group and unit sales units
  - ProductForm with salesUnit as area: Tests for area sales unit
*/

const renderForm = async (product: Product) =>
  await act(async () => {
    return render(
      <Formik
        initialValues={{ unitInput: "", quantityInput: 1 }}
        onSubmit={() => {}}
      >
        <ProductForm product={product} />
      </Formik>
    );
  });

describe("sanitizeInput", () => {
  it("removes non-numeric characters for non-area types", () => {
    expect(sanitizeInput("abc123", "unit")).toBe("123");
  });

  it("removes non-numeric and non-decimal characters for area type", () => {
    expect(sanitizeInput("abc123.45", "area")).toBe("123.45");
  });

  it("removes leading zeros", () => {
    expect(sanitizeInput("00123", "unit")).toBe("123");
  });

  it("removes leading decimal point", () => {
    expect(sanitizeInput(".1", "area")).toBe("0.10");
  });

  it("limits to 2 decimal places for area type", () => {
    expect(sanitizeInput("123.45664", "area")).toBe("123.46");
  });
});

// ProductForm tests
describe("ProductForm", () => {
  it("renders correctly", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    expect(getByLabelText("quantityInput")).toBeInTheDocument();
  });

  it("handles unit input change", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(unitInput, { target: { value: "5" } });
    });
    expect(unitInput.value).toBe("5");
    expect(quantityInput.value).toBe("1");
  });

  it("handles unit input overflow", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(unitInput, { target: { value: "100000" } });
    });
    expect(unitInput.value).toBe("990");
    expect(quantityInput.value).toBe("5");
  });

  it("handles quantity input change", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: "3" } });
    });
    expect(unitInput.value).toBe("594");
    expect(quantityInput.value).toBe("3");
  });

  it("handles quantity input overflow", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: "100" } });
    });
    expect(quantityInput.value).toBe("5");
    expect(unitInput.value).toBe("990");
  });

  it("increments quantity on add button click", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;
    const addButton = getByLabelText("increment quantity");

    await act(async () => {
      fireEvent.click(addButton);
    });
    expect(quantityInput.value).toBe("2");
    expect(unitInput.value).toBe("396");
  });

  it("decrements quantity on remove button click", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;
    const removeButton = getByLabelText("decrement quantity");

    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: "3" } });
      fireEvent.click(removeButton);
    });
    expect(quantityInput.value).toBe("2");
    expect(unitInput.value).toBe("396");
  });

  it("does not decrement quantity below 1", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;
    const removeButton = getByLabelText("decrement quantity");

    for (let i = 0; i < 10; i++) {
      await act(async () => {
        fireEvent.click(removeButton);
      });
    }

    expect(quantityInput.value).toBe("1");
    expect(unitInput.value).toBe("198");
  });

  it("does not increment quantity above stock", async () => {
    const { getByLabelText } = await renderForm(mockProduct);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;
    const addButton = getByLabelText("increment quantity");

    for (let i = 0; i < 10; i++) {
      await act(async () => {
        fireEvent.click(addButton);
      });
    }
    expect(quantityInput.value).toBe("5");
    expect(unitInput.value).toBe("990");
  });
});

describe("ProductForm with salesUnit as area", () => {
  const mockProductArea: Product = {
    ...mockProduct,
    salesUnit: "area",
    unitValue: 1.5,
  };

  it("handles unit input change for area", async () => {
    const { getByLabelText } = await renderForm(mockProductArea);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(unitInput, { target: { value: "2.5" } });
    });
    expect(unitInput.value).toBe("2.5");
    expect(quantityInput.value).toBe("2");
  });

  it("handles quantity input change for area", async () => {
    const { getByLabelText } = await renderForm(mockProductArea);
    const unitInput = getByLabelText("unitInput") as HTMLInputElement;
    const quantityInput = getByLabelText("quantityInput") as HTMLInputElement;

    await act(async () => {
      fireEvent.change(quantityInput, { target: { value: "3" } });
    });
    expect(unitInput.value).toBe("4.5");
    expect(quantityInput.value).toBe("3");
  });
});
