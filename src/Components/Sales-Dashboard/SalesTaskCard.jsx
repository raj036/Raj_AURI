import React from "react";
import data from "../../data/dashboardData.json"; // path to your JSON file
import "bootstrap/dist/css/bootstrap.min.css";
import "../Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faFileLines,
  faClipboard,
  faMessage,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChartBar,
  faFileAlt,
  faCircleExclamation,
  faDollarSign,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const TaskCard = () => {
  const { salesTaskCard: taskData } = data;

  // const getTaskIcon = (title) => {
  //   if (title.includes("Approval")) return "bi-check2-square"; // for approval tasks
  //   if (title.includes("Alert")) return "bi-exclamation-triangle-fill"; // for alerts
  //   if (title.includes("Overdue")) return "bi-clock-fill"; // for overdue items
  //   if (title.includes("Summary")) return "bi-list-check"; // for summaries
  //   if (title.includes("Feedback")) return "bi-chat-dots"; // for feedback
  //   if (title.includes("Attendance")) return "bi-people-fill"; // for attendance review
  //   if (title.includes("Credit")) return "bi-credit-card"; // for credit limit
  //   if (title.includes("License") || title.includes("Tax"))
  //     return "bi-journal-text"; // for license/tax
  //   return "bi-file-earmark-text"; // default icon
  // };

  const getIconStyleClass = (title) => {
    if (
      title.includes("Quotation") ||
      title.includes("Purchase") ||
      title.includes("Expense")
    )
      return "action-icon";
    if (
      title.includes("Summary") ||
      title.includes("Report") ||
      title.includes("Feedback") ||
      title.includes("Attendance") ||
      title.includes("Overdue")
    )
      return "reminder-icon";
    if (title.includes("Credit") || title.includes("Tax"))
      return "critical-icon";
    return "default-icon"; // default style
  };

  const getFontAwesomeIcon = (title) => {
    if (title.includes("Quotation")) return faFileLines;

    if (title.includes("Payment")) return faDollarSign;
    if (title.includes("Summary")) return faClipboard;
    if (title.includes("Purchase")) return faShoppingCart;
    if (title.includes("Attendance")) return faCalendar;
    if (title.includes("Feedback")) return faMessage;
    if (title.includes("Credit")) return faCreditCard;
    if (title.includes("License") || title.includes("Tax"))
      return faCircleExclamation;
    if (title.includes("Report")) return faChartBar;
    return faFileAlt; // default
  };

  return (
    <div className="card p-4 my-4 rounded-4">
      <h4 className="mb-3 fw-bold">Today's Task Section</h4>
      <div className="card p-4">
        <div className="d-flex mb-4">
          <span class="material-symbols-outlined text-muted me-2 ">docs</span>
        <h5 className="fw-bold">Quotation approval</h5>
        </div>
        <div className="row">
          {taskData.sections.map((section, idx) => (
            <div key={idx} className="col-lg-4 col-md-6 col-12 mb-3">
              <div className="card h-100 p-3 shadow-sm rounded-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="card-title mb-0">{section.title}</h6>
                  <span className="rounded-2 px-2 text-white bg-primary">
                    {section.completed}
                  </span>
                </div>
                <div
                  className=""
                  style={{ maxHeight: "500px", overflowY: "auto" }}
                >
                  {section.tasks.map((task, tIdx) => (
                    <div
                      key={tIdx}
                      className="card p-3 mb-3 border-bottom pb-2"
                    >
                      <div className="d-flex mb-2">
                        {/* <i
                            className={`bi ${getTaskIcon(
                              task.title
                            )} ${getIconStyleClass(
                              task.title
                            )} p-1 rounded me-2`}
                            style={{
                              fontSize: "1.2rem",
                              minWidth: "2rem",
                              textAlign: "center",
                            }}
                          ></i>{" "} */}
                        {/* example icon */}
                        <div
                          className={`icon-wrapper1 me-2 p-2 rounded-2 ${getIconStyleClass(
                            task.title
                          )}`}
                        >
                          <FontAwesomeIcon
                            icon={getFontAwesomeIcon(task.title)}
                            style={{
                              fontSize: "1.2rem",
                            }}
                          />
                        </div>
                        <div>
                          <h6 className="mb-0">{task.title}</h6>
                          <div className="mb-2">
                            {task.roles.map((role, rIdx) => (
                              <span
                                key={rIdx}
                                className="border p-1 rounded-3 badge me-1 fw-bold"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="small text-muted">{task.description}</p>
                      <div className="d-flex gap-2 flex-wrap">
                        {task.buttons.map((btn, bIdx) => (
                          <button
                            key={bIdx}
                            className={`btn border fw-bold text-dark flex-fill flex-grow-1 ${
                              btn === "Approve"
                                ? "btn-primary text-white"
                                : btn === "Resolve Now"
                                ? "btnDanger text-white"
                                : btn === "View Report" || btn === "Follow Up"
                                ? "reminder text-white"
                                : "btn-outline-secondary"
                            }`}
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-muted fw-bold">View all</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
