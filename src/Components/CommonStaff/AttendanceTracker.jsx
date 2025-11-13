import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import Select, { components } from "react-select";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AttendanceTracker = () => {
  const [period, setPeriod] = useState("30 days");
  const [view, setView] = useState("Weekly");

  const dateInputRef = useRef(null);

  const handleIconClick = () => {
    // Trigger the native date picker
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.(); // modern browsers
      dateInputRef.current.focus(); // fallback
    }
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const data = {
    labels,
    datasets: [
      {
        label: "Performance (in hours)",
        data: [5, 6, 7.5, 6.8, 8],
        borderColor: "#22C55E",
        backgroundColor: "rgba(34,197,94,0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#22C55E",
      },
    ],
  };

  const defaultBranches = ["From : July 2023 to May 2024"];
  // 👇 Add this new state for default branches
  const [selectedDefaultBranches, setSelectedDefaultBranches] = useState(
    defaultBranches.map((b) => ({ value: b, label: b })) // preselected default
  );

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 2 },
        grid: { color: "#F3F4F6" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const periods = [
    "Today",
    "7 days",
    "30 days",
    "3 months",
    "6 months",
    "12 months",
  ];

  return (
    <div className=" mt-4">
      <div className="bg-white p-4 rounded  border p-4 my-4 rounded-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Attendance Tracker</h5>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-success-subtle text-success px-3 py-2">
              <i
                className="bi bi-circle-fill me-1"
                style={{ fontSize: "8px" }}
              ></i>
              Present
            </span>
            <span className="badge bg-danger text-white px-3 py-2">
              Punch-Out
            </span>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div className="btn-group mb-2" role="group">
            {periods.map((p) => (
              <button
                key={p}
                className={`px-3 py-1 border ${
                  period === p
                    ? "bg-white text-gray-700 rounded-2"
                    : "bg-grey text-dark border-0"
                }`}
                onClick={() => setPeriod(p)}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="d-flex align-items-center gap-2">
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
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                  backgroundColor: "#fff",
                }),
              }}
            />
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

        <div className="row text-center mb-4">
          <div className="col-md-3 mb-3">
            <div className="border rounded p-3 ">
              <p className="mb-1 text-muted small">Present Days</p>
              <h4 className="fw-bold mb-0">25</h4>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="border rounded p-3 ">
              <p className="mb-1 text-muted small">Absent Days</p>
              <h4 className="fw-bold mb-0">2</h4>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="border rounded p-3 ">
              <p className="mb-1 text-muted small">Hours Worked</p>
              <h4 className="fw-bold mb-0">185 hrs</h4>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="border rounded p-3 ">
              <p className="mb-1 text-muted small">Overtime</p>
              <h4 className="fw-bold mb-0">0.5 hrs</h4>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="btn-group">
            <button
              className={`btn btn-sm ${
                view === "Weekly"
                  ? "border-0"
                  : "bg-light text-dark border-0"
              }`}
              style={{
                backgroundColor: view === "Weekly" ? "#fff" : "",
              }}
              onClick={() => setView("Weekly")}
            >
              Weekly
            </button>
            <button
              className={`btn btn-sm ${
                view === "Monthly"
                  ? " border-0"
                  : "bg-light text-dark border-0"
              }`}
              style={{
                backgroundColor: view === "Monthly" ? "#fff" : "",
              }}
              onClick={() => setView("Monthly")}
            >
              Monthly
            </button>
          </div>

          <button className="btn btn-outline-secondary btn-sm">
            <CalendarTodayIcon className="text-secondary" /> Select dates
          </button>
        </div>

        <div className="p-2">
          <Line data={data} options={options} height={80} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;
