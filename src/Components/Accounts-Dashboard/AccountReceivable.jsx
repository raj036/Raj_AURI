import React from "react";
import data from "../../data/dashboardData.json";
import { Bar } from "react-chartjs-2";
import { useState, useMemo } from "react";
import BranchFilter from "../Branch-Dashboard/BranchFilter";

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

function ForcastDashboard({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  const accountReceivables = data?.customerInsights || [];
  const [selectedDate, setSelectedDate] = useState("Today");

  const { high, dateTabs, } = data;

  // const verticalLinePlugin = {
  //   id: "verticalLine",
  //   afterDatasetsDraw: (chart) => {
  //     if (chart.tooltip?._active && chart.tooltip._active.length > 0) {
  //       const ctx = chart.ctx;
  //       const activePoint = chart.tooltip._active[0].element;
  //       const x = activePoint.x;
  //       const topY = chart.scales.y.top;
  //       const bottomY = chart.scales.y.bottom;

  //       ctx.save();
  //       ctx.beginPath();
  //       ctx.moveTo(x, topY);
  //       ctx.lineTo(x, bottomY);
  //       ctx.lineWidth = 1.5;
  //       ctx.strokeStyle = "#2563eb";
  //       ctx.stroke();
  //       ctx.restore();
  //     }
  //   },
  // };

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

  const palette = ["#47CD89", "#FDA29B"];

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

  // const finalDatasets = datasets.length
  //   ? datasets
  //   : [
  //       {
  //         label: "No branches selected",
  //         data: months.map(() => 0),
  //         borderColor: "#E5E7EB",
  //         backgroundColor: "#E5E7EB",
  //         pointRadius: 0,
  //         tension: 0.25,
  //       },
  //     ];

  const handleBranchSelect1 = (selected) => setSelectedOptions(selected || []);

  // const Option = (props) => {
  //   return (
  //     <components.Option {...props}>
  //       <input
  //         type="checkbox"
  //         checked={props.isSelected}
  //         onChange={() => null}
  //         style={{ marginRight: 8 }}
  //       />
  //       <label>{props.label}</label>
  //     </components.Option>
  //   );
  // };

  const topCustomersData = [
    { name: "0-30", orders: 55, revenue: 1500000 },
    { name: "31-60", orders: 50, revenue: 1200000 },
    { name: "61-90", orders: 48, revenue: 1000000 },
    { name: "90+", orders: 45, revenue: 700000 },
  ];

  const barChartData = {
    labels: topCustomersData.map((c) => c.name),
    datasets: [
      {
        label: "Revenue",
        data: topCustomersData.map((c) => c.revenue / 100000),
        backgroundColor: "#FEC84B",
        maxBarThickness: 50,
      },
    ],
  };

  const barChartOptions = {
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
        displayColors: false,
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const customer = topCustomersData[index];

            return [`Amount: ₹${customer.revenue.toLocaleString()}`];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // ❌ hide vertical lines
          // drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue (in lakhs ₹)",
        },
        ticks: {
          // 👇 Custom tick label formatting
          callback: function (value) {
            return `₹${value.toFixed(0)}L`; // adds “L” after each tick label
          },
        },
      },
    },
  };

  // 🔹 Chart data filtered dynamically
  const filteredLabels = selectedOptions.map((opt) => opt.value);
  const filteredData = filteredLabels.map(
    (label) => branchData[label]?.[0] || 0
  );

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Profit",
        data: filteredData,
        backgroundColor: "#2E90FA",
        maxBarThickness: 40,
      },
    ],
  };

  return (
    <div className="card mb-4 p-4 rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h4 className="fw-bold mb-0">Accounts Receivable</h4>
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

      <div className="row">
        <div className="col-lg-4">
          <div className="row mb-4 g-3">
            {accountReceivables.map((metric, idx) => (
              <div className="col-12" key={idx}>
                <Card {...metric} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-8 mt-lg-0 mt-4" style={{ minWidth: 260 }}>
          <div className="border rounded p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="fw-bold mb-2">Aging Analysis</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Receivables breakdown by overdue days
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4 rounded-2">
                <div className="d-flex overflow-hidden mb-4 flex-wrap tab-group border rounded-2">
                  {high.map((tab) => (
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
              </div>
            </div>
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      <div className="card-body border p-4 rounded-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <div>
            <h4 className="fw-bold mb-1">Receivables Outstanding</h4>
            <p className="text-muted mb-0">Comparison of branches</p>
          </div>

          {/* 🔹 Reusable Filter */}
          <BranchFilter
            options={options}
            selectedOptions={selectedOptions}
            onChange={handleBranchSelect1}
          />
        </div>

        {/* 🔹 Dynamic Chart */}
        <Bar
          data={chartData}
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
                backgroundColor: "#102A56",
                titleFont: { size: 13 },
                bodyFont: { size: 12 },
                padding: 10,
                displayColors: false,
                callbacks: {
                  label: function (context) {
                    const value = context.parsed.y;
                    return `Chemicals used: ₹${value}L`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                ticks: { padding: 8 },
              },
              y: {
                title: {
                  display: true,
                  text: "Branch Performance (₹)",
                  font: { size: 13 },
                },
                ticks: {
                  callback: function (value) {
                    return `₹${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default ForcastDashboard;
