import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import './Hero.css'; 

const App = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="card">
          <Link to={`/contact/${product.id}`}>
            <img src={product.image} className="card-img-top" alt={product.title} id='image1'/>
          </Link>
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">Category: {product.category}</p>
            <p className="card-text1">{product.description}</p>
            <p className="card-text">Price: ${product.price}</p>
            <Link to={`/contact/${product.id}`}>
              <button type="button" className="cool-button ">Buy Now</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;