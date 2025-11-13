// import React, { useState, useMemo, useEffect } from "react";
// import Layout from "../../Components/Layout/Layout";
// import PageHeader from "../../Components/PageHeader";
// import SearchBar from "../../Components/SearchBar";
// import Pagination from "../../Components/Pagination";
// import DataTable from "../../Components/DataTable";
// import { useNavigate } from "react-router-dom";
// import "./BranchManagement.css";
// import { PrimaryButton, SecondaryButton } from "../../Components/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import UploadCard from "../../Components/UploadCard";
// import DialogActions from "@mui/material/DialogActions";
// import {fetchBranches, deleteBranch} from "../../Utils/apiServices";

// // const users = [
// //   {
// //     branchId: "B001",
// //     branchName: "Suraj Sharma",
// //     contactInfo: { phone: "+91 88765 23456", email: "suraj@gmail.com" },
// //     branchType: "Service",
// //     lastEditedBy: "Technician",
// //     location:
// //       "Flat 301, Sunshine Apartments, HSR Layout, Sector 1 Bangalore 560102",
// //     status: "Active",
// //   },
// //   {
// //     branchId: "B002",
// //     branchName: "Suraj Sharma",
// //     contactInfo: { phone: "+91 88765 23456", email: "suraj@gmail.com" },
// //     branchType: "Retail",
// //     lastEditedBy: "Sales",
// //     location:
// //       "Flat 301, Sunshine Apartments, HSR Layout, Sector 1 Bangalore 560102",
// //     status: "Draft",
// //   },
// //   {
// //     branchId: "B003",
// //     branchName: "Suraj Sharma",
// //     contactInfo: { phone: "+91 88765 23456", email: "suraj@gmail.com" },
// //     branchType: "Retail",
// //     lastEditedBy: "Marketing",
// //     location:
// //       "Flat 301, Sunshine Apartments, HSR Layout, Sector 1 Bangalore 560102",
// //     status: "Discontinue",
// //   },
// //   {
// //     branchId: "B004",
// //     branchName: "Suraj Sharma",
// //     contactInfo: { phone: "+91 88765 23456", email: "suraj@gmail.com" },
// //     branchType: "Retail",
// //     lastEditedBy: "Technician",
// //     location:
// //       "Flat 301, Sunshine Apartments, HSR Layout, Sector 1 Bangalore 560102",
// //     status: "Active",
// //   },
// //   {
// //     branchId: "B005",
// //     branchName: "Suraj Sharma",
// //     contactInfo: { phone: "+91 88765 23456", email: "suraj@gmail.com" },
// //     branchType: "Service",
// //     lastEditedBy: "Sales",
// //     location:
// //       "Flat 301, Sunshine Apartments, HSR Layout, Sector 1 Bangalore 560102",
// //     status: "Draft",
// //   },
// // ];

// const columns = [
//   { header: "Branch ID", accessor: "branchId" },
//   { header: "Branch Name", accessor: "branchName" },
//   { header: "Contact Info", accessor: "contactInfo" },
//   { header: "Branch Type", accessor: "branchType" },
//   { header: "Last Edited by", accessor: "lastEditedBy" },
//   { header: "Location", accessor: "location" },
//   { header: "Status", accessor: "status" },
// ];

// const BranchManagement = () => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   const [branches, setBranches] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleOpenDialog = () => {
//     setOpenMenu(false);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const handleUpload = () => {
//     console.log("Uploading file...");
//     setOpenDialog(false);
//   };

//   //GET - fetch all branches
//   const getAllBranches = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchBranches();
//       setBranches(res.data?.data || []);
//     } catch (error){
//       console.error("Error fetching branches: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //POST - Add a new branch
//   const addBranch = async (newBranch) => {
//     try {
//       const res = await addBranch(newBranch);
//       console.log("Branch Added Successfully: ", res.data);
//       fetchBranches();
//     } catch (error) {
//       console.error("Error adding branch: ", error);
//     }
//   };

//   //PUT - update and existing branch
//   const updateBranch = async (branchId, updatedData) => {
//     try {
//       const res = await updateBranch(branchId, updatedData);
//       console.log("Branch Updated Successfully: ", res.data);
//       fetchBranches();
//     } catch(error) {
//       console.error("Error updating branch: ", error);
//     }
//   };

//   //DELETE - Delete branch by ID
//   const handleDeleteBranch = async (branchId) => {
//     try{
//       await deleteBranch(branchId);
//       console.log("Branch deleted successfully");
//       getAllBranches();
//     } catch (error) {
//       console.error("Error deleting branch: ", error);
//     }
//   }

//   useEffect(() => {
//     getAllBranches();
//   }, [])

//   useEffect(() => {
//     const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
//     return () => clearTimeout(id);
//   }, [searchQuery]);

//   const filteredData = useMemo(() => {
//     return users.filter((branch) =>
//       [
//         branch?.branchId,
//         branch?.branchName,
//         branch?.contactInfo?.phone,
//         branch?.contactInfo?.email,
//         branch?.branchType,
//         branch?.lastEditedBy,
//         branch?.location,
//         branch?.status,
//       ]
//         .filter(Boolean)
//         .some((field) =>
//           String(field).toLowerCase().includes(debouncedQuery.toLowerCase())
//         )
//     );
//   }, [debouncedQuery]);

