import React, { useEffect, useState } from 'react';
import axios from "axios";
import './UserProfile.css'; // Import your CSS file

export default function Users() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setEditing] = useState(false);

  // Define state variables for each user field
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:9000/api/home.php?userId=${userId}`)
        .then(function (response) {
          if (response.data.username) {
            setUser(response.data);
            // Set the state variables with user data
            setUsername(response.data.username);
            setFullName(response.data.fullname);
            setEmail(response.data.email);
            setMobileNumber(response.data.mobilenumber);
          } else {
            setError("Username not found. Please log in.");
          }
        })
        .catch(function (error) {
          console.error("Error: " + error);
          setError("Server error. Unable to fetch user data. Check the network tab for more details.");
        });
    } else {
      // Handle the case when there is no user ID
      setError("User ID not found. Please log in.");
    }
  }, []);

  // Handler to toggle editing mode
  const handleEditClick = () => {
    setEditing(!isEditing);
  };

  // Handler to save changes
  const handleSaveClick = () => {
    // Make an API call to save the changes (not implemented in this code)
    // Update the user state with the edited values
    setUser({
      ...user,
      username,
      fullname: fullName,
      email,
      mobilenumber: mobileNumber,
    });
    setEditing(false);
  };

  return (
    <div className="user-profile">
      <h1>Profile</h1>
      <button className="edit-button" onClick={handleEditClick}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <div className={`user-info ${isEditing ? 'editing' : ''}`}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={!isEditing} // Disable the input field when not editing
        />
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={!isEditing}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
        <input
          value={mobileNumber}
          disabled={!isEditing}
        />
        {/* Add other user fields as needed */}
        {isEditing && (
        <button className="save-button" onClick={handleSaveClick}>
          Save
        </button>
      )}
      </div>
      {user && (
        <div className="user-details">
          <p>Username: {user.username}</p>
          <p>Full Name: {user.fullname}</p>
          <p>Email: {user.email}</p>
          <p>Mobile Number: {user.mobilenumber}</p>
          <p>Gender: {user.gender}</p>
          <p>DOB: {user.dob}</p>
          <p>Your position / profession: {user.profession}</p>
          {/* Display other user data as needed */}
        </div>
      )}
     
      {error && <p className="error-message">{error}</p>}
      <button className="logout-button">Log Out</button>
    </div>
  );
}
