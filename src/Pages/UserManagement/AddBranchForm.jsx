import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // navigation + get row data
import PageHeader from "../../Components/PageHeader";
import {
  InputField,
  SelectField,
  WeightField,
} from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddBranchForm.css";
import Layout from "../../Components/Layout/Layout";
import EditableData from "../../Components/EditableData";
import { createUser, updateUser } from "../../Utils/apiServices"; // ✅ add import

const AddBranchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rowData = location.state?.rowData || null; // data from edit button

  const [showSnackbar, setShowSnackbar] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    status: "",
  });

  // ✅ Prepopulate form if editing
  useEffect(() => {
    if (rowData) {
      setFormData({
        name: rowData.name || "",
        email: rowData.email || "",
        role: rowData.role || "",
        phone: rowData.phoneNo || "",
        password: rowData.password || "",
        status: rowData.status || "",
      });
    }
  }, [rowData]);

  const handleCancel = () => {
    navigate(-1); // go back one page
  };

  const handleSave = async () => {
    try {
      // ✅ Construct payload differently for Create vs Update
      let payload;

      if (rowData) {
        // ✅ EDIT — send only required fields for update
        payload = {
          id: rowData.id,
          firstName: formData.name.split(" ")[0],
          lastName: formData.name.split(" ")[1] || "",
          email: formData.email,
          phoneNo: Number(formData.phone),
        };
        console.log("📝 Updating user payload:", payload);
        await updateUser(payload);
      } else {
        // ✅ CREATE — include all required fields
        payload = {
          firstName: formData.name.split(" ")[0],
          lastName: formData.name.split(" ")[1] || "",
          email: formData.email,
          phoneNo: Number(formData.phone),
          password: formData.password,
          roles: [{ roleName: formData.role.toUpperCase() }],
          active: formData.status === "Active",
        };
        console.log("➕ Creating user payload:", payload);
        await createUser(payload);
      }

      // ✅ Show success snackbar
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
        navigate(-1);
      }, 3000);
    } catch (error) {
      console.error("❌ Error saving user:", error);
      alert("Failed to save user");
    }
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title={rowData ? "Edit User" : "Add User"}
          subtitle={rowData ? "Edit User details" : "Add User details"}
          breadcrumb={["User Management"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton
                label={rowData ? "Save Changes" : "Save"}
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
                  label="Name"
                  required
                  placeholder="Suraj Sharma"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <InputField
                  label="Email"
                  placeholder="Suraj@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <SelectField
                  label="Select Role"
                  options={["Technician", "Equipment", "Employee"]}
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  disabled={!!rowData} // ✅ disable role editing for update if required
                />
              </div>

              <div className="form-row">
                <WeightField
                  label="Phone Number"
                  placeholder="9787878787"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <InputField
                  label="Password"
                  placeholder="254-546-612"
                  required={!rowData} // ✅ password required only for Add
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  disabled={!!rowData} // ✅ disable password when editing
                />
                <SelectField
                  label="Status"
                  options={["Active", "Delay"]}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                />
              </div>
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
            {rowData ? "User Updated Successfully" : "User Added Successfully"}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddBranchForm;
