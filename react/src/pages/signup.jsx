import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const Navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors({}); // Clear any previous errors

        axios.post('http://localhost:9000/api/signup.php', inputs).then(function (response) {
            if (response.data.status === 0) {
                setErrors({ message: response.data.message });
            } else {
                Navigate('/login');
            }
        });
    }

    return (
        <div className="form animated fadeInDown">
            <form onSubmit={handleSubmit}>
                <h1 className="title">Sign up for free</h1>
                {errors.message && <div className="error">{errors.message}</div>}

                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Full name"
                    onChange={handleChange}
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
                />
                <input
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />
                <button className="btn btn-block">Signup</button>
                <p className="message">
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
