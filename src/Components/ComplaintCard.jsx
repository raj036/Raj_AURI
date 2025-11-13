import React from "react";

const ComplaintCard = ({ name, service, priority, date, desc }) => {
  const getPriorityColor = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "secondary";
  };

  return (
    <div className="card task-card mb-3 shadow-sm">
      <div className="card-body">
        <h6 className="fw-bold mb-1">{name}</h6>
        <p className="mb-1"><b>Service Type:</b> {service}</p>
        <small className="d-block text-muted">{desc}</small>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className={`badge bg-${getPriorityColor(priority)}`}>{priority}</span>
          <button className="btn btn-sm btn-outline-secondary">Review</button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
