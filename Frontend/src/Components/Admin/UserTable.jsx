import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.css"; // Import custom CSS for styling
import AdminHome from "./AdminHome";
import { FaTrash } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      window.alert("Product deleted successfully");
    } catch (error) {
      console.log("Error removing product:", error);
    }
  };
  return (
    <div className="Dashboard">
      <div>
        <AdminHome />
      </div>

      <div className="product-list-container">
        <h2>Product List</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                  />
                </td>
                <td>
                  <FaTrash onClick={() => handleRemove(product._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
