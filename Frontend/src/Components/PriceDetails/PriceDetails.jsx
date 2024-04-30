import React from "react";
import { useNavigate } from "react-router-dom";

const PriceDetails = ({ totalPrice, totalItems }) => {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    navigate("/DeliveryAddress");
  };

  return (
    <div className="d-flex flex-column">
      <h4>Price Details</h4>
      <div>
        <div className="d-flex justify-content-between">
          <p>Price:</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Items:</p>
          <p>{totalItems}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Delivery:</p>
          <p className="text-success">Free</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Total Price:</p>
          <p>${totalPrice.toFixed(2)}</p>
        </div>
        <button className="btn btn-orange" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PriceDetails;
