import React from "react";
import "./Layout.css";
import AdminNavbar from "../Adminnavbar/AdminNavbar";
import AdminHome from "../AdminHome";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="admin-home-container">
      <AdminHome />
      <div className="content-container">
        <AdminNavbar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
