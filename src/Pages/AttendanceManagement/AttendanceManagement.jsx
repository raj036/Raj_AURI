import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const vendors = [
  {
    attendanceid: "560096",
    technicianname: "Vipul Sharma",
    tasktitle: "Indoor Pest Control Spray",
    checkintime: "3:30pm 06-Aug-2025",
    checkouttime: "4:50pm 06-Aug-2025",
    status: "Present",
    workinghours: "8:50:42",
  },
  {
    attendanceid: "102384",
    technicianname: "Jenny agarval",
    tasktitle: "Home Washing",
    checkintime: "6:30pm 29-Jul-2025",
    checkouttime: "10:30pm 29-Jul-2025",
    status: "Leave",
    workinghours: "10:13:05",
  },
  {
    attendanceid: "560096",
    technicianname: "Vipul Sharma",
    tasktitle: "Outdoor Mosquito Repellent",
    checkintime: "3:30pm 06-Aug-2025",
    checkouttime: "4:50pm 06-Aug-2025",
    status: "Half Day",
    workinghours: "8:50:42",
  },
  {
    attendanceid: "102384",
    technicianname: "Jenny agarval",
    tasktitle: "Carpet Stain Remover",
    checkintime: "6:30pm 29-Jul-2025",
    checkouttime: "10:30pm 29-Jul-2025",
    status: "Leave",
    workinghours: "10:13:05",
  },
  {
    attendanceid: "560096",
    technicianname: "Vipul Sharma",
    tasktitle: "Pet Odor Eliminator",
    checkintime: "3:30pm 06-Aug-2025",
    checkouttime: "4:50pm 06-Aug-2025",
    status: "Absent",
    workinghours: "8:50:42",
  },
  {
    attendanceid: "102384",
    technicianname: "Jenny agarval",
    tasktitle: "Mold and Mildew Cleaner",
    checkintime: "6:30pm 29-Jul-2025",
    checkouttime: "10:30pm 29-Jul-2025",
    status: "Half Day",
    workinghours: "10:13:05",
  },
  {
    attendanceid: "560096",
    technicianname: "Vipul Sharma",
    tasktitle: "10:13:05",
    checkintime: "3:30pm 06-Aug-2025",
    checkouttime: "4:50pm 06-Aug-2025",
    status: "Present",
    workinghours: "8:50:42",
  },
  {
    attendanceid: "102384",
    technicianname: "Jenny agarval",
    tasktitle: "Laundry Detergent",
    checkintime: "6:30pm 29-Jul-2025",
    checkouttime: "10:30pm 29-Jul-2025",
    status: "Absent",
    workinghours: "10:13:05",
  },
];

const columns = [
  { header: "Attendance ID", accessor: "attendanceid" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Task Title", accessor: "tasktitle" },
  { header: "Check-In Time", accessor: "checkintime" },
  { header: "Check-Out Time", accessor: "checkouttime" },
  { header: "Status", accessor: "status" },
  { header: "Working Hours", accessor: "workinghours" },
];
const AttendaceManagement = () => {
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
    if (!debouncedQuery) return vendors; // show all if empty

    return vendors.filter((vendor) =>
      Object.values(vendor)
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
          title="Attendance Management"
          subtitle="Add edit and manage your Attendance."
          breadcrumb="Attendance"
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
            resetSelectionOnFilter
            onEdit={(row) =>
              navigate("/add-vendors", { state: { rowData: row } })
            }
          />
        </div>
      </div>
    </Layout>
  );
};
export default AttendaceManagement;
