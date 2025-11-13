import React from "react";
import data from "../../data/dashboardData.json";
import Avatar from "../../assets/Avatar.png";
import { Line } from "react-chartjs-2";
import { useState } from "react";

const ProductListItem = ({ item, rightLabel, rightLabelClass }) => (
  <div className="prod-item d-flex align-items-start">
    <div className=" flex-grow-1 d-flex align-items-center border-bottom py-2">
      <img src={Avatar} alt="Avatar logo" height={50} width={50} />
      <div className="d-flex justify-content-between flex-grow-1 ms-2 align-items-center">
        <div className="d-flex flex-column align-items-start">
          <div className="prod-title fw-semibold">{item.title}</div>
          <div className="text-muted small d-flex flex-column ">
            {item.brand} &nbsp; <span className="sku">{item.sku}</span>
          </div>
        </div>

        <div
          className={`prod-badge border rounded-pill px-2 ${
            rightLabelClass || ""
          }`}
        >
          {rightLabel}
        </div>
      </div>
    </div>
  </div>
);

// Reusable Inventory Card Wrapper
const InventoryCard = ({ title, children }) => (
  <div className="col-md-4 col-12 mb-3">
    <div className="card h-100 shadow-sm rounded-3">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold p-3 mb-0">{title}</h6>
          <span className="material-symbols-outlined text-muted">
            more_vert
          </span>
        </div>
        <div className="task-scroll flex-grow-1 p-3">{children}</div>
      </div>
    </div>
  </div>
);

function InventoryDashboard() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const { dateTabs } = data;

  //Inventory Dashboard - Line Chart
  const inventoryLabels = [
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

  const usageRate = [
    0, 4.55, 9.09, 13.64, 15.91, 18.18, 19.09, 20.45, 21.82, 22.73, 23.64,
    24.55,
  ];

  const inventoryData = {
    labels: inventoryLabels,
    datasets: [
      {
        label: "Stock Usage",
        data: [
          2200, 2300, 2400, 2500, 2550, 2600, 2620, 2650, 2680, 2700, 2720,
          2740,
        ],
        borderColor: "#2563eb", // blue line
        backgroundColor: "#2563eb",
        pointRadius: 0, // hide default dots
        pointHoverRadius: 5, // show dot on hover
        pointHoverBackgroundColor: "#2563eb", // 🔹 ensures hover point is visible
        // pointHoverBorderColor: "#fff",
        tension: 0.5, // smooth line
      },
    ],
  };

  const inventoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false, // hide legend
      },
      tooltip: {
        mode: "index",
        intersect: false,
        displayColors: false,
        callbacks: {
          label: function (context) {
            // Only for the first dataset

            const usageQty = context.raw; // current dataset value
            const usageRateValue = usageRate[context.dataIndex]; // second dataset value if exists
            return [`Usage Rate: ${usageRateValue}%`, `Usage Qty: ${usageQty}`];
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          color: "#f0f0f0",
        },
      },
      y: {
        display: false, // hide y-axis
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

  return (
    <div className="card inventory-card shadow-sm rounded-3 mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-3">
          <div>
            <h5 className="fw-bold mb-1">Inventory Dashboard</h5>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card chart-card shadow-sm rounded-3 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted mb-1 small">Stock usage</p>
                  <h2 className="fw-bold mb-0">
                    {Number(
                      (data.inventory?.topConsumed || []).reduce(
                        (sum, it) => sum + (it.qty || 0),
                        0
                      )
                    ).toLocaleString()}{" "}
                    Total Qty
                  </h2>
                </div>
                <div className="d-flex overflow-hidden mb-0flex-wrap tab-group border rounded-2">
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
              </div>

              <div className="mt-3 inventory-chart-wrapper">
                {/* <ChartPlaceholder
                      total={(data.inventory?.topConsumed || []).reduce(
                        (sum, it) => sum + (it.qty || 0),
                        0
                      )}
                    /> */}
                <Line
                  data={inventoryData}
                  options={inventoryChartOptions}
                  plugins={[verticalLinePlugin]}
                />
              </div>
            </div>
          </div>
        </div>

        {/* three nested cards */}
        <div className="row mt-4">
          <InventoryCard title="Top 5 Consumed Products">
            {(data.inventory?.topConsumed || []).map((it, idx) => (
              <ProductListItem
                key={idx}
                item={it}
                rightLabel={`${it.qty ?? ""} Qty`}
                rightLabelClass="qty-pill"
              />
            ))}
          </InventoryCard>

          <InventoryCard
            title={`Low Stock Alerts (${
              data.inventory?.lowStock?.length || 0
            })`}
          >
            {(data.inventory?.lowStock || []).map((it, idx) => (
              <ProductListItem
                key={idx}
                item={it}
                rightLabel={`${it.qty ?? ""} Qty`}
                rightLabelClass="qty-pill low text-danger border-danger bg-danger-subtle"
              />
            ))}
          </InventoryCard>

          <InventoryCard
            title={`Expiring Chemicals (${
              data.inventory?.expiring?.length || 0
            })`}
          >
            {(data.inventory?.expiring || []).map((it, idx) => (
              <ProductListItem
                key={idx}
                item={it}
                rightLabel={it.date}
                rightLabelClass="date-pill text-danger border-danger bg-danger-subtle"
              />
            ))}
          </InventoryCard>
        </div>
      </div>
    </div>
  );
}

export default InventoryDashboard;
