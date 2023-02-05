import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const index = cartItems.findIndex(item => item.id === productToAdd.id);
    console.log(index);
    if(index > -1){
        return cartItems.map((item , i) => {
            if(i === index){
                console.log(1)
                return {...item, quantity: item.quantity + 1 }
            } else {
                console.log(2)
                return item;
            }
        })
    } else {
        console.log(3)
        return [...cartItems, { ...productToAdd, quantity: 1}]
    }    
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);
        setCartCount(newCartCount);
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    // const [cartItems, setCartItems] = useState([]);
    // const value = { cartItems, setCartItems };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}