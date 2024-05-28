import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderList.css"; // Import your CSS file
import CustomNavbar from "../Navbar/Navbar";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/getorder", {
          headers: {
            Authorization: token,
          },
        });
        const ordersWithProductDetails = await Promise.all(
          response.data.map(async (order) => {
            const productDetailsPromises = order.products.map((productId) =>
              axios.get(`http://localhost:5000/api/products/${productId}`)
            );
            const productResponses = await Promise.all(productDetailsPromises);
            const products = productResponses.map((response) => response.data);
            return {
              ...order,
              products: products,
            };
          })
        );
        setOrders(ordersWithProductDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <CustomNavbar />
      <div className="order-list-container">
        <h2 className="order-list-heading">Your Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : orders && orders.length > 0 ? (
          <div>
            {orders.map((order) => (
              <div key={order._id} className="order-item">
                <h3>Order ID: {order._id}</h3>
                <p>Total Price: ${order.totalPrice}</p>
                <p>Address: {order.address.address}</p>
                <p>City: {order.address.city}</p>
                <p>Products:</p>
                <ul className="product-list1">
                  {order.products.map((product) => (
                    <li key={product._id} className="product-item">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                      />
                      <p className="product-name">
                        Name: {product.title.slice(0, 12)}
                      </p>
                      <p className="product-price">Price: ${product.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;
