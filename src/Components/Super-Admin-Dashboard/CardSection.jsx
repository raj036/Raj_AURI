import React from "react";
import data from "../../data/dashboardData.json";

function CardSection() {
  const { cardSection } = data;

  const Card = ({
    title,
    value,
    subText,
    icon,
    growth,
    isCurrency = false,
  }) => (
    <div className="g-3">
      <div className="card h-100 w-100 p-4 shadow-sm rounded-4 border">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1 text-sm">{title}</p>

            
          </div>

          <div>
            <span
              className="material-symbols-outlined text-muted"
              style={{ fontSize: "28px" }}
            >
              {icon}
            </span>
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
  return (
    <div className="row mb-4 g-3">
      {cardSection.metrics.map((metric, idx) => (
        <div className="col-md-6 col-lg-4 col-12" key={idx}>
          <Card {...metric} />
        </div>
      ))}
    </div>
  );
}

export default CardSection;
