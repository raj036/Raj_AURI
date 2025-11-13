import React from 'react'
import data from "../../data/dashboardData.json"

function ActionCard() {
    const {quickActions} = data
  return (
    <div className="card rounded-4 shadow-sm mb-4 col-12">
          <div className="card-body">
            <h4 className="fw-bold mb-4">Quick Actions</h4>
            <div className="row">
              {quickActions.map((action, idx) => (
                <div key={idx} className="col-md-4 mb-3">
                  <div className="rounded-4 h-100 shadow-sm p-3 d-flex align-items-center border">
                    <span
                      className="material-symbols-outlined border p-2 rounded-4"
                      style={{ fontSize: "40px", color: "#A4A7AE" }}
                    >
                      {action.icon}
                    </span>

                    <div className="ms-3">
                      <h6 className="fw-bold">{action.title}</h6>
                      <p className="text-muted mb-0">{action.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  )
}

export default ActionCard
