import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to server for authentication
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      // Handle successful login
      console.log("User logged in successfully");
      // Clear form fields after submission
      setFormData({ email: "", password: "" });
      // Clear error message
      setErrorMessage("");

      // Check if the user is admin
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "admin"
      ) {
        // Redirect to admin page
        navigate("/UserChart");
      } else {
        // Redirect to user homepage
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setErrorMessage("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
