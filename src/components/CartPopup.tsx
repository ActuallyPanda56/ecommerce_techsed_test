import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import useCartStore from "@/store/cart";

export default function CartPopup() {
  const cartStore = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Cart Button for Small Screens */}
      <button
        onClick={toggleCart}
        className="fixed bottom-4 right-4 bg-primary text-background p-3 rounded-full shadow-lg lg:hidden hover:bg-primaryDark transition-all z-0"
      >
        <FiShoppingCart size={24} />
        {cartStore.cart.items.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-semibold rounded-full px-2">
            {cartStore.cart.items.length}
          </span>
        )}
      </button>

      {/* Cart Content */}
      <div
        className={`fixed bottom-4 right-4 rounded-lg border border-primary shadow-lg bg-white overflow-hidden w-72 transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-y-0" : "translate-y-[calc(100%+1rem)]"
        } lg:translate-y-0 lg:block`}
      >
        <div className="bg-primary text-background px-4 py-3 flex justify-between items-center">
          <span className="text-lg font-semibold">Tu carrito</span>
          <button
            onClick={toggleCart}
            className="text-background hover:text-opacity-80 lg:hidden"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {cartStore.cart.items.length === 0 ? (
            <div className="text-center text-gray-500">
              <span>Tu carrito está vacío</span>
            </div>
          ) : (
            cartStore.cart.items.map((item) => (
              <div
                key={item.product.id}
                className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0"
              >
                <span className="flex-1 text-gray-800 font-medium">
                  {item.product.title}
                </span>
                <span className="text-gray-600">{item.quantity}</span>
              </div>
            ))
          )}
        </div>
        {cartStore.cart.items.length > 0 && (
          <div className="px-4 pb-4">
            <button
              className="w-full flex items-center justify-center gap-2 bg-primary text-background py-2 rounded-full shadow-md hover:bg-primaryDark transition-all"
              onClick={() => cartStore.clearCart()}
            >
              <span>Limpiar carrito</span>
              <FiShoppingCart size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
