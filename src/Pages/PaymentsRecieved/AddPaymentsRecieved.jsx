import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../Components/PageHeader";
import UploadCard from "../../Components/UploadCard";
import {
  InputField,
  SelectField,
  PriceField,
  DateField,
} from "../../Components/FormField";
import { PrimaryButton, SecondaryButton } from "../../Components/Button";
import "./AddPaymentsRecieved.css";
import Layout from "../../Components/Layout/Layout";

const AddPaymentRecieved = () => {
  const navigate = useNavigate();

  const [variants, setVariants] = useState([{ id: Date.now() }]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const addVariant = () => {
    setVariants([...variants, { id: Date.now() }]);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
      navigate(-1);
    }, 3000);
  };

  return (
    <Layout>
      <div>
        <PageHeader
          title="Payments Received"
          subtitle="Add Payment Entry"
          breadcrumb={["Add Payment"]}
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
                <InputField label="Invoice ID" placeholder="56671" />
                <InputField label="Customer ID" placeholder="A-55541" />
              </div>

              <div className="form-row">
                <InputField label="Payment Date" placeholder="06/08/25" />
                <InputField label="Amount Received" placeholder="₹ 2,50,000" />
                <SelectField
                  label="Payment Mode"
                  options={[
                    "Cash",
                    "UPI",
                    "Credit Card",
                    "Debit Card",
                    "Net Banking",
                    "Cheque",
                  ]}
                />
              </div>
              <div className="form-row">
                <InputField
                  label="Reference Number"
                  placeholder="767666534423"
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

export default AddPaymentRecieved;
