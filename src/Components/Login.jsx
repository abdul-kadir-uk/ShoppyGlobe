import React, { useState } from 'react';
import './style/login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

const Login = () => {
  // state for email 
  const [email, setEmail] = useState('');
  // state for password
  const [password, setPassword] = useState('');
  // state for error
  const [error, setError] = useState('');
  // for navigation 
  const navigate = useNavigate();
  // for dipatch the action 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    // prevent default behaviour of submit form like reload
    e.preventDefault();

    try {
      // request for getting token 
      const res = await axios.post('http://localhost:1000/login', { email, password })
      const { token } = res.data;
      // set the token in localstorage 
      localStorage.setItem("token", res.data.token)
      // navigate to the homepage 
      navigate('/');
      // dipatch login function 
      dispatch(login({ token }));

    } catch (error) {
      setError("invalid credentials");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login_box">

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>

    </div>
  );
};

export default Login;
