import React from "react";

const OvertimeCard = ({ name, location, date, time }) => (
  <div className="card task-card mb-3 shadow-sm">
    <div className="card-body">
      <h6 className="fw-bold mb-1">{name}</h6>
      <p className="mb-1">{location}</p>
      <small>{date} | {time}</small>
      <div className="mt-2">
        <button className="btn btn-sm btn-outline-secondary me-2">Review</button>
        <button className="btn btn-sm btn-primary">Approve</button>
      </div>
    </div>
  </div>
);

export default OvertimeCard;
