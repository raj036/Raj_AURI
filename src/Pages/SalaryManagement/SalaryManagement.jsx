import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const salaryData = [
  {
    salaryid: "SAL001",
    technicianname: "John Doe",
    salarymonth: "March 2025",
    overtime: 10,
    basesalary: "₹ 25,000",
    perfomancebonus: "₹ 2,000",
    salarydeductions: "₹ 500",
    finalsalary: "₹ 26,500",
  },
  {
    salaryid: "SAL002",
    technicianname: "Jane Smith",
    salarymonth: "March 2025",
    overtime: 5,
    basesalary: "₹ 22,000",
    perfomancebonus: "₹ 1,500",
    salarydeductions: "₹ 300",
    finalsalary: "₹ 23,200",
  },
  {
    salaryid: "SAL003",
    technicianname: "Robert Brown",
    salarymonth: "March 2025",
    overtime: 8,
    basesalary: "₹ 24,000",
    perfomancebonus: "₹ 1,800",
    salarydeductions: "₹ 400",
    finalsalary: "₹ 25,400",
  },
  {
    salaryid: "SAL004",
    technicianname: "Emily Johnson",
    salarymonth: "March 2025",
    overtime: 12,
    basesalary: "₹ 26,000",
    perfomancebonus: "₹ 2,500",
    salarydeductions: "₹ 600",
    finalsalary: "₹ 27,900",
  },
  {
    salaryid: "SAL005",
    technicianname: "Michael Lee",
    salarymonth: "March 2025",
    overtime: 6,
    basesalary: "₹ 23,000",
    perfomancebonus: "₹ 1,600",
    salarydeductions: "₹ 350",
    finalsalary: "₹ 24,650",
  },
  {
    salaryid: "SAL006",
    technicianname: "Michael Lee",
    salarymonth: "March 2025",
    overtime: 6,
    basesalary: "₹ 23,000",
    perfomancebonus: "₹ 1,600",
    salarydeductions: "₹ 350",
    finalsalary: "₹ 24,650",
  },
  {
    salaryid: "SAL007",
    technicianname: "Michael Lee",
    salarymonth: "March 2025",
    overtime: 6,
    basesalary: "₹ 23,000",
    perfomancebonus: "₹ 1,600",
    salarydeductions: "₹ 350",
    finalsalary: "₹ 24,650",
  },
  {
    salaryid: "SAL008",
    technicianname: "Michael Lee",
    salarymonth: "March 2025",
    overtime: 6,
    basesalary: "₹ 23,000",
    perfomancebonus: "₹ 1,600",
    salarydeductions: "₹ 350",
    finalsalary: "₹ 24,650",
  },
];


const columns = [
  { header: "Salry ID", accessor: "salaryid" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Salary Month", accessor: "salarymonth" },
  { header: "Over Time Hours", accessor: "overtime" },
  { header: "Base Salary", accessor: "basesalary" },
  { header: "Perfomance Bonus", accessor: "perfomancebonus" },
  { header: "Salary Deductions", accessor: "salarydeductions" },
    { header: "Final Salary", accessor: "finalsalary" },
];
const SalaryManagement = () => {
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
  return salaryData.filter((row) =>
    [row.technicianname, row.salarymonth, String(row.finalsalary), row.salaryid]
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
          title="Salary Management"
          subtitle="Add edit and manage your Salary. "
          breadcrumb="Salary "
        
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

export default SalaryManagement;
