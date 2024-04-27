import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

const Cart = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const products = [];

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      for (let [productId, quantity] of queryParams.entries()) {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${productId}`
          );
          products.push({ ...response.data, quantity: quantity });
        } catch (error) {
          console.error(error);
        }
      }
      setCartProducts(products);
    };

    fetchProducts();
  }, [queryParams]);

  const handlePayment = () => {
    // Implement payment logic here
    alert("Payment successful!");
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        {cartProducts.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          cartProducts.map((product) => (
            <div key={product.id} className="row mt-4">
              <div className="col-md-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          ))
        )}
        <div className="mt-4">
          <h4>Payment Method</h4>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="creditCard"
              value="creditCard"
            />
            <label className="form-check-label" htmlFor="creditCard">
              Credit Card
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="paypal"
            />
            <label className="form-check-label" htmlFor="paypal">
              PhonePay
            </label>
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
