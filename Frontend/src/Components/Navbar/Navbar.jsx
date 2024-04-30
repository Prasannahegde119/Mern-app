import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.avif";
import { Link, useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set login status to true if token exists
    }

    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const categoryList = data.map((product) => product.category);
        setCategories([...new Set(categoryList)]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    // Change login status to false
    setIsLoggedIn(false);
    // Redirect to login page or any other desired page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary containers">
      <Link className="navbar-brand ms-3" to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/Userchart">
              AdminDashboard
            </Link>
          </li>
          {loading ? (
            <li className="nav-item">
              <span className="nav-link">Loading categories...</span>
            </li>
          ) : (
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      className="dropdown-item text-dark"
                      to={`/category/${category}`}
                      onClick={() => navigate(`/category/${category}`)}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link custom-button text-dark" to="/Address">
              Contact Us
            </Link>
          </li>
          {/* Conditional rendering based on login status */}
          {isLoggedIn ? (
            <li className="nav-item">
              <button
                className="nav-link text-dark border-0 bg-transparent"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/Login">
                Login
              </Link>
            </li>
          )}
          <li>
            <Link to="/Cart">
              <FontAwesomeIcon icon={faCartShopping} className="fs-3" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
