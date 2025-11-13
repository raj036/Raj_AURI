import React from "react";
import data from "../../data/dashboardData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const TechnicianTable = () => {
    const {techniciansData} = data
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={i} className="text-warning" />);
    if (hasHalf) stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    return stars;
  };

  return (
    <div className="card border rounded-4 my-4">
      <div className="p-4">
        {/* Table Header */}
        <div className="row border-bottom pb-2 mb-2 fw-semibold text-secondary small">
          <div className="col-5">Technician</div>
          <div className="col-2 text-center">Job Count</div>
          <div className="col-3 text-center">Avg Time</div>
          <div className="col-2 text-center">Ratings</div>
        </div>

        {/* Table Rows */}
        {techniciansData.map((tech, index) => (
          <div
            className={`row align-items-center py-3 border-bottom ${
              index === techniciansData.length - 1 ? "border-0" : ""
            }`}
            key={tech.email}
          >
            <div className="col-5 d-flex align-items-center gap-3">
              {tech.img ? (
                <img
                  src={tech.img}
                  alt={tech.name}
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              ) : (
                <div
                  className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white fw-semibold"
                  style={{ width: "40px", height: "40px" }}
                >
                  {tech.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}

              <div>
                <h6 className="mb-0 fw-semibold text-dark" style={{ fontSize: "0.95rem" }}>
                  {tech.name}
                </h6>
                <p className="mb-0 text-muted" style={{ fontSize: "0.85rem" }}>
                  {tech.email}
                </p>
              </div>
            </div>

            <div className="col-2 text-center">{tech.jobCount}</div>
            <div className="col-3 text-center">{tech.avgTime}</div>
            <div className="col-2 text-center d-flex justify-content-center">
              {renderStars(tech.rating)}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center pt-3 small text-muted">
          <span>Page 1 of 4</span>
          <div>
            <button className="btn btn-outline-secondary btn-sm me-2">Previous</button>
            <button className="btn btn-outline-secondary btn-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianTable;
