/**
 * Formats a given price as a string using the Spanish locale.
 *
 * @param price - The price to format.
 * @returns The formatted price as a string.
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR").format(price);
}
