// import React, { useState, useMemo, useEffect } from "react";
// import Layout from "../../Components/Layout/Layout";
// import PageHeader from "../../Components/PageHeader";
// import DataTable from "../../Components/DataTable";
// import { useNavigate } from "react-router-dom";

// import { PrimaryButton, SecondaryButton } from "../../Components/Button";

// const taxes = [
//   {
//     taxid: "TAX001",
//     taxname: "Goods and Services Tax (GST)",
//     taxtype: "Indirect",
//     taxrate: "18%",
//     createdat: "2025-08-01",
//     inventories: "All Products",
//   },
//   {
//     taxid: "TAX002",
//     taxname: "Value Added Tax (VAT)",
//     taxtype: "Indirect",
//     taxrate: "12%",
//     createdat: "2025-07-15",
//     inventories: "Electronics, Clothing",
//   },
//   {
//     taxid: "TAX003",
//     taxname: "Corporate Income Tax",
//     taxtype: "Direct",
//     taxrate: "25%",
//     createdat: "2025-06-20",
//     inventories: "All Services",
//   },
//   {
//     taxid: "TAX004",
//     taxname: "Customs Duty",
//     taxtype: "Indirect",
//     taxrate: "10%",
//     createdat: "2025-05-30",
//     inventories: "Imported Goods",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     inventories: "Salaried Employees",
//   },
//   {
//     taxid: "TAX005",
//     taxname: "Professional Tax",
//     taxtype: "Direct",
//     taxrate: "2%",
//     createdat: "2025-04-10",
//     inventories: "Salaried Employees",
//   },
// ];

// const columns = [
//   { header: "Tax ID", accessor: "taxid" },
//   { header: "Tax Name", accessor: "taxname" },
//   { header: "Tax Type", accessor: "taxtype" },
//   { header: "Tax Rate", accessor: "taxrate" },
//   { header: "Created At", accessor: "createdat" },
//   { header: "Inventories", accessor: "inventories" },
// ];
// const Account = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   const navigate = useNavigate();

//   // Debounce search input
//   useEffect(() => {
//     const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
//     return () => clearTimeout(id);
//   }, [searchQuery]);

//   // Filter data safely
//   const filteredData = useMemo(() => {
//     if (!debouncedQuery) return taxes; // show all if empty

//     return taxes.filter((tax) =>
//       Object.values(tax)
//         .filter(Boolean)
//         .some((field) =>
//           field.toString().toLowerCase().includes(debouncedQuery.toLowerCase())
//         )
//     );
//   }, [debouncedQuery]);

//   return (
//     <Layout>
//       <div>
//         <PageHeader
//           title="Journal Entry"
//           subtitle="Add Journal Entry "
//           breadcrumb="Journal Entry"
//           actions={
//             <>
//               <SecondaryButton label="Cancel" />
//               <PrimaryButton
//                 label="+ Add Journal Entry"
//                 onClick={() => navigate("/add-journal")}
//               />
//             </>
//           }
//         />

//         <div className="table-container">
//           <DataTable
//             columns={columns}
//             data={filteredData}
//             showCheckbox={false}
//             showTransferAction={false}
//             showActions={true}
//             searchValue={searchQuery}
//             onSearchChange={setSearchQuery}
//             resetSelectionOnFilter
//             onEdit={(row) =>
//               navigate("/add-account", { state: { rowData: row } })
//             }
//             deleteTitle="Delete Charts of Accounts"
//             deleteParagraph="Are you sure you want to delete this Charts of Accounts? This action cannot be undone."
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Account;

import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
// import { Trash2 } from "lucide-react";



const AddJournalEntry = () => {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([
    { date: "", narration: "", account: "", debit: "", credit: "" },
  ]);

  const addEntry = () => {
    setEntries([
      ...entries,
      { date: "", narration: "", account: "", debit: "", credit: "" },
    ]);
  };

  const removeEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const totalDebit = entries.reduce(
    (acc, cur) => acc + (parseFloat(cur.debit) || 0),
    0
  );
  const totalCredit = entries.reduce(
    (acc, cur) => acc + (parseFloat(cur.credit) || 0),
    0
  );

  return (
    <Layout>
      <div className="p-4">
        <PageHeader
          title="Journal Entry"
          subtitle="Add Journal Entry"
          breadcrumb="Journal Entry"
          actions={
            <>
              <SecondaryButton label="Cancel" />
              <PrimaryButton
                label="+ Add Journal Entry"
                onClick={() => navigate("/add-journal")}
              />
            </>
          }
        />

        <div className="bg-white rounded-3 shadow-sm p-3 mt-3">
          {/* Table Header */}
          <div className="d-flex fw-semibold text-secondary border-bottom pb-2 mb-2">
            <div className="col-1">Date</div>
            <div className="col-2">Narration</div>
            <div className="col-2">Account</div>
            <div className="col-2">Debit</div>
            <div className="col-2">Credit</div>
            <div className="col-2 ">Total Debit</div>
            <div className="col-1">Total Credit</div>
          </div>

          {/* Entries */}
          {entries.map((entry, index) => (
            <div
              key={index}
              className="d-flex align-items-center border-bottom py-2"
            >
              <div className="col-1 pe-2">
                <input
                  type="date"
                  value={entry.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-2 pe-2">
                <input
                  type="text"
                  placeholder="Reason for entry"
                  value={entry.narration}
                  onChange={(e) =>
                    handleChange(index, "narration", e.target.value)
                  }
                  className="form-control"
                />
              </div>
              <div className="col-2 pe-2">
                <input
                  type="text"
                  placeholder="Account Name"
                  value={entry.account}
                  onChange={(e) =>
                    handleChange(index, "account", e.target.value)
                  }
                  className="form-control"
                />
              </div>
              <div className="col-2 pe-2 text-end">
                <input
                  type="number"
                  placeholder="₹"
                  value={entry.debit}
                  onChange={(e) => handleChange(index, "debit", e.target.value)}
                  className="form-control text-end"
                />
              </div>
              <div className="col-2 pe-2 text-end">
                <input
                  type="number"
                  placeholder="₹"
                  value={entry.credit}
                  onChange={(e) =>
                    handleChange(index, "credit", e.target.value)
                  }
                  className="form-control text-end"
                />
              </div>
              <div className="col-2 pe-2 text-end">
                <div>₹{totalDebit.toLocaleString()}</div>
              </div>
              <div className="col-1 pe-2 text-end">
                <div>₹{totalCredit.toLocaleString()}</div>
              </div>
              <div className="col-2 text-center">
                {entries.length > 1 && (
                  <button
                    onClick={() => removeEntry(index)}
                    className="btn btn-link text-danger p-0"
                  >
                    {/* <Trash2 size={18} /> */}
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="d-flex justify-content-end fw-bold mt-3">
            <div className="text-end me-5"></div>
            <div className="text-end"></div>
          </div>

          {/* Add Entry */}
          <button className="add-btn">+ Add Entry</button>
        </div>
      </div>
    </Layout>
  );
};

export default AddJournalEntry;
