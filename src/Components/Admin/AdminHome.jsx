import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog, faBars } from '@fortawesome/free-solid-svg-icons';
import './Admin.css'; // Import custom CSS for styling

const AdminHome = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="sidebar-icon" />
      </div>
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <a href="/AddProducts" className="sidebar-link">
            <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
            {isOpen && <span className="sidebar-text">Home</span>}
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/ProductTable" className="sidebar-link">
            <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
            {isOpen && <span className="sidebar-text">Profile</span>}
          </a>
        </li>
        <li className="sidebar-item">
          <a href="/settings" className="sidebar-link">
            <FontAwesomeIcon icon={faCog} className="sidebar-icon" />
            {isOpen && <span className="sidebar-text">Settings</span>}
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AdminHome;
