import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Graphs.css"; // Importing external stylesheet

function Graphs() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    // Dummy data for line chart
    const lineChartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Line Chart",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    // Dummy data for bar chart
    const barChartData = {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Bar Chart",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Create line chart
    const lineChart = new Chart(lineChartRef.current, {
      type: "line",
      data: lineChartData,
    });

    // Create bar chart
    const barChart = new Chart(barChartRef.current, {
      type: "bar",
      data: barChartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup
    return () => {
      lineChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <div className="graph-container">
      {" "}
      {/* Add a class for styling */}
      <div className="chart-container">
        <canvas ref={lineChartRef}></canvas>
      </div>
      <div className="chart-container">
        <canvas ref={barChartRef}></canvas>
      </div>
    </div>
  );
}

export default Graphs;
