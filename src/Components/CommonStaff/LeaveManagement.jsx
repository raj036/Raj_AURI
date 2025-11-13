import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveManagement = () => {
  const [currentMonth, setCurrentMonth] = useState(11); // December (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const leaveRequests = [
    {
      id: 1,
      type: "Sick Leave",
      date: "Dec 8 2025",
      status: "Approved",
      statusColor: "success",
    },
    {
      id: 2,
      type: "Annual Leave",
      date: "Dec 20-22 2025",
      status: "Pending",
      statusColor: "warning",
    },
    {
      id: 3,
      type: "Personal Leave",
      date: "Jan 10-12 2025",
      status: "Denied",
      statusColor: "danger",
    },
  ];

  const markedDates = [1, 8, 20, 21, 22];

  const monthNames = [
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

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Previous month days
    const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isMarked: markedDates.includes(i),
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const calendarDays = generateCalendar();

  return (
    <div
      className=" p-4  rounded-4 mb-4 border"
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h3 className="mb-0" style={{ fontWeight: "600" }}>
            Leave Management
          </h3>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#2196F3", border: "none" }}
          >
            + Apply Leave
          </button>
        </div>
      </div>

      <div className="row">
        {/* Left Column - Leave Statistics and Requests */}
        <div className="col-md-7">
          {/* Statistics Cards */}
          <div className="row mb-3">
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                    Pending Leave Requests
                  </p>
                  <h2 className="mb-0" style={{ fontWeight: "600" }}>
                    2
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                    Approved Leaves
                  </p>
                  <h2 className="mb-0" style={{ fontWeight: "600" }}>
                    2
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                    Balance Leaves
                  </p>
                  <h2 className="mb-0" style={{ fontWeight: "600" }}>
                    8
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Requests List */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              {leaveRequests.map((leave) => (
                <div key={leave.id} className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1" style={{ fontWeight: "600" }}>
                        {leave.type}
                      </h6>
                      <p
                        className="text-muted mb-0"
                        style={{ fontSize: "14px" }}
                      >
                        {leave.date}
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className={`badge bg-${leave.statusColor} d-flex align-items-center`}
                        style={{ fontSize: "12px", padding: "6px 12px" }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            display: "inline-block",
                            marginRight: "6px",
                          }}
                        ></span>
                        {leave.status}
                      </span>
                      {leave.status === "Pending" && (
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          style={{ fontSize: "12px" }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Calendar */}
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Calendar Header */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0" style={{ fontWeight: "600" }}>
                  {monthNames[currentMonth]} {currentYear}
                </h6>
                <div>
                  <button
                    className="btn btn-sm btn-light me-1"
                    onClick={handlePrevMonth}
                    style={{ border: "none" }}
                  >
                    ‹
                  </button>
                  <button
                    className="btn btn-sm btn-light"
                    onClick={handleNextMonth}
                    style={{ border: "none" }}
                  >
                    ›
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div>
                {/* Week Days Header */}
                <div className="row text-center mb-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <div
                        key={day}
                        className="col"
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          fontWeight: "500",
                        }}
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                {/* Calendar Days */}
                {Array.from({ length: 6 }).map((_, weekIndex) => (
                  <div key={weekIndex} className="row text-center mb-1">
                    {calendarDays
                      .slice(weekIndex * 7, (weekIndex + 1) * 7)
                      .map((dayObj, dayIndex) => {
                        const globalIndex = weekIndex * 7 + dayIndex;
                        return (
                          <div key={globalIndex} className="col p-1">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{
                                height: "32px",
                                fontSize: "14px",
                                color: dayObj.isCurrentMonth ? "#000" : "#ccc",
                                backgroundColor: dayObj.isMarked
                                  ? "#FFC107"
                                  : "transparent",
                                borderRadius: "4px",
                                fontWeight: dayObj.isMarked ? "600" : "400",
                                cursor: "pointer",
                              }}
                            >
                              {dayObj.day}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
