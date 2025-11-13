import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// register everything
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const HorizontalBarChart = () => {
  const data = {
    labels: ["Maharashtra", "Gujarat", "Karnataka", "Tamil Nadu", "Delhi"],
    datasets: [
      {
        label: "Growth %",
        data: [85, 70, 90, 60, 75],
        backgroundColor: [
          "#2E90FA",
          "#2E90FA",
          "#2E90FA",
          "#2E90FA",
          "#2E90FA",
        ],
        borderRadius: 10,
        barThickness: 28,
      },
    ],
  };

  const options = {
    indexAxis: "y", // ✅ makes the chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (context) => ` ${context.parsed.x}%`,
        },
      },
      datalabels: {
        color: "#fff",
        anchor: "center",
        align: "center",
        font: {
          weight: "bold",
          size: 13,
        },
        formatter: (value) => `${value}%`,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "#f3f4f6",
        },
        ticks: {
          color: "#6b7280",
          callback: (value) => `${value}%`,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#374151",
          font: { size: 13, weight: "500" },
        },
      },
    },
  };

  return (
    <div className="card p-4 shadow-sm rounded-3" style={{ height: "340px" }}>
      <h5 className="fw-bold mb-3">Statewise Growth Performance</h5>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
