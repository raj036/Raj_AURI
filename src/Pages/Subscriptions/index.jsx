import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Subscriptions.css";
import { Add, Remove, CheckCircle } from "@mui/icons-material";
import Sidebar from "../../Components/Sidebar";
import { Grid } from "@mui/material";
import api from "../../Utils/api";
import { addUserSubcription } from "../../Utils/apiServices";

const Subscription = () => {
  const [branches, setBranches] = useState(2);
  const [technicians, setTechnicians] = useState(3);
  const [extraUsers, setExtraUsers] = useState(2);
  const [billingType, setBillingType] = useState("annual");
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [gstRate, setGstRate] = useState(0.18);
  const [costPerBranch, setCostPerBranch] = useState(25000);
  const [costPerTechnician, setCostPerTechnician] = useState(2000);
  const [costPerExtraUser, setCostPerExtraUser] = useState(12000);

  const [formData, setFormData] = useState({
    userId: "aryan@gmail.com",
    companyCode: "COMP31",
    branchCode: "BR004",
    totalBranches: 1,
    totalTechnicians: 0,
    accountUser: 0,
    totalAmount: 0,
    paymentStatus: "PENDING",
    paymentMethod: "RAZORPAY",
    paymentTransactionId: "pay_ABC123XYZ",
    planPeriod: "MONTHLY",
    planPeriodForBranches: "Basic",
    planPeriodForTechnicians: "Premium",
  });

  // ✅ Unified counter change handler
  const handleCounterChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Math.max(0, value),
    }));
  };

  // 🧾 Save subscription
  const handleSave = async () => {
     console.log("🟠 handleSave() triggered!");
    console.log("🔑 Token after API call:", localStorage.getItem("authToken"));
    const payload = {
      ...formData,
      totalAmount: total,
    };

    console.log("📤 Sending Subscription Data:", payload);

    try {
      setLoading(true);
      const res = await addUserSubcription(payload);
      console.log("✅ Subscription Added:", res.data);
      alert("✅ Subscription added successfully!");
      navigate("/Subscription-log-screen");
    } catch (error) {
      console.error(
        "❌ Subscription API Error:",
        error.response?.data || error
      );
      alert("❌ Failed to add subscription. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  //Fetch subscription data from api
  useEffect(() => {
    const fetchSubscription = async () => {
      setLoading(true);
      try {
        const res = await api.getSubscriptionDetails();
        const data = res.data;
        setBranches(data.branches);
        setTechnicians(data.technicians);
        setExtraUsers(data.extraUsers);
        setBillingType(data.billingType);
        setGstRate(data.gstRate);
        setCostPerBranch(data.costPerBranch);
        setCostPerTechnician(data.costPerTechnician);
        setCostPerExtraUser(data.costPerExtraUser);
      } catch (error) {
        console.error("Error fetching subcription data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  //Calculate all cost dynamically
  const branchCost = costPerBranch * branches;
  const technicianCost = costPerTechnician * 12 * technicians;
  const extraUserCost = costPerExtraUser * extraUsers;
  const subtotal = branchCost + technicianCost + extraUserCost;
  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  //Simulate payment api
  const handlePayment = async () => {
    const paymentData = {
      branches,
      technicians,
      extraUsers,
      billingType,
      subtotal,
      gst,
      total,
    };

    try {
      const res = await api.postPayment(paymentData);
      if (res.status === 200) {
        alert("Payment Successful!");
      }
    } catch (error) {
      alert("Payment Failed!");
      console.error("Payment error: ", error);
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading Subscription...</p>;

  // const gstRate = 0.18;
  // const branchCost = 25000 * branches;
  // const technicianCost = 2000 * 12 * technicians;
  // const extraUserCost = 12000 * extraUsers;

  // const subtotal = branchCost + technicianCost + extraUserCost;
  // const gst = subtotal * gstRate;
  // const total = subtotal + gst;

  return (
    <>
      <div className="company-info-page">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>

          <Grid item xs={12} md={8}>
            <div className="subscription-container">
              <h2 className="subscription-title">Subscription</h2>

              {/* Counter Section */}
              <div className="counter-section" style={{ marginTop: "30px" }}>
                <div className="counter-box">
                  <label>Number of Branch</label>
                  <div className="counter-controls">
                    <button
                      onClick={() =>
                      handleCounterChange(
                        "totalBranches",
                        formData.totalBranches - 1
                      )
                    }
                    >
                      <Remove />
                    </button>
                    <span>{String(formData.totalBranches).padStart(2, "0")}</span>
                    <button onClick={() =>
                      handleCounterChange(
                        "totalBranches",
                        formData.totalBranches + 1
                      )
                    }>
                      <Add />
                    </button>
                  </div>
                </div>

                <div className="counter-box">
                  <label>Number of Technicians</label>
                  <div className="counter-controls">
                    <button
                      onClick={() =>
                      handleCounterChange(
                        "totalTechnicians",
                        formData.totalTechnicians - 1
                      )
                    }
                    >
                      <Remove />
                    </button>
                    <span>{String(formData.totalTechnicians).padStart(2, "0")}</span>
                    <button onClick={() =>
                      handleCounterChange(
                        "totalTechnicians",
                        formData.totalTechnicians + 1
                      )
                    }>
                      <Add />
                    </button>
                  </div>
                </div>

                <div className="counter-box">
                  <label>Extra Account User</label>
                  <div className="counter-controls">
                    <button
                      onClick={() =>
                      handleCounterChange("accountUser", formData.accountUser - 1)
                    }
                    >
                      <Remove />
                    </button>
                    <span>{String(formData.accountUser).padStart(2, "0")}</span>
                    <button onClick={() =>
                      handleCounterChange("accountUser", formData.accountUser + 1)
                    }>
                      <Add />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards Section */}
              <div className="subscription-grid">
                {/* Left Card */}
                <div className="allocation-card">
                  <h3>Default Allocation (per branch)</h3>
                  <div className="allocation-item">
                    <span>👤 1 Account user</span>
                    <span className="status free">Free</span>
                  </div>
                  <div className="allocation-item">
                    <span>🧾 1 Billing person</span>
                    <span className="status free">Free</span>
                  </div>
                  <div className="allocation-item">
                    <span>👥 Unlimited Sales/Other staff</span>
                    <span className="status not-charged">Not Charged</span>
                  </div>

                  <div className="allocation-note">
                    <CheckCircle style={{ color: "#22c55e", fontSize: 20 }} />
                    <p>
                      These allocations are included free with every branch
                      subscription
                    </p>
                  </div>
                </div>

                {/* Right Card */}
                <div className="billing-card">
                  <div className="billing-toggle">
                    <label>
                      <input
                        type="radio"
                        checked={billingType === "annual"}
                        onChange={() => setBillingType("annual")}
                      />
                      <span className="radio-label">Annual</span>
                      <span className="save-badge">Save up to 20%</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={billingType === "monthly"}
                        onChange={() => setBillingType("monthly")}
                      />
                      <span className="radio-label">Monthly</span>
                    </label>
                  </div>

                  {/* <div className="billing-summary">
                    <div className="summary-item">
                      <span>{branches} Branches</span>
                      <span>₹{branchCost.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-item">
                      <span>{technicians} Technicians</span>
                      <span>₹{technicianCost.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-item">
                      <span>{extraUsers} Extra Account User</span>
                      <span>₹{extraUserCost.toLocaleString()}/yr</span>
                    </div>
                    <hr />
                    <div className="summary-item">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-item">
                      <span>GST (18%)</span>
                      <span>₹{gst.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-total">
                      <span>Final Total</span>
                      <span>₹{total.toLocaleString()}/yr</span>
                    </div>
                  </div> */}
                  <div className="billing-summary">
                    <div className="summary-item">
                      <span>{branches} Branches</span>
                      <span>₹{branchCost.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-item">
                      <span>{technicians} Technicians</span>
                      <span>₹{technicianCost.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-item">
                      <span>{extraUsers} Extra Account User</span>
                      <span>₹{extraUserCost.toLocaleString()}/yr</span>
                    </div>
                    <hr />
                    <div className="summary-item">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-item">
                      <span>GST (18%)</span>
                      <span>₹{gst.toLocaleString()}/yr</span>
                    </div>
                    <div className="summary-total">
                      <span>Final Total</span>
                      <span>₹{total.toLocaleString()}/yr</span>
                    </div>
                  </div>
                  <button className="pay-button" onClick={handleSave}>
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Subscription;
