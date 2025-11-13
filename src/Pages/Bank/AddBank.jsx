import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import Layout from "../../Components/Layout/Layout";
import "./AddBank.css";

const AddBank = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData || null;

  const [showSnackbar, setShowSnackbar] = useState(false);

  const [formData, setFormData] = useState({
    accountId: "",
    accountNumber: "",
    bankName: "",
    openingBalance: "",
    currentBalance: "",
    accountStatus: "",
    createdBy: "",
    createdAt: "",
  });

  // Prepopulate for edit
  useEffect(() => {
    if (rowData) {
      setFormData({
        accountId: rowData.accountid || "",
        accountNumber: rowData.accountnumber || "",
        bankName: rowData.branchname || "",
        openingBalance: rowData.openingBalance || "",
        currentBalance: rowData.currentBalance || "",
        accountStatus: rowData.status || "",
        createdBy: rowData.createdBy || "",
        createdAt: rowData.createdat || "",
      });
    }
  }, [rowData]);

  const handleCancel = () => navigate(-1);

  const handleSave = () => {
    if (rowData) {
      console.log("Updating Bank:", formData);
      // call update API
    } else {
      console.log("Adding Bank:", formData);
      // call add API
    }
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000);
    navigate(-1);
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Bank" : "Add Bank"}
          subtitle={rowData ? "Edit bank details" : "Add and manage your bank"}
          breadcrumb={["Bank"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Update Bank" : "Add Bank"}
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
                  label="Account ID"
                  value={formData.accountId}
                  onChange={(e) =>
                    setFormData({ ...formData, accountId: e.target.value })
                  }
                />
                <InputField
                  label="Account Number"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, accountNumber: e.target.value })
                  }
                />
                <SelectField
                  label="Bank Name"
                  options={["HDFC", "ICICI", "SBI", "Axis Bank"]}
                  value={formData.bankName}
                  onChange={(value) =>
                    setFormData({ ...formData, bankName: value })
                  }
                />
                <InputField
                  label="Opening Balance"
                  value={formData.openingBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, openingBalance: e.target.value })
                  }
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Current Balance"
                  value={formData.currentBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, currentBalance: e.target.value })
                  }
                />
                <SelectField
                  label="Account Status"
                  options={["Active", "Inactive"]}
                  value={formData.accountStatus}
                  onChange={(value) =>
                    setFormData({ ...formData, accountStatus: value })
                  }
                />
                <InputField
                  label="Created By"
                  value={formData.createdBy}
                  onChange={(e) =>
                    setFormData({ ...formData, createdBy: e.target.value })
                  }
                />
                <InputField
                  label="Created At"
                  value={formData.createdAt}
                  onChange={(e) =>
                    setFormData({ ...formData, createdAt: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <InputField
                  label="IFSC Code"
                  value={formData.currentBalance}
                  onChange={(e) =>
                    setFormData({ ...formData, currentBalance: e.target.value })
                  }
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
            {rowData ? "Bank Updated Successfully" : "Bank Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddBank;
