import React, { useState, useMemo, useEffect } from "react";
import "./PDP.css";
import Tabs from "../../Components/Tabs";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DataTable from "../../Components/DataTable";

import Delete from "../Inventory/Delete.jsx";

const PDP = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showDelete, setShowDelete] = useState(false);

  const tabs = [
    "General Information",
    "Stock Levels",
    "Stock Transfer Logs",
    "Activity Logs",
  ];

  const product = {
    name: "Indoor Pest Control Spray",
    price: "₹ 2500",
    brand: "Pesto",
    sku: "PROD-001",
    hsn: "3808",
    image:
      "https://img6.hkrtcdn.com/39694/prd_3969395-MuscleBlaze-Whey-Gold-100-Whey-Protein-Isolate-4.4-lb-Gourmet-Vanilla_o.jpg",
    details: [
      { label: "Product Name", value: "Indoor Pest Control Spray" },
      { label: "SKU / ID", value: "PROD-001" },
      { label: "HSN Code", value: "3808" },
      { label: "Unit Type", value: "Bottle" },
      { label: "Category", value: "Chemicals" },
      { label: "Tax Rate", value: "12%" },
      { label: "Status", value: "Active" },
      { label: "Created", value: "05 May 2024" },
      { label: "Last Updated", value: "06 Aug 2025" },
    ],
  };

  const logs = [
    {
      timestamp: "26/03/2025, 03:30 PM",
      action: "Stock Added",
      quantity: "+120",
      performed: "Suraj Sharma (Technician)",
    },
    {
      timestamp: "24/08/2025, 08:10 PM",
      action: "Stock Updated",
      quantity: "-30",
      performed: "Suraj Sharma (Sales)",
    },
    {
      timestamp: "15/05/2025, 06:45 AM",
      action: "Product Discontinued",
      quantity: "N/A",
      performed: "Suraj Sharma (Marketing)",
    },
    {
      timestamp: "10/07/2025, 01:15 PM",
      action: "Stock Transfer",
      quantity: "-50",
      performed: "Suraj Sharma (Technician)",
    },
    {
      timestamp: "18/08/2025, 09:00 AM",
      action: "Stock Restored",
      quantity: "+75",
      performed: "Suraj Sharma (Sales)",
    },
    {
      timestamp: "05/09/2025, 11:20 AM",
      action: "Stock Adjustment",
      quantity: "-10",
      performed: "Suraj Sharma (Technician)",
    },
    {
      timestamp: "05/09/2025, 11:20 AM",
      action: "Stock Adjustment",
      quantity: "-10",
      performed: "Suraj Sharma (Technician)",
    },
    {
      timestamp: "05/09/2025, 11:20 AM",
      action: "Stock Adjustment",
      quantity: "-10",
      performed: "Suraj Sharma (Technician)",
    },
    {
      timestamp: "05/09/2025, 11:20 AM",
      action: "Stock Adjustment",
      quantity: "-10",
      performed: "Suraj Sharma (Technician)",
    },
  ];

  const log = [
    {
      date: "06-Aug-2025",
      frombranch: "Jp Nagar",
      tobranch: "Marathahalli",
      quantity: "250",
      variant: "Pouch",
      status: "Approved",
      initiatedby: "Suraj Kumar",
      approvedby: "Tushar Gupta",
    },
    {
      date: "29-Jul-2025",
      frombranch: "Kormangala",
      tobranch: "Jayanagar",
      quantity: "250",
      variant: "Bottle",
      status: "Pending",
      initiatedby: "Ajit Shah",
      approvedby: "Ravi S.",
    },
    {
      date: "29-May-2025",
      frombranch: "HSR Layout",
      tobranch: "Koramangala",
      quantity: "250",
      variant: "Box",
      status: "Rejected",
      initiatedby: "Priya Singh",
      approvedby: "Priya K.",
    },
    {
      date: "15-Mar-2024",
      frombranch: "Indiranagar",
      tobranch: "Indirangar",
      quantity: "250",
      variant: "Tube",
      status: "Archived",
      initiatedby: "Rohgan Mehra",
      approvedby: "Aditya Mehta",
    },
    {
      date: "21-Nov-2023",
      frombranch: "Whitefield",
      tobranch: "HSR Layout",
      quantity: "250",
      variant: "Bag",
      status: "Pending",
      initiatedby: "Anjali Sharma",
      approvedby: "Sneha Desai",
    },
    {
      date: "10-Sep-2023",
      frombranch: "Marathahalli",
      tobranch: "Whitefield",
      quantity: "250",
      variant: "Bottle",
      status: "On Hold",
      initiatedby: "Vikram lyer",
      approvedby: "Vikram Rao",
    },
    {
      date: "03-Feb-2023",
      frombranch: "Jayanagar",
      tobranch: "Malleshwaram",
      quantity: "250",
      variant: "Tueb",
      status: "Pending",
      initiatedby: "Aisha Khan",
      approvedby: "Ananya Joshi",
    },
    {
      date: "18-Oct-2021",
      frombranch: "Electronic City",
      tobranch: "Banashankari",
      quantity: "250",
      variant: "Pouch",
      status: "Pending",
      initiatedby: "Manpreet Singh",
      approvedby: "Rohan Patel",
    },
  ];
  const column = [
    { header: "Date", accessor: "date" },
    { header: "From Branch", accessor: "frombranch" },
    { header: "To Branch", accessor: "tobranch" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Variant", accessor: "variant" },
    { header: "Status", accessor: "status" },
    { header: "Initiated By", accessor: "initiatedby" },
    { header: "Approved By", accessor: "approvedby" },
  ];

  const columns = [
    { header: "Timestamp", accessor: "timestamp" },
    { header: "Action", accessor: "action" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Performed By", accessor: "performed" },
  ];
  const [transferSearch, setTransferSearch] = useState("");
  const [debouncedTransferSearch, setDebouncedTransferSearch] = useState("");

  const [activitySearch, setActivitySearch] = useState("");
  const [debouncedActivitySearch, setDebouncedActivitySearch] = useState("");

  // Debounce effect
  useEffect(() => {
    const id = setTimeout(() => setDebouncedTransferSearch(transferSearch), 300);
    return () => clearTimeout(id);
  }, [transferSearch]);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedActivitySearch(activitySearch), 300);
    return () => clearTimeout(id);
  }, [activitySearch]);

  // 🔍 Filter Transfer Logs
  const filteredTransferLogs = useMemo(() => {
    return log.filter((row) =>
      Object.values(row)
        .filter(Boolean)
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedTransferSearch.toLowerCase())
        )
    );
  }, [debouncedTransferSearch]);

  // 🔍 Filter Activity Logs
  const filteredActivityLogs = useMemo(() => {
    return logs.filter((row) =>
      Object.values(row)
        .filter(Boolean)
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedActivitySearch.toLowerCase())
        )
    );
  }, [debouncedActivitySearch])
  return (
    <Layout>
      <button className="back-button">
        <ArrowBackIosIcon size={18} />
        Back
      </button>
      <div className="pdp-container">
        <PageHeader
          type="pdp"
          product={{
            image:
              "https://img6.hkrtcdn.com/39694/prd_3969395-MuscleBlaze-Whey-Gold-100-Whey-Protein-Isolate-4.4-lb-Gourmet-Vanilla_o.jpg",
            title: "Indoor Pest Control Spray",
            price: 2500,
            brand: "Pesto",
            sku: "PROD-001",
            hsn: "3808",
          }}
        />

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="pdp-content">
          {activeTab === 0 && (
            <div className="info-card">
              {product.details.map((item, idx) => (
                <div className="info-row" key={idx}>
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 1 && <div>📦 Stock Levels Content</div>}
          {activeTab === 2 && (
            <div className="transfer-log" style={{ maxHeight: "30vh" }}>
             <DataTable
  columns={column}
  data={filteredTransferLogs}
  showTransferAction={false}
  showCheckbox={false}
  showActions={true}
  rowsPerPage={5}
  searchValue={transferSearch}
  onSearchChange={setTransferSearch}
/>
              {showDelete && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                  }}
                >
                  <Delete onClose={() => setShowDelete(false)} />
                </div>
              )}
            </div>
          )}
          {activeTab === 3 && (
            <div className="activity-logs" style={{ maxHeight: "40vh" }}>
            <DataTable
  columns={columns}
  data={filteredActivityLogs}
  showTransferAction={false}
  showCheckbox={false}
  showActions={false}
  rowsPerPage={6}
  searchValue={activitySearch}
  onSearchChange={setActivitySearch}
/>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PDP;
