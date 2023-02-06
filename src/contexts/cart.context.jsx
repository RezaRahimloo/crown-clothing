import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {

    const index = cartItems.findIndex(item => item.id === productToAdd.id);
    if(index > -1){
        return cartItems.map((item , i) => {
            if(i === index){
                
                return {...item, quantity: item.quantity + 1 }
            } else {
                return item;
            }
        })
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1}]
    }    
}
const removeCartItem = (cartItems, productToRemove) => {
    console.log(0.5)
    const item = cartItems.find(item => item.id === productToRemove.id);
    console.log(1)
    if(item.quantity == 1){
        console.log(2)
        return cartItems.filter(cartItem => cartItem.id != productToRemove.id);
    }

    return cartItems.map((cartItem) => {
        console.log(3)
        return (cartItem.id == productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} : 
            cartItem);
    });

}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(item => item.id != cartItemToClear.id);
}

const calculateTotal = (cartItems) => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
    removeItemToCart: () => null,
    clearItemFromCart: () => null,
    total: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);
        setCartCount(newCartCount);
        setTotal(calculateTotal(cartItems))
    }, [cartItems])


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemToCart = (productToAdd) => {
        setCartItems(removeCartItem(cartItems, productToAdd));
    }
    const clearItemFromCart = (productToAdd) => {
        setCartItems(clearCartItem(cartItems, productToAdd));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemToCart, 
        clearItemFromCart,
        total
    };

    // const [cartItems, setCartItems] = useState([]);
    // const value = { cartItems, setCartItems };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 