import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.avif';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

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
    <nav className='container'>
      <img src={logo} alt='logo' className='logo' />
      <ul>
      <li><Link to='/'>Home</Link></li>
        <li><Link to='/'>Products</Link></li>
        {loading ? (
          <li>Loading categories...</li>
        ) : (
          <li>
            <select onChange={handleCategoryChange}>
              <option value="">Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </li>
        )}
        <li><Link to='/Address' className='custom-button'>Contact Us</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
