import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const users = [
  {
    packageid: "PKG001",
    id: "CUST001",
    items: "Electronics, Cables",
    packagedate: "27/03/2025",
    weight: "2.5kg",
    dimensions: "30x20x10 cm",
    status: "Packed",
  },
  {
    packageid: "PKG002",
    id: "CUST002",
    items: "Mobile, Charger",
    packagedate: "25/08/2025",
    weight: "1.2kg",
    dimensions: "25x15x8 cm",
    status: "Dispatched",
  },
  {
    packageid: "PKG003",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
  {
    packageid: "PKG004",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
  {
    packageid: "PKG004",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
  {
    packageid: "PKG004",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
  {
    packageid: "PKG004",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
  {
    packageid: "PKG004",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
  {
    packageid: "PKG004",
    id: "CUST003",
    items: "Books",
    packagedate: "16/05/2025",
    weight: "3kg",
    dimensions: "35x25x12 cm",
    status: "Returned",
  },
];
const columns = [
  { header: "Package ID", accessor: "packageid" },
  { header: "Order ID", accessor: "id" },
  { header: "Items Packed", accessor: "items" },
  { header: "Package Date", accessor: "packagedate" },
  { header: "Weight", accessor: "weight" },
  { header: "Dimensions", accessor: "dimensions" },
  { header: "Status", accessor: "status" },
];
const Packages = () => {
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
    return users.filter((branch) =>
      [branch?.name, branch?.email, branch?.role, branch?.status]
        .filter(Boolean)
        .some((field) =>
          field.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Packages"
          subtitle="Add, edit, and manage your Packages"
          breadcrumb="Packages"
          actions={
            <PrimaryButton
              label="+ Add Package"
              onClick={() => navigate("/add-package")}
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
            deleteTitle="Delete Package"
            deleteParagraph="Are you sure you want to delete this package? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default Packages;
