import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const Navigate = useNavigate();
    const [isFormVisible, setFormVisible] = useState(true);
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Sending a POST request to the login API 
        axios
            .post("http://localhost:9000/api/login.php", inputs)
            .then(function (response) {
                if (response.data.status === 1) {
                    // Successful login, redirect to a dashboard or home page
                     // Store the user ID in localStorage
            localStorage.setItem('userId', response.data.user_id);
                        Navigate(`/dashboard`);

                    setError(`Login successful. User ID: ${response.data.user_id}`);

                } else {
                    // Display the error message 
                    setError(response.data.message);
                }
            })
            .catch(function (error) {
                console.error("Error: " + error);
            });
    };
    const handleLinkClick = () => {
        setFormVisible(false); // Set the form to be invisible (slide out)
        // You can add additional logic, such as setting a timeout to navigate after the animation completes
        setTimeout(() => {
            Navigate('/signup');
        }, 900); // Adjust the delay as needed
    };
    return (
        <div className={`login-signup-form animated ${isFormVisible ? 'fadeInDown' : 'slideOut'}`}>


        <div className="form ">
            <form onSubmit={handleSubmit}>
                <h1 className="title">Login into your account</h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button className="btn btn-block">Login</button>

                {error && <div className="error">{error}</div>}

                <p className="message">
                    Not Registered? <a onClick={handleLinkClick}>Create an account</a>
                </p>
            </form>
        </div>
        </div>
    );
}

export default Login;
