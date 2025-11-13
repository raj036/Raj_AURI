import React from "react";
import Layout from "../Layout/Layout.jsx";
import SalesTaskCard from "../Sales-Dashboard/SalesTaskCard";
import CardSection from "./CardSection.jsx";
import AlertsSection from "./AlertSection.jsx";
import SubscriptionAnalytics from "./SubscriptionAnalytics.jsx";
import SuperAdminFinance from "./SuperAdminFinance.jsx";
import CompanyAndGrowthAnalytics from "./CompanyAndGrowthAnalytics.jsx";

function SuperAdminDashboard() {
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
        <SalesTaskCard />
        <CardSection />
        <AlertsSection />
        <SubscriptionAnalytics />
        <SuperAdminFinance />
        <CompanyAndGrowthAnalytics />
      </div>
    </Layout>
  );
}

export default SuperAdminDashboard;
