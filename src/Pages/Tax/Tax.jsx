import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { fetchTaxData ,deleteTax} from "../../Utils/apiServices";

// const taxes = [
//   {
//     taxid: "TAX001",
//     taxname: "Goods and Services Tax (GST)",
//     taxtype: "Indirect",
//     taxrate: "18%",
//     createdat: "2025-08-01",
//     // inventories: "All Products",
//   },
//   {
//     taxid: "TAX002",
//     taxname: "Value Added Tax (VAT)",
//     taxtype: "Indirect",
//     taxrate: "12%",
//     createdat: "2025-07-15",
//     // inventories: "Electronics, Clothing",
//   },
//   {
//     taxid: "TAX003",
//     taxname: "Corporate Income Tax",
//     taxtype: "Direct",
//     taxrate: "25%",
//     createdat: "2025-06-20",
//     // inventories: "All Services",
//   },
//   {
//     taxid: "TAX004",
//     taxname: "Customs Duty",
//     taxtype: "Indirect",
//     taxrate: "10%",
//     createdat: "2025-05-30",
//     // inventories: "Imported Goods",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     // inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     // inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     // inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     // inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     // inventories: "Salaried Employees",
//   },
// ];

const columns = [
  { header: "Tax ID", accessor: "id" },
  { header: "Tax Name", accessor: "taxName" },
  { header: "Tax Type", accessor: "taxType" },
  { header: "Tax Rate", accessor: "taxRate" },
  { header: "Created At", accessor: "createdAt" },
];
const Tax = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [taxes, setTaxes] = useState([]); // 🔥 state to hold fetched data
  const navigate = useNavigate();

 useEffect(() => {
    const loadTaxData = async () => {
      try {
        const response = await fetchTaxData();
        console.log("✅ Tax API Response:", response);

        // ✅ Map API response fields to match your column accessors
       const mappedData =
          response.data.data?.map((item) => ({
            id: item.id,
            taxName: item.taxName,
            taxType: item.taxType,
            taxRate: item.taxRate,
            createdAt: new Date(item.createdAt).toLocaleString(),
          })) || [];

        setTaxes(mappedData);
      } catch (error) {
        console.error("❌ Error fetching tax data:", error);
      }
    };

    loadTaxData();
  }, []);

  // ✅ Delete handler
const handleDelete = async (row) => {
  console.log("🗑️ Deleting tax:", row);
  try {
    await deleteTax(row); // ✅ row has id, taxName, etc.
    setTaxes((prev) => prev.filter((tax) => tax.id !== row.id));
  } catch (error) {
    console.error("❌ Error deleting tax:", error);
  }
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
  }, [debouncedQuery,taxes]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="All Tax"
          subtitle="Add, edit, and manage your taxes"
          breadcrumb="Tax"
          actions={
            <PrimaryButton
              label="+ Add Tax"
              onClick={() => navigate("/add-tax")}
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
            onEdit={(row) => navigate("/add-tax", { state: { rowData: row } })}
            onDelete={handleDelete} // ✅ added delete handler
            deleteTitle="Delete Tax"
            deleteParagraph="Are you sure you want to delete this tax? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Tax;
