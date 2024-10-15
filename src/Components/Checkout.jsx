import React, { useState } from 'react';
import './style/checkout.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  // for navigation 
  const navigate = useNavigate();
  // for displaying error 
  const [error, setError] = useState("");
  // state for storing input 
  const [method, setMethod] = useState("");

  // Function to clear the cart items
  async function clear_order() {
    const token = localStorage.getItem("token");
    try {
      // Make a DELETE request to delete all items in the cart
      await axios.delete('http://localhost:1000/cart',
        {
          headers: {
            // passing token for authorization 
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (error) {
      console.error('Error clearing the cart:', error);
    }
  }

  async function handleclick() {
    // if value provided 
    if (method) {
      await clear_order();
      navigate('/ordersuccess');
      localStorage.removeItem("totalAmount");
    } else {
      // if value is not provide 
      setError("Please select payment method")
    }
  }

  function handleChange(e) {
    // set radio button value 
    setMethod(e.target.value);
  }

  const totalAmount = localStorage.getItem("totalAmount");

  return (
    <div className="checkout-container">
      {/* total amount  */}
      <h1>Total Amount: ${totalAmount}</h1>

      <h2>Choose Payment Method</h2>
      <ul className="payment-options">
        {/* radi buttons for payment options  */}
        <li><input type="radio" name="payment" id="googlePay" onChange={handleChange} /> Google Pay</li>
        <li><input type="radio" name="payment" id="phonePe" onChange={handleChange} /> PhonePe</li>
        <li><input type="radio" name="payment" id="paytm" onChange={handleChange} /> Paytm</li>
        <li><input type="radio" name="payment" id="card" onChange={handleChange} /> Debit/Credit Card</li>
        <li><input type="radio" name="payment" id="cod" onChange={handleChange} /> Cash on Delivery (COD)</li>
      </ul>
      <p> {error} </p>
      <button className="continue-btn" onClick={handleclick} >Continue</button>
    </div>
  );
};

export default Checkout;
