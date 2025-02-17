import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const DoughnutChart = ({ chartRef }) => {
  const canvasRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    const chartConfig = {
      type: "doughnut",
      data: {
        labels: ["Development", "Meetings", "Planning", "Research"],
        datasets: [
          {
            label: "Hours",
            data: [300, 50, 100, 75],
            backgroundColor: [
              "rgb(255, 99, 132, 0.5)",
              "rgb(54, 162, 235, 0.5)",
              "rgb(255, 206, 86, 0.5)",
              "rgb(75, 192, 192, 0.5)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
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

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default DoughnutChart;
