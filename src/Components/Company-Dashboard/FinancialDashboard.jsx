import React from "react";
import data from "../../data/dashboardData.json";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Select, { components } from "react-select";
import { useState, useMemo } from "react";

const Card = ({ title, value, subText, icon, growth, isCurrency = false }) => (
  <div className="g-3">
    <div className="card h-100 w-100 p-4 shadow-sm rounded-3 border">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <p className="text-muted mb-1 text-sm">{title}</p>

          {subText && <small className="text-muted">{subText}</small>}
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <h4 className="fw-bold mb-0 h4">
          {isCurrency && "₹"}
          {value.toLocaleString()}
          {/* {isCurrency && title !== "Profit Margin %" && "L"} */}
          {title === "Profit Margin %" && "%"}
        </h4>
        {growth && (
          <div
            className={` rounded-2 p-1 border d-flex align-items-center icon${
              growth.startsWith("+") ? "" : ""
            } fw-semibold`}
          >
            <span
              className={`material-icons me-1 icon ${
                growth.startsWith("+") ? "text-success" : "text-danger"
              }`}
            >
              {growth.startsWith("+") ? "arrow_outward" : "south_east"}
            </span>
            {growth}
          </div>
        )}
      </div>
    </div>
  </div>
);

const chartData2 = {
  labels: [
    "HSR",
    "BTM",
    "Rajaji Nagar",
    "BTM",
    "HSR Sec 2",
    "Koramnagala",
    "HSR",
    "BTM",
    "Belendur",
    "Hightech City",
    "Vega City",
  ],
  datasets: [
    {
      label: "Expenses",
      data: [30, 40, 25, 40, 25, 35, 40, 35, 40, 35, 35],
      backgroundColor: "#FDA29B",
      maxBarThickness: 30,
    },
    {
      label: "Sales",
      data: [25, 30, 15, 20, 40, 25, 25, 20, 25, 35, 20],
      backgroundColor: "#84CAFF",
      maxBarThickness: 30,
    },
    {
      label: "Profit",
      data: [15, 10, 20, 25, 20, 25, 15, 25, 20, 25, 30],
      backgroundColor: "#47CD89",
      maxBarThickness: 30,
    },
  ],
};

function FinancialDashboard({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  const { dateTabs } = data;
  const [selectedDate, setSelectedDate] = useState("Today");
  const financialMetrics = data?.financialMetrics || [];

  //Sales Inventory
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
    <div className="card shadow-sm rounded-4 mb-4 p-4">
      <h4 className="fw-bold mb-3">Financial Dashboard</h4>
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

      <div className="row mb-4 g-3">
        {financialMetrics.map((metric, idx) => (
          <div className="col-md-4 col-lg-3 col-12" key={idx}>
            <Card {...metric} />
          </div>
        ))}
      </div>

      <div className="card border p-3 rounded-3">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <div>
            <h4 className="fw-bold mb-1">Branch Comparison</h4>
            <p className="text-muted mb-0">Comparison of branches</p>
          </div>
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
        {/* <BranchBarChartPlaceholder data={branchComparison.data} /> */}
        <Bar
          data={chartData2}
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
                  text: "Branch Performance in (₹)",
                  font: { size: 13 },
                },
                ticks: {
                  // 👇 Custom tick label formatting
                  callback: function (value) {
                    return `₹${value.toFixed(0)}L`; // adds “L” after each tick label
                  },
                },
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
            },
          }}
        />
      </div>
    </div>
  );
}

export default FinancialDashboard;
