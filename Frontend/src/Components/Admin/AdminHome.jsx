import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGauge,
  faUser,
  faCartShopping,
  faSignOutAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.avif"; // Import the logo image
import { Link } from "react-router-dom";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  const handlelogout = () => {
    navigate("/");
  };

  return (
    <div className="admin">
      <div className="logo">
        <img src={logo} alt="logo" /> {/* Use the logo variable */}
      </div>
      <ul className="admin-menu">
        <li>
          <FontAwesomeIcon icon={faGauge} />
          <Link to="/Userchart">
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} />
          <Link to="/ProductTable">
            <span>Users</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faCartShopping} />
          <Link to="/UserTable">
            <span>Products</span>
          </Link>
        </li>
        <li>
          <FontAwesomeIcon icon={faPlus} />
          <Link to="/AddProducts">
            <span>Add</span>
          </Link>
        </li>
        <li onClick={handlelogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          <Link to="/AddProducts">
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminHome;
