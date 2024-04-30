import React, { useState } from "react";
import "./Delivery.css"; // Import your CSS file for custom styling
import { Button, Form, Row, Col } from "react-bootstrap"; // Import Bootstrap Button, Form, Row, and Col components
import { PlusCircle } from "react-bootstrap-icons"; // Import PlusCircle icon from react-bootstrap-icons

function DeliveryAddress() {
  // Sample addresses data
  const addresses = [
    {
      name: "John Doe",
      number: "1234567890",
      address: "123 Main St, City, Country",
    },
    {
      name: "Jane Smith",
      number: "0987654321",
      address: "456 Elm St, City, Country",
    },
    {
      name: "Alice Johnson",
      number: "9876543210",
      address: "789 Oak St, City, Country",
    },
  ];

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

  const handleDelivery = () => {
    if (selectedAddress) {
      console.log("Delivering to:", selectedAddress.address);
      // Implement delivery logic here
    } else {
      console.log("Please select an address first.");
    }
  };

  const handleNewAddressClick = () => {
    setShowNewAddressForm(true);
  };

  const handleSaveNewAddress = () => {
    // Implement logic to save new address
    // Reset the form and hide it
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
  };

  const handleNewAddressFormChange = (e) => {
    const { name, value } = e.target;
    setNewAddressFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="delivery-address-container">
      <div className="delivery-address-heading">
        <h2>Delivery Address</h2>
      </div>
      <div className="delivery-address-options">
        {addresses.map((address, index) => (
          <div key={index} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="deliveryAddress"
              id={`address${index}`}
              value={address.address}
              onChange={() => setSelectedAddress(address)}
              checked={selectedAddress === address}
            />
            <label className="form-check-label" htmlFor={`address${index}`}>
              {`${address.name} - ${address.number}`}
              <br />
              {address.address}
            </label>
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
              <Button variant="primary" onClick={handleSaveNewAddress}>
                Save
              </Button>
            </Form>
          </div>
        )}
      </div>
      {selectedAddress && (
        <div className="deliver-here-button">
          <Button variant="primary" onClick={handleDelivery}>
            Deliver Here
          </Button>
        </div>
      )}
    </div>
  );
}

export default DeliveryAddress;
