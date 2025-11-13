import React from "react";
import data from "../../data/dashboardData.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// ✅ Reusable Card Component
const ActivityCard = ({
  title,
  amount,
  desc,
  due,
  priority,
  priorityColor,
  buttons,
}) => (
  <div className="col-lg-4 col-md-6 col-12">
    <div className="card-custom border rounded-3 shadow-sm p-3 mb-3 bg-white h-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0 fw-semibold">{title}</p>
        {priority && (
          <span className={`px-2 rounded-2 bg-${priorityColor}`}>
            {priority}
          </span>
        )}
      </div>

      {/* Content */}
      {amount && <p className="fw-bold fs-5 mb-1">{amount}</p>}
      {desc && <p className="text-muted small mb-2">{desc}</p>}

      {/* Due Info */}
      {due && (
        <div className="text-muted small mb-3">
          <i className="bi bi-clock me-1"></i>
          {due}
        </div>
      )}

      {/* Buttons */}
      <div className="d-flex gap-2">
        {buttons?.map((btn, i) => (
          <button
            key={i}
            className={`btn px-3 py-2 ${
              btn === "Approve" || btn === "Call"
                ? "btn-primary"
                : "btn-outline-secondary"
            }`}
          >
            {btn === "Call" && <i className="bi bi-telephone me-1"></i>}
            {btn}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ✅ Reusable Section Component
const SectionBlock = ({ title, icon, badge, cards }) => (
  <div className=" border activity-section bg-white p-4 rounded-3 shadow-sm mb-4">
    <div className="activity-header d-flex justify-content-between align-items-center mb-3">
      <div className="d-flex align-items-center gap-2">
        <i className={`${icon} fs-5 text-muted`}></i>
        <h6 className="mb-0 fw-semibold">{title}</h6>
      </div>
      <span className={`px-2 py-1 rounded text-white bg-${badge.color}`}>{badge.label}</span>
    </div>

    {/* Cards Grid */}
    <div className="row g-3">
      {cards.map((card, i) => (
        <ActivityCard key={i} {...card} />
      ))}
    </div>
  </div>
);

// ✅ Main Component
const PendingActivities = () => {
  // 🧠 Destructure only what you need
  const {
    pendingActivities: { sections },
  } = data;

  return (
    <div className="card rounded-4 shadow-sm p-4">
      <h5 className="fw-bold mb-4">Pending Activities</h5>

      {sections.map(({ title, icon, badge, cards }, index) => (
        <SectionBlock
          key={index}
          title={title}
          icon={icon}
          badge={badge}
          cards={cards}
        />
      ))}
    </div>
  );
};

export default PendingActivities;
