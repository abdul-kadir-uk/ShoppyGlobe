import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import './style/cart.css';

const Cart = () => {
  // State variables to store cart items, total amount, and product prices
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productPrices, setProductPrices] = useState({});

  // for navigate to different routes 
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      // get the token from the local storage 
      const token = localStorage.getItem('token');
      // axios for making http request 
      const response = await axios.get('http://localhost:1000/cart', {
        headers: {
          // passing the token for Authorization 
          Authorization: `Bearer ${token}`,
        },
      });
      // update the state with fetched cart items 
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // If the user is unauthorized (401 error), redirect them to the login page
      if (error.response && error.response.status === 401) {
        navigate('/login');
      }
    }
  };

  // function for getting the total amount 
  const calculateTotalAmount = (pricesMap, items) => {
    const total = items.reduce((acc, item) => {
      const price = pricesMap[item._id] || 0;
      return acc + price * item.quantity;
    }, 0).toFixed(2);
    // set the total amount 
    setTotalAmount(total);
  };

  const handleProductLoad = (product, itemId) => {
    setProductPrices((prev) => {
      // Update the prices map with the new product's price
      const updatedPrices = { ...prev, [itemId]: product.price };
      // Recalculate the total amount with the updated prices
      calculateTotalAmount(updatedPrices, cartItems);
      return updatedPrices;
    });
  };

  const handleQuantityChange = (newQuantity, itemId) => {
    //  update cart items according to the quantity change 
    const updatedCartItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCartItems);
    // recalculate total amount 
    calculateTotalAmount(productPrices, updatedCartItems);
  };

  const removeCartItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      // axios for making http request 
      await axios.delete(`http://localhost:1000/cart/${itemId}`, {
        headers: {
          // token for authentication 
          Authorization: `Bearer ${token}`,
        },
      });
      // update cart items 
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
      // recalculate the total amount 
      calculateTotalAmount(productPrices, updatedCartItems);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleContinue = () => {
    localStorage.setItem('totalAmount', totalAmount);
  };

  // Fetch cart items when the component mounts
  useEffect(() => {
    fetchCartItems();
  }, []);

  // If the cart is empty, display a message
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="cart-container">
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          onRemove={removeCartItem}
          onProductLoad={handleProductLoad}
          onQuantityChange={handleQuantityChange}
        />
      ))}

      <div className="cart-summary">
        <h3>Total Amount: ${totalAmount}</h3>
        <Link to="/userdetails">
          <button className="proceed-button" onClick={handleContinue}>Continue</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
