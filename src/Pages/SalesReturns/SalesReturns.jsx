import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const salesReturns = [
  {
    returndate: "30/08/2025",
    returnid: "RET001",
    invoiceid: "INV001",
    customerid: "CUST001",
    returnqty: 2,
    returnedreason: "Damaged product",
    refundamount: "₹1500",
  },
  {
    returndate: "31/08/2025",
    returnid: "RET002",
    invoiceid: "INV002",
    customerid: "CUST002",
    returnqty: 1,
    returnedreason: "Wrong item delivered",
    refundamount: "₹2500",
  },
  {
    returndate: "01/09/2025",
    returnid: "RET003",
    invoiceid: "INV003",
    customerid: "CUST003",
    returnqty: 3,
    returnedreason: "Not as described",
    refundamount: "₹3000",
  },
  {
    returndate: "02/09/2025",
    returnid: "RET004",
    invoiceid: "INV004",
    customerid: "CUST004",
    returnqty: 5,
    returnedreason: "Customer cancelled order",
    refundamount: "₹7500",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
  {
    returndate: "03/09/2025",
    returnid: "RET005",
    invoiceid: "INV005",
    customerid: "CUST005",
    returnqty: 2,
    returnedreason: "Defective product",
    refundamount: "₹4000",
  },
];

const columns = [
  { header: "Return Date", accessor: "returndate" },
  { header: "Return ID", accessor: "returnid" },
  { header: "Invoice ID", accessor: "invoiceid" },
  { header: "Customer Id", accessor: "customerid" },
  { header: "Returned Qty", accessor: "returnqty" },
  { header: "Returned Reason", accessor: "returnedreason" },
  { header: "Refund Amount", accessor: "refundamount" },
];
const SalesReturns = () => {
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
    if (!debouncedQuery) return salesReturns; // show all if empty

    return salesReturns.filter((ret) =>
      Object.values(ret)
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
          title="Sales Returns"
          subtitle="Add, edit and manage Sales Returns"
          breadcrumb="Invoices"
          actions={
            <PrimaryButton
              label="+ Add Return"
              onClick={() => navigate("/add-sales-returns")}
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
              navigate("/add-sales-returns", { state: { rowData: row } })
            }
            deleteTitle="Delete Invoice"
            deleteParagraph="Are you sure you want to delete this invoice? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};
export default SalesReturns;
