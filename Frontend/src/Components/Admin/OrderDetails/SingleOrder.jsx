import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SingleOrder.css"; // Import custom CSS for styling
// import AdminHome from "../AdminHome";

const SingleOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getallorders`
        );
        const orders = response.data;
        const order = orders.find((order) => order._id === orderId);

        if (order) {
          const productDetailsPromises = order.products.map((productId) =>
            axios.get(`http://localhost:5000/api/products/${productId}`)
          );
          const productResponses = await Promise.all(productDetailsPromises);
          const products = productResponses.map((response) => response.data);

          setOrder({ ...order, products: products });
        } else {
          console.error("Order not found");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="Dashboard">
      <div>{/* <AdminHome /> */}</div>
      <div className="single-order-details">
        <h2>Order Details</h2>
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
              <p className="product-name">Name: {product.title.slice(0, 12)}</p>
              <p className="product-price">Price: ${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleOrder;
