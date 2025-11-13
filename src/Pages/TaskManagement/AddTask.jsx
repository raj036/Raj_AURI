import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import { createTask } from "../../Utils/apiServices";
import "./AddTask.css";
import Layout from "../../Components/Layout/Layout";

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData;
  const [showSnackbar, setShowSnackbar] = useState(false);

  // ✅ Separate state for each section
  const [taskData, setTaskData] = useState({
    taskId: "",
    taskName: "",
    customerName: "",
    email: "",
    phone: "",
    category: "",
    assignedDate: "",
    assignedTime: "",
    status: "",
    service: "",
    googleLink: "",
    fieldType: "",
    taskDetail: "",
    serviceLocation: "",
  });

  const [technicians, setTechnicians] = useState([
    { name: "", email: "", phone: "" },
  ]);

  const [materials, setMaterials] = useState([
    { name: "", quantity: "" },
  ]);

  // ✅ Prepopulate in edit mode
  useEffect(() => {
    if (rowData) {
      setTaskData({
        ...taskData,
        taskId: rowData.taskId || "",
        taskName: rowData.taskName || "",
        customerName: rowData.customerName || "",
        email: rowData.email || "",
        phone: rowData.phone || "",
        category: rowData.category || "",
        assignedDate: rowData.assignedDate || "",
        assignedTime: rowData.assignedTime || "",
        status: rowData.status || "",
        service: rowData.service || "",
        googleLink: rowData.googleLink || "",
        fieldType: rowData.fieldType || "",
        taskDetail: rowData.taskDetail || "",
        serviceLocation: rowData.serviceLocation || "",
      });
    }
  }, [rowData]);

  // ✅ Change handlers
  const handleTaskChange = (field, value) => {
    setTaskData({ ...taskData, [field]: value });
  };

  const handleTechnicianChange = (index, field, value) => {
    const updated = [...technicians];
    updated[index][field] = value;
    setTechnicians(updated);
  };

  const handleMaterialChange = (index, field, value) => {
    const updated = [...materials];
    updated[index][field] = value;
    setMaterials(updated);
  };

  const handleAddTechnician = () => {
    setTechnicians([...technicians, { name: "", email: "", phone: "" }]);
  };

  const handleAddMaterial = () => {
    setMaterials([...materials, { name: "", quantity: "" }]);
  };

  const handleCancel = () => navigate(-1);

  // ✅ Save handler with correct payload
