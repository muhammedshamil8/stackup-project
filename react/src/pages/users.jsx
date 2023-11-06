import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Users() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:9000/api/home.php?userId=${userId}`)
        .then(function (response) {
          if (response.data.username) {
            setUser(response.data);
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

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          {/* Display other user data as needed */}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
