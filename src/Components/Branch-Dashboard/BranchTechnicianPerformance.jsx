import React, { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import data from "../../data/dashboardData.json";
import Select, { components } from "react-select";
import TechnicianTable from "./TechnicianTable";

const BranchTechnicianPerformance = ({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const dateTabs = ["Today", "7 days", "30 days", "6 months", "12 months"];

  const { technicianPerformance: techniciansData = {} } = data || {};
  const { metrics = [] } = techniciansData || {};

  const chartData1 = {
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
        label: "Branch efficiency",
        data: [12, 18, 13, 19, 11, 14, 15, 13, 17, 14, 19],
        backgroundColor: "#2E90FA",
        maxBarThickness: 50,
        borderRadius: 6,
      },
      {
        label: "Company average",
        data: [10, 15, 11, 14, 10, 12, 13, 11, 15, 12, 16],
        backgroundColor: "#84CAFF",
        maxBarThickness: 50,
        borderRadius: 10,
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
    <div className="service-performance card shadow-sm rounded-4 p-4 mb-4">
      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h4 className="fw-bold mb-0">Technician Performance</h4>

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

      {/* Metric Cards */}
      <div className="row g-3 mb-0 d-flex flex-wrap flex-grow-1">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`col-12 col-lg-4 ${metric.title === "" ? "" : ""}`}
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
      </div>

      <TechnicianTable />

      <div className="card p-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <div>
            <h4 className="fw-bold mb-0">Branch Performance</h4>
            <p className="text-muted mb-0">
              Technician efficiency vs company-wide average
            </p>
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

        <Bar
          data={chartData1}
          options={{
            responsive: true,
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
                mode: "index",
                intersect: false,
                displayColors: false,
                backgroundColor: "#102A56",
                titleColor: "#FFFFFF",
                bodyColor: "#FFFFFF",
                callbacks: {
                  label: function (context) {
                    const dataIndex = context.dataIndex;
                    const datasets = context.chart.data.datasets;

                    // ✅ safely access values
                    const branchEff = datasets[0].data[dataIndex];
                    const companyAvg = datasets[1].data[dataIndex];

                    // only show once (for first dataset)
                    if (context.datasetIndex === 0) {
                      return [
                        `Branch efficiency: ${branchEff} jobs/hr`,
                        `Company average: ${companyAvg} jobs/hr`,
                      ];
                    }

                    return null; // prevent second tooltip
                  },
                },
              },
            },
            interaction: { mode: "nearest", axis: "x", intersect: false },
            scales: {
              x: {
                stacked: true,
                grid: { display: false },
                ticks: {
                  autoSkip: true,
                  maxRotation: 45,
                  minRotation: 0,
                  padding: 16,
                },
              },
              y: {
                stacked: true,
                title: {
                  display: true,
                  text: "Branch Performance (jobs/hr)",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BranchTechnicianPerformance;
