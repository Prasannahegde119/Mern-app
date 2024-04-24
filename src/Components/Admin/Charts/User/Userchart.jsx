import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import AdminHome from "../../AdminHome";
import "./UserChart.css";

function Userchart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users");
        const usernames = data.map((item) => item.username);
        const ids = data.map((item) => item._id);
        console.log(data);
        setChartData({
          labels: usernames,
          datasets: [
            {
              label: "Username",
              data: usernames.map(() => Math.random() * 1000),
              fill: true,
              borderColor: "rgba(255, 99, 132, 1)", // Red
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  const backgroundColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
  ];

  const borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const barChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "User ID",
        data: chartData.labels.map(() => Math.random() * 1000),
        backgroundColor: backgroundColors,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="Chart">
      <div>
        <AdminHome />
      </div>
      <div className="charts">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  User Line Chart
                </div>
                <div className="card-body">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-success text-white">
                  User Pie Chart
                </div>
                <div className="card-body">
                  <Pie data={barChartData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-warning text-white">
                  User Bar Chart
                </div>
                <div className="card-body">
                  <Bar data={barChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userchart;