//   return (
//     <Layout>
//       <div>
//         <PageHeader
//           title="Branch Management"
//           subtitle="Add, edit, and manage your Branch"
//           breadcrumb="Admin"
//           actions={
//             <PrimaryButton
//               label="+ Add Branch"
//               onClick={() => navigate("/add-branch")}
//             />
//           }
//         />

//         <div className="table-container">
//           <DataTable
//             columns={columns}
//             data={filteredData}
//             tableType="branchManagement"
//             showCheckbox={false}
//             showTransferAction={false}
//             showActions={true}
//             searchValue={searchQuery}
//             onSearchChange={setSearchQuery}
//             resetSelectionOnFilter
//             onEdit={(row) =>
//               navigate("/add-branch", { state: { rowData: row } })
//             }
//             onDelete={(row) => handleDeleteBranch(row.branchId)}
//             deleteTitle="Delete Branch"
//             deleteParagraph="Are you sure you want to delete this branch? This action cannot be undone."
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default BranchManagement;

import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import "./BranchManagement.css";
import { PrimaryButton } from "../../Components/Button";
import {
  fetchBranches,
  deleteBranch,
  addBranch as createBranch,
  updateBranch as modifyBranch,
} from "../../Utils/apiServices";

const columns = [
  { header: "Branch ID", accessor: "branchId" },
  { header: "Branch Name", accessor: "branchName" },
  { header: "Contact Info", accessor: "contactInfo" },
  { header: "Branch Type", accessor: "branchType" },
  { header: "Last Edited by", accessor: "lastEditedBy" },
  { header: "Location", accessor: "location" },
  { header: "Status", accessor: "branchStatus" },
];

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch all branches from API
  const getAllBranches = async () => {
    
    try {
      console.log("fetchicng branch data");
      setLoading(true);
      const res = await fetchBranches({});
      console.log("API Response:", res.data);

      // The API returns: res.data.data.results
      const apiData = res.data?.data?.results || [];

      // Transform API data into a format suitable for the DataTable
      // const formatted = apiData.map((item) => ({
      //   branchId: item.branchId,
      //   branchName: item.branchName,
      //   contactInfo: `${item.contactInfo} (${item.phoneNumber})`,
      //   branchType: item.branchType,
      //   lastEditedBy: item.editedBy,
      //   location: `${item.location}, ${item.city}, ${item.state} - ${item.pincode}`,
      //   status: item.branchStatus,
      // }));

      const formatted = apiData.map((item) => ({
        branchId: item.branchId,
        branchName: item.branchName,
        contactInfo: {
          email: item.contactInfo || "",
          phoneNumber: item.phoneNumber || "",
        },
        branchType: item.branchType,
        lastEditedBy: item.editedBy,
        location: item.location || "",
        city: item.city || "",
        state: item.state || "",
        pincode: item.pincode || "",
        branchStatus: item.branchStatus || "",
      }));

      setBranches(formatted);
    } catch (error) {
      console.error("❌ Error fetching branches:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete a branch by IDx
  // const handleDeleteBranch = async (branchId) => {
  //   try {
  //     console.log("Deleting branch with ID:", branchId);
  //     await deleteBranch(branchId);
  //     console.log(`✅ Branch ${branchId} deleted successfully`);
  //     alert("Branch deleted successfully!");
  //     getAllBranches(); // refresh the list after deletion
  //   } catch (error) {
  //     console.error("❌ Error deleting branch:", error);
  //   }
  // };

  const handleDeleteBranch = async (row) => {
  console.log("🗑️ Deleting branch:", row);
  try {
    await deleteBranch({id: row.branchId}); // ✅ row has id, taxName, etc.
    setBranches((prev) => prev.filter((branch) => branch.id !== row.id));
  } catch (error) {
    console.error("❌ Error deleting branch:", error);
  }
};

  // ✅ Debounce search input to improve performance
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id);
  }, [searchQuery]);

  // ✅ Fetch data on initial render
  useEffect(() => {
    getAllBranches();
  }, []);

  // ✅ Apply filtering to branches
  const filteredData = useMemo(() => {
    return branches.filter((branch) =>
      Object.values(branch)
        .filter(Boolean)
        .some((field) =>
          String(field).toLowerCase().includes(debouncedQuery.toLowerCase())
        )
    );
  }, [debouncedQuery, branches]);

  return (
    <Layout>
      <div>
        {/* ✅ Page Header */}
        <PageHeader
          title="Branch Management"
          subtitle="Add, edit, and manage your Branches"
          breadcrumb="Admin"
          actions={
            <PrimaryButton
              label="+ Add Branch"
              onClick={() => navigate("/add-branch")}
            />
          }
        />

        {/* ✅ Table Section */}
        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            loading={loading}
            tableType="branchManagement"
            showCheckbox={false}
            showTransferAction={false}
            showActions={true}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resetSelectionOnFilter
            // onEdit={(row) =>
            //   navigate("/add-branch", { state: { formData: row } })
            // }
            onEdit={(row) => navigate("/add-branch", { state: { rowData: { ...row, id: row.branchId } } })}

            onDelete={(row) => handleDeleteBranch(row)}
            deleteTitle="Delete Branch"
            deleteParagraph="Are you sure you want to delete this branch? This action cannot be undone."
          />
        </div>
      </div>
    </Layout>
  );
};

export default BranchManagement;
