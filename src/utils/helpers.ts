import { floatingTypes, Product } from "@/components/constants";

/**
 * Formats a given price as a string using the Spanish locale.
 *
 * @param price - The price to format.
 * @returns The formatted price as a string.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR").format(price);
}

/**
 * Sanitizes the input value based on the specified type.
 *
 * @param value - The input value to be sanitized.
 * @param type - The type of the input value. Determines the sanitization rules.
 *               If the type is "area", the value is treated as a floating-point number.
 *               Otherwise, it is treated as an integer.
 * @returns The sanitized input value.
 *
 * @remarks
 * - For floating-point types, non-numeric characters except the decimal point are removed.
 * - For integer types, all non-numeric characters are removed.
 * - Leading zeros are removed unless the value starts with "0.".
 * - Leading decimal points are replaced with "0.".
 * - For floating-point types, the value is limited to 2 decimal places.
 */
export const sanitizeInput = (value: string, type: string) => {
  const isFloating = floatingTypes.includes(type);
  value = isFloating
    ? value.replace(/[^0-9.]/g, "")
    : value.replace(/[^0-9]/g, "");

  // Remove leading zeros (Currently not working in UI)
  if (value.startsWith("0") && value.length > 2 && !value.startsWith("0.")) {
    value = value.replace(/^0+/, ""); // Strip out all leading zeros
  }

  // Remove leading decimal point
  if (value.startsWith(".")) {
    value = "0" + value;
  }

  // Limit to 2 decimal places for area
  if (isFloating) {
    value = parseFloat(value).toFixed(2);
  }

  return value;
};

/**
 * Parses the given value based on the product and type, and calculates the unit and quantity.
 *
 * @param value - The value to be parsed, typically a string representation of a number.
 * @param product - The product object containing stock and unitValue properties.
 * @param type - The type of value to be parsed, either "unit" or "quantity".
 * @returns An object containing the calculated unit and quantity.
 *
 * @example
 * const product = { stock: 10, unitValue: 2 };
 * const result = parseValues("5", product, "unit");
 * // result: { calculatedUnit: 10, calculatedQuantity: 5 }
 */
export const parseValues = (value: string, product: Product, type: string) => {
  const { stock, unitValue } = product;
  // Limit to stock
  const isEmpty = value === "";
  const maxValue = stock * (unitValue || 1);
  let calculatedUnit, calculatedQuantity;

  const isFloating = floatingTypes.includes(type);

  switch (type) {
    case "unit":
      calculatedUnit = isEmpty
        ? ""
        : Math.min(parseFloat(value) || 0, maxValue);

      calculatedQuantity = isEmpty
        ? 1
        : Math.ceil((calculatedUnit as number) / (product.unitValue || 1));

      return { calculatedUnit, calculatedQuantity };
    default:
    case "quantity":
      calculatedUnit =
        value === "" ? 1 : Math.min(parseInt(value) || 1, product.stock);

      calculatedQuantity = isFloating
        ? parseFloat(calculatedUnit.toFixed(2))
        : calculatedUnit;

      return { calculatedUnit, calculatedQuantity };
  }
};
