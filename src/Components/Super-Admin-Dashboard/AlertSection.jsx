import React from "react";
import data from "../../data/dashboardData.json";
import "bootstrap/dist/css/bootstrap.min.css";

const AlertsSection = () => {
  const { alerts } = data;

  return (
    <div className="card p-4 border shadow-sm rounded-4">
      <h5 className="fw-semibold mb-4">Alerts & Notifications</h5>

      <div className="d-flex flex-column gap-3">
        {alerts.alerts.map((alert, index) => (
          <div
            key={index}
            className="d-flex justify-content-between align-items-center border rounded-3 px-3 py-3 alert-item"
            style={{
              backgroundColor: "#FFFCF5",
              borderColor: "#FEDF89",
            }}
          >
            {/* Left section */}
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 me-3"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#fff6e5",
                  border: "1px solid #f6d97f",
                }}
              >
                <span
                  className="material-symbols-outlined text-warning"
                  style={{ fontSize: "22px" }}
                >
                  {alert.icon}
                </span>
              </div>
              <div>
                <h6 className="fw-semibold mb-0">{alert.title}</h6>
                <small className="text-muted">{alert.desc}</small>
              </div>
            </div>

            {/* Right button */}
            <button
              className="btn btn-sm fw-semibold"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#fff",
                color: "#212529",
              }}
            >
              {alert.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;
