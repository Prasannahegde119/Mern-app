import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faClock,
  faComments,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import "./UserChart.css";
import Graphs from "./Graphs";
// import Graphs from "../Graphs";
// import UserDetails from "../UserDetails/UserDetails";

function Dashboard() {
  return (
    <div className="parent">
      <div className="dashboard-container">
        {/* First portion: Users */}
        <div className="dashboard-item">
          <div className="dashboard-icon">
            <FontAwesomeIcon
              icon={faBell}
              size="3x"
              style={{ color: "#FF5733" }}
            />
          </div>
          <div className="dashboard-content">
            <p className="dashboard-number">1500</p>
            <p className="dashboard-text">Users</p>
          </div>
        </div>

        {/* Second portion: Average Time */}
        <div className="dashboard-item">
          <div className="dashboard-icon">
            <FontAwesomeIcon
              icon={faClock}
              size="3x"
              style={{ color: "#33FFBD" }}
            />
          </div>
          <div className="dashboard-content">
            <p className="dashboard-number">3h 25m</p>
            <p className="dashboard-text">Average Time</p>
          </div>
        </div>

        {/* Third portion: Comments */}
        <div className="dashboard-item">
          <div className="dashboard-icon">
            <FontAwesomeIcon
              icon={faComments}
              size="3x"
              style={{ color: "#3377FF" }}
            />
          </div>
          <div className="dashboard-content">
            <p className="dashboard-number">120</p>
            <p className="dashboard-text">Comments</p>
          </div>
        </div>

        {/* Fourth portion: Downloads */}
        <div className="dashboard-item">
          <div className="dashboard-icon">
            <FontAwesomeIcon
              icon={faDownload}
              size="3x"
              style={{ color: "#FF33F5" }}
            />
          </div>
          <div className="dashboard-content">
            <p className="dashboard-number">500</p>
            <p className="dashboard-text">Downloads</p>
          </div>
        </div>
      </div>
      <div>
        <Graphs />
      </div>
    </div>
  );
}

export default Dashboard;
