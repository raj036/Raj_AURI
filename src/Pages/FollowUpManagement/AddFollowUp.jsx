import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddFollowUp.css";
import Layout from "../../Components/Layout/Layout";
import api from "../../Utils/api";
import { addFollowUp, updateFollowUp } from "../../Utils/apiServices.jsx";
import Swal from "sweetalert2";

const AddFollowUp = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ data passed from table edit

  // ✅ Form state
  const [formData, setFormData] = useState({
    id: "",
    leadId: "",
    customerId: "",
    followUpType: "CALL",
    notes: "",
    nextFollowUpDate: "",
    nextFollowUpTime: "",
    status: "SCHEDULED",
    completionDate: "",
    createdAt: "",
    updatedAt: "",
  });

  // ✅ Prepopulate in edit mode
  useEffect(() => {
    console.log("📦 Received rowData:", rowData);
    if (rowData) {
      setFormData({
        id: rowData.id || "",
        leadId: rowData.leadId || "",
        customerId: rowData.customerId || "",
        followUpType: rowData.followUpType || "CALL",
        notes: rowData.notes || "",
        nextFollowUpDate: rowData.nextFollowUpDate || "",
        nextFollowUpTime: rowData.nextFollowUpTime || "",
        status: rowData.status || "SCHEDULED",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate("/follow-up-management");

  // const handleSave = () => {
  //   setShowSnackbar(true);
  //   setTimeout(() => {
  //     setShowSnackbar(false);
  //     navigate(-1);
  //   }, 3000); // hide after 3 seconds, then go back
  //   if (rowData) {
  //     console.log("Updating invoice:", formData);
  //     // 🔄 Call update API
  //   } else {
  //     console.log("Adding new invoice:", formData);
  //     // 🔄 Call create API
  //   }
  // };

  // ✅ Add or update attendance
  const handleSave = async () => {

     // ✅ Validation
    if (!formData.leadId && !formData.customerId) {
      return Swal.fire("Error", "Either Lead ID or Customer ID is required", "error");
    }

    // ✅ Prepare payload matching backend expectations
    const payload = {
      ...(rowData && { id: rowData.id }), // Include id only when updating
      leadId: Number(formData.leadId) || null,
      customerId: Number(formData.customerId) || null,
      followUpType: formData.followUpType?.toUpperCase() || "CALL",
      notes: formData.notes?.trim() || null,
      nextFollowUpDate: formData.nextFollowUpDate || null,
      nextFollowUpTime: formData.nextFollowUpTime || null,
      status: formData.status?.toUpperCase() || "SCHEDULED",
    };

    console.log("💾 Follow-up Payload:", payload);

    try {
      if (rowData) {
             await updateFollowUp(rowData.shipmentId, payload);
             Swal.fire("Success", "Shipment updated successfully!", "success");
           } else {
             await addFollowUp(payload);
     
             Swal.fire("Success", "Shipment added successfully!", "success");
           }
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate("/follow-up-management");
      }, 2000);
    } catch (error) {
      console.error("Error saving attendance:", error);
      Swal.fire("Error", "Failed to save follow-up", "error");
    }
  };

  
  return (
    <Layout>
      <div>
        <PageHeader
          title={
            rowData ? "Edit Add Follow-Up Details" : "Add Follow-Up Details"
          }
          subtitle={
            rowData ? "Update Follow-Up details" : "Add Follow-Up Details"
          }
          breadcrumb={["Follow-Up"]}
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

        <div className="product-form-card">
          {/* Invoice Details */}
          <div className="product-form-grid">
            {/* <div className="upload-section">
              <p>Follow-Up Details</p>
            </div> */}
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Follow-Up ID"
                  placeholder="Auto-generated"
                  value={formData.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                  disabled={true}
                />
                <InputField
                  label="Lead ID"
                  type="number"
                  placeholder="Enter Lead ID"
                  value={formData.leadId}
                  onChange={(e) => handleChange("leadId", e.target.value)}
                />
                <InputField
                  label="Customer ID"
                  type="number"
                  placeholder="Enter Customer ID"
                  value={formData.customerId}
                  onChange={(e) => handleChange("customerId", e.target.value)}
                />
                <SelectField
                  label="Follow-Up Type"
                  options={["CALL", "EMAIL", "MEETING", "VISIT"]}
                  value={formData.followUpType}
                  onChange={(e) => handleChange("followUpType", e.target.value)}
                />
              </div>

              <div className="form-row">
                 <InputField
                  label="Next Follow-Up Date"
                  type="date"
                  value={formData.nextFollowUpDate}
                  onChange={(e) => handleChange("nextFollowUpDate", e.target.value)}
                />
                <InputField
                  label="Next Follow-Up Time"
                  type="time"
                  placeholder="10:30"
                  value={formData.nextFollowUpTime}
                  onChange={(e) => handleChange("nextFollowUpTime", e.target.value)}
                />
                <SelectField
                  label="Status"
                  options={["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"]}
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
                <InputField
                  label="Notes"
                  placeholder="Enter notes or comments"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Completed Date"
                  placeholder="Suraj Sharma"
                  value={formData.completionDate}
                  onChange={(e) => handleChange("completionDate", e.target.value)}
                />
                <InputField
                  label="Created At"
                  placeholder="Suraj Sharma"
                  value={formData.createdAt}
                  onChange={(e) => handleChange("createdAt", e.target.value)}
                />
                <InputField
                  label="Updated At"
                  placeholder="10-10-2025"
                  value={formData.updatedAt}
                  onChange={(e) => handleChange("updatedAt", e.target.value)}
                />
               
              </div>
              
            </div>
          </div>
        </div>
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
             {rowData
              ? "Follow-Up Updated Successfully"
              : "Follow-Up Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddFollowUp;
