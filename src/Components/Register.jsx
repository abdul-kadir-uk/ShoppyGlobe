import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './style/register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // name state 
  const [name, setName] = useState('');
  // email state 
  const [email, setEmail] = useState('');
  // password state
  const [password, setPassword] = useState('');
  // mobile number state
  const [mobile_number, setMobile_number] = useState('');
  // address state
  const [address, setaddress] = useState('');
  // error state
  const [error, setError] = useState(null);
  // for navigation 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // prevent default form submission 
    e.preventDefault();

    // Construct the data object to be sent
    const userData = {
      name,
      mobile_number,
      address,
      email,
      password
    };

    try {
      // Send POST request to the registration API
      const response = await axios.post('http://localhost:1000/register', userData);

      // Handle success response
      if (response.status === 201) {
        alert("successfully registered");
        // Clear error message
        setError(null);
        // navigate to the login page 
        navigate('/login');
      }
    } catch (err) {
      // Handle error response
      setError('Something went wrong, please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <div className="register_box">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_num"> Mobile Number </label>
            <input
              type="number"
              id="mobile_num"
              value={mobile_number}
              onChange={(e) => setMobile_number(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address"> Complete Address </label>
            <textarea
              id="address"
              rows={5}
              value={address}
              onChange={(e) => setaddress(e.target.value)}
              required
            />
          </div>
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
          {/* Display error message */}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
