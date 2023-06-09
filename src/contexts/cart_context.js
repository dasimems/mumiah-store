import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  SET_SHIPPING_FEE,
} from '../_actions'

const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'))
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage("cart") || [],
  total_items:0,
  total_amount: 0,
  shipping_fee: 1500
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // add to cart
  const addToCart = (id, sizes, amount, product) => {
    dispatch({type: ADD_TO_CART, payload:{id, sizes, amount, product}})
  }
   // remove item
   const removeItem = (id) => {
    dispatch({type: REMOVE_CART_ITEM, payload: id})
  }

  // toggle amount
  const toggleAmount = (id, value) => {
    dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload:{id, value}})
  }

  // clear cart
  const clearCart = () => {
    dispatch({type: CLEAR_CART})
  }

  const changeShippingFee = (fee) =>{

    if(fee && isFinite(fee)){

      fee = parseInt(fee)

      dispatch({type: SET_SHIPPING_FEE, payload: fee})

      setTimeout(()=>{

        dispatch({type: COUNT_CART_TOTALS});

      })


    }


  }

  useEffect(() => {
    dispatch({type: COUNT_CART_TOTALS})
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])

  return (
    <CartContext.Provider 
      value={{
        ...state, 
        addToCart, 
        removeItem, 
        toggleAmount, 
        clearCart,
        changeShippingFee
      }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
