import React, { useEffect, useContext, useReducer } from 'react'
import reducer from "../reducers/filter_reducer"
import {
    LOAD_PRODUCTS,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../_actions"
import { useProductsContext } from "./products_context"

const initialState = {
    filtered_products: [],
    all_products: [],
}
  
const FilterContext = React.createContext()
  
    export const FilterProvider = ({ children }) => {
    const {products} = useProductsContext()
  
    // useEffect to dispatch products to LOADPRODUCTS
    useEffect(() => {
      dispatch({type: LOAD_PRODUCTS, payload: products})
    }, [products])
  
    const[state, dispatch] = useReducer(reducer, initialState)
    return (
      <FilterContext.Provider value={{...state}}>
        {children}
      </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}
  