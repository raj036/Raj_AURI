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
import "./Inventory.css";
import HelpIcon from "../Inventory/Helpicon.svg";
import { fetchInventoryDetails } from "../../Utils/apiServices";
import dropdown from "../../assets/dropnew.svg";

// Table column definitions (frontend schema)
const columns = [
  { header: "Product", accessor: "productName", sortable: true },
  { header: "Status", accessor: "status", sortable: true },
  {
    header: (
      <span>
        HSN
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
    accessor: "hsn",
    sortable: true,
  },
  {
    header: (
      <span>
        Category
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
    accessor: "category",
    sortable: true,
  },
  {
    header: (
      <span>
        Price
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
    accessor: "price",
    sortable: true,
  },
  { header: "Stock Quantity", accessor: "stockQuantity", sortable: true },
  { header: "Expiry Date", accessor: "expiryDate", sortable: true },
];

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const navigate = useNavigate();

  // 🔹 Fetch and map inventory data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchInventoryDetails();

        const inventory = Array.isArray(res.data?.data)
          ? res.data.data.map((item) => ({
              productName: item.itemName,
              status: item.itemQuantity > 0 ? "Available" : "Out of Stock",
              hsn: item.itemId,
              category: item.categories,
              price: item.itemCost,
              stockQuantity: item.itemQuantity,
              expiryDate: "N/A",
            }))
          : [];

        setInventoryData(inventory);
      } catch (err) {
        setError("Failed to fetch inventory data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Dialog handlers
  const handleOpenDialog = () => {
    setOpenMenu(false);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);
  const handleUpload = () => {
    setOpenDialog(false);
    setOpenSnackbar(true);
  };
  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  // Sorting
  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Debounced search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // Filtering
  const filteredData = useMemo(() => {
    return inventoryData?.filter(
      (item) =>
        item.productName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, inventoryData]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination
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
          title="Inventory Management"
          subtitle="Add, edit, and manage products"
          breadcrumb="Products"
          actions={
            <div style={{ position: "relative", display: "inline-block" }}>
              <PrimaryButton
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    Add Product
                    <img
                      src={dropdown}
                      alt="dropdown"
                      style={{
                        width: 18,
                        marginLeft: 6,
                        verticalAlign: "middle",
                      }}
                    />
                  </div>
                }
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
                      navigate("/add-product");
                    }}
                    style={{
                      padding: "10px 14px",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    Add Single Product
                  </div>
                  <div
                    onClick={handleOpenDialog}
                    style={{ padding: "10px 14px", cursor: "pointer" }}
                  >
                    Upload CSV
                  </div>
                </div>
              )}
            </div>
          }
        />

        <div className="table-container">
          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>
              Loading inventory...
            </p>
          ) : error ? (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          ) : (
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
              deleteTitle="Delete Product"
              deleteParagraph="Are you sure you want to delete this product? This action cannot be undone."
            />
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}

        {/* CSV Upload Dialog */}
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

        {/* Success Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ top: "50px" }}
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

export default Inventory;
