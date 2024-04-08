import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import './Products.css';
import Navbar from '../Navbar/Navbar';

const Contact = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar/>
       <div className="container">
      <div className="product-image-column">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-details-column">
        <h2>{product.title}</h2>
        <p>Category: {product.category}</p>
        <p className="description">{product.description}</p>
        <p>Price: ${product.price}</p>
        
      </div>
    </div>
    </div>
   
  );
}

export default Contact;
