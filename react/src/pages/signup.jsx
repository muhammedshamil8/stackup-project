import {Link} from "react-router-dom";
// react-app.js
import React, { useState } from 'react';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
      console.log('Signup button clicked');
        // Send username and password to the PHP script for registration
        const response = await fetch('/back-end/signup.php', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            alert('Signup successful');
        } else {
            alert('Signup failed');
        }
    };
  
    return (
      <div className="form animated fadeInDown">
      <form >
        <h1 className="title" >Sign up for free</h1>
            <input
                type="text"
                placeholder="Full name" autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password" autoComplete="current-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup} className="btn btn-block">Signup</button> 
            <p className="message">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
          </form>
        </div>
    );
}

export default Signup;
