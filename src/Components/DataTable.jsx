// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import StatusBadge from "./StatusBadge";
// import "./DataTable.css";
// import Avatar from "../assets/Avatar.svg";
// import icon from "../assets/Icon.svg";
// import location from "../assets/location.png";
// import trash from "../assets/trash-01.svg";
// import edit from "../assets/edit-01.svg";
// import Transfer from "../Pages/Inventory/Transfer";
// import Delete from "../Pages/Inventory/Delete";
// import FilterBar from "../Pages/Inventory/FilterBar";
// import DotsVertical from "../assets/dots-vertical.svg";
// import Pagination from "./Pagination";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import LocationDialog from "./LocationDialog";

// const DataTable = ({
//   columns,
//   data,
//   onSort,
//   sortField,
//   sortOrder,
//   tableType,
//   showTransferAction = true,
//   showCheckbox = true,
//   showActions = true,
//   rowsPerPage = 10,
//   searchValue,
//   onSearchChange,
//   onViewDetails,
//   onEdit,
//   deleteTitle = "Delete Admin", // <-- Add default prop
//   deleteParagraph = "Are you sure you want to delete this branch? This action cannot be undone.", // <-- Add default prop
// }) => {
//   const navigate = useNavigate();
//   const [showTransfer, setShowTransfer] = useState(null);
//   const [showDelete, setShowDelete] = useState(null);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedFilters, setSelectedFilters] = useState([]);
//   const [locationDialogOpen, setLocationDialogOpen] = useState(false);
//   const [selectedLocationRow, setSelectedLocationRow] = useState(null);

//   // Filter data before pagination
//   const filteredData = data.filter((row) => {
//     if (selectedFilters.length === 0) return true;

//     let ok = true;
//     if (selectedFilters.includes("active")) {
//       ok = ok && String(row.status || "").toLowerCase() === "active";
//     }
//     if (selectedFilters.includes("chemicals")) {
//       ok = ok && String(row.category || "").toLowerCase() === "chemicals";
//     }
//     return ok;
//   });

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedData = filteredData.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedFilters]);

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbarOpen(false);
//     handleCloseTransfer();
//   };

//   const handleSort = (accessor) => {
//     if (onSort) onSort(accessor);
//   };

//   const handleCloseTransfer = () => setShowTransfer(null);
//   const handleCloseDelete = () => setShowDelete(null);

//   // Format time/date for Assigned/Completed/Started
//   const renderCell = (col, row) => {
//     const formatDateTime = (dateTime) => {
//       if (!dateTime) return null;
//       const [date, time] = dateTime.split(" ");
//       return { date, time };
//     };

//     // Task Management: Assigned/Completed/Started columns
//     if (["assignedat", "completedat", "stardtedon"].includes(col.accessor)) {
//       const dt = formatDateTime(row[col.accessor]);
//       if (!dt) return "-";

//       const isRed =
//         col.accessor === "stardtedon" &&
//         (row.taskid === "TASK001" || row.taskid === "TASK004");

//       return (
//         <div
//           style={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}
//         >
//           <span style={{ fontWeight: 500, color: isRed ? "red" : "#111" }}>
//             {dt.time}
//           </span>
//           <span style={{ fontSize: "12px", color: isRed ? "red" : "#666" }}>
//             {dt.date}
//           </span>
//         </div>
//       );
//     }

//     // Live Tracking: Timestamp column
//     if (col.accessor === "timestamp") {
//       const dt = formatDateTime(row[col.accessor]);
//       if (!dt) return "-";
//       return (
//         <div
//           style={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}
//         >
//           <span style={{ fontWeight: 500, color: "#111" }}>{dt.time}</span>
//           <span style={{ fontSize: "12px", color: "#666" }}>{dt.date}</span>
//         </div>
//       );
//     }

