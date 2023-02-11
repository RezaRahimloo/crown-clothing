import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

    const item = cartItems.find(item => item.id === productToRemove.id);

    if(item.quantity == 1){

        return cartItems.filter(cartItem => cartItem.id != productToRemove.id);
    }

    return cartItems.map((cartItem) => {

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
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN'
};
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return{
                ...state,
                ...payload
            }
    
        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {

    const [ { isCartOpen, cartItems, cartCount, total }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);


    const updateCartItemsReducer = (newCartITems) => {
        const newCartCount = newCartITems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0);
        const newCartTotal = calculateTotal(newCartITems)
        
        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { 
            cartItems: newCartITems, 
            cartTotal: newCartTotal, 
            cartCount: newCartCount
        }));
    }
    const toggleCart = () => {
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN,{isCartOpen: !isCartOpen}));
    }


    const addItemToCart = (productToAdd) => {
        const newCartITems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartITems);
    }
    const removeItemToCart = (productToAdd) => {
        const newCartITems = removeCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartITems);
    }
    const clearItemFromCart = (productToAdd) => {
        const newCartITems = clearCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartITems);
    }
    const setIsCartOpen = () => {
        toggleCart();
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