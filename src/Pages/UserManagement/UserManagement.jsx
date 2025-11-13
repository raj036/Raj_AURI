import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../Components/Button";
import { fetchUsers, deleteUser } from "../../Utils/apiServices"; // ✅ updated import
import "./UserManagement.css";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Contact No", accessor: "phoneNo" },
  { header: "Password", accessor: "password" },
  { header: "Role", accessor: "role" },
  { header: "Status", accessor: "status" },
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Debounce search input
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // ✅ Fetch all users
  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        console.log("✅ Users fetched:", response);

        // Backend likely sends array — normalize fields
        const mapped =
          response.data?.map((u) => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            phoneNo: u.phoneNo,
            password: u.password,
           role: u.roleNames?.[1]
      ? u.roleNames[1].charAt(0).toUpperCase() + u.roleNames[1].slice(1).toLowerCase()
      : "-", 
            status: u.status || "Active",
          })) || [];

        setUsers(mapped);
      } catch (err) {
        console.error("❌ Error fetching users:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // ✅ Delete user
  const handleDelete = async (row) => {
    try {
      console.log("🗑️ Deleting user:", row);
      await deleteUser({ id: row.id });
      setUsers((prev) => prev.filter((u) => u.id !== row.id));
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  // ✅ Filter search
  const filteredData = useMemo(() => {
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [users, debouncedQuery]);

  return (
    <Layout>
      <div>
        <PageHeader
          title="User Management"
          subtitle="Add, edit, and manage Admin"
          breadcrumb="User Management"
          actions={
            <PrimaryButton
              label="+ Add User"
              onClick={() => navigate("/add-user")}
            />
          }
        />

        <div className="table-container">
          {loading ? (
            <p>Loading users...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              showCheckbox={false}
              showTransferAction={false}
              showActions={true}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              onEdit={(row) =>
                navigate("/add-user", { state: { rowData: row } })
              }
              onDelete={handleDelete}
              deleteTitle="Delete User"
              deleteParagraph="Are you sure you want to delete this user? This action cannot be undone."
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserManagement;
