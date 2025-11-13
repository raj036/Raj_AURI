import React from "react";
import { Bar, Line } from "react-chartjs-2";
import data from "../../data/dashboardData.json";
import Select, { components } from "react-select";
import { useState, useMemo } from "react";
import Avatar from "../../assets/Avatar.png";

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

function SalesDashboard({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  const [selectedDate, setSelectedDate] = useState("Today");
  const { quarterTabs, SalesMetrics } = data;

  const topCustomersData = [
    { name: "Pest PVT LMD", orders: 5500000, revenue: 2400000 },
    { name: "Greenfield LLC", orders: 5000000, revenue: 2000000 },
    { name: "Skyline Innovations", orders: 4800000, revenue: 1800000 },
    { name: "Horizon Tech Group", orders: 4500000, revenue: 1700000 },
    { name: "Horizon Tech Group", orders: 4500000, revenue: 1700000 },
    { name: "Horizon Tech Group", orders: 4500000, revenue: 1700000 },
    { name: "Horizon Tech Group", orders: 4500000, revenue: 1700000 },
    { name: "Horizon Tech Group", orders: 4500000, revenue: 1700000 },
    { name: "Horizon Tech Group", orders: 4500000, revenue: 1700000 },
  ];

  //   const barChartData = {
  //     labels: topCustomersData.map((c) => c.name),
  //     datasets: [
  //       {
  //         label: "Revenue",
  //         data: topCustomersData.map((c) => c.revenue / 100000),
  //         backgroundColor: "#3b82f6",
  //         maxBarThickness: 30,
  //       },
  //     ],
  //   };

  const topConsumed = [
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null, // add image URL if available
      qty: 255,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 100,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 75,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 50,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 12,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 12,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 12,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 12,
    },
    {
      title: "Indoor Pest Control Spray",
      brand: "Brand: Pesto",
      sku: "SKU: PROD-001",
      image: null,
      qty: 12,
    },
  ];

  const barChartData = {
    labels: topCustomersData.map((c) => c.name),
    datasets: [
      {
        label: "Revenue",
        data: topCustomersData.map((c) => c.revenue / 100000),
        backgroundColor: "#3b82f6",
        maxBarThickness: 30,
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
        enabled: false, // disable the default tooltip
        external: function (context) {
          // Tooltip Element
          let tooltipEl = document.getElementById("chartjs-tooltip");

          // Create element if not exist
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.style.background = "#1f2937";
            tooltipEl.style.color = "#fff";
            tooltipEl.style.borderRadius = "8px";
            tooltipEl.style.padding = "10px";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.transition = "all 0.1s ease";
            tooltipEl.style.zIndex = 9999;
            document.body.appendChild(tooltipEl);
          }

          // Hide if no tooltip
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set text
          const index = tooltipModel.dataPoints[0].dataIndex;
          const customer = topCustomersData[index] || {};
          const product = topConsumed[index] || {};
          const image =
            Avatar || "https://via.placeholder.com/40x40.png?text=No+Img";

          tooltipEl.innerHTML = `
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
            <img src="${image}" width="40" height="40" style="border-radius:6px; object-fit:cover" />
            <div>
              <div style="font-size:12px; color:#fff;">${
                product?.title || "Unknown Product"
              }</div>
              <div style="font-size:12px; color:#fff;">${
                product?.brand || "-"
              }</div>
              <div style="font-size:12px; color:#fff;">${
                product?.sku || "-"
              }</div>
            </div>
          </div>
          <hr style="border:none; border-top:1px solid #e5e7eb; margin:6px 0"/>
          <div style="font-size:13px; color:#fff;"><b>Orders:</b> ₹${(
            customer.orders || 0
          ).toLocaleString()}</div>
          <div style="font-size:13px; color:#fff;"><b>Revenue:</b> ₹${(
            customer.revenue || 0
          ).toLocaleString()}</div>
        `;

          // Position the tooltip
          const canvas = context.chart.canvas;
          const rect = canvas.getBoundingClientRect();
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left =
            rect.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            rect.top + window.pageYOffset + tooltipModel.caretY + "px";
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

  const defaultBranches = [
    "HSR",
    "Kormangala",
    "Rajaji Nagar",
    "BTM",
    "HSR Sec 2",
    "Hightech City",
  ];

  const defaultBranchData = {
    HSR: [420, 430, 450, 460, 470, 480, 500, 520, 540, 530, 560, 580],
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
      borderDash: idx % 2 === 0 ? [] : [6, 4],
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
      <h4 className="fw-bold mb-3">Product Sales Trends</h4>

      {/* Top 5 Customers */}
      <div className="border rounded p-4">
        <h4 className="fw-bold mb-2">Top 5 Customers</h4>
        <p className="text-sm text-gray-500 mb-4">Comparison of branches</p>
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

        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </div>
  );
}

export default SalesDashboard;