//   // Live Tracking: Location column with icon
//   if (col.accessor === "attendancelocation") {
//     return (
//       <div
//         style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
//         onClick={() => {
//           setSelectedLocationRow(row);
//           setLocationDialogOpen(true);
//         }}
//       >
//         <img src={location} alt="location" style={{ width: 24, height: 24 }} />
//         <span>{row[col.accessor]}</span>
//       </div>
//     );
//   }

//   // Status column for both tables
//   if (col.accessor === "status") return <StatusBadge status={row.status} />;

//   // Email column → truncate after 15 chars
// // Customer Email column → truncate after 18 chars
// if (col.accessor === "customeremail") {
//   const email = row[col.accessor] || "-";
//   return (
//     <span title={email}>
//       {email.length > 18 ? email.substring(0, 18) + "..." : email}
//     </span>
//   );
// }
//   // Default (safe handling for objects/strings/numbers)
//   const value = row[col.accessor];
//   if (!value) return "-";

//   // If it's an object (like { phone, email })
// if (typeof value === "object") {
//   const { name, email, phone } = value;

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         lineHeight: 1.4,
//       }}
//     >
//       {/* 👇 Name shown first if present */}
//       {name && (
//         <span style={{ fontWeight: 500, color: "#111" }}>{name}</span>
//       )}

//       {/* 👇 Email shown below */}
//       {email && (
//         <span
//           title={email}
//           style={{ fontSize: "12px", color: "#666" }}
//         >
//           {email.length > 25 ? email.slice(0, 25) + "..." : email}
//         </span>
//       )}

//       {/* 👇 Optional phone if present */}
//       {phone && (
//         <span style={{ fontSize: "12px", color: "#666" }}>{phone}</span>
//       )}
//     </div>
//   );
// }


//   // Otherwise just render the value
//   return value;
// };

//   const isBlurred = showTransfer || showDelete;

//   return (
//     <div className="data-table-wrapper" style={{ position: "relative" }}>
//       {/* Filters */}
//       <FilterBar
//         value={searchValue}
//         onChange={onSearchChange}
//         onFiltersChange={setSelectedFilters}
//       />

//       {/* Table */}
//       <div
//         className="data-table"
//         style={{
//           filter: isBlurred ? "blur(4px)" : "none",
//           pointerEvents: isBlurred ? "none" : "auto",
//           transition: "filter 0.2s",
//         }}
//       >
//         <table>
//           <thead>
//             <tr>
//               {showCheckbox && (
//                 <th style={{ width: "50px" }}>
//                   <input
//                     type="checkbox"
//                     checked={selectAll}
//                     onChange={(e) => {
//                       const checked = e.target.checked;
//                       setSelectAll(checked);
//                       if (checked) {
//                         setSelectedRows(filteredData.map((row) => row.id));
//                       } else {
//                         setSelectedRows([]);
//                       }
//                     }}
//                   />
//                 </th>
//               )}
//               {columns.map((col, idx) => (
//                 <th
//                   key={idx}
//                   onClick={() => col.sortable && handleSort(col.accessor)}
//                   style={{ cursor: col.sortable ? "pointer" : "default" }}
//                 >
//                   {col.header}
//                   {sortField === col.accessor && (
//                     <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
//                   )}
//                 </th>
//               ))}
//               {showActions && <th></th>}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, ridx) => (
//               <tr key={ridx}>
//                 {showCheckbox && (
//                   <td style={{ width: "50px" }}>
//                     <input
//                       type="checkbox"
//                       checked={selectedRows.includes(row.id)}
//                       onChange={(e) => {
//                         const checked = e.target.checked;
//                         if (checked) {
//                           setSelectedRows((prev) => [...prev, row.id]);
//                         } else {
//                           setSelectedRows((prev) =>
//                             prev.filter((id) => id !== row.id)
//                           );
//                         }
//                       }}
//                     />
//                   </td>
//                 )}

//                 {columns.map((col, cidx) => (
//                   <td key={cidx}>{renderCell(col, row)}</td>
//                 ))}

