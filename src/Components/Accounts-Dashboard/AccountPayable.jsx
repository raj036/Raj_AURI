import React from "react";
import data from "../../data/dashboardData.json"; // adjust path
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import { useState, useMemo } from "react";

// Priority Badge Component
const PriorityBadge = ({ level }) => {
  const colors = {
    High: "bg-danger text-white rounded-1",
    Medium: "bg-warning text-white rounded-1",
    Low: "bg-white text-dark rounded-1 border",
  };

  return (
    <span
      className={`badge ${colors[level]} px-2 py-1`}
      style={{ fontSize: "0.75rem" }}
    >
      {level}
    </span>
  );
};

// Reusable Card Component
const SupplierCard = ({ name, amount, priority, due }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card h-100 shadow-sm rounded-3">
        <div className="d-flex justify-content-between align-items-start border-bottom p-3">
          <h6 className="card-title mb-0">{name}</h6>
          <PriorityBadge level={priority} />
        </div>
        <div className="p-3">
          <h5 className="mt-2 fw-bold fs-2">₹ {amount.toLocaleString()}</h5>
          <p className="text-muted mb-3">
            <i className="bi bi-clock"></i> {due}
          </p>
          <div className="d-flex gap-2">
            <button className="btn border rounded-3 text-dark fw-bold px-3 py-2">
              View
            </button>
            <button className="btn border rounded-3 text-dark fw-bolder px-3 py-2 btn-sm">
              Remind
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AccountsPayable = ({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) => {
  const { accountPayable, dateTabs } = data;

  const [selectedDate, setSelectedDate] = useState("Today");

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

  const salesChartData = { labels: months, datasets: finalDatasets };

  const salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: selectedOptions.length > 0,
        position: "top",
        align: "end",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 3,
          boxHeight: 3,
        },
      },
      tooltip: {
        mode: "nearest",
        intersect: false,
        displayColors: false,
        // Only show tooltip for the hovered dataset
        // filter: function (tooltipItem) {
        //   return tooltipItem.datasetIndex === tooltipItem.datasetIndex;
        // },
        callbacks: {
          label: function (context) {
            const orders = context.raw;
            const revenue = orders * 40000;

            const formattedRevenue = revenue.toLocaleString("en-IN");
            return [
              `Orders: ${orders}`,
              `Revenue: ₹${formattedRevenue.toLocaleString()}`,
            ];
          },
        },
      },
      interaction: { mode: "nearest", axis: "x", intersect: false },
    },
    scales: {
      x: {
        grid: {
          color: "#f0f0f0",
          drawBorder: false,
          drawTicks: false,
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#f0f0f0" },
        title: {
          display: true,
          text: "Bracn Performance in (₹)",
        },
        ticks: {
          // 👇 Custom tick label formatting
          callback: function (value) {
            return `₹${(value / 10).toFixed(0)}L`; // adds “L” after each tick label
          },
        },
      },
    },
  };

  return (
    <div className="card p-4 my-4">
      <h4 className="mb-4 fw-bolder">Accounts Payable</h4>
      <div className="card p-4">
        <h5 className="text-muted fw-bolder">Supplier Payments Due</h5>

        <div className="row border-bottom">
          {accountPayable.supplierPayments.map((supplier, index) => (
            <SupplierCard
              key={index}
              name={supplier.name}
              amount={supplier.amount}
              priority={supplier.priority}
              due={supplier.due}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="d-lg-flex d-md-flex justify-content-between align-items-center mt-3 px-3 pb-3 d-none">
          <button className="btn previous rounded-3 d-flex gap-2 align-items-center">
            <span class="material-symbols-outlined text-muted">arrow_back</span>{" "}
            Previous
          </button>
          <div>
            <button className="btn  mx-1 next-btn rounded-3 bg-light">1</button>
            <button className="btn  mx-1">2</button>
            <button className="btn  mx-1">3</button>
            <span className="mx-2">...</span>
            <button className="btn m-1">8</button>
            <button className="btn m-1">9</button>
            <button className="btn m-1">10</button>
          </div>
          <button className="btn next-btn rounded-3 d-flex gap-2 align-items-center border">
            Next{" "}
            <span class="material-symbols-outlined text-muted">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div className="card p-4 mt-4">
        <h4 className="fw-bold mb-4">Cash Outflow Trend</h4>
        <div className="d-flex align-items-center justify-content-between rounded-2">
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
        <div className="mt-4" style={{ height: 320 }}>
          <Line data={salesChartData} options={salesChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AccountsPayable;
