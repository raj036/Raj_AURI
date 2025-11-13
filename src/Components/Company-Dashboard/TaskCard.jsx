import React from "react";
import data from "../../data/dashboardData.json";
// import SectionCard from "./SectionCard";
// import PriorityBadge from "./PriorityBadge";

// Priority Badge
const PriorityBadge = ({ level }) => {
  const colors = {
    High: "rounded-2 px-2 bg-danger text-white",
    Medium: "rounded-2 px-2 bg-warning text-white",
    Low: "rounded-2 px-2 bg-white text-dark border border-dark",
  };
  return (
    <span className={colors[level] || "rounded-2 px-2 bg-light"}>{level}</span>
  );
};

// Reusable Section Wrapper
const SectionCard = ({ title, children }) => (
  <div className="col-lg-4 col-md-6 col-12 mb-3">
    <div className="card h-100 shadow-sm rounded-3">
      <div className="d-flex flex-column">
        <h6 className="fw-bold border-bottom p-3 mb-0">{title}</h6>
        <div className="task-scroll flex-grow-1 p-3">{children}</div>
      </div>
    </div>
  </div>
);

function TaskCard() {
  const { tasks } = data;

  console.log("Dashboard Data:", data);
  console.log("Tasks Data:", data?.tasks);

  return (
    <div className="card shadow-sm mb-4 rounded-4">
      <div className="card-body">
        <h4 className="fw-bold mb-4">Today's Task Section</h4>
        <div className="card rounded-4">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex">
                <span className="material-symbols-outlined text-muted">
                  docs
                </span>
                <h5 className="mb-0 fw-bold ms-2">Quotations Approval</h5>
              </div>
              <span className="bg-primary small fw-bold px-2 py-1 rounded-2 text-white">
                0/3 Completed
              </span>
            </div>
            <SectionCard title="Assign Jobs">
              {tasks.assignJobs.map((job, idx) => (
                <div key={idx} className="card mb-3 shadow-sm p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="fw-bold mb-0">{job.title}</h6>
                    <PriorityBadge level={job.priority} />
                  </div>
                  <p className="text-muted mb-1">{job.company}</p>
                  <small>
                    Assigned to: <strong>{job.assigned}</strong>
                  </small>
                </div>
              ))}
            </SectionCard>

            <SectionCard title="Approve Overtime">
              {tasks.overtime.map((ot, idx) => (
                <div key={idx} className="card mb-3 shadow-sm">
                  <div className="p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="fw-bold">{ot.name}</h6>
                      <small className="text-muted">{ot.location}</small>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                      <span className="text-muted">{ot.date}</span>
                      <span className="fw-bold">{ot.time}</span>
                    </div>
                    <div className="d-flex gap-2 mt-2">
                      <button className="btn btn-outline-secondary btn-sm text-dark rounded-3 px-3 border">
                        Review
                      </button>
                      <button className="btn btn-primary btn-sm rounded-3 px-3 py-2">
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </SectionCard>

            <SectionCard title="Resolve Complaints">
              {tasks.complaints.map((c, idx) => (
                <div key={idx} className="card mb-3 shadow-sm">
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0">{c.name}</h6>
                      <PriorityBadge level={c.priority} />
                    </div>
                    <p className="fw-semibold">Service Type: {c.service}</p>
                    <p className="text-muted">{c.desc}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">{c.date}</span>
                      <button className="btn btn-outline-secondary btn-sm">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
