import React from "react";
import data from "../../data/dashboardData.json";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
import { useState, useMemo } from "react";
import Select, { components } from "react-select";
import { Bar } from "react-chartjs-2";

// KPI Card
const KPIBox = ({
  title,
  value,
  subText,
  icon,
  growth,
  isCurrency = false,
}) => (
  <div className="card h-100 p-4 shadow-sm rounded-3">
    <div className="d-flex justify-content-between align-items-start">
      <div>
        <p className="text-muted mb-1 text-sm">{title}</p>
        <h4 className="fw-bold mb-0 mt-3">
          {isCurrency && "₹"}
          {value.toLocaleString()}
          {isCurrency && title !== "Profit Margin %" && "L"}
          {title === "Profit Margin %" && "%"}
        </h4>
        {subText && <small className="text-muted">{subText}</small>}
      </div>
      <div className="d-flex flex-column align-items-end">
        <span
          className="material-symbols-outlined text-muted mb-2"
          style={{ fontSize: "28px" }}
        >
          {icon}
        </span>
        {growth && (
          <div
            className={`mt-4 badge rounded-3 px-2 py-1 ${
              growth.startsWith("+")
                ? "bg-white text-success border"
                : "bg-white text-danger border"
            } fw-semibold`}
          >
            {growth}
          </div>
        )}
      </div>
    </div>
  </div>
);

function CompanyOverview({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  const { salesOverview } = data;
  const [selectedDate, setSelectedDate] = useState("Today");
  const dateTabs = ["Today", "This Week", "This Month", "This Year"];
  //Company Overview - Doughnut Chart
  const companyChartData = () => {
    const performers = data?.topPerformers || { labels: [], datasets: [] };
    return {
      labels: performers.labels, // ✅ use directly
      datasets: [
        {
          data: performers.datasets[0]?.data || [], // ✅ pick from index 0
          backgroundColor: performers.datasets[0]?.backgroundColor || [], // ✅ pick from index 0
          borderWidth: 1,
        },
      ],
    };
  };

  const barChartData = {
    labels: [
      "HSR",
      "Kormnagala",
      "Rajaji Nagar",
      "BTM",
      "HSR Sec 2",
      "Koramnagala",
      "Rajaji Nagar",
      "HSR",
      "BTM",
      "Belendur",
      "Hightech City",
      "Vega City",
    ],
    datasets: [
      {
        label: "Rate",
        data: [80, 90, 75, 80, 75, 90, 85, 80, 75, 85, 95, 90, 70],
        backgroundColor: "#84CAFF",
        maxBarThickness: 40,
      },
    ],
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
    <div className="card shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-1">Company Overview</h5>
        <p className="text-muted mb-4">
          High-level business metrics and employee distribution
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex overflow-hidden mb-4 flex-wrap tab-group border rounded-2">
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
          <div className="">
            <input
              className="ms-2 outline-none border px-2 py-1 rounded-2"
              type="date"
              name="date"
              id="date"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <div className="row g-3">
              {salesOverview.metrics.map((metric, idx) => (
                <div className="col-md-6" key={idx}>
                  <KPIBox {...metric} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-6 mt-lg-0 mt-4">
            <div
              className="card  p-3 shadow-sm rounded-3"
              style={{ height: "300px" }}
            >
              <h6 className="fw-bold mb-3">Employee Distribution</h6>
              {/* <DonutChartPlaceholder data={employeeDistribution.roles} /> */}
              <div className="flex-grow-1">
                <Doughnut
                  data={companyChartData()}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "50%",
                    radius: "100%",
                    plugins: {
                      datalabels: {
                        display: false,
                      },
                      legend: {
                        position: "right",
                        labels: {
                          usePointStyle: true,
                          pointStyle: "circle",
                          font: { size: 15 },
                          boxWidth: 10,
                          boxHeight: 10,
                          padding: 20,
                        },
                      },
                      tooltip: {
                        enabled: true,
                        backgroundColor: "#fff", // dark gray background
                        titleColor: "grey",
                        bodyColor: "grey",
                        bodyFont: { size: 14 },
                        padding: 10,
                        displayColors: false,
                        borderColor: "#fff",
                        borderWidth: 1,
                        callbacks: {
                          label: function (context) {
                            const value = context.parsed; // e.g., 25
                            return `Count : ${value} employees`;
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card border p-3 rounded-3 my-3">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
            <div>
              <h4 className="fw-bold mb-1">Customer Acquisition Rate</h4>
              <p className="text-muted mb-0">Comparison of branches</p>
            </div>
            <div style={{ width: 360, minWidth: 220 }}>
              {/* <p className="mb-1">Select Branch to compare</p> */}
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

          <Bar
            style={{ height: 300 }}
            data={barChartData}
            options={{
              scales: {
                x: {
                  stacked: true,
                  grid: { display: false },
                  ticks: {
                    autoSkip: true, // allow skipping only when needed
                    maxRotation: 45, // 👈 force labels to stay straight
                    minRotation: 0, // 👈 prevent automatic rotation
                    padding: 16,
                  },
                },
                y: {
                  stacked: true,
                  title: {
                    display: true,
                    text: "Branch Performance in (%)",
                    font: { size: 13 },
                  },
                  // ticks: {
                  //   // 👇 Custom tick label formatting
                  //   callback: function (value) {
                  //     return `₹${(value).toFixed(0)}L`; // adds “L” after each tick label
                  //   },
                  // },
                },
              },
              elements: { bar: { borderRadius: 6 } },
              plugins: {
                datalabels: {
                  display: false,
                },
                legend: {
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
                  displayColors: false,
                  callbacks: {
                    label: function (context) {
                      return `Customer Conversion rate: ${context.parsed.y}%`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyOverview;
