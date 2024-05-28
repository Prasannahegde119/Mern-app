import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { PlusCircle, CheckCircle } from "react-bootstrap-icons";
import PriceDetails from "../PriceDetails/PriceDetails";
import axios from "axios";
import "./Delivery.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";

function DeliveryAddress() {
  const { cartProducts, totalPrice } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddressFormData, setNewAddressFormData] = useState({
    name: "",
    phoneNumber: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    country: "",
  });

  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/getaddress`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        setAddresses(data.addresses);
      } else {
        console.error("Failed to fetch addresses");
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);
  const handleDelivery = async () => {
    if (selectedAddress && cartProducts.length > 0) {
      try {
        const token = localStorage.getItem("token");
        // Extracting only the product IDs from the cartProducts array
        const productIds = cartProducts.map((product) => product.id);
        const orderData = {
          address: selectedAddress,
          cartItems: productIds, // Sending only the product IDs
          totalPrice: totalPrice,
        };
        const response = await axios.post(
          "http://localhost:5000/api/orders",
          orderData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (response.status === 201) {
          console.log("Order placed successfully");
          console.log(orderData);
          navigate("/InvoiceGenerator");
        } else {
          console.error("Failed to place order");
        }
      } catch (error) {
        console.error("Error placing order:", error);
      }
    } else {
      console.log("Please select an address and add items to the cart first.");
    }
  };

  const handleNewAddressClick = () => {
    setShowNewAddressForm(true);
  };

  const handleSaveNewAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/addresses",
        newAddressFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 201) {
        console.log("Address added successfully");
        fetchAddresses(); // Call fetchAddresses here
        setShowNewAddressForm(false);
        setNewAddressFormData({
          name: "",
          phoneNumber: "",
          pincode: "",
          locality: "",
          address: "",
          city: "",
          country: "",
        });
      } else {
        console.error("Failed to add address");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  const handleNewAddressFormChange = (e) => {
    const { name, value } = e.target;
    setNewAddressFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancelAddress = () => {
    setShowNewAddressForm(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          <div className="delivery-address-container">
            <div className="delivery-address-heading">
              <h2>Delivery Address</h2>
            </div>
            <div className="delivery-address-options">
              {addresses.map((address) => (
                <div key={address._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="deliveryAddress"
                    id={`address-${address._id}`}
                    value={address.address}
                    onChange={() => setSelectedAddress(address)}
                    checked={
                      selectedAddress && selectedAddress._id === address._id
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`address-${address._id}`}
                  >
                    {`${address.name} - ${address.phoneNumber}`}
                    <br />
                    {address.address}
                  </label>
                  {selectedAddress && selectedAddress._id === address._id && (
                    <div className="deliver-here-button">
                      <Button variant="primary" onClick={handleDelivery}>
                        Deliver Here
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="add-new-address" onClick={handleNewAddressClick}>
                <PlusCircle />
                <span>Add New Address</span>
              </div>
              {showNewAddressForm && (
                <div className="new-address-form">
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group controlId="formName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={newAddressFormData.name}
                            placeholder="Enter name"
                            onChange={handleNewAddressFormChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formPhoneNumber">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phoneNumber"
                            value={newAddressFormData.phoneNumber}
                            placeholder="Enter phone number"
                            onChange={handleNewAddressFormChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="formPincode">
                          <Form.Label>Pincode</Form.Label>
                          <Form.Control
                            type="text"
                            name="pincode"
                            value={newAddressFormData.pincode}
                            placeholder="Enter pincode"
                            onChange={handleNewAddressFormChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formLocality">
                          <Form.Label>Locality</Form.Label>
                          <Form.Control
                            type="text"
                            name="locality"
                            value={newAddressFormData.locality}
                            placeholder="Enter locality"
                            onChange={handleNewAddressFormChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group controlId="formAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="address"
                        value={newAddressFormData.address}
                        placeholder="Enter address"
                        onChange={handleNewAddressFormChange}
                      />
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group controlId="formCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={newAddressFormData.city}
                            placeholder="Enter city"
                            onChange={handleNewAddressFormChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="formCountry">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            value={newAddressFormData.country}
                            placeholder="Enter country"
                            onChange={handleNewAddressFormChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between pt-3">
                      <Button variant="warning" onClick={handleSaveNewAddress}>
                        Save
                      </Button>
                      <Button
                        variant="primary"
                        className="ms-2"
                        onClick={handleCancelAddress}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4 pt-4">
          <div className="price-details-container">
            <PriceDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
