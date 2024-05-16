import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";

const PriceDetails = () => {
  const navigate = useNavigate();
  const { totalPrice, totalItems, cartProducts } = useCart();

  return (
    <div className="d-flex flex-column">
      <h4>Price Details</h4>
      <div>
        <div className="d-flex justify-content-between">
          <p>Price:</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Total Items:</p>
          <p>{totalItems}</p>
        </div>
        {cartProducts.map((product) => (
          <div key={product.id} className="d-flex justify-content-between">
            <p>
              {product.title} (Quantity: {product.quantity}):
            </p>
            <p>${(product.price * product.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <p>Delivery:</p>
          <p className="text-success">Free</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Total Price:</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-success">Your Total Savings on this order $20</p>
        </div>
      </div>
    </div>
  );
};

export default PriceDetails;
