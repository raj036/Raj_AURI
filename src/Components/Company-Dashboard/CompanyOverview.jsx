import React from "react";
import data from "../../data/dashboardData.json";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale } from "chart.js";
import { useState } from "react";

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
      <span
        className="material-symbols-outlined text-muted"
        style={{ fontSize: "28px" }}
      >
        {icon}
      </span>
    </div>
    {growth && (
      <div
        className={`mt-2 badge rounded-pill p-2 ${
          growth.startsWith("+")
            ? "bg-success-subtle text-success"
            : "bg-danger-subtle text-danger"
        } fw-semibold`}
      >
        {growth}
      </div>
    )}
  </div>
);

function CompanyOverview() {
  const { companyOverview } = data;
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

  

  return (
    <div className="card shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-1">Company Overview</h5>
        <p className="text-muted mb-4">
          High-level business metrics and employee distribution
        </p>

        <div className="d-flex justify-content-between ">
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
              {companyOverview.metrics.map((metric, idx) => (
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
      </div>
    </div>
  );
}

export default CompanyOverview;
