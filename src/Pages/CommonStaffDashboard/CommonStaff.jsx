import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import helpicon from "./../Inventory/Helpicon.svg";

import ActionCard from "../../Components/Company-Dashboard/ActionCard";
import SalesTaskCard from "../../Components/Sales-Dashboard/SalesTaskCard";
import AttendanceTracker from "../../Components/CommonStaff/AttendanceTracker";
import LeaveManagement from "../../Components/CommonStaff/LeaveManagement";
import TaskSection from "../../Components/CommonStaff/TodayTask";
import AlertsSection from "../../Components/CommonStaff/AlertSection";

const technicians = [
  {
    technicianId: "TECH001",
    name: "Ravi Kumar",
    email: "suraj@gmail.com",
    phone: "+91 9876543210",
    category: "Electrical",
    designation: "Senior Technician",
    status: "Active",
    createddate: "2025-08-01",
    updateddate: "2025-08-10",
  },
  {
    technicianId: "TECH002",
    name: "Anita Sharma",
    email: "suraj@gmail.com",
    phone: "+91 9123456780",
    category: "Mechanical",
    designation: "Junior Technician",
    status: "Inactive",
    createddate: "2025-07-15",
    updateddate: "2025-07-25",
  },
  {
    technicianId: "TECH003",
    name: "Suresh Patel",
    email: "priya.patel@yahoo.com",
    phone: "+91 9988776655",
    category: "Electronics",
    designation: "Technician",
    status: "Active",
    createddate: "2025-06-20",
    updateddate: "2025-06-28",
  },
  {
    technicianId: "TECH004",
    name: "Priya Verma",
    email: "suraj@gmail.com",
    phone: "+91 9876501234",
    category: "IT Support",
    designation: "Senior Technician",
    status: "Active",
    createddate: "2025-05-30",
    updateddate: "2025-06-05",
  },
  {
    technicianId: "TECH005",
    name: "Arjun Singh",
    email: "suraj@gmail.com",
    phone: "+91 9765432109",
    category: "Plumbing",
    designation: "Technician",
    status: "Inactive",
    createddate: "2025-04-10",
    updateddate: "2025-04-15",
  },
];

const columns = [
  { header: "Technician ID", accessor: "technicianId" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  {
    header: (
      <span>
        Category
        <img
          src={helpicon}
          alt="help"
          style={{
            marginLeft: 6,
            verticalAlign: "middle",
          }}
        />
      </span>
    ),
    accessor: "category",
  },
  {
    header: (
      <span>
        Designation
        <img
          src={helpicon}
          alt="help"
          style={{
            marginLeft: 6,
            verticalAlign: "middle",
          }}
        />
      </span>
    ),
    accessor: "designation",
  },
  { header: "Status", accessor: "status" },
  { header: "Created Date", accessor: "createddate" },
  { header: "Updated Date", accessor: "createddate" },
];
const CommonStaff = () => {
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
    if (!debouncedQuery) return technicians; // show all if empty

    return technicians.filter((tax) =>
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
        <ActionCard />

        {/* Tasks */}
        <SalesTaskCard />

        {/* Attendance Tracker */}
        <AttendanceTracker />

        {/* Leave Management */}
        <LeaveManagement />

        {/* Todays Task */}
        <TaskSection />

        {/* Alert section */}
        <AlertsSection />
      </div>
    </Layout>
  );
};

export default CommonStaff;
