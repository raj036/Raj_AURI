import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const vendors = [
  {
    vendorid: "VEND001",
    name: "ABC Supplies",
    email: "contact@abcsupplies.com",
    phone: "+91 9876543210",
    address: "123 Industrial Area, Mumbai, India",
    paymentterms: "Net 30",
    status: "Active",
  },
  {
    vendorid: "VEND002",
    name: "Global Traders",
    email: "support@globaltraders.com",
    phone: "+91 9123456780",
    address: "45 MG Road, Bangalore, India",
    paymentterms: "Net 15",
    status: "Active",
  },
  {
    vendorid: "VEND003",
    name: "Star Electronics",
    email: "info@starelectronics.com",
    phone: "+91 9988776655",
    address: "78 Nehru Street, Delhi, India",
    paymentterms: "Advance Payment",
    status: "Inactive",
  },
  {
    vendorid: "VEND004",
    name: "Fresh Foods Pvt Ltd",
    email: "sales@freshfoods.com",
    phone: "+91 9876001122",
    address: "67 Park Lane, Chennai, India",
    paymentterms: "Net 45",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
  {
    vendorid: "VEND005",
    name: "Prime Textiles",
    email: "orders@primetextiles.com",
    phone: "+91 9012345678",
    address: "90 Textile Market, Surat, India",
    paymentterms: "Net 60",
    status: "Active",
  },
];

const columns = [
  { header: "Vendor ID", accessor: "vendorid" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Billing Address", accessor: "address" },
  { header: "Payment Terms", accessor: "paymentterms" },
  { header: "Status", accessor: "status" },
];
const AccountVendor = () => {
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
    if (!debouncedQuery) return vendors; // show all if empty

    return vendors.filter((vendor) =>
      Object.values(vendor)
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
          title="Vendors"
          subtitle="Add edit and manage your Vendors "
          breadcrumb="Vendors"
          actions={
            <PrimaryButton
              label="+ Add Customer"
              onClick={() => navigate("/addvendors")}
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
              navigate("/addvendors", { state: { rowData: row } })
            }
            deleteTitle="Delete Vendor"
            deleteParagraph="Are you sure you want to delete this vendor? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};
export default AccountVendor;
