import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { fetchCustomers, deleteCustomers } from "../../Utils/apiServices.jsx";

const users = [
  {
    id: "CUST001",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Technician",
    created: "3.30pm 26/3/2025",
    status: "Active",
    billingAddress: "B-123, Delhi",
    shippingAddress: "B-123, Delhi",
    paymentTerms: "Net 30",
  },
  {
    id: "CUST002",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Sales",
    created: "8.10pm 24/8/2025",
    status: "Draft",
    billingAddress: "A-456, Mumbai",
    shippingAddress: "A-456, Mumbai",
    paymentTerms: "Net 15",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
  {
    id: "CUST003",
    name: "Suraj Sharma",
    email: "suraj@gmail.com",
    contact: "+91 88765 23456",
    password: "28*****65",
    role: "Marketing",
    created: "6.45am 15/5/2025",
    status: "Discontinue",
    billingAddress: "C-789, Pune",
    shippingAddress: "C-789, Pune",
    paymentTerms: "Advance",
  },
];

const columns = [
  { header: "CustomerID", accessor: "id" },
  { header: "Status", accessor: "status" },
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "contact" },
  { header: "Billing Address", accessor: "billingAddress" },
  { header: "Shipping Address", accessor: "shippingAddress" },
  { header: "Payment Terms", accessor: "paymentTerms" },
];

const CustomerManagement = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // ✅ Fetch customers from API
  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetchCustomers();
      console.log("✅ Customers fetched:", response.data);
      
      // Handle different response structures
      let apiData = [];
      if (Array.isArray(response.data)) {
        apiData = response.data;
      } else if (response.data?.dto) {
        apiData = Array.isArray(response.data.dto) ? response.data.dto : [response.data.dto];
      }

      // ✅ Store raw data for editing
      const formatted = apiData.map((item) => ({
        rawData: item, // Store complete original data
        id: item.id,
        customerName: item.customerName,
        companyName: item.companyName || "-",
        email: item.email,
        phone: item.phone,
        city: item.city || "-",
        customerStatus: item.customerStatus || "ACTIVE",
        tags: item.tags || "-",
      }));

      setCustomers(formatted);
    } catch (error) {
      console.error("❌ Error fetching customers:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete customer by ID
  const handleDeleteCustomer = async (row) => {
    const id = row.rawData?.id || row.id;
    if (!id) return alert("Customer ID not found");

    try {
      await deleteCustomers(id);
      console.log("✅ Customer deleted");
      
      // Remove from local state
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
      alert("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer.");
    }
  };

  // ✅ Fetch data on component mount
  useEffect(() => {
    loadCustomers();
  }, []);


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

  // // Filter data safely
  // const filteredData = useMemo(() => {
  //   return customers.filter((customer) =>
  //     [
  //       customer.customerName,
  //       customer.companyName,
  //       customer.email,
  //       customer.phone,
  //       customer.customerStatus,
  //       customer.tags,
  //     ]
  //       .filter(Boolean)
  //       .some((field) =>
  //         field.toLowerCase().includes(debouncedQuery.toLowerCase())
  //       )
  //   );
  // }, [debouncedQuery, customers]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="Customers Management"
          subtitle="Add, edit, and manage your Branch"
          breadcrumb="Customers Management"
          actions={
            <PrimaryButton
              label="+ Add Customers"
              onClick={() => navigate("/add-customer")}
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
            // onEdit={(row) => navigate("/add-customer", { state: { rowData: row } })}
            onEdit={(row) => {
              // ✅ Pass the raw data with all fields
              console.log("📝 Editing customer:", row.rawData);
              navigate("/add-customer", { 
                state: { rowData: row.rawData } 
              });
            }}
            deleteTitle="Delete Customer"
            deleteParagraph="Are you sure you want to delete this customer? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default CustomerManagement;
