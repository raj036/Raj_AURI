import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const bankAccounts = [
  {
    accountid: "ACC001",
    accountnumber: "1234567890",
    branchname: "Mumbai Central",
    status: "Active",
    createdat: "2025-08-01",
  },
  {
    accountid: "ACC002",
    accountnumber: "9876543210",
    branchname: "Bangalore MG Road",
    status: "Active",
    createdat: "2025-07-15",
  },
  {
    accountid: "ACC003",
    accountnumber: "4567891230",
    branchname: "Delhi Connaught Place",
    status: "Inactive",
    createdat: "2025-06-20",
  },
  {
    accountid: "ACC004",
    accountnumber: "7418529630",
    branchname: "Chennai T Nagar",
    status: "Active",
    createdat: "2025-05-30",
  },
  {
    accountid: "ACC005",
    accountnumber: "8523697410",
    branchname: "Hyderabad Banjara Hills",
    status: "Active",
    createdat: "2025-04-10",
  },
  {
    accountid: "ACC005",
    accountnumber: "8523697410",
    branchname: "Hyderabad Banjara Hills",
    status: "Active",
    createdat: "2025-04-10",
  },
  {
    accountid: "ACC005",
    accountnumber: "8523697410",
    branchname: "Hyderabad Banjara Hills",
    status: "Active",
    createdat: "2025-04-10",
  },
  {
    accountid: "ACC005",
    accountnumber: "8523697410",
    branchname: "Hyderabad Banjara Hills",
    status: "Active",
    createdat: "2025-04-10",
  },
  {
    accountid: "ACC005",
    accountnumber: "8523697410",
    branchname: "Hyderabad Banjara Hills",
    status: "Active",
    createdat: "2025-04-10",
  },
];

const columns = [
  { header: "Account ID", accessor: "accountid" },
  { header: "Account Number", accessor: "accountnumber" },
  { header: "Branch Name", accessor: "branchname" },
  { header: "Status", accessor: "status" },
  { header: "Created At", accessor: "createdat" },
];
const Bank = () => {
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
    if (!debouncedQuery) return bankAccounts; // show all if empty

    return bankAccounts.filter((account) =>
      Object.values(account)
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
          title="All Bank"
          subtitle="Add, edit, and manage your bank"
          breadcrumb="Bank"
          actions={
            <PrimaryButton
              label="+ Add Bank"
              onClick={() => navigate("/add-bank")}
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
            onEdit={(row) => navigate("/add-bank", { state: { rowData: row } })}
            deleteTitle="Delete Bank Account"
            deleteParagraph="Are you sure you want to delete this bank account? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Bank;
