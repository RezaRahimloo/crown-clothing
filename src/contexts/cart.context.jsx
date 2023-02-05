import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null
    // cartItems: [],
    // setCartItems: () => null 
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = { isCartOpen, setIsCartOpen };

    // const [cartItems, setCartItems] = useState([]);
    // const value = { cartItems, setCartItems };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}