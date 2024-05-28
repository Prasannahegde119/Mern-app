import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo1.avif";
import { Link, useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faUser,
  faSignOutAlt,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../Contexts/CartContext";
import axios from "axios"; // Import axios

const CustomNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState(""); // State to store username
  const navigate = useNavigate();
  const { totalItems, setCartProducts } = useCart(); // Destructure setCartProducts from useCart

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Set login status to true if token exists

      // Fetch cart products when logged in
      const fetchCartProducts = async () => {
        try {
          const cartResponse = await axios.get(
            "http://localhost:5000/api/cart",
            {
              headers: {
                "Content-Type": "application/json",
                authorization: token,
              },
            }
          );
          const productIds = cartResponse.data.map((item) => item.productId);

          const productDetailsPromises = productIds.map((productId) =>
            axios.get(`http://localhost:5000/api/products/${productId}`)
          );

          const productResponses = await Promise.all(productDetailsPromises);
          const products = productResponses.map((response, index) => ({
            ...response.data,
            quantity: cartResponse.data[index].quantity,
          }));

          setCartProducts(products);
        } catch (error) {
          console.error("Error fetching cart products:", error);
        }
      };

      fetchCartProducts();
    }

    // Fetch categories
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        const categoryList = data.map((product) => product.category);
        setCategories([...new Set(categoryList)]);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Set username state if it exists in localStorage
    }
  }, []);

  const handleLogout = () => {
    // Remove token and username from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Change login status to false
    setIsLoggedIn(false);
    // Clear username state
    setUsername("");
    // Redirect to login page or any other desired page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary containers">
      <Link className="navbar-brand ms-3" to="/">
        <img src={logo} alt="logo" className="logo1" />
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
          <li className="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle text-dark"
              to="/"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faUser} />{" "}
              {isLoggedIn ? `${username}` : " Profile"}
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {isLoggedIn && (
                <>
                  <li>
                    <Link className="dropdown-item" to="/OrderList">
                      <FontAwesomeIcon icon={faListAlt} className="me-2" />
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <li>
                  <Link className="dropdown-item" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
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
                id="navbarDropdownCategories"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownCategories"
              >
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
          <li>
            <Link to="/Cart">
              <FontAwesomeIcon icon={faCartShopping} className="fs-3" />
              {isLoggedIn && totalItems > 0 && (
                <span className="badge bg-danger rounded-pill">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
