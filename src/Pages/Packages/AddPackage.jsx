import React, { useState } from "react";
import "./AddPackage.css";
import Layout from "../../Components/Layout/Layout";
import PageHeader from "../../Components/PageHeader";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import {
  InputField,
  SelectField,
  WeightField,
} from "../../Components/FormField";
import { getValue } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";

const AddPackage = () => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [weightValue, setWeightValue] = useState("1.5");
  const [weightUnit, setWeightUnit] = useState("KG");
  const navigate = useNavigate();

  const handleWeightChange = (e) => {
    setWeightValue(e.target.value);
  };
  const handleUnitChange = (e) => {
    setWeightUnit(e.target.value);
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const handleSave = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000); // hide after 3 seconds, then go back
  };
  return (
    <Layout>
      <div>
        <PageHeader
          title="Add Package"
          subtitle="Add Package Entry"
          breadcrumb="Add Package"
          actions={
            <div className="actions">
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton label="Save" onClick={handleSave} />
            </div>
          }
        />
        <div className="add-package-container">
          <span className="add-package-span">Package Details</span>
          <div className="add-package-feild">
            <div className="add-package-row1">
              <InputField label="Package ID" placeholder="56671" />
              <InputField label="Order ID" placeholder="A-55541" />
              <InputField label="Order Date" placeholder="03/06/25" />
            </div>
            <div className="add-package-row2">
              <InputField label="Package Date" placeholder="03/06/25" />
              <SelectField label="Status" options={["Packed", "Unpacked"]} />
              <InputField label="Item Quantity" placeholder="440" />
            </div>
            <div className="add-package-row3">
              <WeightField
                label="Weight"
                placeholder="1.5"
                options={["KG", "G"]}
              />
            </div>
            <div className="add-package-row4">
              <WeightField
                label="Dimensions (Height)"
                placeholder="4.3"
                options={["FT", "IN"]}
              />
              <WeightField
                label="Dimensions (Length)"
                placeholder="5.5"
                options={["FT", "IN"]}
              />
              <WeightField
                label="Dimensions (Width)"
                placeholder="8.3"
                options={["FT", "IN"]}
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
            Package Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddPackage;