//              {showActions && (
//   <td style={{ display: "flex", gap: "12px", cursor: "pointer" }}>
//     {onViewDetails ? (
//    <span
//   onClick={() => onViewDetails(row)}
//   style={{
//     color: "#252B37",
//     borderRadius: '8px',
//     fontWeight: 500,
//     padding: "10px",
//     border: "1px solid #ccc",
//     cursor: "pointer",
//     display: "inline-block",
//     textAlign: "center",
//   }}
// >
//   View Details
// </span>

//     ) : (
//       <>
//         {showTransferAction && (
//           <span onClick={() => setShowTransfer(true)}>
//             <img src={icon} alt="transfer" />
//           </span>
//         )}
//         <span onClick={() => setShowDelete(true)}>
//           <img src={trash} alt="delete" />
//         </span>
//         <span onClick={() => onEdit && onEdit(row)}>
//           <img src={edit} alt="edit" />
//         </span>
//       </>
//     )}
//   </td>
// )}

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Transfer Modal */}
//       {showTransferAction && showTransfer && (
//         <div
//           className="transfer-modal-overlay"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//           }}
//         >
//           <Transfer
//             onClose={handleCloseTransfer}
//             onSuccess={() => {
//               setShowTransfer(null);
//               setSnackbarOpen(true);
//             }}
//           />
//         </div>
//       )}

//       {/* Delete Modal */}
//       {showDelete && (
//         <div
//           className="delete-modal-overlay"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.3)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//           }}
//         >
//           <Delete
//             onClose={handleCloseDelete}
//             title={deleteTitle} // <-- Pass prop here
//             paragraph={deleteParagraph} // <-- Pass prop here
//           />
//         </div>
//       )}

