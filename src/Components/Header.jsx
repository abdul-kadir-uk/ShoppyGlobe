import React from 'react';
import { Link } from 'react-router-dom';
import cart_img from './../assets/images/shopping-cart.png';
import { useSelector, useDispatch } from 'react-redux';
import './style/header.css';
import { logout } from '../redux/authSlice';

const Header = () => {

  // get the login status using redux selector 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  function handle_logout() {
    dispatch(logout());
  }

  return (
    <div className='box'>
      {/* navbar for navigation links  */}
      <nav className='navbar'>
        <ul>
          <li>
            {/* home  */}
            <Link className="nav-link" to={'/'} >
              Home
            </Link>
          </li>
          <li>
            {/* brand  */}
            <h1 className='shoppy'> ShoppyGblobe </h1>
          </li>
          <li className='auth_box'>
            {
              isLoggedIn ? (<> <Link to="/cart" className="nav-link">
                <img src={cart_img} alt="Shopping Cart" width={50} height={50} />
              </Link>
                <button onClick={handle_logout} className='logout_btn'> Logout </button>
              </>
              ) : (
                <span className='auth_box_in'>
                  <Link to={'/login'}>Login</Link>
                  <Link to={'./register'}>Register</Link>
                </span>
              )
            }

          </li>

        </ul>
      </nav>

    </div>
  );
};

export default Header;
