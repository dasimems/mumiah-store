import React from 'react';
import { useFilterContext } from '../../contexts/filter_context';
import { getUniqueValues, formatPrice } from '../../utils/helpers';

function Filter(props) {
  const {
    filters: { text, category, brand, size, min_price, price, max_price, shipping },
    updateFilters,
    clearFilters,
    all_products
  } = useFilterContext();

  const categories = getUniqueValues(all_products, 'category');
  const brands = getUniqueValues(all_products, 'brand');
  const sizes = getUniqueValues(all_products, 'sizes');

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Search input */}
        <div className="form-control">
          <input
            type="text"
            name="text"
            placeholder="search"
            className="search-input"
            value={text}
            onChange={updateFilters}
          />
        </div>
        {/* End Search input */}
        {/* Categories */}
        <div className="form-control">
          <h5>Categories</h5>
          <div>
            {categories.map((c, index) => {
              return (
                <button
                  key={index}
                  onClick={updateFilters}
                  type="button"
                  name="category"
                  className={`${category === c?.toLowerCase() ? 'active' : null}`}>
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        {/* End Categories */}
        {/* Brand */}
        <div className="form-control">
          <h5>Brands</h5>
          <select onChange={updateFilters} name="brand" value={brand}>
            {brands.map((c, index) => {
              return (
                <option key={index} value={c}>
                  {c}
                </option>
              );
            })}
          </select>
        </div>
        {/* End of brand */}
        {/* Sizes */}
        <div className="form-control">
          <h5>Sizes</h5>
          <ul className="container">
            {sizes.map((s, index) => (
              <li key={index}>
                <label>
                  <input name="sizes" onChange={updateFilters} type="checkbox" value={s} />
                  {s}
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/* End of sizes */}
        {/* Price */}
        <div className="form-control">
          <h5>Price</h5>
          <p>{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            onChange={updateFilters}
            min={min_price}
            max={max_price}
            value={price}
          />
        </div>
        {/* End Price */}
        {/* Shipping */}
        <div className="form-control">
          <label htmlFor="shipping">Free shipping</label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            onChange={updateFilters}
            checked={shipping}
          />
        </div>
        {/* End of shipping */}
      </form>
      <button type="button" className="clear-btn" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}

export default Filter;