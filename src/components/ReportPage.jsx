import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import BarChart from "../components/UI/BarChart";
import DoughnutChart from "../components/UI/DoughnutChart";
import { Chart, registerables } from "chart.js";

// Clear any existing defaults and register components
Chart.register(...registerables);
Chart.defaults = {
  ...Chart.defaults,
  color: "rgb(0, 0, 0)",
  font: {
    family: "Arial",
    color: "rgb(0, 0, 0)",
  },
  backgroundColor: "rgb(255, 255, 255)",
  borderColor: "rgb(0, 0, 0)",
  plugins: {
    legend: {
      labels: {
        color: "rgb(0, 0, 0)",
      },
    },
  },
  scale: {
    grid: {
      color: "rgb(0, 0, 0)",
    },
  },
};

const ReportPage = () => {
  const reportRef = useRef(null);
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadPDF = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Force all text to black RGB before capture
      const elements = reportRef.current.getElementsByTagName("*");
      const originalStyles = new Map();

      // Store original colors and force RGB
      for (let element of elements) {
        const style = window.getComputedStyle(element);
        originalStyles.set(element, {
          color: element.style.color,
          backgroundColor: element.style.backgroundColor,
        });

        if (style.color.includes("oklch")) {
          element.style.color = "rgb(0, 0, 0)";
        }
        if (style.backgroundColor.includes("oklch")) {
          element.style.backgroundColor = "rgb(255, 255, 255)";
        }
      }

      // Wait a moment for styles to apply
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(reportRef.current.id);
          if (clonedElement) {
            clonedElement.style.background = "rgb(255, 255, 255)";
          }
        },
      });

      // Restore original styles
      for (let [element, styles] of originalStyles) {
        element.style.color = styles.color;
        element.style.backgroundColor = styles.backgroundColor;
      }

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("Clockify_Report.pdf");
    } catch (err) {
      console.error("PDF Generation Error:", err);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto p-6"
      style={{ backgroundColor: "rgb(255, 255, 255)" }}
    >
      <div
        ref={reportRef}
        id="report-content"
        className="p-6"
        style={{ backgroundColor: "rgb(255, 255, 255)", color: "rgb(0, 0, 0)" }}
      >
        <h2 className="text-xl font-semibold" style={{ color: "rgb(0, 0, 0)" }}>
          Summary Report
        </h2>
        <p style={{ color: "rgb(100, 116, 139)" }}>10/02/2025 - 16/02/2025</p>
        <div
          className="mt-4 text-2xl font-bold"
          style={{ color: "rgb(79, 70, 229)" }}
        >
          Total: 03:53:38
        </div>

        <div className="mt-6">
          <h3
            className="text-lg font-semibold"
            style={{ color: "rgb(0, 0, 0)" }}
          >
            Tracked Hours (Bar Chart)
          </h3>
          <div className="h-64 w-full">
            <BarChart chartRef={barChartRef} />
          </div>
        </div>

        <div className="mt-32">
          <h3
            className="text-lg font-semibold"
            style={{ color: "rgb(0, 0, 0)" }}
          >
            Hours Breakdown (Doughnut Chart)
          </h3>
          <div className="h-64 w-full my-16">
            <DoughnutChart chartRef={doughnutChartRef} />
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-2 text-red-600 bg-red-100 rounded">{error}</div>
      )}

      <button
        onClick={downloadPDF}
        disabled={isLoading}
        className="mt-6 px-4 py-2 rounded-md transition"
        style={{
          backgroundColor: isLoading
            ? "rgb(156, 163, 175)"
            : "rgb(79, 70, 229)",
          color: "rgb(255, 255, 255)",
          cursor: isLoading ? "not-allowed" : "pointer",
        }}
      >
        {isLoading ? "Generating PDF..." : "Download PDF"}
      </button>
    </div>
  );
};

export default ReportPage;
