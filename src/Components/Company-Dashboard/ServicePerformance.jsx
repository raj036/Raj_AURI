import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import data from "../../data/dashboardData.json";
// import "./Dashboard.css";
import { elements } from "chart.js";
import Select, { components } from "react-select";

const ServicePerformance = ({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) => {
  const [activeTab, setActiveTab] = useState("Today");
  const [selectedDate, setSelectedDate] = useState("Today");
  const dateTabs = ["Today", "7 days", "30 days", "6 months", "12 months"];

  const { ServicePerformance: serviceData = {} } = data || {};
  const {
    branch = "Unknown",
    metrics = [],
    tabs = [],
    chartData = [],
  } = serviceData || {};

  // === Chart.js Data ===
  const lineChartData = useMemo(() => {
    // Guard: if chartData missing, return empty dataset
    if (!chartData || chartData.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: chartData.map((item) => item.day),
      datasets: [
        {
          label: "Completed",
          data: chartData.map((item) => item.completed),
          borderColor: "#22c55e",
          backgroundColor: "#17B26A",
          tension: 0.4,
          // borderWidth: 2.5,
          fill: true,
        },
        {
          label: "Pending Jobs",
          data: chartData.map((item) => item.pending),
          borderColor: "#f59e0b",
          backgroundColor: "#F79009",
          tension: 0.4,
          // borderWidth: 2.5,
          fill: true,
        },
      ],
    };
  }, [chartData]);

  // === Chart.js Options ===
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
        hoverRadius: 5,
      },
    },
    interaction: {
      mode: "index", // show tooltip for all datasets at the same index
      intersect: false, // triggers when hovering anywhere near the vertical line
      axis: "x", // vertical crosshair
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 5,
          boxHeight: 5,
        },
      },
      tooltip: {
        backgroundColor: "#102A56",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        displayColors: false,
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        padding: 12,

        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.formattedValue;
            return `${label}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Jobs",
          font: { size: 13 },
        },
        grid: { color: "#f3f4f6" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const defaultBranches = [
    "HSR",
    "Kormangala",
    "Rajaji Nagar",
    "BTM",
    "HSR Sec 2",
    "Hightech City",
  ];

  const defaultBranchData = {
    HSR: [420, 430, 450, 460, 470, 480, 500, 520, 540, 530, 550, 560],
    Kormangala: [280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390],
    "Rajaji Nagar": [
      180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290,
    ],
    BTM: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230],
    "HSR Sec 2": [90, 100, 110, 120, 125, 130, 140, 150, 160, 165, 170, 175],
    "Hightech City": [60, 70, 80, 90, 95, 100, 110, 120, 130, 140, 150, 160],
  };

  const branchesList = Array.isArray(branchesProp)
    ? branchesProp
    : defaultBranches;
  const branchData =
    branchDataProp && typeof branchDataProp === "object"
      ? branchDataProp
      : defaultBranchData;

  const options = useMemo(
    () => (branchesList || []).map((b) => ({ value: b, label: b })),
    [branchesList]
  );

  const [selectedOptions, setSelectedOptions] = useState(
    Array.isArray(initialSelected) && initialSelected.length
      ? options.filter((o) => initialSelected.includes(o.value))
      : [options[0], options[1]].filter(Boolean)
  );

  const handleBranchSelect1 = (selected) => setSelectedOptions(selected || []);

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          style={{ marginRight: 8 }}
        />
        <label>{props.label}</label>
      </components.Option>
    );
  };

  return (
    <div className="service-performance card shadow-sm rounded-4 p-4 mb-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h4 className="fw-bold mb-0">Service Performance</h4>

        <div style={{ width: 360, minWidth: 220 }}>
          <p className="mb-1">Select Branch to compare</p>
          <Select
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{ Option }}
            options={options}
            value={selectedOptions}
            onChange={handleBranchSelect1}
            placeholder="Select Branch to compare"
            classNamePrefix="branch-select"
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
          />
        </div>
      </div>

      {/* Date Tabs */}
      <div className="d-flex overflow-hidden mb-4 flex-wrap tab-group rounded-2">
        {dateTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedDate(tab)}
            className={`px-3 py-1 border ${
              selectedDate === tab
                ? "bg-white text-gray-700 rounded-2"
                : "bg-grey text-dark border-0"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metric Cards */}
      <div className="row g-3 mb-4 d-flex flex-wrap flex-grow-1">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`col-12 col-lg-4 ${
              metric.title === "Avg Completion Time" ? "col-lg-6" : ""
            }`}
          >
            <div className="metric-card p-3 rounded-4 shadow-sm h-100 d-flex flex-grow-1 flex-column">
              <p className="text-muted mb-1 small">{metric.title}</p>
              <h4 className="fw-semibold mb-0">
                {typeof metric.value === "number"
                  ? metric.value.toString().padStart(2, "0")
                  : metric.value}
              </h4>
            </div>
          </div>
        ))}
        {data.ServicePerformance1.metrics.map((metric, index) => (
          <div
            key={index}
            className={`col-12 col-lg-6 ${
              metric.title === "Avg Completion Time" ? "col-lg-6" : ""
            }`}
          >
            <div className="metric-card p-3 rounded-4 shadow-sm h-100">
              <p className="text-muted mb-1 small">{metric.title}</p>
              <h4 className="fw-semibold mb-0">
                {typeof metric.value === "number"
                  ? metric.value.toString().padStart(2, "0")
                  : metric.value}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="chart-section p-3 rounded-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h6 className="fw-semibold">Completed vs Pending Jobs</h6>
          <button className="btn btn-outline-secondary rounded-pill px-3">
            <i className="bi bi-calendar-event me-2"></i>
            Select dates
          </button>
        </div>
        <div style={{ height: "350px", width: "100%" }}>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ServicePerformance;
