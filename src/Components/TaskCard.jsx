import React from "react";

const TaskCard = ({ title, company, assigned, priority }) => {
  const getPriorityColor = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "secondary";
  };

  return (
    <div className="card task-card mb-3 shadow-sm">
      <div className="card-body">
        <h6 className="fw-bold mb-1">{title}</h6>
        <p className="mb-1 text-muted">{company}</p>
        <small>Assigned to: <b>{assigned}</b></small>
        <span className={`badge bg-${getPriorityColor(priority)} float-end`}>
          {priority}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
