import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderDetails.css"; // Import custom CSS for styling
// import AdminHome from "../AdminHome";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [filteredUser, setFilteredUser] = useState("");

  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        // Fetch orders from the API
        const ordersResponse = await axios.get(
          "http://localhost:5000/api/getallorders"
        );
        const fetchedOrders = ordersResponse.data;

        // Fetch users from the API
        const usersResponse = await axios.get(
          "http://localhost:5000/api/users"
        );
        const users = usersResponse.data;

        // Create a map of user _id to username
        const userMap = users.reduce((acc, user) => {
          acc[user._id] = user.username;
          return acc;
        }, {});

        // Update state with orders and userMap
        setOrders(fetchedOrders);
        setUserMap(userMap);
      } catch (error) {
        console.error("Error fetching orders or users:", error);
      }
    };

    fetchOrdersAndUsers();
  }, []);

  // Get unique usernames for filter options
  const usernames = Object.values(userMap).filter(
    (value, index, self) => self.indexOf(value) === index
  );

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilteredUser(event.target.value);
  };

  // Filter orders based on selected username
  const filteredOrders = filteredUser
    ? orders.filter((order) => userMap[order.userId] === filteredUser)
    : orders;

  return (
    <div className="Dashboard">
      <div>{/* <AdminHome /> */}</div>
      <div className="order-details">
        <h2>Order Details</h2>
        <div className="filter">
          <label htmlFor="userFilter">Filter by User:</label>
          <select
            id="userFilter"
            value={filteredUser}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">All Users</option>
            {usernames.map((username) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select>
          <FaFilter className="filter-icon" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Username</th>
              <th>Total Items</th>
              <th>Total Price</th>
              <th>Delivery Method</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link to={`/SingleOrder/${order._id}`} className="Link">
                    {order._id.slice(0, 4)}
                  </Link>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{userMap[order.userId] || "Unknown User"}</td>
                <td>{order.products.length}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>COD</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
