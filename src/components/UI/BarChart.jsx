import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BarChart = () => {
  // Ref to store the chart instance
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById("myBarChart").getContext("2d");

    // Create a new chart
    chartRef.current = new Chart(ctx, {
      type: "bar", // type of chart
      data: {
        labels: ["January", "February", "March", "April", "May", "June"], // X-axis labels
        datasets: [
          {
            label: "Monthly Sales", // dataset label
            data: [65, 59, 80, 81, 56, 55], // Y-axis data
            backgroundColor: "rgba(75, 192, 192, 0.2)", // bar color
            borderColor: "rgba(75, 192, 192, 1)", // border color
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // start Y-axis from 0
          },
        },
      },
    });

    // Cleanup on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas id="myBarChart" width="500" height="100"></canvas>
    </div>
  );
};

export default BarChart;
