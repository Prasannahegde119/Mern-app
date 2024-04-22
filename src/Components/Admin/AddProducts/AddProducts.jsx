import React, { useState } from "react";
import "./AddProducts.css";

const AddProducts = () => {
  const [product, setProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
    ratingCount: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/add-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const data = await response.json();
      console.log("Submitted product:", data);
      setSuccessMessage("Product added successfully");
      // Clear the form after successful submission
      setProduct({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: "",
        ratingCount: "",
      });
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting product:", error);
      setSuccessMessage("");
      setErrorMessage("Error adding product. Please try again.");
    }
  };

  return (
    <div className="add-products-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-products-form">
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={product.id}
          onChange={handleChange}
          required
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={product.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          required
        />

        <label htmlFor="ratingCount">Rating Count:</label>
        <input
          type="number"
          id="ratingCount"
          name="ratingCount"
          value={product.ratingCount}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default AddProducts;
