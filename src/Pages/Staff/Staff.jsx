import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../Components/Button";

const staffData = [
  {
    staffid: "STF001",
    taxname: "Rahul Sharma",
    taxtype: "rahul.sharma@example.com",
    contactnumber: "+91 9876543210",
    designation: "Branch Manager",
    status: "Active",
    branch: "SBI",
  },
  {
    staffid: "STF002",
    taxname: "Priya Verma",
    taxtype: "priya.verma@example.com",
    contactnumber: "+91 8765432109",
    designation: "Cashier",
    status: "Inactive",
    branch: "SBI",
  },
  {
    staffid: "STF003",
    taxname: "Amit Patel",
    taxtype: "amit.patel@example.com",
    contactnumber: "+91 7654321098",
    designation: "Customer Support",
    status: "Active",
    branch: "SBI",
  },
  {
    staffid: "STF004",
    taxname: "Sneha Iyer",
    taxtype: "sneha.iyer@example.com",
    contactnumber: "+91 6543210987",
    designation: "Accountant",
    status: "Active",
    branch: "ICICI",
  },
  {
    staffid: "STF005",
    taxname: "Vikram Singh",
    taxtype: "vikram.singh@example.com",
    contactnumber: "+91 9123456780",
    designation: "Sales Executive",
    status: "Inactive",
    branch: "HDFC",
  },
  {
    staffid: "STF005",
    taxname: "Vikram Singh",
    taxtype: "vikram.singh@example.com",
    contactnumber: "+91 9123456780",
    designation: "Sales Executive",
    status: "Inactive",
    branch: "SBI",
  },
  {
    staffid: "STF005",
    taxname: "Vikram Singh",
    taxtype: "vikram.singh@example.com",
    contactnumber: "+91 9123456780",
    designation: "Sales Executive",
    status: "Inactive",
    branch: "HDFC",
  },
  {
    staffid: "STF005",
    taxname: "Vikram Singh",
    taxtype: "vikram.singh@example.com",
    contactnumber: "+91 9123456780",
    designation: "Sales Executive",
    status: "Inactive",
    branch: "ICICI",
  },
];

const columns = [
  { header: "Staff ID", accessor: "staffid" },
  { header: "Staff Name", accessor: "taxname" },
  { header: "Email ID", accessor: "taxtype" },
  { header: "Contact Number", accessor: "contactnumber" },
  { header: "Designation", accessor: "designation" },
  { header: "Staff Status", accessor: "status" },
  { header: "Branch", accessor: "branch" },
];

const Staff = () => {
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
    if (!debouncedQuery) return staffData; // show all if empty

    return staffData.filter((staff) =>
      Object.values(staff)
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
          title="All Staff"
          subtitle="Add, edit, and manage staff members"
          breadcrumb="Staff"
          actions={
            <PrimaryButton
              label="+ Add Staff"
              onClick={() => navigate("/add-staff")}
            />
          }
        />

        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            showCheckbox={false}
            showTransferAction={false}
            showActions={true}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resetSelectionOnFilter
            onEdit={(row) =>
              navigate("/add-staff", { state: { rowData: row } })
            }
            deleteTitle="Delete Staff"
            deleteParagraph="Are you sure you want to delete this staff member? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Staff;
