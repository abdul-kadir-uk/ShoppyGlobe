import React from 'react';
import PropTypes from 'prop-types';
import './style/ProductItem.css';
import { useNavigate } from 'react-router-dom';


const ProductItem = ({ product, addToCart }) => {
  // for navigation 
  const navigate = useNavigate();
  // if product data not available 
  if (!product) {
    return <div>Product data is missing.</div>;
  }

  // Navigate to product details page
  const handleViewMore = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <div className="product-actions">
        <button className='btn_add' onClick={addToCart}>Add to Cart</button>
        <button className='btn_more' onClick={handleViewMore}>View More</button>
      </div>
    </div>
  );
};
// Defining prop types for the 'ProductItem' component
ProductItem.propTypes = {
  // 'product' is an object with the specified shape, and all fields are required
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  // 'addToCart' is a function, and it's required
  addToCart: PropTypes.func.isRequired,
};

export default ProductItem;
