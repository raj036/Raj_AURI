import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../Components/Button";
import { fetchCompanyInformation } from "../../Utils/apiServices";

const companyData = [
  {
    companyid: "CMP001",
    companyname: "TechNova Solutions Pvt. Ltd.",
    email: {
      name: "Rajesh Mehta",
      email: "info@technova.com",
    },
    createdon: "2023-03-15",
    subscription: "2023-03-20",
    expiry: "2024-03-20",
    location: "Mumbai, India",
    branches: 5,
    status: "Active",
  },
  {
    companyid: "CMP002",
    companyname: "FinEdge Banking Systems",
    email: {
      name: "Neha Gupta",
      email: "support@finedgebank.com",
    },
    createdon: "2022-08-10",
    subscription: "2022-09-01",
    expiry: "2025-09-01",
    location: "New Delhi, India",
    branches: 12,
    status: "Active",
  },
  {
    companyid: "CMP003",
    companyname: "BrightPath Logistics",
    email: {
      name: "Amit Singh",
      email: "contact@brightpathlogistics.com",
    },
    createdon: "2021-12-05",
    subscription: "2022-01-01",
    expiry: "2024-01-01",
    location: "Bangalore, India",
    branches: 8,
    status: "Inactive",
  },
  {
    companyid: "CMP004",
    companyname: "GreenTech Energy Pvt. Ltd.",
    email: {
      name: "Ravi Iyer",
      email: "hello@greentechenergy.com",
    },
    createdon: "2023-06-25",
    subscription: "2023-07-01",
    expiry: "2024-07-01",
    location: "Pune, India",
    branches: 3,
    status: "Active",
  },
  {
    companyid: "CMP005",
    companyname: "MedicoHealth Systems",
    email: {
      name: "Priya Sharma",
      email: "info@medicohealth.com",
    },
    createdon: "2020-05-14",
    subscription: "2020-06-01",
    expiry: "2023-06-01",
    location: "Chennai, India",
    branches: 10,
    status: "Expired",
  },
];

const columns = [
  { header: "Company ID", accessor: "companyid" },
  { header: "Company Name", accessor: "companyname" },
  { header: "Email/Contact", accessor: "email" },
  { header: "Created On", accessor: "createdOn" },
  { header: "Subscription Start", accessor: "subscription" },
  { header: "Expiry Date", accessor: "expiry" },
  { header: "Location", accessor: "location" },
  { header: "Branches", accessor: "branches" },
  { header: "Status", accessor: "status" },
];

const CustomerCompanyStaff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  //Fetch company data from API (to be implemented)
  const fetchCompanies = async () => {
    try {
      
      setLoading(true);
      const res = await fetchCompanyInformation(2);
      console.log("Company API response", res.data);

      const company = res.data;

       // Map single object into table structure
    const formattedData = [
      {
        companyid: company.id,
        companyname: company.name,
        email: {
          name: company.contactPersonName,
          email: company.contactPersonEmail,
        },
        createdon: company.createdOn || "-", // if not provided
        subscription: company.subscription || "-", // placeholder
        expiry: company.expiry || "-", // placeholder
        location: `${company.city || ""}, ${company.state || ""}`,
        branches: company.branchesCount || 0,
        status: company.reviewStatus || "Unknown",
      },
    ];
       console.log("🟢 Formatted data:", formattedData);
      
      setCompanies(formattedData);
     
    } catch (error) {
      console.error("❌ Error fetching company data:",
      error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchCompanies();
  }, []);

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  const filteredData = useMemo(() => {
    // const sourceData = companies.length > 0 ? companies : companyData;
      if (companies.length === 0) return []; // no data yet
    if (!debouncedQuery) return companies; // show all if empty

    return companies.filter((company) =>
      Object.values(company)
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
          title="Customer Company Table"
          breadcrumb="Customer Company Table"
          actions={
            <PrimaryButton
              label="All Status"
              onClick={() => navigate("/add-company")}
            />
          }
        />

        <div className="table-container">
          <DataTable
            columns={columns}
            data={companies}
            showCheckbox={false}
            showTransferAction={false}
            showActions={true}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resetSelectionOnFilter
            onEdit={(row) =>
              navigate("/add-company", { state: { rowData: row } })
            }
            deleteTitle="Delete Company"
            deleteParagraph="Are you sure you want to delete this company? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerCompanyStaff;
