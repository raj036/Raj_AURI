import React from "react";

const QuickActionCard = ({ title, desc }) => (
  <div className="col-md-4 mb-3">
    <div className="card quick-card text-center shadow-sm h-100">
      <div className="card-body">
        <h6 className="fw-bold">{title}</h6>
        <p className="text-muted mb-0">{desc}</p>
      </div>
    </div>
  </div>
);

export default QuickActionCard;
