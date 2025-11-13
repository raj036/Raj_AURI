import React from "react";
import data from "../../data/dashboardData.json";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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


function    SubscriptionAnalytics({
  branches: branchesProp,
  branchData: branchDataProp,
  initialSelected = [],
}) {
  
  const [selectedDate, setSelectedDate] = useState("Today");
  const subscriptionAnalytics = data?.subscriptionAnalytics || [];
  const { saleAndOrderChartData, dateTabs, dateTabs1 } = data;

  const saleAndOrderOption = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index", // shows tooltip for all datasets at the same index
      intersect: false, // trigger tooltip even if cursor is not on the point
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
          boxWidth: 3,
          boxHeight: 3,
        },
      },
      tooltip: {
        backgroundColor: "#102A56",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false, // ✅ removes color boxes or circles before label text
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = Number(context.raw.toString().replace(/,/g, ""));
            return `${label}: ₹${value.toLocaleString("en-IN")}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Branch Performance (₹ in lakhs)",
          font: { size: 13 },
        },
        ticks: {
          // 👇 Custom tick label formatting
          callback: function (value) {
            return `${(value / 100000).toFixed(0)}L`; // adds “L” after each tick label
          },
        },
        grid: { color: "#f3f4f6" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const verticalLinePlugin = {
    id: "verticalLine",
    afterDatasetsDraw: (chart) => {
      if (chart.tooltip?._active && chart.tooltip._active.length > 0) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0].element;
        const x = activePoint.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#2563eb";
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const forecastChart = useMemo(() => {
    // Guard: if chartData missing, return empty dataset
    if (!saleAndOrderChartData || saleAndOrderChartData.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels: saleAndOrderChartData.map((item) => item.day),
      datasets: [
        {
          label: "Revenue",
          data: saleAndOrderChartData.map((item) =>
            Number(item["Revenue"].replace(/,/g, ""))
          ),
          borderColor: "#2E90FA",
          backgroundColor: "#2E90FA",
          tension: 0.4,
          borderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#53B1FD",
          // pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#47CD89",
          fill: true,
        },
      ],
    };
  }, [saleAndOrderChartData]);

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

  const companyChartData = () => {
    const performers = data?.planDistribution || { labels: [], datasets: [] };
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

  const topCustomersData = [
    { name: "Active", orders: 55, revenue: 240, color: "#2E90FA" },
  ];
  const topCustomersData1 = [
    { name: "Expired", orders: 65, revenue: 260, color: "#2E90FA" },
  ];

  const barChartData = {
    labels: topCustomersData.map((c) => c.name),
    datasets: [
      {
        label: "Active",
        data: topCustomersData.map((c) => c.revenue),
        backgroundColor: "#2E90FA",
        maxBarThickness: 30,
      },
      {
        label: "Expired",
        data: topCustomersData1.map((c) => c.revenue),
        backgroundColor: "#84CAFF",
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
        displayColors: false,
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const customer = topCustomersData[index];

            return [`Value: ${customer.revenue.toLocaleString()}`];
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
          text: "Branch Performance in (number) ",
        },
        ticks: {
          // 👇 Custom tick label formatting
          callback: function (value) {
            return `${value.toFixed(0)}`; // adds “L” after each tick label
          },
        },
      },
    },
  };

  return (
    <div className="card shadow-sm rounded-4 my-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1">Subscription Analytics</h4>
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

      <div className="row mb-4 g-3">
        {subscriptionAnalytics.map((metric, idx) => (
          <div className="col-md-6 col-lg-3 col-12" key={idx}>
            <Card {...metric} />
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="border rounded p-4">
            <h4 className="fw-bold mb-2">Active vs Expired</h4>

            <Bar data={barChartData} options={barChartOptions} />
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
                  cutout: "0%",
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
                      //   borderColor: "#fff",
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

      <div className="card p-3 rounded-4 my-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <h4 className="fw-bold mb-0">Monthly Renewals Trend</h4>
      </div>

      {/* Date Tabs */}
      <div className="d-flex align-items-center justify-content-between mb-4 rounded-2">
        <div className="d-flex overflow-hidden flex-wrap tab-group border rounded-2">
          {dateTabs1.map((tab) => (
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
        <div style={{ height: "350px", width: "100%" }}>
          <Line
            data={forecastChart}
            options={saleAndOrderOption}
            plugins={[verticalLinePlugin]}
          />
        </div>
      </div>
    </div>
  );
}

export default SubscriptionAnalytics;
