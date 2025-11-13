import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ to get rowData
import PageHeader from "../../Components/PageHeader";
import { InputField, SelectField } from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddAttendence.css";
import Layout from "../../Components/Layout/Layout";
import api from "../../Utils/api";

const AddAttendence = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData; // ✅ data passed from table edit

  // ✅ Form state
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    date: "",
    createddate: "",
    updateddate: "",
    workinghours: "",
    workingdays: "",
    checkin: "",
    checkout: "",
    status: "",
  });

  // ✅ Prepopulate in edit mode
  useEffect(() => {
    if (rowData) {
      setFormData({
        userid: rowData.userid || "",
        username: rowData.username || "",
        date: rowData.date || "",
        createddate: rowData.createddate || "",
        updateddate: rowData.updateddate || "",
        workinghours: rowData.workinghours || "",
        workingdays: rowData.workingdays || "",
        checkin: rowData.checkin || "",
        checkout: rowData.checkout || "",
        status: rowData.status || "",
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

  // ✅ Add or update attendance
  const handleSave = async () => {
    try {
      if (rowData) {
        await api.put(`/attendance/${rowData.id}`, formData);
      } else {
        await api.post("/attendance", formData);
      }
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  // ✅ Check-In
  const handleCheckIn = async () => {
    try {
      const res = await api.post("/attendance/check-in", {
        userId: formData.userid,
      });
      alert(
        `Checked in successfully at ${res.data?.checkInTime || "current time"}`
      );
    } catch (error) {
      console.error("Error during check-in:", error);
    }
  };

  // ✅ Check-Out
  const handleCheckOut = async () => {
    try {
      const res = await api.post(`/attendance/check-out?id=${formData.userid}`);
      alert(
        `Checked out successfully at ${
          res.data?.checkOutTime || "current time"
        }`
      );
    } catch (error) {
      console.error("Error during check-out:", error);
    }
  };

  // ✅ Fetch a single record (example)
  const fetchSingleAttendance = async () => {
    if (!rowData?.id) return;
    try {
      const res = await api.get(`/attendance/${rowData.id}`);
      console.log("Single attendance record:", res.data);
    } catch (error) {
      console.error("Error fetching attendance by ID:", error);
    }
  };

  useEffect(() => {
    fetchSingleAttendance();
  }, [rowData]);

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit Add Attendance" : "Add Attendance"}
          subtitle={rowData ? "Update user details" : "Add User Details"}
          breadcrumb={["Add Attendance"]}
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
                  placeholder="44301"
                  value={formData.userid}
                  onChange={(e) => handleChange("userid", e.target.value)}
                />
                <InputField
                  label="User Name"
                  placeholder="Suraj Sharma"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                <InputField
                  label="Date"
                  placeholder="20/08/2025"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>

              <div className="form-row">
                <InputField
                  label="Created Date"
                  placeholder="20/08/2025"
                  value={formData.createddate}
                  onChange={(e) => handleChange("createddate", e.target.value)}
                />
                <InputField
                  label="Updated Date"
                  placeholder="20/08/2025"
                  value={formData.updateddate}
                  onChange={(e) => handleChange("updateddate", e.target.value)}
                />
                <InputField
                  label="Working Hours"
                  placeholder="8:30 hrs"
                  value={formData.workinghours}
                  onChange={(e) => handleChange("workinghours", e.target.value)}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Working Days"
                  placeholder="18 Days"
                  value={formData.workingdays}
                  onChange={(e) => handleChange("workingdays", e.target.value)}
                />
                <InputField
                  label="Check in"
                  placeholder="9:15 AM"
                  value={formData.checkin}
                  onChange={(e) => handleChange("checkin", e.target.value)}
                />
                <InputField
                  label="Check out"
                  placeholder="5:00 PM"
                  value={formData.checkout}
                  onChange={(e) => handleChange("checkout", e.target.value)}
                />
              </div>
              <div className="form-row">
                <SelectField
                  label="Status"
                  placeholder="Present"
                  options={["Half Day", "Late", "Absent"]}
                  value={formData.status}
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

export default AddAttendence;
