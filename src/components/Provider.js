import React, { useState, createContext } from "react";

export const CartProvider = createContext();

function Provider({ children }) {
  const [checkCart, setCheckCart] = useState(true);

  const cartHandler = () => {
    setCheckCart(!checkCart);
  };

  return (
    <CartProvider.Provider value={{ checkCart, cartHandler }}>
      {children}
    </CartProvider.Provider>
  );
}

export default Provider;
