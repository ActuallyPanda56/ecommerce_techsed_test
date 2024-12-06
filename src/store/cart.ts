import { Cart, Product } from "@/components/constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Zustand store interface
export interface CartState {
  cart: Cart;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: {
        id: "unique_cart_id",
        items: [],
        createdAt: new Date(),
      },

      // Add item to the cart
      addItem: (product, quantity) => {
        set((state) => {
          const existingItem = state.cart.items.find(
            (item) => item.product.id === product.id
          );
          let updatedItems;
          if (existingItem) {
            updatedItems = state.cart.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            updatedItems = [...state.cart.items, { product, quantity }];
          }
          return { cart: { ...state.cart, items: updatedItems } };
        });
      },

      // Remove item from the cart
      removeItem: (productId) => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.filter(
              (item) => item.product.id !== productId
            ),
          },
        }));
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          cart: {
            ...state.cart,
            items: state.cart.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          },
        }));
      },

      // Clear all items from the cart
      clearCart: () => {
        set((state) => ({
          cart: { ...state.cart, items: [] },
        }));
      },
    }),
    {
      name: "cart-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Specify storage type
    }
  )
);

export default useCartStore;
