import React from "react";
import SalesTaskCard from "../Sales-Dashboard/SalesTaskCard";
import Layout from "../Layout/Layout";
import SalesOverview from "../Sales-Dashboard/SalesOverview"
import CustomerInsights from "../Sales-Dashboard/CustomerInsights"
import RevenueTracker from "../Sales-Dashboard/RevenueTracker"
import ProductSalesTrend from "../Sales-Dashboard/ProductSalesTrend"
import AccountFinancialSummary from "./AccountFinancialSummary";
import AccountReceivable from "./AccountReceivable";
import "../Dashboard.css";
import AccountPayable from "./AccountPayable";
// import PendingActivities from "./PendingActivities";


function AccountDashboard() {
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
        <AccountFinancialSummary />
        <AccountReceivable />
        <SalesOverview />
        <CustomerInsights />
        <RevenueTracker />
        <ProductSalesTrend />
        <AccountPayable />
      </div>
    </Layout>
  );
}

export default AccountDashboard;
