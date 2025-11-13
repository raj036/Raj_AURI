// src/Components/ViewDetailsDialog.jsx
import React from "react";
import "./ViewDetailsDialouge.css";

const ViewDetailsDialog = ({ open, onClose, customer }) => {
  if (!open || !customer) return null;

  const history = [
    { year: 2023, plan: "Basic Plan", amount: "₹600", users: "3 Techs / 1 Mgr" },
    { year: 2024, plan: "Pro Plan", amount: "₹850", users: "4 Techs / 2 Mgrs" },
    { year: 2025, plan: "Pro Plan", amount: "₹700 (YTD)", users: "5 Techs / 3 Mgrs" },
  ];

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        {/* Header */}
        <div className="dialog-header">
          <div>
            <h2>{customer.customername}</h2>
            <div className="dialog-meta">
              <div>
                <p>Account ID</p>
                <strong>{customer.accountid}</strong>
              </div>
              <div>
                <p>Email</p>
                <strong>{customer.customeremail}</strong>
              </div>
              <div>
                <p>Status</p>
                <span
                  className={`status-badge ${customer.status.toLowerCase()}`}
                >
                  {customer.status}
                </span>
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* History Table */}
        <div className="dialog-section">
          <h3>History Table: Year-Wise</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Subscription</th>
                <th>Amount Paid</th>
                <th>Users</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.year}>
                  <td>{item.year}</td>
                  <td>{item.plan}</td>
                  <td>{item.amount}</td>
                  <td>{item.users}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="summary-section">
          <h3>Summary</h3>
          <div className="summary-cards">
            <div className="summary-card">
              <p>Total Lifetime Value</p>
              <h4>₹2,150</h4>
            </div>
            <div className="summary-card">
              <p>Current Users</p>
              <h4>{customer.users}</h4>
            </div>
            <div className="summary-card">
              <p>Member Since</p>
              <h4>{customer.startdate}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsDialog;
