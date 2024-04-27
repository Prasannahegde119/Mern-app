import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import Navbar from "../Navbar/Navbar";

const Products = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
          // { withCredentials: true }
        );
        setProduct(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Navigate to the Cart page with the productId and quantity as URL parameters
    window.location.href = `/cart?productId=${productId}&quantity=${quantity}`;
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p>Category: {product.category}</p>
            <p className="description">{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-secondary me-2"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-sm btn-secondary ms-2"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
