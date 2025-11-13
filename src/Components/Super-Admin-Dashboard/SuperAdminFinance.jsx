import React from "react";
import data from "../../data/dashboardData.json";
import { Bar, Line, Doughnut } from "react-chartjs-2";
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
  ],
  datasets: [
    {
      label: "Expenses",
      data: [30, 40, 25, 40, 25, 35, 40, 35, 40, 35, 35, 45],
      backgroundColor: "#FDA29B",
      maxBarThickness: 30,
    },

    {
      label: "Profit",
      data: [15, 10, 20, 25, 20, 25, 15, 25, 20, 25, 30, 40],
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
   const companyChartData1 = () => {
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
        ctx.strokeStyle = "#17B26A";
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
          borderColor: "#17B26A",
          backgroundColor: "#17B26A",
          tension: 0.4,
          borderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 7,
          pointBackgroundColor: "#17B26A",
          // pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#17B26A",
          fill: true,
        },
      ],
    };
  }, [saleAndOrderChartData]);

  return (
    <div className="card shadow-sm rounded-4 mb-4 p-4">
      <h4 className="fw-bold mb-3">Financial Analytics</h4>
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
            <h4 className="fw-bold mb-1">Profit vs Expense</h4>
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

      <div className="card p-3 rounded-4 my-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <h4 className="fw-bold mb-0">Profit Trend (YTD)</h4>
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

      <div className="row">
              <div className="col-lg-6">
                <div
                  className="card  p-3 shadow-sm rounded-3"
                  style={{ height: "300px" }}
                >
                  <h6 className="fw-bold mb-3">Employee Distribution</h6>
                  {/* <DonutChartPlaceholder data={employeeDistribution.roles} /> */}
                  <div className="flex-grow-1">
                    <Doughnut
                      data={companyChartData1()}
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
    </div>
  );
}

export default FinancialDashboard;
