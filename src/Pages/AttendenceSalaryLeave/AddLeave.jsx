import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddLeave.css";
import Layout from "../../Components/Layout/Layout";
import api from "../../Utils/api"

const AddLeave = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ data passed from table edit

  // ✅ Form state
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    startdate: "",
    enddate: "",
    reason: "",
    leavebalance: "",
    leavetype: "",
    status: "Pending",
    approvedby: "",
  });

  // ✅ Fetch specific leave for editing
  useEffect(() => {
    const fetchLeave = async () => {
      if (rowData?.id) {
        try {
          const res = await api.get(`/leave/${rowData.id}`);
          setFormData(res.data);
        } catch (error) {
          console.error("Error fetching leave:", error);
        }
      }
    };
    fetchLeave();
  }, [rowData]);

  // ✅ Prepopulate in edit mode
  useEffect(() => {
    if (rowData) {
      setFormData({
        userid: rowData.userid || "",
        username: rowData.username || "",
        startdate: rowData.startdate || "",
        enddate: rowData.enddate || "",
        reason: rowData.reason || "", // map invoiceitems as itemid
        leavebalance: rowData.leavebalance || "",
        leavetype: rowData.leavetype || "",
        status: rowData.status || "",
        approvedby: rowData.approvedby || "",
      });
    }
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCancel = () => navigate(-1);

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

   // ✅ Save or Update Leave
  const handleSave = async () => {
    try {
      if (rowData?.id) {
        await api.put(`/leave/${rowData.id}`, formData);
      } else {
        // Note: POST /leave/{id} pattern → using username as id or generate one dynamically
        await api.post(`/leave/${formData.username}`, formData);
      }

      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate("/leave");
      }, 2000);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Leave" : "Add Leave"}
          subtitle={rowData ? "Update user details" : "Add User Details"}
          breadcrumb={["Add Leave"]}
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
            <div className="upload-section">
              <p>User Details</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="User ID"
                  value={formData.userid}
                  onChange={(e) => handleChange("userid", e.target.value)}
                />
                <InputField
                  label="User Name"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                <InputField
                  label="Start Date"
                  value={formData.startdate}
                  onChange={(e) => handleChange("startdate", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="End Date"
                  value={formData.enddate}
                  onChange={(e) => handleChange("enddate", e.target.value)}
                />
                <InputField
                  label="Reason"
                  value={formData.reason}
                  onChange={(e) => handleChange("reason", e.target.value)}
                />
                <InputField
                  label="Leave Balance"
                  value={formData.leavebalance}
                  onChange={(e) => handleChange("leavebalance", e.target.value)}
                />
              </div>
              <div className="form-row">
                <SelectField
                  label="Leave Type"
                  placeholder="Sick"
                  options={["Casual", "Annual"]}
                  value={formData.leavetype}
                  onChange={(e) => handleChange("leavetype", e.target.value)}
                />
                <SelectField
                  label="Status"
                  placeholder="Approved"
                  options={["Rejected", "Pending"]}
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                />
                <SelectField
                  label="Approved By"
                  placeholder="Abhay Singh"
                  options={["Jenny agarval", "Kusum Jha", "Narine Ram", "Vipul Sharma"]}
                  value={formData.approvedby}
                  onChange={(e) => handleChange("approvedby", e.target.value)}
                />
              </div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #E9EAEB",
              marginTop: "50px",
            }}
          />

          {/* Invoice Items */}
          <div className="product-form-grid" style={{ marginTop: "50px" }}>
            <div className="upload-section">
              <p>Invoice Items</p>
            </div>
            <div className="product-form-fields">
              <div className="form-row">
                <InputField
                  label="Item ID"
                  value={formData.itemid}
                  onChange={(e) => handleChange("itemid", e.target.value)}
                />
                <InputField
                  label="Quantity"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <InputField
                  label="Rate"
                  value={formData.rate}
                  onChange={(e) => handleChange("rate", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Tax"
                  value={formData.tax}
                  onChange={(e) => handleChange("tax", e.target.value)}
                />
                <InputField
                  label="Total Amount"
                  value={formData.totalamount}
                  onChange={(e) => handleChange("totalamount", e.target.value)}
                />
                <SelectField
                  label="Status"
                  value={formData.status}
                  options={["Pending", "Paid", "Overdue"]}
                  onChange={(e) => handleChange("status", e.target.value)}
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
            Invoices Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddLeave;
