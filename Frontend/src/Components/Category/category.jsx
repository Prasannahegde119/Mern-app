import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Import Link and useParams
import './category.css'; 
import Navbar from '../Navbar/Navbar';

const App = () => {
  const { categoryName } = useParams(); // Get the category name from URL parameters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryName) {
      const filtered = products.filter(product => product.category === categoryName);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [categoryName, products]);

  return (
    <div>
    <Navbar/>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="card">
            <Link to={`/contact/${product.id}`}>
              <img src={product.image} className="card-img-top" alt={product.title} id='image1'/>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Category: {product.category}</p>
              <p className="card-text1">{product.description.slice(0,150)}</p>
              <p className="card-text">Price: ${product.price}</p>
              <Link to={`/contact/${product.id}`}>
                <button type="button" className="cool-button ">Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
