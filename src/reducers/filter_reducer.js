import {
    LOAD_PRODUCTS,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    OPEN_FILTER_OPTION,
    CLOSE_FILTER_OPTION,
} from "../_actions"

const filter_reducer = (state, action) => {
    if(action.type === LOAD_PRODUCTS) {
      let maxPrice = action.payload.map((p) => p.price )
      maxPrice = Math.max(...maxPrice)
      return {
        ...state, 
        all_products:[...action.payload], 
        filtered_products:[...action.payload],
        filters: {...state.filters, max_price:maxPrice, price:maxPrice}
      }
    }

    if(action.type === UPDATE_SORT) {
      return {...state, sort: action.payload}
    }

    if(action.type === OPEN_FILTER_OPTION) {
      return {...state, filterOptionState: true}
    }

    if(action.type === CLOSE_FILTER_OPTION) {
      return {...state, filterOptionState: false}
    }

    if(action.type === SORT_PRODUCTS) {
      const {sort, filtered_products} = state;
      let tempProducts = [...filtered_products];
      if(sort === 'price-lowest') {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1
          }
          if (a.price > b.price) {
            return 1
          }
          return 0
        })
      }
      if(sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if(sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if(sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      return {...state, filtered_products: tempProducts}
    }
    if(action.type === UPDATE_FILTERS) {
      const {name, value} = action.payload
      return {...state, filters: {...state.filters, [name]: value}}
    }
    if(action.type === FILTER_PRODUCTS) {
      const { all_products} = state
      const {text, category, brand, sizes, price, shipping} = state.filters
  
      let tempProducts = [...all_products]
      // Text
      if(text) {
        tempProducts = tempProducts.filter((products) => {
          return products.name.toLowerCase().startsWith(text)
    
        })
      }
      // Category
      if(category !== 'all') {
        tempProducts = tempProducts.filter(products => products.category.name === category)
      }
      // Brand
      if(brand !== 'all') {
        tempProducts = tempProducts.filter(products => products.brand === brand)
      }

      // sizes
      // if(sizes !== 'all') {
      //   tempProducts = tempProducts.filter((products) => {
      //     return products.sizes.find((s) => s === sizes)
      //   })
      // }
      // price 
      tempProducts = tempProducts.filter((products) => products.price <= price)
      
      // shipping
      if(shipping) {
        tempProducts = tempProducts.filter((products) => products.shipping === true)
      }
      return {...state, filtered_products: tempProducts}
    }
    if(action.type === CLEAR_FILTERS) {
      return {
        ...state,
        filters:{
          ...state.filters,
          text: '',
          brand: 'all',
          category: 'all',
          sizes: [],
          price: state.filters.max_price,
          shipping: false,
        }
      }
  
    }

    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default filter_reducer
  