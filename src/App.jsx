import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import { Suspense } from 'react';
import ProductList from './Components/ProductList'
import { useDispatch } from 'react-redux';
import { login } from './redux/authSlice';

// Lazy loading of components for better performance
const ProductDetail = React.lazy(() => import('./Components/ProductDetail'));
const Cart = React.lazy(() => import('./Components/Cart'));
const Checkout = React.lazy(() => import('./Components/Checkout'));
const NotFound = React.lazy(() => import('./Components/NotFound'));
const Error = React.lazy(() => import('./Components/Error'));
const Register = React.lazy(() => import('./Components/Register'));
const Login = React.lazy(() => import('./Components/Login'));
const OrdereSuccess = React.lazy(() => import('./Components/OrderSuccess'))
const UserDetails = React.lazy(() => import('./Components/UserDetails'))

// Defining the router configuration using `createBrowserRouter`
const router = createBrowserRouter([
  { // Define the base route
    path: '/',
    element: <Layout />,
    // Handle any errors in the routing process
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <Error />
      </Suspense>
    ),
    // Define the child routes within the base layout
    children: [
      { // Home route
        path: '/',
        element: <ProductList />
      },
      { // Dynamic route for displaying individual product details
        path: 'products/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail />
          </Suspense>
        ),
      },
      { // Route for the cart page
        path: 'cart',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        ),
      },
      { // Route for the checkout page
        path: 'checkout',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        // Route for the register page 
        path: '/register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        )
      },
      {
        // Route for the login page 
        path: '/login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        )
      },
      {
        // Route for the ordersuccess page 
        path: '/ordersuccess',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <OrdereSuccess />
          </Suspense>
        )
      },
      {
        // Route for the user details page 
        path: '/userdetails',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDetails />
          </Suspense>
        )
      },
    ],
  },
  { // Catch-all route for unknown paths
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);


function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    // dispatch an login function when the token is found 
    if (token) {
      dispatch(login(token));
    };
  }, []);

  return (
    <>
      {/* provide th router to application using RouterProvider  */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
