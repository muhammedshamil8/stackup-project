import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosClient from "../axiosClient";


function Signup() {

    const Navigate = useNavigate();
    const [isFormVisible, setFormVisible] = useState(true);
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({});

        axiosClient.post(`/signup.php`, inputs).then(function (response) {
            console.log(response.data)
            if (response.data.status === 0) {
                setErrors({ message: response.data.message });
            } else if (response.data.status === 1) {
                axiosClient
                    .post("/login.php", inputs)
                    .then(function (response) {

                        if (response.data.status === 1) {
                            // Successful login, redirect to a dashboard or home page
                            // Store the user ID in localStorage
                            localStorage.setItem('userId', response.data.user_id);
                            Navigate(`/dashboard`);


                        } else {
                            console.log('working');
                        }
                    })
                    .catch(function (error) {
                        console.error("Error: " + error);
                        // alert('An error occurred. Please try again later. i think backend server is down')
                    });
            } else {
                setErrors({ message: "An error occurred. Please try again later." });
            }
        })
            .catch(function (error) {
                console.error("Error: " + error);
                // alert('An error occurred. Please try again later. i think backend server is down')
            });
    }

    const handleLinkClick = () => {
        setFormVisible(false);
        setTimeout(() => {
            Navigate('/login');
        }, 700);
    };

    return (
        <div className={`login-signup-form animated ${isFormVisible ? 'fadeInDown' : 'slideOut'}`}>

            <div className="form ">
                <form onSubmit={handleSubmit}>
                    <h1 className="title">Sign up for free</h1>
                    {errors.message && <div className="error">{errors.message}</div>}

                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Full name"
                        onChange={handleChange}
                        className="input"
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        autoComplete="new-password"
                    />
                    <button className="btn btn-block" onClick={handleSubmit}>Signup</button>
                    <p className="message">
                        Already Registered? <a className="link" onClick={handleLinkClick}>Sign in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