const handleSave = async () => {
  try {
    // 🧭 Format date to YYYY-MM-DD
    const formattedDate = taskData.assignedDate
      ? new Date(taskData.assignedDate).toISOString().split("T")[0]
      : null;

    // 🕒 Format time to HH:mm:ss (24-hour)
    const formattedTime = taskData.assignedTime
      ? (() => {
          const time = taskData.assignedTime.trim();
          // If user entered in 3:30pm format, convert it
          const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
          if (match) {
            let hours = parseInt(match[1], 10);
            const minutes = match[2];
            const meridian = match[3];
            if (meridian?.toUpperCase() === "PM" && hours < 12) hours += 12;
            if (meridian?.toUpperCase() === "AM" && hours === 12) hours = 0;
            return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
          }
          // Already in HH:mm or HH:mm:ss format
          return time.length === 5 ? `${time}:00` : time;
        })()
      : null;

 const payload = {
  taskName: taskData.taskName,
  customerId: 5001,
  taskCategory: taskData.category || "CHEMICAL",
  taskStatus: taskData.status || "PENDING",
  taskDetails: taskData.taskDetails, 
  assignedDate: formattedDate,
  assignedTime: formattedTime,
  serviceId: [201, 202],
  googleLocationLink: taskData.googleLink,
  technicianTaskStatus: "ASSIGNED",
  fieldType: taskData.fieldType,
  ServiceLocation: taskData.serviceLocation, 
  technicianId: technicians.map((t, i) => 300 + i),
  materialDto: materials.map((m, i) => ({
    materialId: 400 + i,
    materialName: m.name,
    quantity: parseInt(m.quantity, 10) || 0,
    unit: "1",
    isUsed: false,
  })),
  latitude: taskData.latitude || 0.0, 
  longitude: taskData.longitude || 0.0, 
};


    console.log("📤 Sending Payload:", payload);

    const response = await createTask(payload);
    console.log("✅ Task Created Successfully:", response);

    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000);
  } catch (error) {
    console.error("❌ Error creating task:", error);
    alert("Failed to create task. Please try again.");
  }
};
  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Task" : "Add Task"}
          subtitle={rowData ? "Update Support Ticket" : "Add Task Entry"}
          breadcrumb={["Add Task"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Update" : "Save"}
                onClick={handleSave}
              />
            </>
          }
        />

        {/* ✅ Task Section */}
        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Task Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Task ID"
                  placeholder="560096 (Auto)"
                  value={taskData.taskId}
                  onChange={(e) => handleTaskChange("taskId", e.target.value)}
                />
                <InputField
                  label="Technician Id"
                  placeholder="Indoor Pest Control Spray"
                  value={taskData.customerid}
                  onChange={(e) => handleTaskChange("customerid", e.target.value)}
                />
                <InputField
                  label="Technician Name"
                  placeholder="Indoor Pest Control Spray"
                  value={taskData.customerid}
                  onChange={(e) => handleTaskChange("customerid", e.target.value)}
                />
                <InputField
                  label="Assigned At"
                  placeholder="Vipul Sharma"
                 
                  value={taskData.orderid}
                  onChange={(e) => handleTaskChange("orderid", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Task Details"
                  placeholder="suraj@gmail.com"
                  value={taskData.email}
                  onChange={(e) => handleTaskChange("email", e.target.value)}
                />
                <InputField
                  label="Completed At"
                  placeholder="+91 98657 76765"
                  value={taskData.phone}
                  onChange={(e) => handleTaskChange("phone", e.target.value)}
                />
                <InputField
                  label="Started On"
                  placeholder="Chemicals"
                  value={taskData.category}
                  onChange={(e) =>
                    handleTaskChange("category", e.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Supervisor Feedback"
                  placeholder="06-Aug-2025"
                  value={taskData.assignedDate}
                  onChange={(e) =>
                    handleTaskChange("assignedDate", e.target.value)
                  }
                />
                <SelectField
                  label="Status"
                  placeholder="Complete"
                  options={["Complete", "Pending", "In Progress"]}
                  value={taskData.duedate}
                  onChange={(e) => handleTaskChange("duedate", e.target.value)}
                />
               
              </div>

              <div className="form-row">
                <SelectField
                  label="Service"
                  placeholder="Pest Control"
                  options={[
                    "Outdoor Cleaning",
                    "Full Home Pest Control",
                    "Indoor Cleaning",
                    "Sanitization",
                  ]}
                  value={taskData.service}
                  onChange={(e) => handleTaskChange("service", e.target.value)}
                />
                <InputField
                  label="Google Location Link"
                  placeholder="https://maps.google.com/?q=19.0760,72.8777"
                  value={taskData.googleLink}
                  onChange={(e) =>
                    handleTaskChange("googleLink", e.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Field Type"
                  placeholder="Commercial / Residential"
                  value={taskData.fieldType}
                  onChange={(e) =>
                    handleTaskChange("fieldType", e.target.value)
                  }
                />
                <InputField
                  label="Task Details"
                  placeholder="Describe the task details here..."
                  value={taskData.taskDetail}
                  onChange={(e) =>
                    handleTaskChange("taskDetail", e.target.value)
                  }
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Service Location"
                  placeholder="Flat 301, Sunshine Apartments, Bangalore"
                  value={taskData.serviceLocation}
                  onChange={(e) =>
                    handleTaskChange("serviceLocation", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Technician Section */}
        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Technician Details</p>
            </div>
            <div className="product-form-fields">
              {technicians.map((tech, index) => (
                <div className="form-row" key={index}>
                  <SelectField
                    label="Technician Name"
                    placeholder="Select Technician"
                    options={[
                      "Abhay Singh",
                      "Jenny Agarwal",
                      "Kusum Jha",
                      "Narine Ram",
                    ]}
                    value={tech.name}
                    onChange={(e) =>
                      handleTechnicianChange(index, "name", e.target.value)
                    }
                  />
                  <InputField
                    label="Technician Email"
                    placeholder="example@domain.com"
                    value={tech.email}
                    onChange={(e) =>
                      handleTechnicianChange(index, "email", e.target.value)
                    }
                  />
                  <InputField
                    label="Technician Phone"
                    placeholder="+91 98765 43210"
                    value={tech.phone}
                    onChange={(e) =>
                      handleTechnicianChange(index, "phone", e.target.value)
                    }
                  />
                </div>
              ))}
              <button className="add-btn" onClick={handleAddTechnician}>
                + Add Technician
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Material Section */}
        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Material Details</p>
            </div>
            <div className="product-form-fields">
              {materials.map((mat, index) => (
                <div className="form-row" key={index}>
                  <SelectField
                    label="Product Name"
                    placeholder="Select Material"
                    options={[
                      "Special Super Liquid",
                      "Roach Powder",
                      "Termite Powder",
                      "Washing Powder",
                    ]}
                    value={mat.name}
                    onChange={(e) =>
                      handleMaterialChange(index, "name", e.target.value)
                    }
                  />
                  <InputField
                    label="Measuring Value (Weight)"
                    placeholder="e.g. 250 ml"
                    value={mat.quantity}
                    onChange={(e) =>
                      handleMaterialChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
              ))}
              <button className="add-btn" onClick={handleAddMaterial}>
                + Add Material
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Snackbar */}
        {showSnackbar && (
          <div
            style={{
              position: "fixed",
              top: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#4BB543",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 9999,
            }}
          >
            Task Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddTask;
