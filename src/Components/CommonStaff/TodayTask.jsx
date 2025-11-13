import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TaskSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [tasks, setTasks] = useState({
    active: [
      {
        id: 1,
        text: "Schedule installation for Thompson residence",
        type: "Job",
      },
      { id: 2, text: "Send invoice #2847 to Acme Industries", type: "Invoice" },
    ],
    complete: [
      {
        id: 3,
        text: "Call back Sarah about pricing details",
        type: "Sales Calls",
        checked: true,
      },
    ],
  });

  const stats = {
    salesCalls: 2,
    jobs: 2,
    invoices: 8,
  };

  const removeTask = (taskId, section) => {
    setTasks((prev) => ({
      ...prev,
      [section]: prev[section].filter((task) => task.id !== taskId),
    }));
  };

  const toggleComplete = (taskId) => {
    setTasks((prev) => ({
      ...prev,
      complete: prev.complete.map((task) =>
        task.id === taskId ? { ...task, checked: !task.checked } : task
      ),
    }));
  };

  const getTypeStyle = (type) => {
    const styles = {
      Job: "success",
      Invoice: "primary",
      "Sales Calls": "info",
    };
    return styles[type] || "secondary";
  };

  return (
    <div className=" py-4">
      <div className=" p-4  rounded-4 mb-4 border" style={{backgroundColor: '#fff'}}>
        <div className="card-body">
          <h3 className="card-title mb-4" style={{ fontWeight: "600" }}>Today's Task Section (Personal)</h3>

          {/* Stats Section */}
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Sales Calls</div>
                  <h3 className="mb-0">{stats.salesCalls}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Jobs</div>
                  <h3 className="mb-0">{stats.jobs}</h3>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="text-muted small">Invoices</div>
                  <h3 className="mb-0">{stats.invoices}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Action Items Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="mb-0">Action Items</h6>
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-plus"></i> Add Task
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-3">
            {["All", "SalesCalls", "Jobs", "Invoices"].map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1 border  transition-all duration-200 ${
                  activeFilter === filter
                    ? "bg-white text-gray-700 shadow-sm rounded-2"
                    : "bg-gray-200 text-gray-600 border-0 hover:bg-gray-300"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Active Tasks */}
          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <input
                type="radio"
                className="form-check-input me-2"
                id="activeTasks"
                name="taskSection"
                defaultChecked
              />
              <label
                htmlFor="activeTasks"
                className="form-check-label fw-semibold"
              >
                Active Tasks
              </label>
            </div>

            <div className="list-group">
              {tasks.active.map((task) => (
                <div
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div>
                    <div className="mb-2">{task.text}</div>
                    <span className={`badge bg-${getTypeStyle(task.type)}`}>
                      {task.type}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-link text-secondary"
                    onClick={() => removeTask(task.id, "active")}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Tasks */}
          <div>
            <div className="d-flex align-items-center mb-3">
              <input
                type="radio"
                className="form-check-input me-2"
                id="completeTasks"
                name="taskSection"
              />
              <label
                htmlFor="completeTasks"
                className="form-check-label fw-semibold"
              >
                Complete Tasks
              </label>
            </div>

            <div className="list-group">
              {tasks.complete.map((task) => (
                <div
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="d-flex align-items-start">
                    <input
                      type="checkbox"
                      className="form-check-input me-3 mt-1"
                      checked={task.checked}
                      onChange={() => toggleComplete(task.id)}
                    />
                    <div>
                      <div className="mb-2">{task.text}</div>
                      <span className={`badge bg-${getTypeStyle(task.type)}`}>
                        {task.type}
                      </span>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-link text-secondary"
                    onClick={() => removeTask(task.id, "complete")}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
