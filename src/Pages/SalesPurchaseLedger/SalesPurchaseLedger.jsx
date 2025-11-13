import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import UploadCard from "../../Components/UploadCard";
import DialogActions from "@mui/material/DialogActions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import HelpIcon from "../Inventory/Helpicon.svg";

const inventoryData = [
  {
    id: 1,
    posonumber: "PO-1001",
    date: "25/08/2025",
    supplierCustomer: "Supplier - Brand Pesto",
    createdBy: "Suraj Sharma",
    lastupdated: "Ashish Mewada",
    status: "Active",
    totalamount: "₹2500",
  },
  {
    id: 2,
    posonumber: "SO-1002",
    date: "03/06/2028",
    supplierCustomer: "Customer - Pest Solutions Ltd.",
    createdBy: "Ankit Verma",
    lastupdated: "Ashish Mewada",
    status: "Draft",
    totalamount: "₹12,500",
  },
  {
    id: 3,
    posonumber: "PO-1003",
    date: "25/03/2026",
    supplierCustomer: "Supplier - Green Chemicals",
    createdBy: "Priya Mehta",
    lastupdated: "Ashish Mewada",
    status: "Discontinue",
    totalamount: "₹7,800",
  },
  {
    id: 4,
    posonumber: "SO-1004",
    date: "25/08/2025",
    supplierCustomer: "Customer - Urban Pest Control",
    createdBy: "Amit Kumar",
    lastupdated: "Mehul Sharma",
    status: "Active",
    totalamount: "₹4,300",
  },
  {
    id: 5,
    posonumber: "PO-1005",
    date: "03/06/2028",
    supplierCustomer: "Supplier - Agro Pest Products",
    createdBy: "Neha Singh",
    lastupdated: "Suraj Singh",
    status: "Active",
    totalamount: "₹15,600",
  },
  {
    id: 6,
    posonumber: "SO-1006",
    date: "25/08/2025",
    supplierCustomer: "Customer - Metro Housing",
    createdBy: "Manish Parmar",
    lastupdated: "Manish Parmar",
    status: "Active",
    totalamount: "₹9,200",
  },
  {
    id: 7,
    posonumber: "PO-1007",
    date: "03/06/2028",
    supplierCustomer: "Supplier - Pest Equipments Ltd.",
    createdBy: "Shalini Gupta",
    lastupdated: "Manish Parmar",
    status: "Draft",
    totalamount: "₹18,400",
  },
  {
    id: 8,
    posonumber: "SO-1008",
    date: "25/03/2026",
    supplierCustomer: "Customer - SafeHome Services",
    createdBy: "Arjun Patel",
    lastupdated: "Manish Parmar",
    status: "Discontinue",
    totalamount: "₹6,750",
  },
  {
    id: 9,
    posonumber: "PO-1009",
    date: "03/06/2028",
    supplierCustomer: "Supplier - Eco Pest Supplies",
    createdBy: "Meena Reddy",
    lastupdated: "Manish Parmar",
    status: "Draft",
    totalamount: "₹20,000",
  },
  {
    id: 10,
    posonumber: "SO-1010",
    date: "03/06/2028",
    supplierCustomer: "Customer - Green Valley Pvt Ltd.",
    createdBy: "Vikas Sharma",
    lastupdated: "Manish Parmar",
    status: "Draft",
    totalamount: "₹8,950",
  },
  {
    id: 11,
    posonumber: "PO-1011",
    date: "03/06/2028",
    supplierCustomer: "Supplier - Fresh Agro Chemicals",
    createdBy: "Divya Nair",
    lastupdated: "Manish Parmar",
    status: "Draft",
    totalamount: "₹22,100",
  },
  {
    id: 12,
    posonumber: "SO-1012",
    date: "03/06/2028",
    supplierCustomer: "Customer - Safe Pest Pvt Ltd.",
    createdBy: "Rohit Yadav",
    lastupdated: "Manish Parmar",
    status: "Draft",
    totalamount: "₹13,400",
  },
];

const columns = [
  { header: "PO/SO Number", accessor: "posonumber", sortable: true },
  { header: "Date", accessor: "date", sortable: true },
  {
    header: (
      <span>
        Supplier / Customer
        <img
          src={HelpIcon}
          alt="help"
          style={{
            width: 16,
            height: 16,
            marginLeft: 6,
            verticalAlign: "middle",
            cursor: "pointer",
          }}
        />
      </span>
    ),
    accessor: "supplierCustomer",
    sortable: true,
  },
  {
    header: (
      <span>
        Created By
        <img
          src={HelpIcon}
          alt="help"
          style={{
            width: 16,
            height: 16,
            marginLeft: 6,
            verticalAlign: "middle",
            cursor: "pointer",
          }}
        />
      </span>
    ),
    accessor: "createdBy",
    sortable: true,
  },
  {
    header: (
      <span>
        Last Updated
        <img
          src={HelpIcon}
          alt="help"
          style={{
            width: 16,
            height: 16,
            marginLeft: 6,
            verticalAlign: "middle",
            cursor: "pointer",
          }}
        />
      </span>
    ),
    accessor: "lastupdated",
    sortable: true,
  },
  { header: "Type", accessor: "status", sortable: true },
  { header: "Total Amount", accessor: "totalamount", sortable: true },
];

const SalesLedger = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    setOpenDialog(false);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  const filteredData = useMemo(() => {
    return inventoryData.filter((item) => {
      const query = debouncedQuery.toLowerCase();
      return (
        item.posonumber?.toLowerCase().includes(query) ||
        item.supplierCustomer?.toLowerCase().includes(query) ||
        item.createdBy?.toLowerCase().includes(query) ||
        item.status?.toLowerCase().includes(query)
      );
    });
  }, [debouncedQuery]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredData, sortField, sortOrder]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout>
      <div>
        <PageHeader
          title="PO/SO Order Book"
          subtitle="Add, edit, and manage products"
          breadcrumb="PO/SO Order Book"
          actions={
            <div style={{ position: "relative", display: "inline-block" }}>
              <PrimaryButton
                label="Add PO/SO"
                onClick={() => setOpenMenu((prev) => !prev)}
              />
              {openMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    zIndex: 10,
                    width: "200px",
                  }}
                >
                  <div
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/purchase-orders");
                    }}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Add Purchase Order
                  </div>
                  <div
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/sales-orders");
                    }}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                    }}
                  >
                    Add Sale Order
                  </div>
                </div>
              )}
            </div>
          }
        />
        <div className="table-container">
          <DataTable
            columns={columns}
            data={paginatedData}
            onSort={handleSort}
            sortField={sortField}
            sortOrder={sortOrder}
            showTransferAction={true}
            showCheckbox={true}
            showActions={true}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        {/* Pagination component if needed */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Upload CSV File</DialogTitle>
          <DialogContent>
            <UploadCard />
          </DialogContent>
          <DialogActions>
            <SecondaryButton label="Cancel" onClick={handleCloseDialog} />
            <PrimaryButton label="Upload Now" onClick={handleUpload} />
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center", top: "50px" }} // ⬅️ moved to top
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
            variant="filled"
          >
            File Uploaded Successfully
          </Alert>
        </Snackbar>
      </div>
    </Layout>
  );
};

export default SalesLedger;
