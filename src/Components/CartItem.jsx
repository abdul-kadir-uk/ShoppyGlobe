import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style/cartItem.css';

const CartItem = ({ item, onRemove, onProductLoad, onQuantityChange }) => {
  // get the token fromlocal storage 
  const token = localStorage.getItem('token');
  // state for storing product 
  const [product, setProduct] = useState(null);
  // state for storing quantity 
  const [quantity, setQuantity] = useState(item.quantity);

  const fetchProductDetails = async (product_id) => {
    try {
      // get the product by id 
      const response = await axios.get(`http://localhost:1000/products/${product_id}`);
      // set the product 
      setProduct(response.data.product);
      // update the price of product 
      onProductLoad(response.data.product, item._id);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const updateQuantity = async (newQuantity) => {
    try {
      // update cart item for quantity change 
      await axios.put(
        `http://localhost:1000/cart/${item._id}`,
        { quantity: newQuantity },
        {
          headers: {
            // passing token for authorization 
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // set the quantity 
      setQuantity(newQuantity);
      // update cart items on quantity change 
      onQuantityChange(newQuantity, item._id);
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  // increase the quantity of product 
  const handleIncrease = () => {
    updateQuantity(quantity + 1);
  };
  // decrease the quantity of product 
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    } else {
      // remove product if quantity is 1 
      onRemove(item._id);
    }
  };

  // fetch product detail when product id change 
  useEffect(() => {
    fetchProductDetails(item.productId);
  }, [item.productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-item">
      <img src={product.thumbnail} alt={product.title} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>
          <Link to={`/products/${product._id}`}>{product.title}</Link>
        </h3>
        <p>Price: ${product.price} USD</p>
        <div className="quantity-controls">
          <button onClick={handleDecrease}>−</button>
          <span>{quantity}</span>
          <button onClick={handleIncrease}>+</button>
        </div>
        <p>Total: ${(product.price * quantity).toFixed(2)} USD</p>
        <button onClick={() => onRemove(item._id)} className="remove-button">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
