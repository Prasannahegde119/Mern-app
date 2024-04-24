import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from Font Awesome
import "./ProductTable.css"; // Import custom CSS for stylingg
import AdminHome from "../AdminHome";

const ProductTable = () => {
  const [users, setUsers] = useState([]);
  const [editEmail, setEditEmail] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userId, email) => {
    setEditEmail(email);
    setEditingUserId(userId);
  };

  const handleRemove = async (userId) => {
    try {
      // Make DELETE request to remove user
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      // Update users state after deletion
      setUsers(users.filter((user) => user._id !== userId));
      // Display alert after successful deletion
      window.alert("User deleted successfully");
      console.log(`User with ID ${userId} removed successfully`);
    } catch (error) {
      console.error(`Error removing user with ID ${userId}:`, error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/users/${editingUserId}/edit-email`,
        { email: editEmail }
      );
      // Update users state after update
      setUsers(
        users.map((user) => {
          if (user._id === editingUserId) {
            return { ...user, email: editEmail };
          }
          return user;
        })
      );
      // Display alert after successful update
      window.alert("Email updated successfully");
      setEditEmail("");
      setEditingUserId(null); // Set editingUserId to null here
    } catch (error) {
      console.error(
        `Error updating email for user with ID ${editingUserId}:`,
        error
      );
    }
  };

  return (
    <>
      <div className="dashboard">
        <div className="adminhome">
          <AdminHome />
        </div>
        <div className="Usertable">
          <div className="user-table-container">
            <h2>Users</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <FaEdit
                        onClick={() => handleEdit(user._id, user.email)}
                      />
                      <FaTrash onClick={() => handleRemove(user._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {editingUserId && (
              <form onSubmit={handleUpdate}>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                />
                <button type="submit">Update Email</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTable;
