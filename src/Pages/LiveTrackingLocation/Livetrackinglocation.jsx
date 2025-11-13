import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const tracking = [
  {
    technicianId: "TECH001",
    technicianname: "Ravi Kumar",
    attendancelocation: "Mumbai Warehouse",
    taskname: "Inspect Electrical Panel",
    timestamp: "2025-09-09 10:30",
    billingaddress: "123, MG Road, Mumbai",
    status: "Online",
  },
  {
    technicianId: "TECH002",
    technicianname: "Anita Sharma",
    attendancelocation: "Delhi Office",
    taskname: "Repair HVAC",
    timestamp: "2025-09-09 11:15",
    billingaddress: "45, Connaught Place, Delhi",
    status: "Offline",
  },
  {
    technicianId: "TECH003",
    technicianname: "Suresh Patel",
    attendancelocation: "Ahmedabad Site",
    taskname: "Install Electronics Panel",
    timestamp: "2025-09-09 09:50",
    billingaddress: "78, Ashram Road, Ahmedabad",
    status: "Online",
  },
  {
    technicianId: "TECH004",
    technicianname: "Priya Verma",
    attendancelocation: "Bangalore Warehouse",
    taskname: "Network Setup",
    timestamp: "2025-09-09 12:00",
    billingaddress: "12, MG Road, Bangalore",
    status: "Online",
  },
  {
    technicianId: "TECH005",
    technicianname: "Arjun Singh",
    attendancelocation: "Chennai Office",
    taskname: "Plumbing Maintenance",
    timestamp: "2025-09-09 13:30",
    billingaddress: "67, Anna Salai, Chennai",
    status: "Offline",
  },
];

const columns = [
  { header: "Location ID", accessor: "technicianId" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Attendace Location", accessor: "attendancelocation" },
  { header: "Task Name", accessor: "taskname" },
  { header: "Time Stamp", accessor: "timestamp" },
  { header: "Billing Address", accessor: "billingaddress" },
  { header: "Status", accessor: "status" },
];
const LiveTrackinglocations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return tracking; // show all if empty

    return tracking.filter((tax) =>
      Object.values(tax)
        .filter(Boolean)
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Live Tracking Location (GPS)"
          subtitle="Add edit and manage your Live Tracking Location (GPS). "
          breadcrumb="Live Tracking Location (GPS)"
        />

        <div className="table-container" style={{ overflowX: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredData}
            showCheckbox={false}
            showTransferAction={false}
            showActions={false}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resetSelectionOnFilter
          />
        </div>
      </div>
    </Layout>
  );
};

export default LiveTrackinglocations;
