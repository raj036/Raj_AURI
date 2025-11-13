import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // react-router-dom v6
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddVendorsCredits.css";
import Layout from "../../Components/Layout/Layout";

const AddVendorsCredits = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if edit mode
  const editData = location.state?.rowData || null;

  // State for form fields
  const [formData, setFormData] = useState({
    vendorcreditid: editData?.vendorcreditid || "",
    vendorid: editData?.vendorid || "",
    billid: editData?.billid || "",
    creditamount: editData?.creditamount || "",
    issuedate: editData?.issuedate || "",
    reason: editData?.reason || "",
    status: editData?.status || "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCancel = () => {
    navigate(-1); // go back one page
  };

  const handleSave = () => {
    if (editData) {
      console.log("Updating Vendor Credit:", formData);
      // TODO: call update API
    } else {
      console.log("Creating Vendor Credit:", formData);
      // TODO: call create API
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(-1);
      }, 3000); // hide after 3 seconds, then go back
    }

    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000); // hide after 3 seconds
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={editData ? "Edit Vendor Credit" : "Add Vendor Credit"}
          subtitle={
            editData
              ? "Update existing vendor credit details"
              : "Add a new vendor credit"
          }
          breadcrumb={["Vendor Credits"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={editData ? "Update" : "Save"}
                onClick={handleSave}
              />
            </>
          }
        />

        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Vendor Credit Details</p>
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Vendor Credit ID"
                  placeholder="45466"
                  value={formData.vendorcreditid}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorcreditid: e.target.value })
                  }
                />
                <InputField
                  label="Vendor ID"
                  placeholder="560096"
                  value={formData.vendorid}
                  onChange={(e) =>
                    setFormData({ ...formData, vendorid: e.target.value })
                  }
                />
                <InputField
                  label="Bill ID"
                  placeholder="6664"
                  value={formData.billid}
                  onChange={(e) =>
                    setFormData({ ...formData, billid: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Credit Amount"
                  placeholder="₹ 2,50,000"
                  value={formData.creditamount}
                  onChange={(e) =>
                    setFormData({ ...formData, creditamount: e.target.value })
                  }
                />

                <InputField
                  label="Issue Date"
                  placeholder="06-Aug-2025"
                  value={formData.issuedate}
                  onChange={(e) =>
                    setFormData({ ...formData, issuedate: e.target.value })
                  }
                />

                <SelectField
                  label="Reason"
                  options={["OverPayment", "Return", "Discount"]}
                  value={formData.reason}
                  onChange={(val) => setFormData({ ...formData, reason: val })}
                />
              </div>

              <div className="form-row">
                <SelectField
                  label="Status"
                  options={["Active", "Draft", "Inactive"]}
                  value={formData.status}
                  onChange={(val) => setFormData({ ...formData, status: val })}
                />
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
            {editData
              ? "Vendor Credit Updated Successfully"
              : "Vendor Credit Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddVendorsCredits;
