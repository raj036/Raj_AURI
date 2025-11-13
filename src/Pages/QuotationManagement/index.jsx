import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { PrimaryButton } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { fetchQuotations, deleteQuotation } from "../../Utils/apiServices";

const QuotationManagement = () => {
  const [quotations, setQuotations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  // 🔹 Fetch quotations
  const loadQuotations = async () => {
    try {
      const res = await fetchQuotations();
      setQuotations(res.data || []);
    } catch (err) {
      console.error("❌ Failed to load quotations:", err);
    }
  };

  useEffect(() => {
    loadQuotations();
  }, []);

  // 🔹 Debounced Search
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // 🔹 Filter data
  const filteredData = useMemo(() => {
    return quotations.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString()?.toLowerCase()?.includes(debouncedQuery.toLowerCase())
      )
    );
  }, [debouncedQuery, quotations]);

  // 🔹 Sort data
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }, [filteredData, sortField, sortOrder]);

  // 🔹 Pagination
  const pageSize = 10;
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 🔹 Delete Handler
  const handleDelete = async (quotation) => {
    try {
      // Pass quotationId to backend API
      await deleteQuotation(quotation.quotationId);

      // Refresh list locally (remove deleted item)
      setQuotations((prev) =>
        prev.filter((q) => q.quotationId !== quotation.quotationId)
      );
    } catch (err) {
      console.error("❌ Failed to delete quotation:", err);
      throw new Error("Delete failed"); // Let DataTable show popup or handle error
    }
  };

  const columns = [
    { header: "Quotation ID", accessor: "quotationId" },
    { header: "Customer", accessor: "customerId" },
    { header: "Type", accessor: "type" },
    { header: "Status", accessor: "status" },
    { header: "Date", accessor: "quotationDate" },
    { header: "Amount", accessor: "totalAmount" },
  ];

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <Layout>
      <PageHeader
        title="Quotation Management"
        subtitle="Add, edit and manage quotations"
        breadcrumb="Quotation Management"
        actions={
          <div style={{ position: "relative", display: "inline-block" }}>
            <PrimaryButton
              label="+ Generate Quotation"
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
                    navigate("/Add-Quotation", { state: { type: "Product" } });
                  }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  Add Product
                </div>
                <div
                  onClick={() => {
                    setOpenMenu(false);
                    navigate("/Add-Quotation", { state: { type: "Service" } });
                  }}
                  style={{
                    padding: "10px 14px",
                    cursor: "pointer",
                  }}
                >
                  Add Service
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
          showActions={true}
          onDelete={handleDelete}
          onEdit={(item) =>
            navigate("/Add-Quotation", { state: { editData: item } })
          }
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
    </Layout>
  );
};

export default QuotationManagement;
