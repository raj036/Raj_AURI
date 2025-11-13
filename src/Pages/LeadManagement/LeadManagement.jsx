import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../Utils/api";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import Swal from "sweetalert2";

const taxes = [
  {
    taxid: "TAX001",
    taxname: "Goods and Services Tax (GST)",
    taxtype: "Indirect",
    taxrate: "18%",
    createdat: "2025-08-01",
    inventories: "All Products",
  },
  {
    taxid: "TAX002",
    taxname: "Value Added Tax (VAT)",
    taxtype: "Indirect",
    taxrate: "12%",
    createdat: "2025-07-15",
    inventories: "Electronics, Clothing",
  },
  {
    taxid: "TAX003",
    taxname: "Corporate Income Tax",
    taxtype: "Direct",
    taxrate: "25%",
    createdat: "2025-06-20",
    inventories: "All Services",
  },
  {
    taxid: "TAX004",
    taxname: "Customs Duty",
    taxtype: "Indirect",
    taxrate: "10%",
    createdat: "2025-05-30",
    inventories: "Imported Goods",
  },
  {
    taxid: "TAX005",
    taxname: "Professional Tax",
    taxtype: "Direct",
    taxrate: "2%",
    createdat: "2025-04-10",
    inventories: "Salaried Employees",
  },
  {
    taxid: "TAX005",
    taxname: "Professional Tax",
    taxtype: "Direct",
    taxrate: "2%",
    createdat: "2025-04-10",
    inventories: "Salaried Employees",
  },
  {
    taxid: "TAX005",
    taxname: "Professional Tax",
    taxtype: "Direct",
    taxrate: "2%",
    createdat: "2025-04-10",
    inventories: "Salaried Employees",
  },
  {
    taxid: "TAX005",
    taxname: "Professional Tax",
    taxtype: "Direct",
    taxrate: "2%",
    createdat: "2025-04-10",
    inventories: "Salaried Employees",
  },
  {
    taxid: "TAX005",
    taxname: "Professional Tax",
    taxtype: "Direct",
    taxrate: "2%",
    createdat: "2025-04-10",
    inventories: "Salaried Employees",
  },
];

const columns = [
  { header: "Tax ID", accessor: "taxid" },
  { header: "Tax Name", accessor: "taxname" },
  { header: "Tax Type", accessor: "taxtype" },
  { header: "Tax Rate", accessor: "taxrate" },
  { header: "Created At", accessor: "createdat" },
  { header: "Inventories", accessor: "inventories" },
];
const LeadManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [attendanceData, setAttendanceData] = useState([]);
  const [month, setMonth] = useState("2025-11");

  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ read properly

  const [formData, setFormData] = useState({
    id: "",
    leadName: "",
    companyName: "",
    email: "",
    phone: "",
    source: "",
    typeOfLead: "",
    leadStatus: "",
    engagementScore: "",
    remarks: "",
    createdAt: "",
    updatedAt: "",
    joinedDate: "",
  });

  // ✅ Pre-fill if editing
  useEffect(() => {
    if (rowData) {
      setFormData({
         userid: rowData.userid || "",
        username: rowData.username || "",
        date: rowData.date || "",
        createddate: rowData.createddate || "",
        updateddate: rowData.updateddate || "",
        workinghours: rowData.workinghours || "",
        workingdays: rowData.workingdays || "",
        checkin: rowData.checkin || "",
        checkout: rowData.checkout || "",
        status: rowData.status || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

   
  
  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return taxes; // show all if empty

    return taxes.filter((tax) =>
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
          title="Lead"
          subtitle="Add, edit, and manage Lead"
          breadcrumb="Lead"
          actions={
            <PrimaryButton
              label="+ Add Lead"
              onClick={() => navigate("/add-lead")}
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
            onEdit={(row) => navigate("/add-lead", { state: { rowData: row } })}
            // onDelete={handleDelete}
            deleteTitle="Delete Follow Up"
            deleteParagraph="Are you sure you want to delete this Follow Up? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default LeadManagement;
