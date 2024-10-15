import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/userdetails.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  // state for user details 
  const [userDetails, setUserDetails] = useState(null);
  // state for error
  const [error, setError] = useState('');
  // state for edit
  const [isEditing, setIsEditing] = useState(false);
  // state for form data
  const [formData, setFormData] = useState({ name: '', mobile_number: '', address: '' });
  // for navigation 
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      // get the token from local storage 
      const token = localStorage.getItem('token');
      // if token missing 
      if (!token) {
        navigate('/login')
        return;
      }
      // request for getting data 
      const response = await axios.get('http://localhost:1000/userdetails', {
        headers: {
          // token for Authorization 
          Authorization: `Bearer ${token}`
        }
      });
      // set the user details 
      const user_details = response.data.details
      setUserDetails(user_details);
      // set the form data
      setFormData({
        name: user_details.name,
        mobile_number: user_details.mobile_number,
        address: user_details.address,
      });
    } catch (error) {
      // console error
      console.error("Error fetching user details:", error);
      // display error 
      setError('Failed to fetch user details');
    }
  };
  // function for handle edit 
  const handleEdit = () => {
    setIsEditing(true);
  };
  // function for continue 
  const handleContinue = () => {
    navigate('/checkout')
  };
  //  function for getting input values 
  const handleChange = (e) => {
    // set the input values 
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateUserDetails = async () => {
    try {
      // get the token 
      const token = localStorage.getItem('token');
      // put request for update the user details 
      const response = await axios.put('http://localhost:1000/userdetails', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // set the updated user details 
      setUserDetails(response.data.updatedUser);
      // Exit editing mode after update
      setIsEditing(false);
    } catch (error) {
      // console the error 
      console.error('Error updating user details', error);
      // set the error
      setError('Failed to update user details');
    }
  };
  // get the user details when component mounts 
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="user_box">
      <div className="user-details-container">
        <h1 className='user_head'>Check your details</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          userDetails && (
            <div>
              {isEditing ? (
                <div className="edit-form">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <label>Mobile Number:</label>
                  <input
                    type="text"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />

                  <label>Address:</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />

                  <button className='user_button' onClick={updateUserDetails}>Save</button>
                  {!isEditing && <button onClick={handleContinue}>Continue</button>}

                </div>
              ) : (
                <div className="user-details">
                  <p><strong>Name:</strong> {userDetails.name}</p>
                  <p><strong>Mobile Number:</strong> {userDetails.mobile_number}</p>
                  <p><strong>Address:</strong> {userDetails.address}</p>
                  <div className="user_btn">
                    <button className='user_button' onClick={handleEdit}>Edit</button>
                    <button className='user_button' onClick={handleContinue}>Continue</button>
                  </div>

                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>

  );
};

export default UserDetails;
