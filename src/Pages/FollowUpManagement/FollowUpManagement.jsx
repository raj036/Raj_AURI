import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import api from "../../Utils/api"
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { fetchFollowUps, deleteFollowUp } from "../../Utils/apiServices.jsx";

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

// const columns = [
//   { header: "Follow Up ID", accessor: "id" },
//   { header: "Lead ID", accessor: "leadId" },
//   { header: "Customer ID", accessor: "customerId" },
//   { header: "Type", accessor: "followUpType" },
//   { header: "Status", accessor: "status" },
//   { header: "Next Follow Up", accessor: "nextFollowUpDateTime" },
//   { header: "Notes", accessor: "notes" },
// ];

const FollowUpManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const [attendanceData, setAttendanceData] = useState([]);
  const [month, setMonth] = useState("2025-11");
   const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

// ✅ Fetch all follow-ups from API
  const loadFollowUps = async () => {
    try {
      setLoading(true);
      const response = await fetchFollowUps();
      console.log("✅ Follow-ups fetched:", response.data);

      // Handle different response structures
      let apiData = [];
      if (Array.isArray(response.data)) {
        apiData = response.data;
      } else if (response.data?.dto) {
        apiData = Array.isArray(response.data.dto) ? response.data.dto : [response.data.dto];
      }

      // ✅ Store raw data for editing
      const formatted = apiData.map((item) => ({
        rawData: item, // Store complete original data
        id: item.id,
        leadId: item.leadId || "-",
        customerId: item.customerId || "-",
        followUpType: item.followUpType || "-",
        status: item.status || "SCHEDULED",
        nextFollowUpDateTime: item.nextFollowUpDate && item.nextFollowUpTime
          ? `${item.nextFollowUpDate} ${item.nextFollowUpTime}`
          : "-",
        notes: item.notes ? (item.notes.length > 50 ? item.notes.substring(0, 50) + "..." : item.notes) : "-",
      }));

      setFollowUps(formatted);
    } catch (error) {
      console.error("❌ Error fetching follow-ups:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete follow-up by ID
  const handleDelete = async (row) => {
    const id = row.rawData?.id || row.id;
    if (!id) return alert("Follow-up ID not found");

    try {
      await deleteFollowUp(id);
      console.log("✅ Follow-up deleted");

      // Remove from local state
      setFollowUps((prev) => prev.filter((followUp) => followUp.id !== id));
      alert("Follow-up deleted successfully!");
    } catch (error) {
      console.error("Error deleting follow-up:", error);
      alert("Failed to delete follow-up.");
    }
  };

  // ✅ Fetch data on component mount
  useEffect(() => {
    loadFollowUps();
  }, []);


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

   // Filter data safely
  // const filteredData = useMemo(() => {
  //   return followUps.filter((followUp) =>
  //     [
  //       followUp.id?.toString(),
  //       followUp.leadId?.toString(),
  //       followUp.customerId?.toString(),
  //       followUp.followUpType,
  //       followUp.status,
  //       followUp.notes,
  //     ]
  //       .filter(Boolean)
  //       .some((field) =>
  //         field.toLowerCase().includes(debouncedQuery.toLowerCase())
  //       )
  //   );
  // }, [debouncedQuery, followUps]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Follow Up"
          subtitle="Add, edit, and manage Follow Up"
          breadcrumb="Follow Up"
          actions={
            <PrimaryButton
              label="+ Add Follow-Up"
              onClick={() => navigate("/add-follow-up")}
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
            // onEdit={(row) => navigate("/add-follow-up", { state: { rowData: row } })}
            onEdit={(row) => {
              // ✅ Pass the raw data with all fields
              console.log("📝 Editing follow-up:", row.rawData);
              navigate("/add-follow-up", {
                state: { rowData: row.rawData }
              });
            }}
            onDelete={handleDelete}
            deleteTitle="Delete Follow Up"
            deleteParagraph="Are you sure you want to delete this Follow Up? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default FollowUpManagement;
