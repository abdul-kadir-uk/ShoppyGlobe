import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import './style/ProductList.css';
import useFetchProducts from '../hooks/UseFetchProducts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  // for navigation 
  const navigate = useNavigate();
  // Get token from localStorage
  const token = localStorage.getItem('token');
  // fetch the products 
  const { data: products, loading, error } = useFetchProducts('http://localhost:1000/products');
  // state for query 
  const [searchQuery, setSearchQuery] = useState('');
  // state for filtered products 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // if products data available 
    if (products) {
      // set filtered products 
      setFilteredProducts(products.products);
      // Reset search query
      setSearchQuery('');
    }
  }, [products]);
  // founction for get the search input 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  // function for getting search product 
  const handleSearchClick = () => {
    // if products available 
    if (products) {
      const filtered = products.products.filter((product) =>
        // title incldude search query 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // set required products 
      setFilteredProducts(filtered);
    }
  };

  // Notify user when an item is added to the cart
  const notifyAddToCart = (productName) => {
    toast.success(`${productName} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  // Add product to cart
  const handleAddToCart = async (product) => {
    // if token available 
    if (token) {
      try {
        // create cart item 
        const response = await axios.post(
          'http://localhost:1000/cart',
          { productId: product._id, quantity: 1 },
          {
            headers: {
              // passing token for authorization 
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          notifyAddToCart(product.title); // Show success notification
        } else {
          toast.error("Failed to add product to cart.", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error("An error occurred while adding to cart.", {
          position: "top-center",
          autoClose: 2000,
        });
        console.log(`error ${error}`);
      }
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  };

  // Display loading state
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Display error state
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              addToCart={() => handleAddToCart(product)} // Pass addToCart function
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
