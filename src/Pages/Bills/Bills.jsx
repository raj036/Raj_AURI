import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const bills = [
  {
    billdate: "25/08/2025",
    paymentid: "PAY001",
    POSONumber: "PO1001",
    vendorid: "VEND001",
    billitems: "Office Chairs, Tables",
    duedate: "10/09/2025",
    totalamount: "₹25,000",
    status: "Partially Paid",
  },
  {
    billdate: "26/08/2025",
    paymentid: "PAY002",
    POSONumber: "SO2001",
    vendorid: "VEND002",
    billitems: "Electronics Components",
    duedate: "12/09/2025",
    totalamount: "₹48,500",
    status: "Unpaid",
  },
  {
    billdate: "27/08/2025",
    paymentid: "PAY003",
    POSONumber: "PO1002",
    vendorid: "VEND003",
    billitems: "Packaging Materials",
    duedate: "15/09/2025",
    totalamount: "₹12,750",
    status: "Partially Paid",
  },
  {
    billdate: "28/08/2025",
    paymentid: "PAY004",
    POSONumber: "SO2002",
    vendorid: "VEND004",
    billitems: "Frozen Food Supplies",
    duedate: "20/09/2025",
    totalamount: "₹89,000",
    status: "Paid",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Partially Paid",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Paid",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Partially Paid",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Paid",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Packed",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Unpaid",
  },
  {
    billdate: "29/08/2025",
    paymentid: "PAY005",
    POSONumber: "PO1003",
    vendorid: "VEND005",
    billitems: "Textile Materials",
    duedate: "25/09/2025",
    totalamount: "₹1,20,000",
    status: "Packed",
  },
];

const columns = [
  { header: "Bill Date", accessor: "billdate" },
  { header: "Payment ID", accessor: "paymentid" },
  { header: "PO/SO Number", accessor: "POSONumber" },
  { header: "Vendor ID", accessor: "vendorid" },
  { header: "Bill Items", accessor: "billitems" },
  { header: "Due Date", accessor: "duedate" },
  { header: "Total Amount", accessor: "totalamount" },
  { header: "Status", accessor: "status" },
];
const Bills = () => {
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
    if (!debouncedQuery) return bills; // show all if empty

    return bills.filter((bill) =>
      Object.values(bill)
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
          title="Bills"
          subtitle="Add edit and manage your Bills"
          breadcrumb="Bills"
          actions={
            <PrimaryButton
              label="+ Add Bills"
              onClick={() => navigate("/add-bills")}
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
              navigate("/add-bills", { state: { rowData: row } })
            }
            deleteTitle="Delete Bills"
            deleteParagraph="Are you sure you want to delete this Bills? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};
export default Bills;
