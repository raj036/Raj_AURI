import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const payments = [
  {
    paymentid: "PAY001",
    billid: "BILL1001",
    vendorid: "VEND001",
    amountPaid: "₹25,000",
    paymentmode: "Bank Transfer",
    referencenumber: "REF123456",
    status: "Partially Paid",
  },
  {
    paymentid: "PAY002",
    billid: "BILL1002",
    vendorid: "VEND002",
    amountPaid: "₹48,500",
    paymentmode: "Credit Card",
    referencenumber: "REF987654",
    status: "Unpaid",
  },
  {
    paymentid: "PAY003",
    billid: "BILL1003",
    vendorid: "VEND003",
    amountPaid: "₹12,750",
    paymentmode: "UPI",
    referencenumber: "REF564738",
    status: "Partially Paid",
  },
  {
    paymentid: "PAY004",
    billid: "BILL1004",
    vendorid: "VEND004",
    amountPaid: "₹89,000",
    paymentmode: "Cheque",
    referencenumber: "REF445566",
    status: "Paid",
  },
  {
    paymentid: "PAY005",
    billid: "BILL1005",
    vendorid: "VEND005",
    amountPaid: "₹1,20,000",
    paymentmode: "Bank Transfer",
    referencenumber: "REF778899",
    status: "Partially Paid",
  },
  {
    paymentid: "PAY005",
    billid: "BILL1005",
    vendorid: "VEND005",
    amountPaid: "₹1,20,000",
    paymentmode: "Bank Transfer",
    referencenumber: "REF778899",
    status: "Paid",
  },
  {
    paymentid: "PAY005",
    billid: "BILL1005",
    vendorid: "VEND005",
    amountPaid: "₹1,20,000",
    paymentmode: "Bank Transfer",
    referencenumber: "REF778899",
    status: "Packed",
  },
  {
    paymentid: "PAY005",
    billid: "BILL1005",
    vendorid: "VEND005",
    amountPaid: "₹1,20,000",
    paymentmode: "Bank Transfer",
    referencenumber: "REF778899",
    status: "Unpaid",
  },
  {
    paymentid: "PAY005",
    billid: "BILL1005",
    vendorid: "VEND005",
    amountPaid: "₹1,20,000",
    paymentmode: "Bank Transfer",
    referencenumber: "REF778899",
    status: "Partially Paid",
  },
];

const columns = [
  { header: "Payment ID", accessor: "paymentid" },
  { header: "Bill ID", accessor: "billid" },
  { header: "Vendor ID", accessor: "vendorid" },
  { header: "Amount Paid", accessor: "amountPaid" },
  { header: "Payment Mode", accessor: "paymentmode" },
  { header: "Reference Number", accessor: "referencenumber" },
  { header: "Status", accessor: "status" },
];
const PaymentsMade = () => {
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
          title="Payments Made"
          subtitle="Add edit and manage your Payments"
          breadcrumb="Payments"
          actions={
            <PrimaryButton
              label="+ Add Payment"
              onClick={() => navigate("/add-payments-made")}
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
              navigate("/add-payments-made", { state: { rowData: row } })
            }
            deleteTitle="Delete Payment Made"
            deleteParagraph="Are you sure you want to delete this payment made? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};
export default PaymentsMade;
