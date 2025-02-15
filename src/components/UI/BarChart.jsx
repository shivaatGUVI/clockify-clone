import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BarChart = ({ chartRef, height = 400 }) => {
  const canvasRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    const chartConfig = {
      type: "bar",
      data: {
        labels: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"],
        datasets: [
          {
            label: "Tracked Hours",
            data: [0.5, 2, 3.5, 1.5, 2.5, 4],
            backgroundColor: "rgb(79, 70, 229, 0.5)",
            borderColor: "rgb(79, 70, 229)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Changed to false for better height control
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 0.5,
              color: "rgb(0, 0, 0)",
              font: {
                family: "Arial",
              },
            },
            grid: {
              color: "rgb(229, 231, 235)",
            },
          },
          x: {
            ticks: {
              color: "rgb(0, 0, 0)",
              font: {
                family: "Arial",
              },
            },
            grid: {
              color: "rgb(229, 231, 235)",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(0, 0, 0)",
              font: {
                family: "Arial",
              },
            },
          },
        },
      },
    };

    chartInstance.current = new Chart(ctx, chartConfig);

    if (chartRef) chartRef.current = chartInstance.current;

    // Function to handle resize
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [height]);

  return (
    <div
      style={{
        height: `${height}px`,
        width: "100%",
        position: "relative",
        maxWidth: "100%",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "700px",
        }}
      />
    </div>
  );
};

export default BarChart;
