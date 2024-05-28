import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faBell,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminNavbar.css";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handlelogout = () => {
    navigate("/");
  };

  return (
    <nav className="custom-navbar">
      <h3>ADMIN</h3>
      <form className="search-box">
        <input
          type="search"
          placeholder="Search here"
          className="search-input"
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <ul className="navbar-properties">
        <li>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "20px" }} />
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle "
            href="/"
            id="navbarDropdownUser"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdownUser">
            <li>
              <a className="dropdown-item " href="/">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ marginRight: "8px" }}
                  onClick={handlelogout}
                />
                Logout
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
