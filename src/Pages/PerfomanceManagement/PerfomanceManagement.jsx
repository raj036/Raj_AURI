import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, SecondaryButton } from "../../Components/Button";

const vendors = [
  {
    performanceid: "560096",
    technicianname: "Vipul Sharma",
    month: "July",
    year: "2025",
    score: "88",
    taskscore: "88",
    overtimescore: "12",
    feedbackscore: "12",
    finalrating: "90",
  },
  {
    performanceid: "102384",
    technicianname: "Jenny agarval",
    month: "July",
    year: "2025",
    score: "12",
    taskscore0: "12",
    overtimescore: "45",
    feedbackscore: "45",
    finalrating: "100",
  },
  {
    performanceid: "560096",
    technicianname: "Vipul Sharma",
    month: "July",
    year: "2025",
    score: "100",
    taskscore: "100",
    overtimescore: "54",
    feedbackscore: "54",
    finalrating: "80",
  },
  {
    performanceid: "102384",
    technicianname: "Jenny agarval",
    month: "July",
    year: "2025",
    score: "80",
    taskscore: "80",
    overtimescore: "10",
    feedbackscore: "10",
    finalrating: "100",
  },
  {
    performanceid: "560096",
    technicianname: "Vipul Sharma",
    month: "July",
    year: "2025",
    score: "32",
    taskscore: "32",
    overtimescore: "5",
    feedbackscore: "5",
    finalrating: "70",
  },
  {
    performanceid: "102384",
    technicianname: "Jenny agarval",
    month: "July",
    year: "2025",
    score: "96",
    taskscore: "96",
    overtimescore: "90",
    feedbackscore: "90",
    finalrating: "90",
  },
  {
    performanceid: "560096",
    technicianname: "Vipul Sharma",
    month: "July",
    year: "2025",
    score: "23",
    taskscore: "23",
    overtimescore: "10",
    feedbackscore: "10",
    finalrating: "100",
  },
  {
    performanceid: "102384",
    technicianname: "Jenny agarval",
    month: "July",
    year: "2025",
    score: "90",
    taskscore: "90",
    overtimescore: "5",
    feedbackscore: "5",
    finalrating: "10",
  },
];

const columns = [
  { header: "Performance ID", accessor: "performanceid" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Month", accessor: "month" },
  { header: "Year", accessor: "year" },
  { header: "Punctuality Score (%)", accessor: "score" },
  { header: "Task Completion Score (%)", accessor: "taskscore" },
  { header: "Overtime Score (%)", accessor: "overtimescore" },
  { header: "Customer Feedback Score (%)", accessor: "feedbackscore" },
  { header: "Final Rating (%)", accessor: "finalrating" },
];
const PerfomanceManagement = () => {
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
          title="Performance Management"
          subtitle="Add edit and manage your Performance."
          breadcrumb="Performance"
        />

        <div className="table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            showCheckbox={false}
            showTransferAction={false}
            showActions={false}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resetSelectionOnFilter
            onEdit={(row) =>
              navigate("/add-vendors", { state: { rowData: row } })
            }
          />
        </div>
      </div>
    </Layout>
  );
};
export default PerfomanceManagement;
