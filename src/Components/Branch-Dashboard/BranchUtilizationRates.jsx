import React from "react";
import data from "../../data/dashboardData.json";
import { Line, Bar } from "react-chartjs-2";
import { useState, useMemo } from "react";
import Select, { components } from "react-select";

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
          {isCurrency && ""}
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

function BranchSalesAndOrder({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedBranches, setSelectedBranches] = useState([
    "HSR",
    "Kormangala",
  ]);

  const { quarterTabs, saleAndOrderChartData, salesAndOrder } = data;

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

  //  const [range, setRange] = useState("30");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const palette = [
    "#2E90FA",
    "#84CAFF",
    "#175CD3",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  const datasets = (selectedOptions || []).map((opt, idx) => {
    const dataArray =
      (branchData && branchData[opt.value]) ||
      defaultBranchData[opt.value] ||
      months.map((_, i) =>
        Math.round((Math.sin(((idx + 1) * (i + 1)) / 3) + 1) * 200 + 100)
      );

    return {
      label: opt.label,
      data: dataArray,
      borderColor: palette[idx % palette.length],
      backgroundColor: palette[idx % palette.length],
      tension: 0.25,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: palette[idx % palette.length],
      borderWidth: 2,
    };
  });

  const finalDatasets = datasets.length
    ? datasets
    : [
        {
          label: "No branches selected",
          data: months.map(() => 0),
          borderColor: "#E5E7EB",
          backgroundColor: "#E5E7EB",
          pointRadius: 0,
          tension: 0.25,
        },
      ];

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
      "Belendur",
      "Hightech City",
      "Vega City",
    ],
    datasets: [
      {
        label: "Available Technician",
        data: [150, 200, 252, 280, 270, 210, 245, 265, 240, 230, 255],
        backgroundColor: "#2E90FA",
        maxBarThickness: 40,
      },
    ],
  };

  return (
    <div className="card p-4 my-4 rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0">Utilization Rates</h4>
          <p className="text-muted mb-0">Technician Utilization Comparison</p>
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

      {/* Date Tabs */}
      <div className="d-flex align-items-center justify-content-between mb-4 rounded-2">
        <div className="d-flex overflow-hidden flex-wrap tab-group border rounded-2">
          {quarterTabs.map((tab) => (
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
        <div>
          <div className="">
            <input
              className="ms-2 outline-none border px-2 py-1 rounded-2"
              type="date"
              name="date"
              id="date"
            />
          </div>
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
                text: "Branch Performance in (number) ",
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
              backgroundColor: "#102A56",
              callbacks: {
                label: function (context) {
                  return `Available Technician : ${context.parsed.y}%`;
                },
              },
            },
          },
        }}
      />
    </div>
  );
}

export default BranchSalesAndOrder;
