import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const payments = [
  {
    paymentdate: "25/08/2025",
    paymentid: "PAY001",
    invoiceid: "INV001",
    customerid: "CUST001",
    amountrecieved: "₹4500",
    paymentmode: "UPI",
    referencenumber: "TXN12345",
  },
  {
    paymentdate: "26/08/2025",
    paymentid: "PAY002",
    invoiceid: "INV002",
    customerid: "CUST002",
    amountrecieved: "₹7500",
    paymentmode: "Credit Card",
    referencenumber: "TXN12346",
  },
  {
    paymentdate: "27/08/2025",
    paymentid: "PAY003",
    invoiceid: "INV003",
    customerid: "CUST003",
    amountrecieved: "₹2500",
    paymentmode: "Bank Transfer",
    referencenumber: "TXN12347",
  },
  {
    paymentdate: "28/08/2025",
    paymentid: "PAY004",
    invoiceid: "INV004",
    customerid: "CUST004",
    amountrecieved: "₹15000",
    paymentmode: "Cash",
    referencenumber: "TXN12348",
  },
  {
    paymentdate: "29/08/2025",
    paymentid: "PAY005",
    invoiceid: "INV005",
    customerid: "CUST005",
    amountrecieved: "₹9800",
    paymentmode: "UPI",
    referencenumber: "TXN12349",
  },
  {
    paymentdate: "29/08/2025",
    paymentid: "PAY005",
    invoiceid: "INV005",
    customerid: "CUST005",
    amountrecieved: "₹9800",
    paymentmode: "UPI",
    referencenumber: "TXN12349",
  },
  {
    paymentdate: "29/08/2025",
    paymentid: "PAY005",
    invoiceid: "INV005",
    customerid: "CUST005",
    amountrecieved: "₹9800",
    paymentmode: "UPI",
    referencenumber: "TXN12349",
  },
  {
    paymentdate: "29/08/2025",
    paymentid: "PAY005",
    invoiceid: "INV005",
    customerid: "CUST005",
    amountrecieved: "₹9800",
    paymentmode: "UPI",
    referencenumber: "TXN12349",
  },
  {
    paymentdate: "29/08/2025",
    paymentid: "PAY005",
    invoiceid: "INV005",
    customerid: "CUST005",
    amountrecieved: "₹9800",
    paymentmode: "UPI",
    referencenumber: "TXN12349",
  },
];

const columns = [
  { header: "Payment Date", accessor: "paymentdate" },
  { header: "Payment ID", accessor: "paymentid" },
  { header: "Invoice ID", accessor: "invoiceid" },
  { header: "Customer Id", accessor: "customerid" },
  { header: "Amount Recieved", accessor: "amountrecieved" },
  { header: "Payment Mode", accessor: "paymentmode" },
  { header: "Reference Number", accessor: "referencenumber" },
];
const PaymentsRecieved = () => {
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
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return payments; // show all if empty

    return payments.filter((payment) =>
      Object.values(payment)
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
          title="Payments Received"
          subtitle="Add edit and manage your Payments "
          breadcrumb="Payments Received"
          actions={
            <PrimaryButton
              label="+ Add Payment"
              onClick={() => navigate("/add-payments-recieved")}
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
              navigate("/add-payments-recieved", { state: { rowData: row } })
            }
            deleteTitle="Delete Payment Received"
            deleteParagraph="Are you sure you want to delete this payment received? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default PaymentsRecieved;
