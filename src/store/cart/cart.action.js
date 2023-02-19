import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";




export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, boolean);

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



export const addItemToCart = (cartItems, productToAdd) => {
    const newCartITems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartITems);
}
export const removeItemToCart = (cartItems, productToAdd) => {
    const newCartITems = removeCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartITems);
}
export const clearItemFromCart = (cartItems, productToAdd) => {
    const newCartITems = clearCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS ,newCartITems);
}