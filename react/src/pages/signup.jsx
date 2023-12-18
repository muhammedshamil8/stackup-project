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
            if (response.data.status === 0) {
                setErrors({ message: response.data.message });
            } else {
                Navigate('/login');
            }
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
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already Registered? <a className="link"  onClick={handleLinkClick}>Sign in</a>
                </p>
            </form>
        </div>
        </div>
    );
}

export default Signup;
