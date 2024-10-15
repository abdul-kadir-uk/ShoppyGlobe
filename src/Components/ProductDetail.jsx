// ProductDetail.jsx 
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetchProducts from './../hooks/UseFetchProducts';
import './style/ProductDetail.css';
import axios from 'axios';

const ProductDetail = () => {
  // use useparams for getting url parameters 
  const { id } = useParams();
  // get the products by pasing api url to custom hooks 
  const { data: product, loading, error } = useFetchProducts(`http://localhost:1000/products/${id}`);

  const handleAddToCart = async () => {
    // get the token from localstorage 
    const token = localStorage.getItem('token');
    // if token found 
    if (token) {
      try {
        // add product to the cart 
        await axios.post(
          'http://localhost:1000/cart',
          { productId: id, quantity: 1 },
          {
            headers: {
              // passing token for authorization 
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log('error ', error);
      }
    }
  };
  // to naviagte to required page 
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    await handleAddToCart();
    // naviaget to the cart page 
    navigate('/cart');
  };

  // display loading when data being fetched 
  if (loading) {
    return <p>Loading product details...</p>;
  }
  // display error when data is not fetched
  if (error) {
    return <p>Error: {error}</p>;
  }
  // In case product data is still not available
  if (!product || !product.product) {
    return <p>No product details available</p>;
  }
  // get title, description, price, stock, thumbnail from the product   
  const { title, description, price, stock, thumbnail } = product.product;

  return (
    <div className="product-detail-container">
      {/* check if a data is available  */}
      {product && (
        <div className="product-detail">
          {/* display product information  */}
          <div className="product-info">
            <h2>{title}</h2>
            <div className="img">
              <img src={thumbnail} alt={title} className="product-image" />
            </div>
            <p className="description">{description}</p>
            <p className='stock'> <strong> Stock: </strong>  {stock}</p>
            <p className="price"><strong>Price:</strong> ${price}</p>
            <div className="product-actions">
              {/* buy now button for calling buynow function   */}
              <button onClick={handleBuyNow} className="buy-now">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
