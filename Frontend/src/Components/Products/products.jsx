import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProduct();
  }, [productId]);
  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      //jwt token store in localstorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add to cart");
        navigate("/login");
      }
      const response = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //jwt token sending to the backen
          authorization: token,
        },
        body: JSON.stringify({ productId, quantity }), // Send only the id
      });

      if (!response.ok) {
        throw new Error("Failed to add to the cart");
      }
      const data = await response.json();
      // console.log("Submitted cart:", data);
      navigate("/Cart");
      console.log(response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      // Handle error
    }
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
