import React from "react";
import ActionCard from "../Company-Dashboard/ActionCard";
import TaskCard from "../Company-Dashboard/TaskCard";
import Layout from "../Layout/Layout";
import SalesOverview from "../Sales-Dashboard/SalesOverview"
import CustomerInsights from "../Sales-Dashboard/CustomerInsights"
import RevenueTracker from "../Sales-Dashboard/RevenueTracker"
import ProductSalesTrend from "../Sales-Dashboard/ProductSalesTrend"
import "../Dashboard.css";
import PendingActivities from "./PendingActivities";
import SalesTaskCard from "./SalesTaskCard";


function SalesDashboard() {
  return (
    <Layout>
      <div className="p-0" style={{
      width: "83vw",
      maxWidth: "100%",
      margin: "0 auto",
      position: "relative",
      // zIndex: 1,
      overflow: "visible",
    }}>
        <ActionCard />
        {/* <TaskCard /> */}
        <SalesTaskCard />
        <SalesOverview />
        <CustomerInsights />
        <RevenueTracker />
        <ProductSalesTrend />
        <PendingActivities />
      </div>
    </Layout>
  );
}

export default SalesDashboard;
