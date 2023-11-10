import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import './UserProfile.css'; // Import your CSS file

export default function Users() {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setErrors] = useState({});
  const [isEditing, setEditing] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    fullname: '',
    email: '',
    phonenumber: '',
    DOB: '',
    pronounce: 0,
    profession: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:9000/api/profile.php?userId=${userId}`)
        .then(function (response) {
          if (response.data.userData) {
            setUser(response.data.userData);
            setUserData(response.data.userData);
          } else {
            setErrors("Username not found. Please log in.");
          }
        })
        .catch(function (error) {
          console.error("Error: " + error);
          setErrors("Server error. Unable to fetch user data. Check the network tab for more details.");
        });
    } else {
      setErrors("User ID not found. Please log in.");
    }
  }, []);

  const handleEditClick = () => {
    setEditing(!isEditing);
  };

 
  const handleSaveClick = (e) => {
    e.preventDefault();
    setErrors({}); // Clear any previous errors
    const userId = localStorage.getItem('userId');

    if (user) {
        const updatedUserData = {
            ...userData,
            email: user.email,
        };
        if (userData.phonenumber !== null) {
          updatedUserData.phonenumber = userData.phonenumber;
      }
        axios.post(`http://localhost:9000/api/profile.php?userId=${userId}`, updatedUserData)
            .then((response) => {
                setEditing(false);
                setUser(response.data.userData);

                // Display success message
                setErrors({ success: response.data.message });

                // Reload the page after a successful update
                if (response.data.status === 1) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            })
            .catch(function (error) {
                console.error('Update error:', error.response.data);

                // Display error message
                if (error.response.data.status === 0) {
                    setErrors({ update: error.response.data.message });
                } else if (error.response.data.status === 400) {
                    setErrors({ update: error.response.data.message });
                } else {
                    setErrors({ update: 'Failed to update user. Please try again.' });
                }

                // Introduce a delay before reloading the page
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            });
    }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserData((prevData) => ({
    ...prevData,
    [name]: value !== null ? value : '',
  }));
};


  useEffect(() => {
    const userElement = document.querySelector('.user-info');
    const profileCard = document.querySelector('.user-details');
    if (userElement && profileCard) {
      userElement.style.display = isEditing ? 'flex' : 'none';
      profileCard.style.display = isEditing ? 'none' : 'flex';
    }
  }, [isEditing]);

  function logout() {
    axios.get("http://localhost:9000/api/logout.php")
        .then(function (response) {
            // Handle logout success
            localStorage.removeItem('userId'); // Remove 'userId' from localStorage
            Navigate("/login"); // Redirect to the login page
        })
        .catch(function (error) {
            console.error("Logout error: " + error);
        });
}

  let pronounce = "";

  if (user && user.pronounce !== null) {
    if (user.pronounce === 0) {
      pronounce = "null";
    } else if (user.pronounce === 1) {
      pronounce = "Him / He";
    } else if (user.pronounce === 2) {
      pronounce = "Her / She";
    }
  }
  return (
    <div className="user-profile">
      <h1>Profile</h1>
      <button className="edit-button" onClick={handleEditClick}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      <form className={`user-info ${isEditing ? 'editing' : ''}`} onSubmit={handleSaveClick}>
        <label>Username:</label>
        <input
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Full Name:</label>
        <input
          name="fullname"
          value={userData.fullname || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Email:</label>
        <input
          name="email"
          value={userData.email}
          disabled
        />

        <label>Mobile Number:</label>
        <input
          name="phonenumber"
          value={userData.phonenumber || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Date of Birth:</label>
        <input
          name="DOB"
          type='date'
          value={userData.DOB  || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <label>Pronounce:</label>
        <select
          name="pronounce"
          value={userData.pronounce}
          onChange={handleInputChange}
          disabled={!isEditing}
        >
          <option value={0}>Default</option>
          <option value={1}>Him / he</option>
          <option value={2}>Her / she</option>
        </select>

        <label>Profession:</label>
        <input
          name="profession"
          value={userData.profession || ''}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        {isEditing && (
          <button className="save-button" type='submit'>
            Save
          </button>

        )}
    
      </form>
      {user && (
        <div className={`user-details ${isEditing ? 'editing' : ''}`}>
          <p>Username:&nbsp; {user.username}</p>
          <p>Full Name:&nbsp; {user.fullname}</p>
          <p>Email:&nbsp; {user.email}</p>
          <p>Mobile Number:&nbsp; {user.phonenumber}</p>
          <p>Pronounce:&nbsp; {pronounce} </p>
          <p>Date of Birth:&nbsp; {user.DOB}</p>
          <p>Profession:&nbsp; {user.profession}</p>
        </div>
      )}

{error && Object.keys(error).length > 0 && (
  <div className="error-message">
    {Object.values(error).map((error, index) => (
      <p key={index}>{error}</p>
    ))}
  </div>
)}

      <button className="logout-button" onClick={logout}>Log Out</button>
    </div>
  );
}

