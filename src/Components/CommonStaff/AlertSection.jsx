import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { WarningAmber, ErrorOutline } from "@mui/icons-material";

const AlertsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const alerts = [
    {
      id: 1,
      title: "Pending approvals",
      date: "1 Day ago",
      count: 4,
      color: "danger",
      data: [
        {
          invoice: "INV-2024-001",
          customer: "Rajaji Nagar",
          amount: "₹1,03,200",
          dueDate: "03-09-2025",
          status: { text: "Overdue (5d)", color: "danger" },
        },
        {
          invoice: "INV-2024-002",
          customer: "Belendur",
          amount: "₹5,01,570",
          dueDate: "03-10-2025",
          status: { text: "Overdue (20d)", color: "danger" },
        },
        {
          invoice: "INV-2024-003",
          customer: "Vega City",
          amount: "₹58,200",
          dueDate: "03-11-2025",
          status: { text: "Due in 2 days", color: "warning" },
        },
        {
          invoice: "INV-2024-004",
          customer: "Kormangala",
          amount: "₹4,56,789",
          dueDate: "03-12-2025",
          status: { text: "Pending", color: "secondary" },
        },
      ],
    },
    {
      id: 2,
      title: "Overdue follow-ups",
      date: "2 Days ago",
      count: 1,
      color: "warning",
      data: [],
    },
    {
      id: 3,
      title: "Certifications",
      date: "3 Days ago",
      count: 2,
      color: "danger",
      data: [],
    },
  ];

  const handleViewAll = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedAlert(null);
  };

  return (
    <div
      className=" p-4  rounded-4 mb-4 border"
      style={{ backgroundColor: "#fff" }}
    >
      <h3 className="mb-3" style={{ fontWeight: "600" }}>
        Alerts Section
      </h3>

      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="d-flex justify-content-between align-items-center border rounded p-3 mb-2 shadow-sm"
        >
          <div className="d-flex align-items-center">
            <span
              className={`badge bg-${alert.color} rounded-circle me-2`}
              style={{
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {alert.color === "danger" ? (
                <ErrorOutline fontSize="small" />
              ) : (
                <WarningAmber fontSize="small" />
              )}
            </span>
            <div>
              <div className="fw-semibold">{alert.title}</div>
              <small className="text-muted">{alert.date}</small>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className={`badge bg-${alert.color} rounded-pill`}>
              {alert.count}
            </span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleViewAll(alert)}
            >
              View All
            </Button>
          </div>
        </div>
      ))}

      {/* Modal Popup */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAlert?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlert?.data && selectedAlert.data.length > 0 ? (
            <>
              <div className="d-flex justify-content-end mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control w-25"
                />
              </div>
              <Table hover responsive bordered>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAlert.data.map((row, i) => (
                    <tr key={i}>
                      <td>{row.invoice}</td>
                      <td>{row.customer}</td>
                      <td>{row.amount}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <span
                          className={`badge bg-${row.status.color} text-white`}
                        >
                          {row.status.text}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-dark"
                          size="sm"
                          className="me-2"
                        >
                          Review
                        </Button>
                        <Button variant="primary" size="sm">
                          Approve
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center">
                <Button variant="outline-secondary" size="sm">
                  Previous
                </Button>
                <div>
                  <Button variant="light" size="sm" className="me-1">
                    1
                  </Button>
                  <Button variant="light" size="sm" className="me-1">
                    2
                  </Button>
                  <Button variant="light" size="sm">
                    Next →
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted text-center mb-0">
              No data available for this alert.
            </p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AlertsSection;
