import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // react-router-dom v6
import PageHeader from "../../Components/PageHeader";
import UploadCard from "../../Components/UploadCard";
import {
  InputField,
  SelectField,
  PriceField,
  DateField,
} from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddPaymentsMade.css";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Layout from "../../Components/Layout/Layout";

const AddPaymentsMade = () => {
  const navigate = useNavigate();

  const [variants, setVariants] = useState([{ id: Date.now() }]); // default one variant
  const [showSnackbar, setShowSnackbar] = useState(false);

  const addVariant = () => {
    setVariants([...variants, { id: Date.now() }]);
  };

  const handleCancel = () => {
    navigate(-1); // go back one page
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
          title="Add Payments"
          subtitle="Add Payments Entry"
          breadcrumb={["Add Payments"]}
          actions={
            <>
              <SecondaryButton label="Cancel" onClick={handleCancel} />
              <PrimaryButton label="Save" onClick={handleSave} />
            </>
          }
        />

        <div className="product-form-card">
          <div className="product-form-grid">
            <div className="upload-section">
              <p>Payments Details</p>
            </div>

            <div className="product-form-fields">
              <div className="form-row">
                <InputField label="Payment ID" placeholder="45466 (Auto)" />
                <InputField label="Bill ID" placeholder="6664" />
                <InputField label="Vendor ID" placeholder="560096" />
              </div>

              <div className="form-row">
                <InputField label="Amount Paid" placeholder="₹ 2,50,000" />

                <SelectField
                  label="Payment Mode"
                  options={[
                    "Cash",
                    "Cheque",
                    "Credit Card",
                    "Debit Card",
                    "Net Banking",
                    "UPI",
                  ]}
                />
                <InputField
                  label="Reference Number"
                  placeholder="767666534423"
                />
              </div>
              <div className="form-row">
                <SelectField
                  label="Status"
                  options={["Active", "Draft", "Inactive"]}
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
            Payment Added Successfully
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddPaymentsMade;
