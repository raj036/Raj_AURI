import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const leaveData = [
  {
    leaveid: "LEAVE001",
    technicianname: "John Doe",
    leavetype: "Casual Leave",
    startdate: "01/03/2025",
    enddate: "03/03/2025",
    status: "Approved",
    approvedby: "Ajay Shinde",
  },
  {
    leaveid: "LEAVE002",
    technicianname: "Jane Smith",
    leavetype: "Sick Leave",
    startdate: "05/03/2025",
    enddate: "06/03/2025",
    status: "Pending",
    approvedby: "Aalok Sharma",
  },
  {
    leaveid: "LEAVE003",
    technicianname: "Robert Brown",
    leavetype: "Earned Leave",
    startdate: "10/03/2025",
    enddate: "12/03/2025",
    status: "Rejected",
    approvedby: "Ajay Shinde",
  },
  {
    leaveid: "LEAVE004",
    technicianname: "Emily Johnson",
    leavetype: "Casual Leave",
    startdate: "15/03/2025",
    enddate: "16/03/2025",
    status: "Approved",
    approvedby: "Aalok Sharma",
  },
  {
    leaveid: "LEAVE005",
    technicianname: "Michael Lee",
    leavetype: "Sick Leave",
    startdate: "20/03/2025",
    enddate: "21/03/2025",
    status: "Pending",
    approvedby: "Ajay Shinde",
  },
  {
    leaveid: "LEAVE006",
    technicianname: "Sophia Patel",
    leavetype: "Casual Leave",
    startdate: "22/03/2025",
    enddate: "23/03/2025",
    status: "Approved",
    approvedby: "Aalok Sharma",
  },
  {
    leaveid: "LEAVE007",
    technicianname: "David Kim",
    leavetype: "Earned Leave",
    startdate: "25/03/2025",
    enddate: "27/03/2025",
    status: "Pending",
    approvedby: "Ajay Shinde",
  },
  {
    leaveid: "LEAVE008",
    technicianname: "Alice Wong",
    leavetype: "Sick Leave",
    startdate: "28/03/2025",
    enddate: "29/03/2025",
    status: "Rejected",
    approvedby: "Aalok Sharma",
  },
];



const columns = [
  { header: "Leave ID", accessor: "leaveid" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Leave Type", accessor: "leavetype" },
  { header: "Start Date", accessor: "startdate" },
  { header: "End Date", accessor: "enddate" },
  { header: "Status", accessor: "status" },
  { header: "Approved By", accessor: "approvedby" },
    
];
const LeaveManagement = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenMenu(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpload = () => {
    console.log("Uploading file...");
    setOpenDialog(false);
  };

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
const filteredData = useMemo(() => {
  return leaveData.filter((row) =>
    [row.leaveid, row.technicianname, row.leavetype, row.status, row.approvedby]
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
          title="Leave Management"
          subtitle="Add edit and manage your Leave. "
          breadcrumb="Leave"
        
        />

        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            showCheckbox={false}
            showTransferAction={false}
            showActions={false}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resetSelectionOnFilter // ✅ handle checkbox reset in DataTable internally
          />
        </div>
      </div>
    </Layout>
  );
};

export default LeaveManagement;
