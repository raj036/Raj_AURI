import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddShipments.css";
import Layout from "../../Components/Layout/Layout";
import api from "../../Utils/api.js";
import Swal from "sweetalert2";
import { updateShipment, addShipment } from "../../Utils/apiServices.jsx";

const AddShipments = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ get edit data

  // ✅ Manage form state
  const [formData, setFormData] = useState({
    shipmentId: "",
    referenceType: "",
    referenceId: "",
    invoiceId: "",
    isBilled: "",
    fromBranchId: "",
    toBranchId: "",
    carrierName: "",
    trackingNumber: "",
    vehicleNumber: "",
    shipmentDate: "",
    expectedDeliveryDate: "",
    actualDeliveryDate: "",
    shipmentStatus: "",
    remarks: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
  });

  // ✅ Prepopulate if editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        shipmentId: rowData.shipmentId || "",
        referenceType: rowData.referenceType || "",
        referenceId: rowData.referenceId || "",
        invoiceId: rowData.invoiceId || "",
        isBilled: rowData.isBilled || "",
        fromBranchId: rowData.fromBranchId || "",
        toBranchId: rowData.toBranchId || "",
        carrierName: rowData.carrierName || "",
        trackingNumber: rowData.trackingNumber || "",
        vehicleNumber: rowData.vehicleNumber || "",
        actualDeliveryDate: rowData.actualDeliveryDate || "",
        packageid: rowData.packageid || "",
        shipmentDate: rowData.shipmentDate || "",
        expectedDeliveryDate: rowData.expectedDeliveryDate || "",
        shipmentStatus: rowData.shipmentStatus || "",
        remarks: rowData.remarks || "",
        createdat: rowData.createdat || "",
        updatedat: rowData.updatedat || "",
        createdby: rowData.createdby || "",
        updatedby: rowData.updatedby || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate(-1);

  const handleSave = async () => {
    console.log("🔑 Token after API call:", localStorage.getItem("authToken"));

     // ✅ Safely convert date fields only if they exist
    const toISO = (val) => {
      if (!val) return null;
      const d = new Date(val);
      return isNaN(d.getTime()) ? null : d.toISOString();
    };

    const payload = {
      ...(rowData && { shipmentId: rowData.shipmentId }),
      // shipmentId: rowData.shipmentId || "",
     referenceType: formData.referenceType || "MASTER",
      referenceId: Number(formData.referenceId) || null,
      invoiceId: Number(formData.invoiceId) || null,
      isBilled:
        formData.isBilled === true ||
        formData.isBilled?.toString().toLowerCase() === "true",
      fromBranchId: Number(formData.fromBranchId) || null,
      toBranchId: Number(formData.toBranchId) || null,  
      carrierName: formData.carrierName?.trim() || null,
      trackingNumber: formData.trackingNumber?.trim() || null,
      vehicleNumber: formData.vehicleNumber?.trim() || null,
      shipmentDate: toISO(formData.shipmentDate),
      expectedDeliveryDate: toISO(formData.expectedDeliveryDate),
      actualDeliveryDate: toISO(formData.actualDeliveryDate),
      shipmentStatus: formData.shipmentStatus?.toUpperCase() || "DISPATCHED",
      remarks: formData.remarks?.trim() || null,
    };
    console.log("Shipment Payload", payload);

        // ✅ Validation before sending
    if (!payload.referenceId || !payload.invoiceId)
      return Swal.fire("Error", "Reference ID and Invoice ID are required", "error");

    try {
      if (rowData) {
        await updateShipment(rowData.shipmentId, payload);
        Swal.fire("Success", "Shipment updated successfully!", "success");
      } else {
        await addShipment(payload);

        Swal.fire("Success", "Shipment added successfully!", "success");
      }

      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);

        navigate("/shipments");
      }, 2000);
    } catch (error) {
      console.error("Error saving shipment: ", error || error.response?.data);
      Swal.fire("Error", "Failed to save shipment", "error");
    }

    console.log("Saving shipment:", formData);
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Shipment" : "Add Shipment"}
          subtitle={rowData ? "Update shipment details" : "Add Shipment Entry"}
          breadcrumb={["Shipments"]}
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
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Shipment Details</p>
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Shipment ID"
                  value={formData.shipmentId}
                  onChange={(e) => handleChange("shipmentId", e.target.value)}
                />
                <InputField
                  label="Reference Type"
                  value={formData.referenceType}
                  onChange={(e) =>
                    handleChange("referenceType", e.target.value)
                  }
                />
                <InputField
                  label="Reference ID"
                  value={formData.referenceId}
                  onChange={(e) => handleChange("referenceId", e.target.value)}
                />
                <InputField
                  label="Invoice ID"
                  value={formData.invoiceId}
                  onChange={(e) => handleChange("invoiceId", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Is Billed"
                  value={formData.isBilled}
                  onChange={(e) => handleChange("isBilled", e.target.value)}
                />
                <InputField
                  label="From Batch ID"
                  value={formData.fromBranchId}
                  onChange={(e) => handleChange("fromBranchId", e.target.value)}
                />
                <InputField
                  label="To Branch ID"
                  value={formData.toBranchId}
                  onChange={(e) => handleChange("toBranchId", e.target.value)}
                />
                <InputField
                  label="Carrier Name"
                  value={formData.carrierName}
                  onChange={(e) => handleChange("carrierName", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Tracking Number"
                  value={formData.trackingNumber}
                  onChange={(e) =>
                    handleChange("trackingNumber", e.target.value)
                  }
                />
                <InputField
                  label="Vehicle Number"
                  value={formData.vehicleNumber}
                  onChange={(e) =>
                    handleChange("vehicleNumber", e.target.value)
                  }
                />
                <InputField
                  label="Shipment Date"
                  value={formData.shipmentDate}
                  onChange={(e) => handleChange("shipmentDate", e.target.value)}
                />
                <InputField
                  label="Expected Delivery Date"
                  value={formData.expectedDeliveryDate}
                  onChange={(e) =>
                    handleChange("expectedDeliveryDate", e.target.value)
                  }
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Actual Delivery date"
                  value={formData.actualDeliveryDate}
                  onChange={(e) =>
                    handleChange("actualDeliveryDate", e.target.value)
                  }
                />
                <SelectField
                  label="Status"
                  value={formData.shipmentStatus}
                  options={["Packed", "Dispatched", "Returned"]}
                  onChange={(e) => handleChange("shipmentStatus", e.target.value)}
                />
                <InputField
                  label="Remarks/Notes"
                  value={formData.remarks}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                />
                <InputField
                  label="Created At"
                  value={formData.createdAt}
                  onChange={(e) => handleChange("createdAt", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Updated At"
                  value={formData.updatedAt}
                  onChange={(e) => handleChange("updatedAt", e.target.value)}
                />

                <InputField
                  label="Created By"
                  value={formData.createdBy}
                  onChange={(e) => handleChange("createdBy", e.target.value)}
                />
                <InputField
                  label="Updated By"
                  value={formData.updatedBy}
                  onChange={(e) => handleChange("updatedBy", e.target.value)}
                />
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
                ? "Shipment Updated Successfully"
                : "Shipment Added Successfully"}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AddShipments;
