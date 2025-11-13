import React from "react";
import Layout from "../Layout/Layout";
import "../Dashboard.css";
import ActionCard from "../Company-Dashboard/ActionCard";
import SalesTaskCard from "../Sales-Dashboard/SalesTaskCard"
import BranchOverview from "./BranchOverview";
import BranchInventoryDashboard from "./BranchInventoryDashboard";
import BranchServiceTracker from "./BranchServiceTracker";
import BranchSalesAndOrder from "./BranchSalesAndOrder";
import BranchForecast from "./BranchForecast";
import BranchUtilizationRates from "./BranchUtilizationRates";
import BranchTechnicianPerformance from "./BranchTechnicianPerformance";

function BranchDashboard() {
  return (
    <Layout>
      <div className="p-0" style={{
      width: "83vw",
      maxWidth: "100%",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
      overflow: "visible",
    }}>
        <ActionCard />
        <SalesTaskCard />
        <BranchOverview />
        <BranchInventoryDashboard />
        <BranchServiceTracker />
        <BranchSalesAndOrder />
        <BranchForecast />
        <BranchUtilizationRates />
        <BranchTechnicianPerformance />
      </div>
    </Layout>
  );
}

export default BranchDashboard;
