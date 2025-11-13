import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const creditNotes = [
  {
    issuesdate: "05/09/2025",
    creditnoteid: "CN001",
    invoiceid: "INV001",
    customerid: "CUST001",
    creditamount: "₹1500",
    reason: "Damaged goods",
    status: "Issued",
  },
  {
    issuesdate: "06/09/2025",
    creditnoteid: "CN002",
    invoiceid: "INV002",
    customerid: "CUST002",
    creditamount: "₹2500",
    reason: "Wrong item delivered",
    status: "Pending",
  },
  {
    issuesdate: "07/09/2025",
    creditnoteid: "CN003",
    invoiceid: "INV003",
    customerid: "CUST003",
    creditamount: "₹3000",
    reason: "Order cancelled",
    status: "Approved",
  },
  {
    issuesdate: "08/09/2025",
    creditnoteid: "CN004",
    invoiceid: "INV004",
    customerid: "CUST004",
    creditamount: "₹4500",
    reason: "Overpayment adjustment",
    status: "Issued",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
  {
    issuesdate: "09/09/2025",
    creditnoteid: "CN005",
    invoiceid: "INV005",
    customerid: "CUST005",
    creditamount: "₹1200",
    reason: "Defective product",
    status: "Rejected",
  },
];

const columns = [
  { header: "Issues Date", accessor: "issuesdate" },
  { header: "Credit Note ID", accessor: "creditnoteid" },
  { header: "Invoice ID", accessor: "invoiceid" },
  { header: "Customer Id", accessor: "customerid" },
  { header: "Credit Amount", accessor: "creditamount" },
  { header: "Reason", accessor: "reason" },
  { header: "Status", accessor: "status" },
];
const CreditNotes = () => {
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
    if (!debouncedQuery) return creditNotes; // show all if empty

    return creditNotes.filter((note) =>
      Object.values(note)
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
          title="Credit Notes"
          subtitle="Add, edit and manage Credit Notes"
          breadcrumb="Credit Notes"
          actions={
            <PrimaryButton
              label="+ Add Credit Notes"
              onClick={() => navigate("/add-credit-notes")}
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
            onEdit={(row) =>
              navigate("/add-credit-notes", { state: { rowData: row } })
            }
            deleteTitle="Delete Credit Note"
            deleteParagraph="Are you sure you want to delete this credit note? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};
export default CreditNotes;