//       {/* Pagination */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "20px",
//           left: 0,
//           width: "100%",
//           display: "flex",
//           justifyContent: "center",
//           background: "transparent",
//           padding: "10px 0",
//           borderTop: "1px solid transparent",
//           zIndex: 1100,
//         }}
//       >
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         sx={{ zIndex: 1500 }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           Transfer Done Successfully
//         </Alert>
//       </Snackbar>
//       {selectedLocationRow && (
//         <LocationDialog
//           open={locationDialogOpen}
//           onClose={() => setLocationDialogOpen(false)}
//           title={selectedLocationRow.taskdetails}
//           allAppointments={[
//             {
//               title: selectedLocationRow.taskdetails,
//               address: "Flat 301, Sunshine Apartments, HSR Layout",
//               time: "09:30 am - 12:30 pm",
//               coords: [12.9352, 77.6245],
//             },
//           ]}
//           liveAppointments={[
//             {
//               title: "Live " + selectedLocationRow.taskdetails,
//               address: "Some live address",
//               time: "Now",
//               coords: [12.936, 77.625],
//             },
//           ]}
//         />
//       )}
//     </div>
//   );
// };

// export default DataTable;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import "./DataTable.css";
import Avatar from "../assets/Avatar.svg";
import icon from "../assets/Icon.svg";
import location from "../assets/location.png";
import trash from "../assets/trash-01.svg";
import edit from "../assets/edit-01.svg";
import Transfer from "../Pages/Inventory/Transfer";
import Delete from "../Pages/Inventory/Delete";
import FilterBar from "../Pages/Inventory/FilterBar";
import DotsVertical from "../assets/dots-vertical.svg";
import Pagination from "./Pagination";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LocationDialog from "./LocationDialog";

const DataTable = ({
  columns,
  data,
  onSort,
  sortField,
  sortOrder,
  tableType,
  showTransferAction = true,
  showCheckbox = true,
  showActions = true,
  rowsPerPage = 10,
  searchValue,
  onSearchChange,
  onViewDetails,
  onEdit,
  onDelete,
  deleteTitle = "Delete Admin", // <-- Add default prop
  deleteParagraph = "Are you sure you want to delete this branch? This action cannot be undone.", // <-- Add default prop
}) => {
  const navigate = useNavigate();
  const [showTransfer, setShowTransfer] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedLocationRow, setSelectedLocationRow] = useState(null);

  // Filter data before pagination
  const filteredData = data.filter((row) => {
    if (selectedFilters.length === 0) return true;

    let ok = true;
    if (selectedFilters.includes("active")) {
      ok = ok && String(row.status || "").toLowerCase() === "active";
    }
    if (selectedFilters.includes("chemicals")) {
      ok = ok && String(row.category || "").toLowerCase() === "chemicals";
    }
    return ok;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    handleCloseTransfer();
  };

  const handleSort = (accessor) => {
    if (onSort) onSort(accessor);
  };

  const handleCloseTransfer = () => setShowTransfer(null);
  const handleCloseDelete = () => setShowDelete(null);

  // Format time/date for Assigned/Completed/Started
  const renderCell = (col, row) => {
    const formatDateTime = (dateTime) => {
      if (!dateTime) return null;
      const [date, time] = dateTime.split(" ");
      return { date, time };
    };

    // Task Management: Assigned/Completed/Started columns
    if (["assignedat", "completedat", "stardtedon"].includes(col.accessor)) {
      const dt = formatDateTime(row[col.accessor]);
      if (!dt) return "-";

      const isRed =
        col.accessor === "stardtedon" &&
        (row.taskid === "TASK001" || row.taskid === "TASK004");

      return (
        <div
          style={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}
        >
          <span style={{ fontWeight: 500, color: isRed ? "red" : "#111" }}>
            {dt.time}
          </span>
          <span style={{ fontSize: "12px", color: isRed ? "red" : "#666" }}>
            {dt.date}
          </span>
        </div>
      );
    }

    // Live Tracking: Timestamp column
    if (col.accessor === "timestamp") {
      const dt = formatDateTime(row[col.accessor]);
      if (!dt) return "-";
      return (
        <div
          style={{ display: "flex", flexDirection: "column", lineHeight: 1.4 }}
        >
          <span style={{ fontWeight: 500, color: "#111" }}>{dt.time}</span>
          <span style={{ fontSize: "12px", color: "#666" }}>{dt.date}</span>
        </div>
      );
    }

  // Live Tracking: Location column with icon
  if (col.accessor === "attendancelocation") {
    return (
      <div
        style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
        onClick={() => {
          setSelectedLocationRow(row);
          setLocationDialogOpen(true);
        }}
      >
        <img src={location} alt="location" style={{ width: 24, height: 24 }} />
        <span>{row[col.accessor]}</span>
      </div>
    );
  }

  // Status column for both tables
  if (col.accessor === "status") return <StatusBadge status={row.status} />;

  // Email column → truncate after 15 chars
// Customer Email column → truncate after 18 chars
if (col.accessor === "customeremail") {
  const email = row[col.accessor] || "-";
  return (
    <span title={email}>
      {email.length > 18 ? email.substring(0, 18) + "..." : email}
    </span>
  );
}
  // Default (safe handling for objects/strings/numbers)
  const value = row[col.accessor];
  if (!value) return "-";

  // If it's an object (like { phone, email })
if (typeof value === "object") {
  const { name, email, phone } = value;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        lineHeight: 1.4,
      }}
    >
      {/* 👇 Name shown first if present */}
      {name && (
        <span style={{ fontWeight: 500, color: "#111" }}>{name}</span>
      )}

      {/* 👇 Email shown below */}
      {email && (
        <span
          title={email}
          style={{ fontSize: "12px", color: "#666" }}
        >
          {email.length > 25 ? email.slice(0, 25) + "..." : email}
        </span>
      )}

      {/* 👇 Optional phone if present */}
      {phone && (
        <span style={{ fontSize: "12px", color: "#666" }}>{phone}</span>
      )}
    </div>
  );
}


  // Otherwise just render the value
  return value;
};

  const isBlurred = showTransfer || showDelete;

  return (
    <div className="data-table-wrapper" style={{ position: "relative" }}>
      {/* Filters */}
      <FilterBar
        value={searchValue}
        onChange={onSearchChange}
        onFiltersChange={setSelectedFilters}
      />

      {/* Table */}
      <div
        className="data-table"
        style={{
          filter: isBlurred ? "blur(4px)" : "none",
          pointerEvents: isBlurred ? "none" : "auto",
          transition: "filter 0.2s",
        }}
      >
        <table>
          <thead>
            <tr>
              {showCheckbox && (
                <th style={{ width: "50px" }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectAll(checked);
                      if (checked) {
                        setSelectedRows(filteredData.map((row) => row.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  onClick={() => col.sortable && handleSort(col.accessor)}
                  style={{ cursor: col.sortable ? "pointer" : "default" }}
                >
                  {col.header}
                  {sortField === col.accessor && (
                    <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </th>
              ))}
              {showActions && <th></th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, ridx) => (
              <tr key={ridx}>
                {showCheckbox && (
                  <td style={{ width: "50px" }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        if (checked) {
                          setSelectedRows((prev) => [...prev, row.id]);
                        } else {
                          setSelectedRows((prev) =>
                            prev.filter((id) => id !== row.id)
                          );
                        }
                      }}
                    />
                  </td>
                )}

                {columns.map((col, cidx) => (
                  <td key={cidx}>{renderCell(col, row)}</td>
                ))}

             {showActions && (
  <td style={{ display: "flex", gap: "12px", cursor: "pointer" }}>
    {onViewDetails ? (
   <span
  onClick={() => onViewDetails(row)}
  style={{
    color: "#252B37",
    borderRadius: '8px',
    fontWeight: 500,
    padding: "10px",
    border: "1px solid #ccc",
    cursor: "pointer",
    display: "inline-block",
    textAlign: "center",
  }}
>
  View Details
</span>

    ) : (
      <>
        {showTransferAction && (
          <span onClick={() => setShowTransfer(true)}>
            <img src={icon} alt="transfer" />
          </span>
        )}
        <span onClick={() => setShowDelete(row)}>
          <img src={trash} alt="delete" />
        </span>
        <span onClick={() => onEdit && onEdit(row)}>
          <img src={edit} alt="edit" />
        </span>
      </>
    )}
  </td>
)}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transfer Modal */}
      {showTransferAction && showTransfer && (
        <div
          className="transfer-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <Transfer
            onClose={handleCloseTransfer}
            onSuccess={() => {
              setShowTransfer(null);
              setSnackbarOpen(true);
            }}
          />
        </div>
      )}

      {/* Delete Modal */}
 {showDelete && (
  <div
    className="delete-modal-overlay"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <Delete
      onClose={handleCloseDelete}
      title={deleteTitle}
      paragraph={deleteParagraph}
      onConfirm={() => {
        onDelete && onDelete(showDelete); // ✅ triggers parent delete
        handleCloseDelete();
      }}
    />
  </div>
)}


      {/* Pagination */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "transparent",
          padding: "10px 0",
          borderTop: "1px solid transparent",
          zIndex: 1100,
        }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ zIndex: 1500 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Transfer Done Successfully
        </Alert>
      </Snackbar>
      {selectedLocationRow && (
        <LocationDialog
          open={locationDialogOpen}
          onClose={() => setLocationDialogOpen(false)}
          title={selectedLocationRow.taskdetails}
          allAppointments={[
            {
              title: selectedLocationRow.taskdetails,
              address: "Flat 301, Sunshine Apartments, HSR Layout",
              time: "09:30 am - 12:30 pm",
              coords: [12.9352, 77.6245],
            },
          ]}
          liveAppointments={[
            {
              title: "Live " + selectedLocationRow.taskdetails,
              address: "Some live address",
              time: "Now",
              coords: [12.936, 77.625],
            },
          ]}
        />
      )}
    </div>
  );
};

export default DataTable;
