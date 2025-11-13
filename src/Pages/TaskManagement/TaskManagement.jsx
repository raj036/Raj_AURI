import React, { useState, useMemo, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import DataTable from "../../Components/DataTable";
import { useNavigate } from "react-router-dom";
import { fetchTask } from "../../Utils/apiServices"; // Assuming the fetchTask is a function that returns a response
import { PrimaryButton } from "../../Components/Button";

const columns = [
  { header: "Task ID", accessor: "taskid" },
  { header: "Technician Name", accessor: "technicianname" },
  { header: "Task Details", accessor: "taskdetails" },
  { header: "Status", accessor: "status" },
  { header: "Assigned At", accessor: "assignedat" },
  { header: "Completed At", accessor: "completedat" },
  { header: "Started On", accessor: "startedon" }, // Corrected typo here
  { header: "Supervisor Feedback", accessor: "supervisorfeedback" },
];

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]); // State to store fetched tasks
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [loading, setLoading] = useState(true); // Loading state for data fetching

  const navigate = useNavigate();

  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetchTask(); // API call to fetch tasks

        // Log the response for debugging
        console.log("API Response:", response);

        const fetchedTasks = Array.isArray(response?.data?.data) ? response?.data?.data : []; // Ensure it's an array

        console.log("Fetched Tasks:", fetchedTasks); // Log fetched tasks

        // Check if data is empty or not
        if (fetchedTasks.length === 0) {
          console.warn("No tasks found in the response.");
        }

        // Map the API data to fit the columns format
        const mappedTasks = fetchedTasks.map((task) => ({
          taskid: task.taskId, // Map taskId to taskid (matching the column accessor)
          technicianname: "", // No technician name in the API, leaving as empty
          taskdetails: `${task.taskName} - ${task.serviceLocation}`, // Combine taskName and serviceLocation
          status: task.status, // Directly map status
          assignedat: task.assignedDate, // Directly map assignedDate
          completedat: "", // No completed date available
          startedon: "", // No started on date available
          supervisorfeedback: "", // No supervisor feedback available
        }));

        console.log("Mapped Tasks:", mappedTasks); // Log the mapped tasks

        setTasks(mappedTasks); // Set the mapped tasks to state
      } catch (error) {
        console.error("Error fetching tasks: ", error); // Handle error if fetching fails
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchTasksData(); // Call the API on component mount
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Debounce the search query
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(id); // Clean up the timeout
  }, [searchQuery]);

  // Filter tasks based on the debounced search query
  const filteredData = useMemo(() => {
    if (!debouncedQuery) return tasks; // Return all tasks if no query

    return tasks.filter((task) =>
      Object.values(task)
        .filter(Boolean) // Exclude falsy values like null, undefined, etc.
        .some((field) =>
          field.toString().toLowerCase().includes(debouncedQuery.toLowerCase()) // Case-insensitive search
        )
    );
  }, [debouncedQuery, tasks]);

  console.log("Filtered Data:", filteredData); // Log filtered data

  return (
    <Layout>
      <div>
        <PageHeader
          title="Task Management"
          subtitle="Add, edit, and manage your Tasks."
          breadcrumb="Task"
          actions={
            <PrimaryButton
              label="+ Add Task"
              onClick={() => navigate("/Add-Task")}
            />
          }
        />

        <div className="table-container" style={{ overflowX: "auto" }}>
          {loading ? (
            <div>Loading...</div> // Show loading state while fetching data
          ) : (
            <DataTable
              columns={columns}
              data={filteredData} // Pass the filtered tasks to the DataTable
              showCheckbox={false}
              showTransferAction={false}
              showActions={false}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              resetSelectionOnFilter
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TaskManagement;
