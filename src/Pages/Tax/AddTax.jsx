// AddTax.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // to get edit state
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import Layout from "../../Components/Layout/Layout";
import { addTax, updateTax } from "../../Utils/apiServices";
import "./AddTax.css";

const AddTax = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData || null; // existing tax for edit

  const [showSnackbar, setShowSnackbar] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    taxName: "",
    taxType: "",
    taxRate: "",
    // createdAt: "",
    // inventories: "",
  });

  // Prepopulate form if editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        id: rowData.id || "",
        taxName: rowData.taxName || "",
        taxType: rowData.taxType || "",
        taxRate: rowData.taxRate || "",
        // createdAt: rowData.createdat || "",
        // inventories: rowData.inventories || "",
      });
    }
  }, [rowData]);

  const handleCancel = () => {
    navigate(-1); // go back one page
  };

  const handleSave = async () => {
    // ✅ Validate and prepare payload
    if (!formData.taxName || !formData.taxType || !formData.taxRate) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      id: formData.id || "", // ✅ include ID if editing
      taxName: formData.taxName.trim(),
      taxType: formData.taxType,
      taxRate: Number(formData.taxRate), // ✅ Explicitly convert to number
    };

    console.log("📦 Sending to API:", payload);
    console.log("📦 Payload types:", {
      taxName: typeof payload.taxName,
      taxType: typeof payload.taxType,
      taxRate: typeof payload.taxRate,
    });

    try {
      if (rowData) {
        // ✅ FIXED: Now taxId is properly set
        console.log("Updating Tax ID:", payload);
        await updateTax(payload);
      } else {
        console.log("Adding Tax:", payload);
        await addTax(payload);
      }

      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("❌ Error saving tax:", error);
      // ✅ Show error to user
      alert(`Error: ${error.response || "Failed to save tax"}`);
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Tax" : "Add Tax"}
          subtitle={rowData ? "Edit tax details" : "Add and manage your tax"}
          breadcrumb={["Tax"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Update Tax" : "Add Tax"}
                onClick={handleSave}
              />
            </>
          }
        />

        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Tax Name"
                  value={formData.taxName}
                  onChange={(e) =>
                    setFormData({ ...formData, taxName: e.target.value })
                  }
                />
                <SelectField
                  label="Tax Type"
                  options={[
                    { label: "Percentage", value: "PERCENTAGE" },
                    { label: "Fixed", value: "FIXED" },
                  ]}
                  value={formData.taxType}
                  onChange={(e) =>
                    setFormData({ ...formData, taxType: e.target.value })
                  }
                />

                <InputField
                  label="Tax Rate"
                  value={formData.taxRate}
                  //  type="number"
                  // step="0.01"
                  onChange={(e) =>
                    setFormData({ ...formData, taxRate: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                {/* <SelectField
                  label="Inventories"
                  options={[
                    "Indoor Pest Control Spray",
                    "Creepy Crawly Indoor Spray",
                    "SafeNest Pest Control Spray",
                    "InsectShield Home Spray",
                  ]}
                  value={formData.inventories}
                  onChange={(value) =>
                    setFormData({ ...formData, inventories: value })
                  }
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Snackbar */}
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
            {rowData ? "Tax Updated Successfully" : "Tax Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddTax;
