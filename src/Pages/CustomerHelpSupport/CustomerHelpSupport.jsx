import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const supportData = [
  {
    supportid: "SUP001",
    technicianname: "John Doe",
    attendancelocation: "Mumbai",
    taskname: "Install Router",
    customername: "ABC Corp",
    customercontact: "9876543210",
    issuedescription: "Router not connecting to network",
    priority: "High",
    status: "Resolved",
    createdat: "01/09/2025",
    resolvedat: "02/09/2025",
  },
  {
    supportid: "SUP002",
    technicianname: "Jane Smith",
    attendancelocation: "Pune",
    taskname: "Network Setup",
    customername: "XYZ Ltd",
    customercontact: "9123456780",
    issuedescription: "Network slow, frequent drops",
    priority: "Medium",
    status: "Pending",
    createdat: "03/09/2025",
    resolvedat: "-",
  },
  {
    supportid: "SUP003",
    technicianname: "Robert Brown",
    attendancelocation: "Bangalore",
    taskname: "System Maintenance",
    customername: "LMN Pvt Ltd",
    customercontact: "9988776655",
    issuedescription: "PC freezing issue",
    priority: "Low",
    status: "Resolved",
    createdat: "04/09/2025",
    resolvedat: "05/09/2025",
  },
  {
    supportid: "SUP004",
    technicianname: "Emily Johnson",
    attendancelocation: "Hyderabad",
    taskname: "Software Installation",
    customername: "Tech Solutions",
    customercontact: "9871234567",
    issuedescription: "Error during software install",
    priority: "High",
    status: "Pending",
    createdat: "06/09/2025",
    resolvedat: "-",
  },
  {
    supportid: "SUP005",
    technicianname: "Michael Lee",
    attendancelocation: "Chennai",
    taskname: "Hardware Replacement",
    customername: "Alpha Inc",
    customercontact: "9123344556",
    issuedescription: "Hard drive failure",
    priority: "High",
    status: "Resolved",
    createdat: "07/09/2025",
    resolvedat: "08/09/2025",
  },
  {
    supportid: "SUP006",
    technicianname: "Sophia Patel",
    attendancelocation: "Delhi",
    taskname: "Network Troubleshoot",
    customername: "Beta Solutions",
    customercontact: "9100001122",
    issuedescription: "Frequent disconnections",
    priority: "Medium",
    status: "Pending",
    createdat: "08/09/2025",
    resolvedat: "-",
  },
  {
    supportid: "SUP007",
    technicianname: "David Kim",
    attendancelocation: "Kolkata",
    taskname: "System Upgrade",
    customername: "Gamma Tech",
    customercontact: "9112233445",
    issuedescription: "OS upgrade failed",
    priority: "High",
    status: "Resolved",
    createdat: "09/09/2025",
    resolvedat: "10/09/2025",
  },
  {
    supportid: "SUP008",
    technicianname: "Alice Wong",
    attendancelocation: "Jaipur",
    taskname: "Printer Setup",
    customername: "Delta Corp",
    customercontact: "9123450987",
    issuedescription: "Printer not detecting",
    priority: "Low",
    status: "Pending",
    createdat: "10/09/2025",
    resolvedat: "-",
  },
];

const columns = [
  { header: "Support ID", accessor: "supportid" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Attendance Location", accessor: "attendancelocation" },
  { header: "Task Name", accessor: "taskname" },
  { header: "Customer Name", accessor: "customername" },
  { header: "Customer Contact", accessor: "customercontact" },
  { header: "Issue Description", accessor: "issuedescription" },
    { header: "Priority", accessor: "priority" },
        { header: "Status", accessor: "status" },
     { header: "Created At", accessor: "createdat" },
          { header: "Resolved At", accessor: "resolvedat" },
];
const CustomerSupport = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
   const [tasks, setTasks] = useState([]); // ✅ Store tasks from API
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await api.get("/tasks");
        setTasks(res.data || []);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

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
  return supportData.filter((row) =>
    [
      row.supportid,
      row.technicianname,
      row.attendancelocation,
      row.taskname,
      row.customername,
      row.customercontact,
      row.issuedescription,
      row.priority,
      row.status,
    ]
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
          title="Customer Help Support"
          subtitle="Add edit and manage your Customer Help Support.  "
          breadcrumb="Customer Help Support"
          actions={
                    <PrimaryButton
                      label="+ Create Ticket"
                      onClick={() => navigate("/create-customer-support")}
                    />
                  }
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

export default CustomerSupport;
