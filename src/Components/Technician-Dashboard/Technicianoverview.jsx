import React, { useRef } from "react";
import data from "../../data/dashboardData.json";
import { Doughnut } from "react-chartjs-2";
import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import Select, { components } from "react-select";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// KPI Card
const KPIBox = ({
  title,
  value,
  subText,
  icon,
  growth,
  isCurrency = false,
}) => (
  <div className="card h-100 p-4 shadow-sm rounded-4">
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

function TechnicianOverview() {
  const { technicianOverview } = data;
  const [selectedDate, setSelectedDate] = useState("Today");
  const branchesList = [
    "HSR",
    "Kormangala",
    "Rajaji Nagar",
    "Indiranagar",
    "Whitefield",
  ];
  const defaultBranches = ["From : July 2023 to May 2024"];
  // 👇 Add this new state for default branches
  const [selectedDefaultBranches, setSelectedDefaultBranches] = useState(
    defaultBranches.map((b) => ({ value: b, label: b })) // preselected default
  );

  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleBranchSelect1 = (selected) => {
    setSelectedOptions(selected);
  };

  const options = useMemo(
    () => (branchesList || []).map((b) => ({ value: b, label: b })),
    [branchesList]
  );

  const dateInputRef = useRef(null);

  const handleIconClick = () => {
    // Trigger the native date picker
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.(); // modern browsers
      dateInputRef.current.focus(); // fallback
    }
  };

  const dateTabs = ["Today", "This Week", "This Month", "This Year"];
  const quarterTabs = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];
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

  const barChartOptions = {
    responsive: true,
    elements: { bar: { borderRadius: 6 } },
    plugins: {
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

            return [
              `Orders: ${customer.orders}`,
              `Revenue: ₹${customer.revenue.toLocaleString()}`,
            ];
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

  const topCustomersData = [
    { name: "Pest PVT LMD", orders: 55, revenue: 2400000 },
    { name: "Greenfield LLC", orders: 50, revenue: 2000000 },
    { name: "Skyline Innovations", orders: 48, revenue: 1800000 },
    { name: "Horizon Tech Group", orders: 45, revenue: 1700000 },
    { name: "Summit Solutions Inc.", orders: 30, revenue: 1200000 },
    { name: "Oily.", orders: 30, revenue: 1200000 },
    { name: "Mathlede", orders: 30, revenue: 1200000 },
    { name: "Summit Solutions Inc.", orders: 30, revenue: 1200000 },
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

  return (
    <div className="card shadow-sm rounded-4 mb-4">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
          <h5 className="fw-bold mb-4">Technician Overview</h5>
          <div style={{ width: 360, minWidth: 220 }}>
            <p className="mb-1">Select Branch to compare</p>
            <Select
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option: components.Option }} // ✅ use react-select’s Option
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
          <div className="d-flex align-items-center">
            {/* Branch Select (without dropdown) */}
            <Select
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ DropdownIndicator: null, IndicatorSeparator: null }}
              options={defaultBranches.map((b) => ({ value: b, label: b }))}
              value={selectedDefaultBranches}
              onChange={(selected) => setSelectedDefaultBranches(selected)}
              placeholder="Select Date"
              classNamePrefix="branch-select"
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 , backgroundColor: '#fff'}),
              }}
            />

            {/* Calendar icon + hidden date input */}
            <div
              className="d-flex align-items-center justify-content-end ms-2 "
              style={{ minHeight: "38px" }}
            >
              <div
                className="d-flex align-items-center gap-2 border rounded px-2 h-[38px] py-1 cursor-pointer"
                style={{ minHeight: "38px" }}
                onClick={handleIconClick}
              >
                <CalendarTodayIcon className="text-secondary" />
                {/* Hidden date input (triggered by icon click) */}
                <input
                  type="date"
                  ref={dateInputRef}
                  className="form-control border-0 bg-transparent text-secondary p-0"
                  style={{ width: 0, opacity: 0, position: "absolute" }}
                  placeholder="Edit Dates"
                  onChange={(e) => console.log(e.target.value)} // replace with your handler
                />
                <p className="m-0 text-muted">Edit Dates</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            {technicianOverview.metrics.map((metric, idx) => (
              <div key={idx} className="mb-3">
                <KPIBox {...metric} />
              </div>
            ))}
          </div>

          <div className="col-lg-6 mt-lg-0 mt-4">
            <div
              className="card  p-3 shadow-sm rounded-4"
              style={{ height: "390px" }}
            >
              <h6 className="fw-bold mb-3">Technician availability</h6>
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
          <div>
            <div className="chart-section p-4 rounded-4 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
                <div>
                  <h4 className="fw-bold mb-2">Utilization rates</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Technician Utiliaztion Comparison
                  </p>
                </div>
                <div style={{ width: 360, minWidth: 220 }}>
                  <p className="mb-1">Select Branch to compare</p>
                  <Select
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option: components.Option }} // ✅ use react-select’s Option
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
              <div className="d-flex justify-content-between ">
                <div className="d-flex overflow-hidden mb-4 flex-wrap tab-group border rounded-2">
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
                <div className="d-flex align-items-center">
                  {/* Branch Select (without dropdown) */}

                  {/* Calendar icon + hidden date input */}
                  <div
                    className="d-flex align-items-center justify-content-end ms-2 "
                    style={{ minHeight: "38px" }}
                  >
                    <div
                      className="d-flex align-items-center gap-2 border rounded px-2 h-[38px] py-1 cursor-pointer"
                      style={{ minHeight: "38px" }}
                      onClick={handleIconClick}
                    >
                      <CalendarTodayIcon className="text-secondary" />
                      {/* Hidden date input (triggered by icon click) */}
                      <input
                        type="date"
                        ref={dateInputRef}
                        className="form-control border-0 bg-transparent text-secondary p-0"
                        style={{ width: 0, opacity: 0, position: "absolute" }}
                        placeholder="Edit Dates"
                        onChange={(e) => console.log(e.target.value)} // replace with your handler
                      />
                      <p className="m-0 text-muted">Edit Dates</p>
                    </div>
                  </div>
                </div>
              </div>
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechnicianOverview;
