import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const vendorCredits = [
  {
    vendorcreditid: "VC001",
    vendorid: "VEND001",
    billid: "BILL1001",
    creditamount: "₹5,000",
    issuedate: "25/08/2025",
    reason: "Overpayment Adjustment",
    status: "Applied",
  },
  {
    vendorcreditid: "VC002",
    vendorid: "VEND002",
    billid: "BILL1002",
    creditamount: "₹12,000",
    issuedate: "28/08/2025",
    reason: "Damaged Goods Returned",
    status: "Open",
  },
  {
    vendorcreditid: "VC003",
    vendorid: "VEND003",
    billid: "BILL1003",
    creditamount: "₹7,500",
    issuedate: "29/08/2025",
    reason: "Discount Adjustment",
    status: "Applied",
  },
  {
    vendorcreditid: "VC004",
    vendorid: "VEND004",
    billid: "BILL1004",
    creditamount: "₹15,000",
    issuedate: "30/08/2025",
    reason: "Service Issue Compensation",
    status: "Refunded",
  },
  {
    vendorcreditid: "VC005",
    vendorid: "VEND005",
    billid: "BILL1005",
    creditamount: "₹20,000",
    issuedate: "01/09/2025",
    reason: "Bulk Purchase Discount",
    status: "Applied",
  },
  {
    vendorcreditid: "VC005",
    vendorid: "VEND005",
    billid: "BILL1005",
    creditamount: "₹20,000",
    issuedate: "01/09/2025",
    reason: "Bulk Purchase Discount",
    status: "Refunded",
  },
  {
    vendorcreditid: "VC005",
    vendorid: "VEND005",
    billid: "BILL1005",
    creditamount: "₹20,000",
    issuedate: "01/09/2025",
    reason: "Bulk Purchase Discount",
    status: "Applied",
  },
  {
    vendorcreditid: "VC005",
    vendorid: "VEND005",
    billid: "BILL1005",
    creditamount: "₹20,000",
    issuedate: "01/09/2025",
    reason: "Bulk Purchase Discount",
    status: "Open",
  },
  {
    vendorcreditid: "VC005",
    vendorid: "VEND005",
    billid: "BILL1005",
    creditamount: "₹20,000",
    issuedate: "01/09/2025",
    reason: "Bulk Purchase Discount",
    status: "Approved",
  },
  {
    vendorcreditid: "VC005",
    vendorid: "VEND005",
    billid: "BILL1005",
    creditamount: "₹20,000",
    issuedate: "01/09/2025",
    reason: "Bulk Purchase Discount",
    status: "Approved",
  },
];

const columns = [
  { header: "Vendor Credit  ID", accessor: "vendorcreditid" },
  { header: "Vendor ID", accessor: "vendorid" },
  { header: "Bill ID", accessor: "billid" },
  { header: "Credit Amount", accessor: "creditamount" },
  { header: "Issue Date", accessor: "issuedate" },
  { header: "Reason", accessor: "reason" },
  { header: "Status", accessor: "status" },
];
const VendorCredits = () => {
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
    if (!debouncedQuery) return vendorCredits; // show all if empty

    return vendorCredits.filter((credit) =>
      Object.values(credit)
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
          title="Vendor Credits"
          subtitle="Add edit and manage Vendor Credits"
          breadcrumb="Vendor Credits"
          actions={
            <PrimaryButton
              label="+ Add Vendor Credits"
              onClick={() => navigate("/add-vendor-credits")}
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
              navigate("/add-vendor-credits", { state: { rowData: row } })
            }
            deleteTitle="Delete Vendor Credit"
            deleteParagraph="Are you sure you want to delete this vendor credit? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};
export default VendorCredits;
