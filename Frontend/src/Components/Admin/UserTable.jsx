import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.css"; // Import custom CSS for styling
// import AdminHome from "./AdminHome";
import { FaTrash } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="Dashboard">
      <div>{/* <AdminHome /> */}</div>

      <div className="product-list-container">
        <h2>Product List</h2>
        <table className="product-table">
          <thead>
            <tr>
              <th>Sno</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, i) => (
              <tr key={i}>
                <td>{indexOfFirstItem + i + 1}</td>
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

        <Pagination>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev
            onClick={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          />
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              setCurrentPage((prev) =>
                prev < pageNumbers.length ? prev + 1 : prev
              )
            }
          />
          <Pagination.Last onClick={() => setCurrentPage(pageNumbers.length)} />
        </Pagination>
      </div>
    </div>
  );
};

export default ProductList;
