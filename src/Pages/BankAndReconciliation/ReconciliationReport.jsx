import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

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
const Ledger = () => {
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
          title="Reconciliation Report"
          subtitle="Add edit and manage you Reconciled & Unreconciled Transactions"
          breadcrumb="Reconciliation Report"
          actions={
            <PrimaryButton
              label="Match Transaction"
              onClick={() => navigate("/add-voucher")}
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
            onEdit={(row) => navigate("/add-voucher", { state: { rowData: row } })}
            deleteTitle="Delete Voucher"
            deleteParagraph="Are you sure you want to delete this Voucher? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Ledger;
