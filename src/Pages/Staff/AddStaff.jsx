import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import Layout from "../../Components/Layout/Layout";
import "./AddStaff.css";
import UploadCard from "../../Components/UploadCard";

const AddStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData || null;

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    adharcardNumber: "",
    staffId: "",
    staffName: "",
    email: "",
    contactNumber: "",
    designation: "",
    staffStatus: "",
    branchName: "",
  });

  // Prepopulate form for edit
  useEffect(() => {
    if (rowData) {
      setFormData({
        adharcardNumber: rowData.adharcardNumber || "",
        staffId: rowData.staffid || "",
        staffName: rowData.taxname || "",
        email: rowData.taxtype || "",
        contactNumber: rowData.contactnumber || "",
        designation: rowData.designation || "",
        staffStatus: rowData.status || "",
        branchName: rowData.branch || "",
      });
    }
  }, [rowData]);

  const handleCancel = () => navigate(-1);

  const handleSave = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000); // hide after 3 seconds, then go back
    if (rowData) {
      console.log("Updating Staff:", formData);
      // call update API
    } else {
      console.log("Adding Staff:", formData);
      // call add API
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Staff" : "Add Staff"}
          subtitle={
            rowData ? "Edit staff details" : "Add and manage staff members"
          }
          breadcrumb={["Staff"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Update Staff" : "Save"}
                onClick={handleSave}
              />
            </>
          }
        />

        <div className="product-form-card">
          <div className="form-row">
            <InputField
              label="Adhar Card Number"
              value={formData.adharcardNumber}
              required
              onChange={(e) =>
                setFormData({ ...formData, adharcardNumber: e.target.value })
              }
            />
          </div>
          <div className="product-form-grid">
            <div className="upload-section">
              <UploadCard />
            </div>

            <div className="product-form-fields">
              <div className="mycus">
                <div className="form-row">
                  <InputField
                    label="Staff ID"
                    value={formData.staffId}
                    onChange={(e) =>
                      setFormData({ ...formData, staffId: e.target.value })
                    }
                  />
                  <InputField
                    label="Staff Name"
                    value={formData.staffName}
                    onChange={(e) =>
                      setFormData({ ...formData, staffName: e.target.value })
                    }
                  />
                  <InputField
                    label="Email ID"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-row">
                  <InputField
                    label="Contact Number"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                  <SelectField
                    label="Designation"
                    options={["Manager", "Executive"]}
                    value={formData.designation}
                    onChange={(value) =>
                      setFormData({ ...formData, designation: value })
                    }
                  />
                  <SelectField
                    label="Staff Status"
                    options={["Active", "Inactive"]}
                    value={formData.staffStatus}
                    onChange={(value) =>
                      setFormData({ ...formData, staffStatus: value })
                    }
                  />
                </div>
                <div className="form-row">
                  <InputField
                    label="Branch Name"
                    value={formData.branchName}
                    onChange={(e) =>
                      setFormData({ ...formData, branchName: e.target.value })
                    }
                  />
                </div>
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
              ? "Staff Updated Successfully"
              : "Staff Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddStaff;
