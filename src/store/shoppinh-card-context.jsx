import { createContext,useState,useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext=createContext({
    items:[],
    addItemToCart:()=>{},
    updateItemQuantity:()=>{}
});

function shopingCarReducer(state,action){
if(action.type==="ADD_ITEM"){
  const updatedItems = [state.items];
    
  const existingCartItemIndex = updatedItems.findIndex(
    (cartItem) => cartItem.id === state.payload
  );
  const existingCartItem = updatedItems[existingCartItemIndex];

  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    const product = DUMMY_PRODUCTS.find((product) => product.id === state.payload);
    updatedItems.push({
      id: state.payload,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  return {
    items: updatedItems,
  };
}

return state;
}

export default function CartContextProvider({children}){

    const  [shoppingCartState, shopingCarDispatch ]= useReducer(shopingCarReducer,{
      items: []
    });
    const [shoppingCart, setShoppingCart] = useState({
        items: []
      });
    
      function handleAddItemToCart(id) {
        shopingCarDispatch({
          type: 'ADD_ITEM',
          payload:id
        })


        setShoppingCart((prevShoppingCart) => {
          
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            items: updatedItems,
          };
        });
      }
    
    const ctxValue={
      items:shoppingCartState.items,
      addItemToCart: handleAddItemToCart,
      updateItemQuantity: handleUpdateCartItemQuantity
    }

    return <CartContext value={ctxValue}>
        {children}
    </CartContext>
} 

