import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const challans = [
  {
    chalanid: "CH001",
    customerid: "CUST001",
    deliverydate: "28/08/2025",
    recieversphone: "9876543210",
    quantity: 3,
    totalamount: "₹4500",
    acknowledment: "Pending",
  },
  {
    chalanid: "CH002",
    customerid: "CUST002",
    deliverydate: "29/08/2025",
    recieversphone: "9123456780",
    quantity: 5,
    totalamount: "₹7500",
    acknowledment: "Received",
  },
  {
    chalanid: "CH003",
    customerid: "CUST003",
    deliverydate: "30/08/2025",
    recieversphone: "9988776655",
    quantity: 2,
    totalamount: "₹2500",
    acknowledment: "Pending",
  },
  {
    chalanid: "CH004",
    customerid: "CUST004",
    deliverydate: "01/09/2025",
    recieversphone: "9001122334",
    quantity: 10,
    totalamount: "₹15000",
    acknowledment: "Received",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
  {
    chalanid: "CH005",
    customerid: "CUST005",
    deliverydate: "02/09/2025",
    recieversphone: "8112233445",
    quantity: 7,
    totalamount: "₹9800",
    acknowledment: "Dispatched",
  },
];

const columns = [
  { header: "Chalan ID", accessor: "chalanid" },
  { header: "Customer ID", accessor: "customerid" },
  { header: "Delivery Date", accessor: "deliverydate" },
  { header: "Receivers Phone No", accessor: "recieversphone" },
  { header: "Quantity Ordered", accessor: "quantity" },
  { header: "Total  Amount", accessor: "totalamount" },
  { header: "Acknowledgment", accessor: "acknowledment" },
];
const DeliveryChalan = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpenMenu(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpload = () => {
    console.log("Uploading file...");
    setOpenDialog(false);
  };

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filter data safely
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return challans; // show all if empty

    return challans.filter((chalan) =>
      Object.values(chalan) // take every value in the challan object
        .filter(Boolean) // skip null/undefined
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Add Delivery Challan"
          subtitle="Add edit Delivery Challan "
          breadcrumb="Delivery Challan"
          actions={
            <PrimaryButton
              label="+ Add Challan"
              onClick={() => navigate("/Add-Delivery-Chalan")}
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
            deleteTitle="Delete Delivery Chalan"
            deleteParagraph="Are you sure you want to delete this delivery chalan? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default DeliveryChalan;
