import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.avif';
import { Link, useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        const categoryList = data.map(product => product.category);
        setCategories([...new Set(categoryList)]);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/category/${selectedCategory}`); 
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark containers">
      <Link className="navbar-brand" to="/"><img src={logo} alt='logo' className='logo' /></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">Products</Link>
          </li>
          {loading ? (
            <li className="nav-item">
              <span className="nav-link">Loading categories...</span>
            </li>
          ) : (
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link className="dropdown-item" to={`/category/${category}`} onClick={() => navigate(`/category/${category}`)}>{category}</Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link custom-button" to="/Address">Contact Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default CustomNavbar;
