import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const invoices = [
  {
    invoicedate: "25/08/2025",
    invoiceid: "INV001",
    customerid: "CUST001",
    orderid: "ORD001",
    invoiceitems: "Electronics, Cables",
    totalamount: "₹4500",
    duedate: "05/09/2025",
    status: "Pending",
  },
  {
    invoicedate: "26/08/2025",
    invoiceid: "INV002",
    customerid: "CUST002",
    orderid: "ORD002",
    invoiceitems: "Mobile, Charger",
    totalamount: "₹7500",
    duedate: "06/09/2025",
    status: "Paid",
  },
  {
    invoicedate: "27/08/2025",
    invoiceid: "INV003",
    customerid: "CUST003",
    orderid: "ORD003",
    invoiceitems: "Books",
    totalamount: "₹2500",
    duedate: "07/09/2025",
    status: "Overdue",
  },
  {
    invoicedate: "28/08/2025",
    invoiceid: "INV004",
    customerid: "CUST004",
    orderid: "ORD004",
    invoiceitems: "Furniture",
    totalamount: "₹15000",
    duedate: "10/09/2025",
    status: "Paid",
  },
  {
    invoicedate: "29/08/2025",
    invoiceid: "INV005",
    customerid: "CUST005",
    orderid: "ORD005",
    invoiceitems: "Clothing, Shoes",
    totalamount: "₹9800",
    duedate: "12/09/2025",
    status: "Pending",
  },
  {
    invoicedate: "29/08/2025",
    invoiceid: "INV005",
    customerid: "CUST005",
    orderid: "ORD005",
    invoiceitems: "Clothing, Shoes",
    totalamount: "₹9800",
    duedate: "12/09/2025",
    status: "Pending",
  },
  {
    invoicedate: "29/08/2025",
    invoiceid: "INV005",
    customerid: "CUST005",
    orderid: "ORD005",
    invoiceitems: "Clothing, Shoes",
    totalamount: "₹9800",
    duedate: "12/09/2025",
    status: "Pending",
  },
  {
    invoicedate: "29/08/2025",
    invoiceid: "INV005",
    customerid: "CUST005",
    orderid: "ORD005",
    invoiceitems: "Clothing, Shoes",
    totalamount: "₹9800",
    duedate: "12/09/2025",
    status: "Pending",
  },
  {
    invoicedate: "29/08/2025",
    invoiceid: "INV005",
    customerid: "CUST005",
    orderid: "ORD005",
    invoiceitems: "Clothing, Shoes",
    totalamount: "₹9800",
    duedate: "12/09/2025",
    status: "Pending",
  },
  {
    invoicedate: "29/08/2025",
    invoiceid: "INV005",
    customerid: "CUST005",
    orderid: "ORD005",
    invoiceitems: "Clothing, Shoes",
    totalamount: "₹9800",
    duedate: "12/09/2025",
    status: "Pending",
  },
];

const columns = [
  { header: "Invoice Date", accessor: "invoicedate" },
  { header: "Invoice ID", accessor: "invoiceid" },
  { header: "Customer ID", accessor: "customerid" },
  { header: "Order Id", accessor: "orderid" },
  { header: "Invoice Items", accessor: "invoiceitems" },
  { header: "Total  Amount", accessor: "totalamount" },
  { header: "Due Date", accessor: "duedate" },
  { header: "Status", accessor: "status" },
];
const AccountBills = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  // replace challans with invoices
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return invoices; // show all if empty

    return invoices.filter((invoice) =>
      Object.values(invoice) // take all values from invoice object
        .filter(Boolean) // remove null/undefined
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Invoices"
          subtitle="Add edit and manage your Invoices"
          breadcrumb="Invoices"
          actions={
            <PrimaryButton
              label="+ Add Invoice"
              onClick={() => navigate("/create-bills")}
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
            resetSelectionOnFilter // ✅ handle checkbox reset in DataTable internally
            onEdit={(row) =>
              navigate("/create-bills", { state: { rowData: row } })
            }
            deleteTitle="Delete Invoice"
            deleteParagraph="Are you sure you want to delete this invoice? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default AccountBills;
